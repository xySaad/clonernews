import { Post } from "./components/Post.js";
import { fetchApi } from "./utils/fetchApi.js";
import { throttle } from "./utils/throttle.js";
const PAGE_SIZE = 10;
const q = (selector) => document.querySelector(selector);

const liveUpdate = () => {
    let lastId;
    setInterval(async () => {
        const id = await fetchApi("maxitem");
        if (lastId && id != lastId) {
        }
        lastId = id;
    }, 5000);
};

let fetching = false;

const scroll = async () => {
    let main = q(".posts");
    if (fetching) {
        return
    }
    fetching = !fetching;
    let id = [...document.querySelectorAll(".postContainer")];
    id = id[id.length - 1].id;
    console.log(id);

    let i = 0;
    while (i < PAGE_SIZE) {
        const post = await fetchApi(`item/${id}`);
        id--;
        if (post.type !== "comment") {
            i++;
            main.append(await Post(post));
        }
    }
    fetching = !fetching;
};

let posts = [];
const main = async () => {
    let id = await fetchApi("maxitem");
    let i = 0;
    let posts = q(".posts");
    while (i < PAGE_SIZE) {
        const post = await fetchApi(`item/${id}`);
        id--;
        if (post && post.type !== "comment" && !post.dead) {
            i++;
            posts.append(await Post(post));
        }
    }

    const throttledScroll = throttle(scroll, 1000);
    console.log(1);

    q('main').addEventListener("scroll", throttledScroll);
};

main();
