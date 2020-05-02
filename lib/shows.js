import fetch from "node-fetch";

export async function getShows(searchTerm = "batman") {
  const url = `http://api.tvmaze.com/search/shows?q=${searchTerm}`;
  const response = await fetch(url);
  const json = await response.json();

  return json
    .map((entry) => entry.show)
    .map((entry) => ({ id: entry.id, name: entry.name }));
}
