import { graphql, useStaticQuery } from "gatsby"

export const useSiteMetadata = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          author {
            name
            summary
            coachServices
          }
          description
          siteUrl
          social {
            instagram
            tiktok
            youtube
          }
        }
      }
    }
  `)

  return data
}
