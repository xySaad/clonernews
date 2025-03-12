import { fetchApi } from "../utils/fetchApi.js";
import { timePassed } from "../utils/time.js";
import { div, img, p } from "../utils/native.js";

export const Comment = (comment) => {
  return div("comment").append(
    div("publisher").append(
      img(null, "no-profile"),
      div("username", comment.by),
      div("time", ` • ${timePassed(comment.time*1000)}`)
    ),
    p("text", comment.text)
  );
};

export const CommentsList = (commentIds) => {
  const commentsList = div("commentsList");

  commentIds?.forEach(async (id) => {
    const comment = await fetchApi(`item/${id}`);
    if (comment.deleted) {
      return
    }
    commentsList.append(Comment(comment));
  });

  return commentsList;
};
