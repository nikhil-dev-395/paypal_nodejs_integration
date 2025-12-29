/**
 * authentication
 */

import axios from "axios";
import env from "../env.js";
export const generateAuthToken = async () => {
  try {
    const response = await axios({
      method: "post",
      url: `${env.PAYPAL_BASE_URL}/v1/oauth2/token`,
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

/***
 * create order - for this i referred following
 * https://developer.paypal.com/docs/api/orders/v2/
 * /POST
 * **/

export const createOrder = async (amount = 10, currency = "USD") => {
  try {
    const token = await generateAuthToken();
    const order = await axios({
      method: "post",
      url: `${env.PAYPAL_BASE_URL}/v2/checkout/orders`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: {
        intent: "CAPTURE",

        purchase_units: [
          {
            items: [
              {
                name: "recharge",
                description: "update wallet balance",
                quantity: "1",
                unit_amount: {
                  currency_code: currency,
                  value: amount.toFixed(2),
                },
              },
            ],
            amount: {
              currency_code: currency,
              value: amount.toFixed(2),
              breakdown: {
                item_total: {
                  currency_code: currency,
                  value: amount.toFixed(2),
                },
              },
            },
          },
        ],

        application_context: {
          payment_method_preference: "IMMEDIATE_PAYMENT_REQUIRED",
          landing_page: "BILLING",
          user_action: "PAY_NOW",
          shipping_preference: "NO_SHIPPING",
          brand_name: "web.com",
          return_url: `${env.CLIENT_BASE_URL}/returnUrl`,
          cancel_url: `${env.CLIENT_BASE_URL}/cancelUrl`,
        },
      },
    });
    console.log(order.data.links.find((link) => link.rel === "approve").href);
    return order.data.links.find((link) => link.rel === "approve").href;
  } catch (error) {
    console.log(error);
  }
};

// createOrder();
export const captureOrder = async (orderId) => {
  try {
    const token = await generateAuthToken();
    const order = await axios({
      method: "post",
      url: `${process.env.PAYPAL_BASE_URL}/v2/checkout/orders/${orderId}/capture`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: {},
    });

    console.log(order.data.status);

    return order.data;
  } catch (error) {
    console.log(error);
  }
};
