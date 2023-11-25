import * as React from "react";
import { useState, useEffect } from "react";
import { graphql } from "gatsby";

import Bio from "../components/bio";
import Layout from "../components/layout";
import Seo from "../components/seo";
import BlogList from "../components/blog-list";
import HighlightBlog from "../components/highlight-blog";
import BigHighlight from "../components/big-highlight";
import FreeMealPlan from "../components/free-meal-plan";

function showsMealPlan(setShowMealPlan) {
  localStorage.setItem("meal", "meal");
  setShowMealPlan("meal");
}

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`;
  const posts = data.allMarkdownRemark.nodes;
  const [showMealPlan, setShowMealPlan] = useState("non-meal");
  const SHOW_MEAL_PLAN_IN_MILISECONDS = 60000;

  useEffect(() => {
    const interval = setTimeout(() => {
      showsMealPlan(setShowMealPlan);
    }, SHOW_MEAL_PLAN_IN_MILISECONDS);
    return () => {
      clearTimeout(interval);
    };
  }, []);

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Bio />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    );
  }

  return (
    <div>
      <Layout location={location} title={siteTitle} showMealPlan={showMealPlan}>
        <BigHighlight post={posts[0]} />
        <hr className="w-40 bg-gray-100  dark:bg-gray-700" />
        <HighlightBlog posts={posts.slice(1, 4)} />
        <hr className="w-40 bg-gray-100  dark:bg-gray-700" />
        <h2 className="text-center dark:text-slate-200">Keep on Reading...</h2>
        <BlogList posts={posts.slice(4)} />
      </Layout>
      <FreeMealPlan
        showMealPlan={showMealPlan}
        setShowMealPlan={setShowMealPlan}
      />
    </div>
  );
};

export default BlogIndex;

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => {
  return <Seo />;
};

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      filter: { frontmatter: { title: {}, published: { ne: false } } }
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
                width: 600
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
