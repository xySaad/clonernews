import { Post } from "./components/Post.js";
import { fetchApi } from "./utils/fetchApi.js";
const PAGE_SIZE = 10
const q = (selector) => document.querySelector(selector)


const liveUpdate = () => {
    let lastId

    setInterval(async () => {
        const id = await fetchApi("maxitem")
        if (lastId && id != lastId) {
            console.log(id);
        }
        lastId = id
    }, 5000);

    return () => lastId
}

let posts = []

const main = async () => {
    let id = await fetchApi("maxitem")
    let i = 0
    let main = q('main')
    while (i < PAGE_SIZE) {
        const post = await fetchApi(`item/${id}`)
        console.log(post);
        
        id--
        if (post.type !== "comment") {
            i++
            main.append(await Post(post))
        }
    }
}

main()