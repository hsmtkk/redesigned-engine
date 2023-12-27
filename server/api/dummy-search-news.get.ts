export default defineEventHandler((event) => {
    const query = getQuery(event)
    const text = query.text
    console.log(`search text is ${text}`)
    const looped = busyWait(5000)
    console.log(`looped ${looped} time`)
    return [{ text: "alpha", url: "http://www.example.com" }, { text: "bravo", url: "https://www.example.com/b" }]
})

function busyWait(ms: number): number {
    const end = Date.now() + ms
    let i = 0
    while (Date.now() < end) {
        i += 1
    }
    return i
}
