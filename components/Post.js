import { div } from "../utils/createElement.js"

export const Post = async (p) => {
    return div("post").Id(p.id).append(
        div("type", p.type),
        div("title", p.title),
        div("url", p.url)
    )
}