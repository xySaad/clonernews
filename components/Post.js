import { div } from "../utils/createElement.js"
/*
<td>
<h3 id="post-info">id • Post Title</h3>
<span id="points">999</span> points by <a href="#"><span id="username">User</span></a>
3 hours ago | <span id="comments">123</span> <a href="#">comments</a>
</td>
*/
export const Post = async (p) => {
    return div("post").Id(p.id).append(
        div("type", p.type),
        div("title", p.title),
        div("url", p.url)
    )
}