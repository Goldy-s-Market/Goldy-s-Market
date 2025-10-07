require("dotenv").config();
const expresss = require("express");
const app = expresss();
const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.send(`Hello World`);
});

app.listen(PORT, () => {
  console.log(`App is live. Listening on port ${PORT}`);
  console.log(`Go over to http://localhost:8080/`);
});
