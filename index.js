import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import env from "./env.js";
import { createOrder } from "./services/paypal.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("dev"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  return res.render("index");
});

app.get("/pay", async (req, res) => {
  try {
    const { amount = 10, currency = "USD" } = req.params;
    const response = await createOrder(amount, currency);
    console.log(response);
    res.redirect(response);
  } catch (error) {
    return res.statusCode(500).json({ error: error.message });
  }
});

app.get("/cancel-order", (req, res) => {
  res.redirect("/");
});


const PORT = env.PORT;
app.listen(PORT, () => {
  console.log("server is listening on PORT : http://localhost:" + PORT);
});
