import img, { div, p } from "../utils/createElement.js";
import { timePassed } from "../utils/time.js";

export const Post = async (pData) => {
  return div("postContainer")
    .Id(pData.id)
    .append(
      div("post").append(
        div("frame").append(div("top"), div("bottom")),
        div("publisher").append(
          img(null, "no-profile"),
          div("username", pData.by),
          div("time", timePassed(pData.time*1000))
        ),
        div("cat", pData.type),
        div("title", pData.title),
        p("text", pData.text),
        div("readmore", "Read more")
      )
    );
};
