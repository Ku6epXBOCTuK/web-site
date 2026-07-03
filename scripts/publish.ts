import * as fs from "node:fs";
import * as yaml from "js-yaml";

const TG_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TG_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const DISCORD_URL = process.env.DISCORD_WEBHOOK_URL;

interface PostIds {
	telegram: string | null;
	discord: string | null;
}

interface PostsDb {
	[type: string]: {
		[slug: string]: PostIds;
	};
}

interface PostMeta {
	type: string;
	slug: string;
	title: string;
	date: string;
	filePath: string;
	socialText: string;
}

function loadPostsDb(): PostsDb {
	try {
		const raw = fs.readFileSync("posts.yaml", "utf8");
		if (!raw.trim()) return {};
		const db = yaml.load(raw) as PostsDb;
		for (const slugs of Object.values(db || {})) {
			for (const ids of Object.values(slugs)) {
				if (ids.telegram != null) ids.telegram = String(ids.telegram);
				if (ids.discord != null) ids.discord = String(ids.discord);
			}
		}
		return db || {};
	} catch {
		return {};
	}
}

function savePostsDb(db: PostsDb): void {
	const clean: PostsDb = {};
	for (const [type, slugs] of Object.entries(db || {})) {
		const entries = Object.entries(slugs || {}).filter(
			([, ids]) => ids.telegram || ids.discord,
		);
		if (entries.length) clean[type] = Object.fromEntries(entries);
	}
	if (Object.keys(clean).length) {
		fs.writeFileSync("posts.yaml", yaml.dump(clean), "utf8");
	}
}

async function sendTelegram(text: string): Promise<string | null> {
	if (!TG_TOKEN || !TG_CHAT_ID) {
		console.log("Telegram credentials not set, skipping.");
		return null;
	}
	const url = `https://api.telegram.org/bot${TG_TOKEN}/sendMessage`;
	try {
		const res = await fetch(url, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				chat_id: TG_CHAT_ID,
				text,
				parse_mode: "Markdown",
				disable_web_page_preview: false,
			}),
		});
		const json = await res.json();
		if (json.ok) {
			console.log(`Telegram: sent, message_id=${json.result.message_id}`);
			return String(json.result.message_id);
		}
		console.error("Telegram error:", json.description);
		return null;
	} catch (err) {
		console.error("Telegram request failed:", (err as Error).message);
		return null;
	}
}

async function editTelegram(messageId: string, text: string): Promise<boolean> {
	if (!TG_TOKEN || !TG_CHAT_ID) return false;
	const url = `https://api.telegram.org/bot${TG_TOKEN}/editMessageText`;
	try {
		const res = await fetch(url, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				chat_id: TG_CHAT_ID,
				message_id: Number(messageId),
				text,
				parse_mode: "Markdown",
				disable_web_page_preview: false,
			}),
		});
		const json = await res.json();
		if (json.ok) {
			console.log(`Telegram: edited message ${messageId}`);
			return true;
		}
		if (json.description?.includes("message is not modified")) {
			console.log(`Telegram: message ${messageId} already up to date`);
			return true;
		}
		console.error("Telegram edit error:", json.description);
		return false;
	} catch (err) {
		console.error("Telegram edit request failed:", (err as Error).message);
		return false;
	}
}

async function sendDiscord(text: string): Promise<string | null> {
	if (!DISCORD_URL) {
		console.log("Discord webhook not set, skipping.");
		return null;
	}
	try {
		const url = new URL(DISCORD_URL);
		url.searchParams.set("wait", "true");
		const res = await fetch(url, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ content: text }),
		});
		if (res.ok) {
			const json = await res.json();
			console.log(`Discord: sent, id=${json.id}`);
			return String(json.id);
		}
		const errText = await res.text();
		console.error(`Discord error (${res.status}): ${errText}`);
		return null;
	} catch (err) {
		console.error("Discord request failed:", (err as Error).message);
		return null;
	}
}

async function editDiscord(messageId: string, text: string): Promise<boolean> {
	if (!DISCORD_URL) return false;
	const url = `${DISCORD_URL}/messages/${messageId}`;
	try {
		const res = await fetch(url, {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ content: text }),
		});
		if (res.ok) {
			console.log(`Discord: edited message ${messageId}`);
			return true;
		}
		const errText = await res.text();
		if (res.status === 404) {
			console.log(
				`Discord: message ${messageId} not found (deleted?), will send new`,
			);
			return false;
		}
		console.error(`Discord edit error (${res.status}): ${errText}`);
		return false;
	} catch (err) {
		console.error("Discord edit request failed:", (err as Error).message);
		return false;
	}
}

async function processTelegram(
	existingId: string | null,
	text: string,
): Promise<string | null> {
	if (existingId) {
		const ok = await editTelegram(existingId, text);
		if (ok) return existingId;
		console.log("Telegram edit failed, sending new message...");
	}
	return await sendTelegram(text);
}

async function processDiscord(
	existingId: string | null,
	text: string,
): Promise<string | null> {
	if (existingId) {
		const ok = await editDiscord(existingId, text);
		if (ok) return existingId;
		console.log("Discord edit failed, sending new message...");
	}
	return await sendDiscord(text);
}

async function main(): Promise<void> {
	let posts: PostMeta[];
	try {
		const raw = JSON.parse(fs.readFileSync(".post-meta.json", "utf8"));
		posts = Array.isArray(raw) ? raw : [raw];
	} catch {
		console.error("No .post-meta.json found. Run prepare-post.js first.");
		process.exit(1);
	}

	const db = loadPostsDb();

	for (const meta of posts) {
		const socialText = meta.socialText;
		if (!socialText) {
			console.error(`No socialText for "${meta.slug}", skipping.`);
			continue;
		}

		const type = meta.type || "posts";
		if (!db[type]) db[type] = {};
		const existing = db[type][meta.slug];

		if (existing?.telegram || existing?.discord) {
			console.log(`[${type}] "${meta.slug}" already published. Editing...`);
		} else if (existing) {
			console.log(
				`[${type}] "${meta.slug}" has no message IDs. Publishing fresh...`,
			);
		} else {
			console.log(`[${type}] New "${meta.slug}". Publishing...`);
		}

		const telegramId = await processTelegram(
			existing?.telegram ?? null,
			socialText,
		);
		const discordId = await processDiscord(
			existing?.discord ?? null,
			socialText,
		);

		db[type][meta.slug] = { telegram: telegramId, discord: discordId };

		if (posts.length > 1) {
			await new Promise((r) => setTimeout(r, 1000));
		}
	}

	savePostsDb(db);
	console.log("Done.");
}

main();
