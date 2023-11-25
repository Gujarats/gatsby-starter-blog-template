import React from "react"
import { Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

function BlogCard({ post }) {
  const thumbnail = getImage(post.frontmatter.thumbnail)
  const title = post.frontmatter.title || post.fields.slug

  return (
    <Link to={post.fields.slug} itemProp="url" className="p-3 no-underline ">
      <GatsbyImage
        className="flex-shrink-0 mt-3 overflow-hidden rounded-md md:max-md:w-[100px]"
        image={thumbnail}
        alt={post.frontmatter.title}
      />
      <div class="mt-4 md:mt-2 md:max-md:w-[50px]">
        <div class="uppercase tracking-wide text-sm text-slate-800 dark:text-white font-bold">
          {title}
        </div>
        <small className="text-sm">
          <i class="ri-time-fill mr-1"></i>
          <small className="text-l font-bold mr-1 ">
            {Math.ceil(post.fields.readingTime.minutes)}
          </small>
          menit
        </small>
        <p class="mt-2 text-gray-600 dark:text-slate-400">{post.excerpt}</p>
      </div>
    </Link>
  )
}

export default BlogCard
