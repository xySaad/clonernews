import { fetchApi } from "../utils/fetchApi.js";
import { timePassed } from "../utils/time.js";
import { div, img } from "../utils/native.js";

export const Comment = (comment) => {
  return div("comment").append(
    div("publisher").append(
      img(null, "no-profile"),
      div("username", comment.by),
      div("time", ` • ${timePassed(comment.time*1000)}`)
    ),
    div("text", comment.text)
  );
};

export const CommentsList = (commentIds) => {
  const commentsList = div("commentsList");

  commentIds?.forEach(async (id) => {
    const comment = await fetchApi(`item/${id}`);
    console.log(comment);
    
    if (comment.deleted) {
      return
    }
    commentsList.append(Comment(comment));
  });

  return commentsList;
};
