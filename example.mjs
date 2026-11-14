// Run: npm install && APIFY_TOKEN=... node example.mjs
import { ApifyClient } from 'apify-client';

const client = new ApifyClient({ token: process.env.APIFY_TOKEN });

const input = {
  "profiles": [
    "https://www.linkedin.com/in/williamhgates"
  ]
};

const run = await client.actor('spellzcode/linkedin-profile-data').call(input);
const { items } = await client.dataset(run.defaultDatasetId).listItems();

for (const p of items) console.log(p.status, p.name ?? '', '|', p.jobTitles?.[0] ?? '', '|', p.location ?? '');
