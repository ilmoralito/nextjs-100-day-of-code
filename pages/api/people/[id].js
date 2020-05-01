import { people } from "../../../data";

export default ({ query: { id } }, response) => {
  const filtered = people.filter((p) => p.id === id);

  if (filtered.length > 0) {
    response.status(200).json(filtered[0]);
  } else {
    response.status(404).json({ message: `User with id: ${id} not found.` });
  }
};
