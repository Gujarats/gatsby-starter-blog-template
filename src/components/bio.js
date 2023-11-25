import * as React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import { useSiteMetadata } from "../hooks/site-metadata"

const Bio = () => {
  const data = useSiteMetadata()
  const markdownCoffee = useStaticQuery(graphql`
    query BioQuery {
      markdownRemark(
        frontmatter: { title: { eq: "Traktik Kopi Untuk Support Blog Ini" } }
        fields: {}
      ) {
        fields {
          slug
        }
      }
    }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site?.siteMetadata?.author
  const social = data.site?.siteMetadata?.social

  return (
    <div className="flex flex-col overflow-auto h-auto w-screen mx-auto p-6 bg-white dark:bg-gray-700 rounded-xl shadow-lg items-center space-x-4 justify-center">
      <div>
        <StaticImage
          className="rounded-full mx-auto"
          layout="fixed"
          formats={["auto", "webp", "avif, png"]}
          src="../images/profile-pic.png"
          width={90}
          quality={100}
          alt="Profile picture"
        />
        <figcaption class="font-medium text-center">
          <div class="text-sky-500 dark:text-sky-400">
            {author?.name || null}
          </div>
        </figcaption>
        <div className="mt-2 mx-auto text-center items-center">
          <a
            className="hover:no-underline text-2xl text-purple-400 dark:text-purple-400 mr-3"
            href={social?.instagram}
            target="_blank"
          >
            <i class="ri-instagram-line"></i>
          </a>
          <a
            className="hover:no-underline text-2xl text-red-400 dark:text-red-400 mr-3"
            href={social?.youtube}
            target="_blank"
          >
            <i class="ri-youtube-fill"></i>
          </a>
          <a
            className="hover:no-underline text-2xl text-slate-800 dark:text-white-400 mr-3"
            href={social?.tiktok}
            target="_blank"
          >
            <i class="ri-tiktok-fill"></i>
          </a>
        </div>
      </div>
      <p class="flex items-center text-center text-slate-800 dark:text-slate-200 text-lg font-medium">
        <a
          className="hover:no-underline text-slate-800 dark:text-slate-200"
          href={author?.coachServices}
          target="_blank"
        >
          Personal Coach Online for Better Health and Fitness
        </a>
      </p>
      <Link
        className="hover:no-underline text-slate-800 dark:text-slate-200"
        itemProp="url"
        to={markdownCoffee.markdownRemark.fields.slug}
      >
        <i class="ri-cup-fill"></i> Buy me A Cup of Coffee
      </Link>
    </div>
  )
}

export default Bio
