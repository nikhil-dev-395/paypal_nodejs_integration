import { generateAuthToken } from "../services/paypal.js";

(async () => {
  const token = await generateAuthToken();
  console.log(token);
})();
