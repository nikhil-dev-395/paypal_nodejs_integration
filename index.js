import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import env from "./env";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("dev"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  return res.render("index");
});
const PORT = env.PORT;
app.listen(PORT, () => {
  console.log("server is listening on PORT : " + PORT);
});
