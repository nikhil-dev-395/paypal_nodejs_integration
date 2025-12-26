/**
 * authentication
 */

import axios from "axios";
import env from "../env";
const generateAuthToken = async () => {
  try {
    const response = await axios({
      url: `${process.env.PAYPAL_BASE_URL}/v1/oauth2/token`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      auth: {
        username: env.PAYPAL_CLIENT_ID,
        password: env.PAYPAL_CLIENT_SECRET,
      },
      data: "grant_type=client_credentials",
    });

    return response.data.access_token;
  } catch (error) {
    console.log(error);
  }
};
