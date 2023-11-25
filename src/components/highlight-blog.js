import React from "react"
import BlogCard from "./blog-card"

function HighlightBlog({ data, posts }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 mx-auto justify-center">
      {posts.map(post => {
        return <BlogCard post={post} />
      })}
    </div>
  )
}

export default HighlightBlog
