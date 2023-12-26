import json

import openai

MODEL = "text-embedding-ada-002"


def main():
    with open("../scrape/text-url.json", encoding="utf-8") as f:
        text_urls = json.load(f)

    client = openai.Client()

    result = []

    for text_url in text_urls:
        text = text_url["text"]
        url = text_url["url"]
        resp = client.embeddings.create(input=text, model=MODEL)
        embedding = resp.data[0].embedding
        result.append({"text": text, "url": url, "embedding": embedding})

    with open("text-url-embedding.json", "w", encoding="utf-8") as f:
        json.dump(result, f, ensure_ascii=False)


if __name__ == "__main__":
    main()
