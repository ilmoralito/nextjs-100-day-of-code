export default (request, response) => {
  console.log(request.body);

  response.status(200).json({ hello: "world" });
};
