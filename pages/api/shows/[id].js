import { fetchShow } from "../../../lib/tvmaze";

export default async function ({ query: { id } }, response) {
  const data = await fetchShow(id);

  response.status(200).json(data);
}
