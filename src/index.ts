import app from "./app";

// TODO: make a dotenv file
const PORT = 4000;

app.listen(PORT, () => {
  console.log(`server on port ${PORT}`);
})