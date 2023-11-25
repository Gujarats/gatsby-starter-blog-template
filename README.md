# Technologies

- Gatsby - static generator framework
- Netlify - function(lambda function in netlify) to store full name and email
- Google Sheet - using google sheet as storage for the small usage / starter blog
- Markdown - for creating blog content
- Tailwind - for css framework
- React - of course why not

# Donation

If you find this template useful please give a support by giving small donation to [buy me a coffee](https://flip.id/pwf/$gujaratsantana/#buymecoffee-3364).

# Demo

This template can be found in [gsfits.com ](https://gsfits.com/)- Dalify blog healthy life.

# Getting Started

## Prerequisites

Please install these :

- [Npm](https://nodejs.org/en/download) (yes cuz we use node)
- [Gatsby-cli](https://www.gatsbyjs.com/docs/reference/gatsby-cli/)
- [Netlify-cli](https://docs.netlify.com/cli/get-started/)

## Environment Variable

Gatsby and netlify read the environment variable through file `.env` and if you are in development mode you can store in `.env.development` file.

These are the variables that is needed from the template :

```sh

GOOGLE_SERVICE_ACCOUNT_EMAIL=repalce-with-yours

GOOGLE_PRIVATE_KEY=repalce-with-yours

GOOGLE_SHEET_ID=repalce-with-yours

DEVELOPMENT_ENVIRONMENT=true

```

For the private key don’t forget to add `‘` and `‘` at the end and start, don’t worry about the `\n` cuz in the code I already implement to remove them.

## Google analytics

if you want to use google analytics then please check your analitics ID if you don't want to encounter this error

```
 ERROR #11331  API.NODE.VALIDATION

Invalid plugin options for "gatsby-plugin-google-gtag":

- "trackingIds[0]" is not allowed to be empty
```

add the trackingIds in the `gatsby-config.js`.
if you don't want to use analytics, then simply uninstall it first

```shell
npm uninstall gatsby-plugin-google-gtag
```

and remove the plugins from `gatsby-config.js`

## Start

After all above steps you can start the development in the localhost

```shel
npm install
gatsby develop

```

And to start the function in other terminal, the server CORS is enabled on development environment

```shell

netlify functions:serve

```

the function is located in the folder `functions`

## Important plugins

- gatsby-plugin-google-gtag : used to track using google analytics
- gatsby-remark-embed-video: can include vide url and showing them in markdown

### Some notes

- there are some warning but you can ignore this or fix it, this does not causes any major break though
- there two markdown paths `content` and inside the `src/special-content`. the `content` folder is for content blog , and the other just for special content that does not relate to blog, but it required to show on some pages, in this case mealplan

# Issues

please open up an issue if you encounter it, I try to solve as I could in my free time
