const pets = [
  {
    name: "hotch",
  },
  {
    name: "peluso",
  },
  {
    name: "lola",
  },
  {
    name: "nami",
  },
];

export default (request, response) => {
  response.status(200).json({ pets });
};
