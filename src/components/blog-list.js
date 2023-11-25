import React from "react"
import BlogCard from "./blog-card"

function BlogList({ posts, items }) {
  return (
    <div className="grid grid-cols-2 w-auto md:w-[675px] mx-auto">
      {posts.map(post => {
        return <BlogCard post={post} />
      })}
    </div>
  )
}

export default BlogList
