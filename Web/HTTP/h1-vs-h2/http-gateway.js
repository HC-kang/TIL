import express from "express";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static("."));

app.listen(PORT, (error) => {
  if (error) {
    console.error(error);
    process.exit(1);
  } else {
    console.log("Listening on port: http://localhost:" + PORT);
  }
});
