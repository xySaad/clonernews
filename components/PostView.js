import { div } from "../utils/native.js";
import { CommentsList } from "./CommentsList.js";
import { Post } from "./Post.js";

const PostView = (postData) => {
  const postView = div("postView").append(
    div("postCard").append(
      Post(postData),
      div("commentsWrap").append(CommentsList(postData.kids))
    )
  );

  postView.onclick = function (e) {
    if (e.target == postView) {
      this.remove();
    }
  };

  return postView;
};

export default PostView;
