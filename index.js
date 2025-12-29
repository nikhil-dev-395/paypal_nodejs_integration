import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import env from "./env.js";
import { captureOrder, createOrder } from "./services/paypal.js";

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

app.get("/cancelUrl", (req, res) => {
  res.redirect("/");
});

app.get("/returnUrl", async (req, res) => {
  const orderId = req.query.token;
  if (!orderId) {
    throw new Error("orderId must be provided");
  }
  const valid = await captureOrder(orderId);
  console.log(valid.status==="COMPLETED");
  if (valid.status === "COMPLETED") {
    return res.send({ message: "wallet recharge was successful" });
  } else {
    return res.json({ message: "payment not proceed properly" });
  }
});

const PORT = env.PORT;
app.listen(PORT, () => {
  console.log("server is listening on PORT : http://localhost:" + PORT);
});
