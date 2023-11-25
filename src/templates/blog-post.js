import * as React from "react";
import { useState, useEffect } from "react";
import { graphql } from "gatsby";
import BlogList from "../components/blog-list";
import Layout from "../components/layout";
import Seo from "../components/seo";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import FreeMealPlan from "../components/free-meal-plan";

function showsMealPlan(setShowMealPlan) {
  localStorage.setItem("meal", "meal");
  setShowMealPlan("meal");
}

const BlogPostTemplate = ({
  data: { site, markdownRemark: post, allMarkdownRemark: allPosts },
  location,
}) => {
  const siteTitle = site.siteMetadata?.title || `Title`;
  const thumbnail = getImage(post.frontmatter.thumbnail);
  const posts = allPosts.nodes;
  const [showMealPlan, setShowMealPlan] = useState("non-meal");
  const [showMealPlanCounter, setShowMealPlanCounter] = useState(0);

  useEffect(() => {
    // scroll event to set meal plan shows up when users almost get to the bottom
    const scrollHandler = () => {
      if (
        window.innerHeight + Math.round(window.scrollY) >=
        document.body.offsetHeight
      ) {
        // you're at the bottom of the page
        if (showMealPlanCounter < 5) showsMealPlan(setShowMealPlan);
        setShowMealPlanCounter(showMealPlanCounter + 1);
      }
    };
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [showMealPlanCounter]);

  return (
    <div>
      <Layout location={location} title={siteTitle} showMealPlan={showMealPlan}>
        <header className="max-w-screen-lg mx-auto items-center text-center p-10">
          <h1 className="dark:text-slate-100">{post.frontmatter.title}</h1>
          <GatsbyImage
            className="w-[1024]"
            image={thumbnail}
            alt={post.frontmatter.title}
          />
        </header>
        <section
          className="p-3 prose dark:prose-p:text-white mx-auto items-center markdown-content"
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        />
        <hr className="w-40 bg-gray-100  dark:bg-gray-700"></hr>
        <h2 className="text-center dark:text-slate-100">Keep on Reading...</h2>
        <footer>
          <BlogList posts={posts} />
        </footer>
      </Layout>
      <FreeMealPlan
        showMealPlan={showMealPlan}
        setShowMealPlan={setShowMealPlan}
      />
    </div>
  );
};

export const Head = ({ data: { markdownRemark: post } }) => {
  return (
    <Seo
      title={post.frontmatter.title}
      description={post.excerpt || post.frontmatter.description}
    />
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($id: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      rawMarkdownBody
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        thumbnail {
          childImageSharp {
            gatsbyImageData(
              width: 800
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
            )
          }
        }
      }
    }
    allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      filter: {
        id: { ne: $id }
        frontmatter: { title: {}, published: { ne: false } }
      }
    ) {
      nodes {
        excerpt
        fields {
          slug
          readingTime {
            time
            minutes
          }
        }

        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
          thumbnail {
            childImageSharp {
              gatsbyImageData(
                width: 400
                placeholder: BLURRED
                formats: [AUTO, WEBP, AVIF]
              )
            }
          }
        }
      }
    }
  }
`;
