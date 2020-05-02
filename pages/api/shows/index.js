import { getShows } from "../../../lib/shows";

export default async (request, response) => {
  const data = await getShows(request.query.searchTerm);

  response.status(200).json(data);
};
