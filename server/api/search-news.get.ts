import database from "@/embedding/text-url-embedding.json"
import similarity from "compute-cosine-similarity"
import OpenAI from "openai"

const MODEL = "text-embedding-ada-002"

export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const searchText = query.text as string

    console.log("searchText")
    console.log(searchText)

    const searchEmbedding = await openAIEmbedding(searchText)

    const textURLSims = []
    for (const item of database) {
        const sim: number = similarity(item.embedding, searchEmbedding)
        textURLSims.push({ text: item.text, url: item.url, similarity: sim })
    }

    textURLSims.sort((a, b) => { return b.similarity - a.similarity })

    return textURLSims.slice(0, 10)
})

async function openAIEmbedding(text: string): Promise<Array<number>> {
    const runtimeConfig = useRuntimeConfig()

    const openai = new OpenAI({
        apiKey: runtimeConfig.OPENAI_API_KEY,
    });

    const chatCompletion = await openai.embeddings.create({
        input: text,
        model: MODEL,
    })

    return chatCompletion.data[0].embedding
}