import express from "express";
import cors from "cors";

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const moviesList = [
  {
    title: "spider man",
    url: "https://wallpaperaccess.com/full/3968126.jpg",
  },
  {
    title: "Iron man",
    url: "https://wallpaperaccess.com/full/3968121.jpg",
  },
  { title: "Venom", url: "https://wallpaperaccess.com/full/790933.jpg" },
];

app.get("/home", (req, res) => {
  res.send("Homepage is working successfully...!!");
});

app.post("/moviename", async (req, res) => {
  let { title, url } = req.body;
  moviesList.push({ title: title, url: url });
  console.log("movie name =>", req.body);
});

app.get("/movies", cors(), (req, res) => {
  res.send(moviesList);
});

app.listen(PORT, () => console.log(`App running succcessfully on ${PORT}`));
