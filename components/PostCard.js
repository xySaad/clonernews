import { div, q } from "../utils/native.js";
import { Post } from "./Post.js";
import PostView from "./PostView.js";

export const PostCard = (postdata) => {
  const readmore = div("readmore", "Read more");
  readmore.onclick = () => {
    q("main").append(PostView(postdata));
  };

  return div("postContainer").append(
    Post(postdata).append(
      readmore,
      div("frame").append(div("top"), div("bottom"))
    )
  );
};
