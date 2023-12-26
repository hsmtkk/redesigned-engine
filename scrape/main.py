import json

import bs4

with open("jiji.html", encoding="utf-8") as f:
    html = f.read()

soup = bs4.BeautifulSoup(html, "html.parser")

result = list()

for atag in soup.find_all("a"):
    text = atag.text.strip()
    url = atag.get("href", "").strip()
    if text and url and "/fea/" in url:
        result.append({"text": text, "url": url})

with open("result.json", "w", encoding="utf-8") as f:
    f.write(json.dumps(result, ensure_ascii=False))
