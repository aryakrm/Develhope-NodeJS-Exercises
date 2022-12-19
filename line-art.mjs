import figlet from "figlet";

figlet("This is power of Figlet!", (err, data) => {
  if (err) {
    console.log("Something went wrong...");
    console.dir(err);
    return;
  }
  console.log(data);
});
