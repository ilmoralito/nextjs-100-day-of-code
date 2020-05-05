import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import { getShows } from "../lib/shows";
import { subscribe } from "../lib/subscribe";
import useSWR from "swr";
import fetch from "node-fetch";
import Link from "next/link";

async function fetcher(url) {
  const response = await fetch(url);

  return await response.json();
}

export default function Home({ posts, links, shows, title, description }) {
  const { data, error } = useSWR("/api/people", fetcher);

  if (error) return <div>Error fetching people's data</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <Layout home>
      <Head>
        <title>{title}</title>
      </Head>
      <section>
        <p style={{ textAlign: "center" }}>{description}</p>
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
            <li key={show.id}>{show.name}</li>
          ))}
        </ul>
      </section>
      <section>
        <People people={data} />
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

function People({ people }) {
  return (
    <>
      <table>
        <caption>People</caption>
        <thead>
          <tr>
            <th>Name</th>
            <th>Gender</th>
            <th>Eye color</th>
            <th>Hair color</th>
            <th>Skin color</th>
            <th>Height</th>
            <th>Mass</th>
          </tr>
        </thead>
        <tbody>
          {people.map((person) => (
            <Person key={person.id} {...person} />
          ))}
        </tbody>
      </table>
      <style jsx>{`
        table {
          border-collapse: collapse;
          border: 1px solid gray;
        }

        th {
          border: 1px solid gray;
          text-align: left;
          padding: 10px;
        }
      `}</style>
    </>
  );
}

function Person({
  id,
  name,
  gender,
  hair_color,
  skin_color,
  eye_color,
  height,
  mass,
}) {
  return (
    <>
      <tr>
        <td>
          <Link href="/people/[id]" as={`/people/${id}`}>
            <a>{name}</a>
          </Link>
        </td>
        <td>{gender}</td>
        <td>{hair_color}</td>
        <td>{eye_color}</td>
        <td>{skin_color}</td>
        <td>{height}</td>
        <td>{mass}</td>
      </tr>
      <style jsx>{`
        tr,
        td {
          padding: 10px;
          border: 1px solid gray;
        }
      `}</style>
    </>
  );
}

async function confirmSubscribe({ email, message }) {
  return await subscribe({ email, message });
}

export async function getStaticProps() {
  const posts = getSortedPostsData();
  const shows = await getShows();
  const siteConfiguration = await import("../site-configuration.json");

  return {
    props: {
      posts,
      shows,
      links: ["link 1", "link 2", "link 3"],
      title: siteConfiguration.default.title,
      description: siteConfiguration.default.description,
    },
  };
}
