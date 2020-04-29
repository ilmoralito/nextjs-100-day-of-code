import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import { getShows } from "../lib/shows";

export default function Home({ posts, links, shows }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>100 days code - day 0</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{" "}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {posts.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <a href={`/posts/${id}`}>{title}</a>
              <br />
              <small>{id}</small>
              <br />
              <small>{date}</small>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2>Links</h2>
        <ul>
          {links.map((link) => (
            <li key={link}>{link}</li>
          ))}
        </ul>
      </section>
      <section>
        <h2>Batman shows</h2>
        <ul>
          {shows.map((show) => (
            <li key={show}>{show}</li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const posts = getSortedPostsData();
  const shows = await getShows();

  return {
    props: {
      posts, // sync data
      shows, // async data
      links: ["link 1", "link 2", "link 3"], // static data
    },
  };
}
