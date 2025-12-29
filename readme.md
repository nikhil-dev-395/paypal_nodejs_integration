# PayPal Node.js REST API Example

This is a simple Node.js example showing how to integrate **PayPal Orders API v2** without using the deprecated SDK.
It demonstrates how to generate access tokens, create orders, and capture payments using the REST API.

---

## Why this example?

The old PayPal Node.js SDK is **deprecated**, and all modern integrations should use the **REST API**.
This example helps developers quickly understand how to do that in Node.js.

---

## Features

- Generate PayPal access tokens
- Create PayPal orders with custom amount and currency
- Capture payments
- Simple and easy to understand code

---

## Prerequisites

- Node.js
- npm
- PayPal sandbox account (or live account for production)

---

## Setup

1. Clone the repo:

```bash
git clone https://github.com/nikhil-dev-395/paypal_nodejs_integration
cd paypal_nodejs_integration

```
2. create .env file with following variables
```bash
PORT=3000
NODE_ENV="development"
PAYPAL_CLIENT_SECRET=""
PAYPAL_CLIENT_ID=""
PAYPAL_BASE_URL=""
```

*add your env details*

3. package installation and running server
```bash
npm i
npm run dev
```
*or*
```bash
npm  start
```
