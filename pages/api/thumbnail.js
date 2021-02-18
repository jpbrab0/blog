import { getScreenshot } from './_lib/chromium'
import getThumbnailTemplate from './_lib/thumbnailTemplate'

const isDev = !process.env.AWS_REGION

export default async function(req,res){
    // let { frontmatter, content, excerpt, previousPost, nextPost,thumbnailUrl } = getPostBySlug("coding-post")
    // return res.json({
    //     title: frontmatter.title,
    //     thumbnailUrl: thumbnailUrl
    // })

    try {
        const html = getThumbnailTemplate(req,res)
        const file = await getScreenshot(html,isDev)
        
        res.setHeader('Content-Type', 'image/png')
        res.setHeader("Cache-Control", "public, immutable, no-transform, s-maxage=31536000, max-age=31536000")

        res.send(file)
    } catch (error) {
        console.error(error)

        return res.status(500).send("Internal server error")
    }
}