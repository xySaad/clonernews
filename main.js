import { Post } from "./components/Post.js";
import { fetchApi } from "./utils/fetchApi.js";
import { throttle } from "./utils/throttle.js";
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
const scroll = async (id, main) => {
    let wH = window.screenY
    let scly = document.body.clientHeight    
    if (wH - scly < 10) {
        console.log(id);
        
        let i = 0
        while (i < PAGE_SIZE) {
            const post = await fetchApi(`item/${id}`)
            id--
            if (post.type !== "comment") {
                i++
                main.append(await Post(post))
            }
        }
    }
}

let posts = []
const main = async () => {
    let id = await fetchApi("maxitem")
    let i = 0
    let main = q('.posts')
    while (i < PAGE_SIZE) {
        const post = await fetchApi(`item/${id}`)
        id--
        if (post.type !== "comment") {
            i++
            main.append(await Post(post))
        }
    }
    window.addEventListener('scroll', () => {        
        scroll(id, main)
    })
}

main()