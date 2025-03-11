const api = (path) => `https://hacker-news.firebaseio.com/v0/${path}.json`

export const fetchApi = async(path) => {
    const resp = await fetch(api(path))
    return await resp.json()
}