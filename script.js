const fs = require("node:fs");

fs.writeFile("message.txt", "Hello Node.js", "utf8", (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("Text Added");
});
