# Morrow Market

A responsive MERN e-commerce storefront starter built with React, Vite, Express, and MongoDB (Mongoose).

## Run locally

1. Install Node.js 18 or newer.
2. From this folder, run `npm install`.
3. Copy `server/.env.example` to `server/.env` if you want to use MongoDB. MongoDB is optional: the API serves its sample catalog when no database URL is configured.
4. Run `npm run dev` and open [http://localhost:5173](http://localhost:5173).

The API runs on port 5000. Set `MONGODB_URI` in `server/.env` to connect a MongoDB database. Use `npm run build` to build the client for deployment.

## Deploy

Deploy the React client to Vercel or Netlify and the Express API to Render or Railway. Set `VITE_API_URL` to the deployed API URL in the client build environment and set `MONGODB_URI` on the API service. Keep secrets in deployment environment settings; never commit `.env` files.

The checkout button is a demo interaction. Connect a payment provider and add order persistence before accepting real payments.
