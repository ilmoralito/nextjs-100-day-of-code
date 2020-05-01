import { people } from "../../../data";

export default (request, response) => response.status(200).json(people);
