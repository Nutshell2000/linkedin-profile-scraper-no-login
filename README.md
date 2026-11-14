# LinkedIn Profile Scraper (no login, no cookies)

Get public LinkedIn profile data from a list of profile links: name, headline, about, location, followers, experience and education. No LinkedIn account, no session cookie, no browser extension.

This repo is a working example of calling the [LinkedIn Profile Scraper](https://apify.com/spellzcode/linkedin-profile-data) Apify actor from Node.js, Python, or without code. The actor runs on Apify's cloud; you pay per result and Apify's free plan includes $5 of monthly credit.

Made by SpellzCode, who also run the actor. Not affiliated with any site named here.

## What people use it for

- Keep CRM job titles and companies current
- Check who is still at an account before outreach
- Enrich a list of candidate or speaker profile links

## Quick start without code

1. Open **[the actor on Apify](https://apify.com/spellzcode/linkedin-profile-data)** and sign in (free).
2. Paste your inputs, press **Start**.
3. Download the results as CSV, Excel or JSON, or connect them to Google Sheets, Make, Zapier or n8n.

## Quick start with code

Get an API token at [console.apify.com/settings/integrations](https://console.apify.com/settings/integrations), then:

```bash
git clone https://github.com/Nutshell2000/linkedin-profile-scraper-no-login.git
cd linkedin-profile-scraper-no-login
npm install
APIFY_TOKEN=your_token node example.mjs
```

Node.js ([example.mjs](example.mjs)):

```js
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
```

Python ([example.py](example.py)):

```python
import os
from apify_client import ApifyClient

client = ApifyClient(os.environ["APIFY_TOKEN"])

run_input = {
    "profiles": [
        "https://www.linkedin.com/in/williamhgates"
    ]
}

run = client.actor("spellzcode/linkedin-profile-data").call(run_input=run_input)
for p in client.dataset(run["defaultDatasetId"]).iterate_items():
    print(p['status'], p.get('name'), '|', (p.get('jobTitles') or [''])[0], '|', p.get('location'))
```

## Input

```json
{
  "profiles": [
    "https://www.linkedin.com/in/williamhgates"
  ]
}
```

All fields are described on the actor's **Input** tab.

## Output (one row)

```json
{
  "query": "https://www.linkedin.com/in/williamhgates",
  "status": "ok",
  "name": "Bill Gates",
  "jobTitles": [
    "Co-chair",
    "Founder",
    "Co-founder"
  ],
  "about": "Chair of the Gates Foundation. Founder of Breakthrough Energy. Co-founder of Microsoft. Voracious reader. Avid traveler. Active blogger.",
  "location": "Seattle, Washington, United States",
  "country": "US",
  "followers": 40796466,
  "experience": [
    {
      "name": "Gates Foundation",
      "url": "https://www.linkedin.com/company/gates-foundation",
      "description": null,
      "from": 2000,
      "to": null
    },
    {
      "name": "Breakthrough Energy",
      "url": "https://www.linkedin.com/company/breakthrough-energy",
      "description": null,
      "from": 2015,
      "to": null
    },
    {
      "name": "Microsoft",
      "url": "https://www.linkedin.com/company/microsoft",
      "description": null,
      "from": 1975,
      "to": null
    }
  ],
  "education": [
    {
      "name": "Harvard University",
      "url": "https://www.linkedin.com/school/harvard-university/",
      "description": null,
      "from": 1973,
      "to": 1975
    }
  ],
  "photoUrl": "https://media.licdn.com/dms/image/v2/D5603AQF-RYZP55jmXA/profile-displayphoto-shrink_200_200/B56ZRi8g.aGsAY-/0/1736826818802?e=2147483647&v=beta&t=bKWfN6UwwtiCqFWsG7rBELbd48qJOAMLdxhBzzkJV0k",
  "linkedinUrl": "https://www.linkedin.com/in/williamhgates",
  "partlyHidden": false
}
```

## Price

$3 per 1,000 profiles returned; refused or unavailable profiles are free. Apify's paid plans get 10% to 30% off. Each run also has Apify's standard $0.00005 start charge.

## Limits

- Reads logged-out public pages only, so fields many people hide are empty, and LinkedIn refuses a share of requests (about 1 in 3 in our tests). Refused rows are free and marked `refused` so you can retry them.
- No emails or phone numbers, and no people search: you supply the links.
- Profiles are personal data. You need a lawful basis under GDPR and similar laws, and you are responsible for respecting LinkedIn's terms.

## Guide

A longer walk-through: [keep your crms job titles current from linkedin profile links without logging in or using cookies](https://dev.to/spellzcode/keep-your-crms-job-titles-current-from-linkedin-profile-links-without-logging-in-or-using-cookies-3pkk)

## More tools

[All SpellzCode Apify actors](https://github.com/Nutshell2000/spellzcode-apify-actors): LinkedIn, TikTok and Threads profiles, company registers, contact details, email cleaning, PDFs, jobs, reviews and SEO.

## License

The example code in this repo is MIT licensed.
