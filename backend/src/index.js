const express = require("express");
const { uuid, isUuid } = require("uuidv4");

const app = express();

app.use(express.json());

app.listen(3333, () => {
  console.log("🚀 Server is running!");
});

const projects = [];

/**
 * MIDDLEWARE
 * A middleware works as a request interceptor. It can manipulate the data that comes from the API or the data that is return
 * It returns next, so the next middleware can run (in this get the next middleware is the .get, .post, .put, .whatever method)
 * The middleware below gets the method from the API, transforms it to uppercase and also prints the URL that was called. Lastly, it calls
 * the next middleware.
 * I can also omit the app.use(middlewareName) and call it directly from the .get method, for example.
 * The syntax would look something lime app.get("/projects", middleWareName, (request, response) => {})
 */
function logRequest(request, response, next) {
  const { method, url } = request;

  const logLabel = `[${method.toUpperCase()}] ${url}`;

  console.time(logLabel);

  next();

  console.timeEnd(logLabel);
}

// we need to use the middleware to make it active - The middleware should be at the top of the application
app.use(logRequest);

/**
 * Middleware to verify is ID passed through the API is a valid ID.
 * For this we use the method isUuid() from the UUiDv4 library. It returns true if the ID was used
 * This middleware was called from the .put() and .delete() methods
 */
function validateProjectId(request, response, next) {
  const { id } = request.params;

  if (!isUuid(id)) {
    return response.status(400).json({ error: "Invalid project ID" });
    // by returning here, the method called from the api (i.e .delete()), is not called at all
  }

  // if the ID is valid, the middleware will "unblock" the request and will allow for the method (i.e. .delete()) to be executed
  return next();
}

// The method .get receives 2 parameters.  The path to the url and the function that is executes
// The function is an arrow function that receives another two params: request and response.
// We use request to handle information that comes from the front-end and we use response to send a response back
// json responses will ALWAYS return either an ARRAY or an OBJECT
app.get("/projects", (request, response) => {
  const { title } = request.query;

  // if there is a query params in the API request for title, search for an array with the given title, otherwise, return all elements
  const results = title
    ? projects.filter((project) => project.title.includes(title))
    : projects;

  return response.json(results);
});

/*
 * POST
 */
app.post("/projects", (request, response) => {
  // gets the body passed through the api and deconstructs it in two variables: title and owner
  const { title, owner } = request.body;

  // method uuid is imported from uuidv4 library
  const project = { id: uuid(), title, owner };

  projects.push(project);

  // return the recently new added project
  return response.json(project);
});
// end post

/*
 * PUT method
 */
app.put("/projects/:id", validateProjectId, (request, response) => {
  const { id } = request.params;

  // the .find function will scan the projects array and for each element of the array, it will compare the id of the project
  // with the ID passed through the params of the API call
  const projectIndex = projects.findIndex((project) => project.id === id);

  if (projectIndex < 0) {
    // if array not found, return bad request
    return response.status(400).json({ error: "Project not found!" });
  }

  // grab the information from the API's body and store in a array called project
  const { title, owner } = request.body;
  const project = {
    id,
    title,
    owner,
  };

  // get the array that matches the given ID and replace it with the newly created project
  projects[projectIndex] = project;

  // return the updated array
  return response.json(project);
}); // end PUT

/*
 * DELETE
 */
app.delete("/projects/:id", validateProjectId, (request, response) => {
  const { id } = request.params;

  // the .find function will scan the projects array and for each element of the array, it will compare the id of the project
  // with the ID passed through the params of the API call
  const projectIndex = projects.findIndex((project) => project.id === id);

  if (projectIndex < 0) {
    // if array not found, return bad request
    return response.status(400).json({ error: "Project not found!" });
  }

  // function to remove an element from the array. The first param is the index of the element you want to remove,
  // the second is how many elements from that position you want to remove
  projects.splice(projectIndex, 1);

  // this will return a blank response with status No Content
  return response.status(204).send();
});
