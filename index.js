const express = require("express");
// Used to make api requests
const request = require("request-promise");

const app = express();
const PORT = process.env.PORT || 5000;

const apiKey = "76e52f0bee5f09ef1f27e6cd8da3c0a2";
const baseURL = `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

// allows app to parse json input
app.use(express.json());

// Root route
app.get("/", (req, res) => {
	res.send("Welcome to Amazon Scrapper API");
});

// Route from my api to fetch specific products
// : implies productID is dynamic
// GET Product Details
app.get("/products/:productId", async (req, res) => {
	const { productId } = req.params;

	try {
		const response = await request(
			`${baseURL}&url=https://www.amazon.ca/dp/${productId}`
		);
		res.json(JSON.parse(response));
	} catch (error) {
		res.json(error);
	}
});

// GET Product Reviews
app.get("/products/:productId/reviews", async (req, res) => {
	const { productId } = req.params;

	try {
		const response = await request(
			`${baseURL}&url=https://www.amazon.ca/product-reviews/${productId}`
		);
		res.json(JSON.parse(response));
	} catch (error) {
		res.json(error);
	}
});

// GET Product Offers
app.get("/products/:productId/offers", async (req, res) => {
	const { productId } = req.params;

	try {
		const response = await request(
			`${baseURL}&url=https://www.amazon.ca/gp/offer-listing/${productId}`
		);
		res.json(JSON.parse(response));
	} catch (error) {
		res.json(error);
	}
});

// GET Search Results
app.get("/search/:searchQuery", async (req, res) => {
	const { searchQuery } = req.params;

	try {
		const response = await request(
			`${baseURL}&url=https://www.amazon.ca/s?k=${searchQuery}`
		);
		res.json(JSON.parse(response));
	} catch (error) {
		res.json(error);
	}
});

// makes server listen on a specific port
app.listen(PORT, () => console.log(`Server Running on port ${PORT}`));
