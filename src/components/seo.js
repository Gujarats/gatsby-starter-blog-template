import * as React from "react"
import { useSiteMetadata } from "../hooks/site-metadata"

const Seo = ({ description, title, children }) => {
  const { site } = useSiteMetadata()

  const metaDescription = description || site.siteMetadata.description
  const defaultTitle = site.siteMetadata?.title
  const titleTagBlog = (
    <title>
      {defaultTitle ? `${title ? title : ""} | ${defaultTitle}` : title}
    </title>
  )

  const titleTagHome = <title>{defaultTitle}</title>

  return (
    <>
      {title ? titleTagBlog : titleTagHome}
      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta name="instagram:card" content="summary" />
      <meta
        name="instagram:creator"
        content={site.siteMetadata?.social?.instagram || ``}
      />
      <meta name="tiktok:card" content="summary" />
      <meta
        name="tiktok:creator"
        content={site.siteMetadata?.social?.tiktok || ``}
      />
      <meta name="youtube:card" content="summary" />
      <meta
        name="youtube:creator"
        content={site.siteMetadata?.social?.youtube || ``}
      />
      {children}
    </>
  )
}

export default Seo
