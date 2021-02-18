import Head from "next/head";

import { getSiteMetaData } from "@utils/helpers";

export function SEO({ title, description = "" }) {
  const siteMetadata = getSiteMetaData();

  const metaDescription = description || siteMetadata.description;

  return (
    <Head>
      <title>
        {title} | {siteMetadata.title}
      </title>
      <meta
        property="og:image"
        content="https://blog-jpbrab0.vercel.app/api/thumbnail.png?title=Jo%C3%A3o%20Pedro%27s%20blog"
      ></meta>
      <meta name="description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta name="og:title" property="og:title" content={title} />
      <link
        rel="apple-touch-icon-precomposed"
        sizes="144x144"
        href="https://blog-jpbrab0.vercel.app/api/thumbnail.png?title=Jo%C3%A3o%20Pedro%27s%20blog"
      />
      <link
        rel="apple-touch-icon-precomposed"
        sizes="114x114"
        href="https://blog-jpbrab0.vercel.app/api/thumbnail.png?title=Jo%C3%A3o%20Pedro%27s%20blog"
      />
      <link
        rel="apple-touch-icon-precomposed"
        sizes="72x72"
        href="https://blog-jpbrab0.vercel.app/api/thumbnail.png?title=Jo%C3%A3o%20Pedro%27s%20blog"
      />
      <link
        rel="apple-touch-icon-precomposed"
        href="https://blog-jpbrab0.vercel.app/api/thumbnail.png?title=Jo%C3%A3o%20Pedro%27s%20blog"
      />
      <link
        rel="shortcut icon"
        href="https://blog-jpbrab0.vercel.app/api/thumbnail.png?title=Jo%C3%A3o%20Pedro%27s%20blog"
      ></link>
      <meta
        name="og:description"
        property="og:description"
        content={metaDescription}
      />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:creator" content={siteMetadata.social.twitter} />
      <link rel="icon" type="image/png" href="/static/favicon.ico" />
      <link rel="apple-touch-icon" href="/static/favicon.ico" />
    </Head>
  );
}
