# Run: pip install apify-client && APIFY_TOKEN=... python example.py
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
