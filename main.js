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
let fetching = false
const scroll = throttle(async () => {

    if ((window.innerHeight + Math.round(window.scrollY)) >= document.body.offsetHeight * 0.9 && !fetching) {
        fetching = !fetching
        let id = [...document.querySelectorAll('.post')]
        id = id[id.length - 1].id
        console.log(id);
        let main = q('.posts')
        let i = 0
        while (i < PAGE_SIZE) {
            const post = await fetchApi(`item/${id}`)
            id--
            if (post.type !== "comment") {
                i++
                main.append(await Post(post))
            }
        }
        fetching = !fetching
    }

}, 1000)

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
        scroll()
    })
}

main()