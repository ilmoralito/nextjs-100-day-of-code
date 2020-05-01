import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import { getShows } from "../lib/shows";
import { subscribe } from "../lib/subscribe";

export default function Home({ posts, links, shows }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section>
        <Form />
      </section>
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

function Form() {
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  return (
    <>
      <form
        autoComplete="off"
        onSubmit={(event) => {
          event.preventDefault();

          confirmSubscribe({ email, message })
            .then((output) => {
              setSuccessMessage(output.message);
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });

          setEmail("");
          setMessage("");
        }}
      >
        <div className={utilStyles.group}>
          <label htmlFor="email" className={utilStyles.label}>
            Email
          </label>
          <input
            type="text"
            name="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className={utilStyles.control}
          />
        </div>
        <div className={utilStyles.group}>
          <label htmlFor="message" className={utilStyles.label}>
            Message
          </label>
          <textarea
            name="message"
            id="message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            className={utilStyles.control}
          ></textarea>
        </div>
        <div className={utilStyles.group}>
          <button
            type="submit"
            disabled={
              !email ||
              !message ||
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)
            }
          >
            Send
          </button>
        </div>
      </form>
      {successMessage && <SuccessMessage message={successMessage} />}
      {errorMessage && <ErrorMessage message={errorMessage} />}
    </>
  );
}

function SuccessMessage({ message }) {
  return <div>{message}</div>;
}

function ErrorMessage({ message }) {
  return <div>{message}</div>;
}

async function confirmSubscribe({ email, message }) {
  return await subscribe({ email, message });
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
