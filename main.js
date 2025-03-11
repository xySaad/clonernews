import { Post } from "./components/Post.js";
import { PostCard } from "./components/PostCard.js";
import { fetchApi } from "./utils/fetchApi.js";
import { div, q } from "./utils/native.js";
const PAGE_SIZE = 10;

const liveUpdate = () => {
  let lastId;
  setInterval(async () => {
    const id = await fetchApi("maxitem");
    if (lastId && id != lastId) {
    }
    lastId = id;
  }, 5000);
};

const getPosts = async (id) => {
  let i = 0;
  let posts = q(".posts");
  while (i < PAGE_SIZE) {
    const post = await fetchApi(`item/${id}`);
    id--;
    if (post && post.type !== "comment" && !post.dead) {
      i++;
      posts.append(PostCard(post));
    }
  }
};

let fetching = false;

const scroll = () => {
  let fetching = false;
  return () => {
    if (fetching) {
      return;
    }
    fetching = !fetching;
    const id = document.querySelector(".posts").lastChild.id;
    getPosts(id);
    fetching = !fetching;
  };
};

const main = async () => {
  const id = await fetchApi("maxitem");
  getPosts(id);

  const s = scroll();

  q("main").addEventListener("scroll", s);
};

main();
