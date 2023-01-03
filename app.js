const { createServer } = require("node:http");

const createApp = () => {
  return createServer((request, response) => {
    console.log("request received");

    response.statusCode = 200;

    response.setHeader("Content-Type", "application/json");

    const jsonRes = JSON.stringify({ location: "Earth" });

    response.end(jsonRes);
  });
};

const app = createApp();

app.listen(3000, () => {
  console.log(`Server running at http://localhost:3000`);
});

module.exports = createApp;
