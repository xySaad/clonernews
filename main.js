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
  fetching = !fetching;
  let id = [...document.querySelectorAll(".post")];
  id = id[id.length - 1].id;
  let main = q(".posts");
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
  let main = q(".posts");
  while (i < PAGE_SIZE) {
    const post = await fetchApi(`item/${id}`);
    id--;
    if (post && post.type !== "comment" && !post.dead) {
      i++;
      main.append(await Post(post));
    }
  }

  const throttledScroll = throttle(scroll, 1000);

  window.addEventListener("scroll", throttledScroll);
};

main();
