import fetch from "node-fetch";

const api = "http://api.tvmaze.com";

export default async function (request, response) {
  const query = request.query.query;
  const res = await fetch(`${api}/search/shows?q=${query}`);

  return await res.json();
}

export async function fetcher(searchTerm) {
  const url = `${api}/search/shows?q=${searchTerm}`;
  const response = await fetch(url);
  const json = await response.json();

  return json.map((entry) => entry.show);
}

export async function fetchShow(id) {
  const endpoints = [`${api}/shows/${id}`, `${api}/shows/${id}/episodes`];
  const requests = endpoints.map((endpoint) => fetch(endpoint));

  return Promise.all(requests)
    .then((responses) => responses)
    .then((responses) =>
      Promise.all(responses.map((response) => response.json()))
    );
}
