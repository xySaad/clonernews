import { img, div, q } from "../utils/native.js";
import { timePassed } from "../utils/time.js";

export const Post = (pData) => {
  return div("post").Id(pData.id).append(
    div("publisher").append(
      img(null, "no-profile"),
      div("username", pData.by),
      div("time", timePassed(pData.time * 1000))
    ),
    div("cat", pData.type),
    div("title", pData.title),
    div("text", pData.text)
  );
};
