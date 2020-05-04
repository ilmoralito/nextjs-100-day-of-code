import Head from "next/head";
import Layout from "../../components/layout";
import Link from "next/link";
import { fetcher } from "../../lib/tvmaze";
import ShowContext from "../../components/showContext";

export default function Shows() {
  const {
    searchTerm,
    searchResults,
    saveSearchTerm,
    saveSearchResults,
  } = React.useContext(ShowContext);
  const [shows, setShows] = React.useState(searchResults);
  const [isLoading, setIsLoading] = React.useState(false);

  const onSubmitHanlder = async (searchTerm) => {
    setIsLoading(true);

    const data = await fetcher(searchTerm);

    saveSearchTerm(searchTerm);
    saveSearchResults(data);

    setIsLoading(false);
    setShows(data);
  };

  return (
    <>
      <Head>
        <title>TV Maze query api</title>
      </Head>
      <style jsx global>{`
        .group {
          margin-bottom: 10px;
        }

        label {
          display: block;
        }

        input {
          width: 100%;
          padding: 10px;
          border: 1px solid steelblue;
          border-radius: 4px;
        }

        button {
          padding: 10px;
          border: 1px solid gray;
          border-radius: 4px;
        }
      `}</style>
      <Layout>
        <Search onSubmit={onSubmitHanlder} currentSearchTerm={searchTerm} />
        {isLoading ? <div>Loading...</div> : <SearchResults shows={shows} />}
      </Layout>
    </>
  );
}

function Search({ onSubmit, currentSearchTerm }) {
  const [searchTerm, setSearchTerm] = React.useState(currentSearchTerm);

  const onChangeHandler = (event) => setSearchTerm(event.target.value);

  const onSubmitHanlder = (event) => {
    event.preventDefault();

    onSubmit(searchTerm);
  };

  return (
    <>
      <form onSubmit={onSubmitHanlder}>
        <div className="group">
          <label>Search text</label>
          <input value={searchTerm} onChange={onChangeHandler} />
        </div>
        <div className="group">
          <button type="submit">Send</button>
        </div>
      </form>
    </>
  );
}

function SearchResults({ shows }) {
  return (
    <ul>
      {shows.map((show) => (
        <Show key={show.id} show={show} />
      ))}
    </ul>
  );
}

function Show({ show }) {
  return (
    <li>
      <Link href="/shows/[id]" as={`/shows/${show.id}`}>
        <a>{show.name}</a>
      </Link>
    </li>
  );
}
