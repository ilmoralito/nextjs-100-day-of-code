import fetch from "node-fetch";

export async function getShows() {
  const response = await fetch("http://api.tvmaze.com/search/shows?q=batman");
  const json = await response.json();

  return json.map((entry) => entry.show).map((entry) => entry.name);
}
