export default (request, response) => {
  response.status(200).json({ message: "Successfully subscribed" });
};
