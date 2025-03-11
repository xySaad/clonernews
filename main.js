import { Post } from "./components/Post.js";
import { PostCard } from "./components/PostCard.js";
import { fetchApi } from "./utils/fetchApi.js";
import { q } from "./utils/native.js";
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
let posts = [];

const scroll = async () => {
  let Posts = q(".posts");
  let l = posts.length;
  while (posts[0]) {
    Posts.append(posts[0]);
    posts.splice(0, 1);
  }
  if (l === PAGE_SIZE) {
    FetchPost(Posts.lastChild.id);
  }
  const options = {
    root: q("main"),
    rootMargin: "0px",
    threshold: 0.3,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        observer.unobserve(entry.target);
        throttledScroll();
      }
    });
  }, options);
  observer.observe(Posts.lastChild);
};

const throttledScroll = throttle(scroll, 1000);

const FetchPost = async (id) => {
  while (posts.length !== PAGE_SIZE) {
    const post = await fetchApi(`item/${id}`);
    id--;
    if (post.type !== "comment" && !post.dead) {
      posts.push(await Post(post));
    }
  }
};
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
  FetchPost(id);
  throttledScroll();
};

main();
