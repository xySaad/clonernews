import { Post } from "./components/Post.js";
import { fetchApi } from "./utils/fetchApi.js";
const PAGE_SIZE = 10
const q = (selector) => document.querySelector(selector)


const liveUpdate = () => {
    let lastId

    setInterval(async () => {
        const id = await fetchApi("maxitem")
        if (lastId && id != lastId) {
        }
        lastId = id
    }, 5000);   

}

let posts = []

const main = async () => {
    let id = await fetchApi("maxitem")
    let i = 0
    let main = q('.posts')
    while (i < PAGE_SIZE) {
        const post = await fetchApi(`item/${id}`)
        
        id--
        if (post && post.type !== "comment" && !post.dead) {
            i++
            main.append(await Post(post))
        }
    }
}

main()