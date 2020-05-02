import fetch, { Response } from "node-fetch";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import useSWR from "swr";

const fetcher = async (url) => fetch(url).then((response) => response.json());

export default function Show() {
  const { query } = useRouter();
  const { data, error } = useSWR(
    () => query.id && `/api/shows/${query.id}`,
    fetcher
  );

  if (error) return <div>{error.message}</div>;
  if (!data) return <div>Loading...</div>;

  const [show, episodes] = data;

  return (
    <>
      <style jsx global>{`
        #container {
          margin: 0;
          padding: 0;
          height: 100vh;
          display: flex;
          flex-direction: row;
        }

        #current-show,
        #episodes {
          flex: 1;
        }

        details > details {
          padding-left: 20px;
        }

        input {
          width: 100%;
          padding: 10px;
          border-radius: 4px;
          border: 1px solid steelblue;
        }
      `}</style>
      <Head>
        <title>{show.name}</title>
      </Head>
      <Link href="/shows">
        <a>Shows</a>
      </Link>
      <div id="container">
        <CurrentShow show={show} />
        <Episodes episodes={episodes} />
      </div>
    </>
  );
}

function createMarkup(summary) {
  return { __html: summary };
}

function CurrentShow({ show }) {
  return (
    <div id="current-show">
      <h1>{show.name}</h1>
      <img src={show?.image?.medium} />
      <div dangerouslySetInnerHTML={createMarkup(show.summary)}></div>
    </div>
  );
}

function Episodes({ episodes }) {
  const [episodeList, setEpisodeList] = React.useState(episodes);

  const onChangeHandler = (searchTerm) => {
    setEpisodeList(
      episodes.filter(
        (episode) =>
          episode.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          episode.summary.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  const seasons = groupBySeason(episodeList);

  return (
    <div id="episodes">
      <Filter onChange={onChangeHandler} />
      {Object.keys(seasons).map((season) => (
        <Season key={season} number={season} episodes={seasons[season]} />
      ))}
    </div>
  );
}

function Season({ number, episodes }) {
  return (
    <>
      <details>
        <summary>
          {number} - {episodes.length} episodes
        </summary>
        {episodes.map((episode) => (
          <Episode key={episode.id} episode={episode} />
        ))}
      </details>
    </>
  );
}

function Episode({ episode }) {
  return (
    <details>
      <summary>{episode.name}</summary>
      <img src={episode?.image?.medium} />
      <div dangerouslySetInnerHTML={createMarkup(episode.summary)}></div>
    </details>
  );
}

function Filter({ onChange }) {
  const [searchTerm, setSearchTerm] = React.useState("");

  const onChangeHandler = (event) => {
    setSearchTerm(event.target.value);

    onChange(event.target.value);
  };

  return (
    <>
      <input
        value={searchTerm}
        onChange={onChangeHandler}
        placeholder="Filter by episode name or summary"
      />
    </>
  );
}

function groupBySeason(episodes) {
  return episodes.reduce((previousValue, currentValue) => {
    if (!previousValue[currentValue.season]) {
      previousValue[currentValue.season] = [currentValue];
    } else {
      previousValue[currentValue.season] = previousValue[
        currentValue.season
      ].concat(currentValue);
    }
    return previousValue;
  }, {});
}
