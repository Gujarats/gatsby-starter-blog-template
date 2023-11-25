import React from "react"
import { Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

function BigHighlight({ post }) {
  const thumbnail = getImage(post.frontmatter.thumbnail)
  const title = post.frontmatter.title || post.fields.slug

  return (
    <div className="flex flex-col mx-auto justify-between overflow-hidden">
      <Link
        to={post.fields.slug}
        itemProp="url"
        className="no-underline text-center justify-center grid grid-cols-1"
      >
        <GatsbyImage
          className="mt-3 rounded-md mx-auto"
          image={thumbnail}
          alt={post.frontmatter.title}
        />
        <div class="ml-3 mt-4 md:mt-2">
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
          <p class="mt-2 text-gray-600 dark:text-slate-400 w-[300px] sm:w-[600px] mx-auto">
            {post.excerpt}
          </p>
        </div>
      </Link>
    </div>
  )
}

export default BigHighlight
