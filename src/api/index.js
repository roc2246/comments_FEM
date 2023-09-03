const { MongoClient } = require("mongodb");
const http = require("http");
require("dotenv").config();

// MongoDB connection URL
const url = process.env.MONGODB_URI;

// Database and collection names
const dbName = "comments"; // Change this to your database name
const collectionName = {
  comments: "comments",
  userName: "user",
  combined: "combined",
}; // Change this to your collection name

// Create a function to connect to the MongoDB database
async function connectToDB(collectionParam) {
  try {
    const client = new MongoClient(url);

    // Connect to the MongoDB server
    await client.connect();

    // Access the database
    const db = client.db(dbName);

    // Access the collections
    const collection = db.collection(collectionParam);

    // Make a GET request (find documents)
    const query = {}; // You can specify a query here if needed
    const documents = await collection.find(query).toArray();

    // Close the connection
    client.close();

    return documents;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

// Opens CORS policy
function CORS(response) {
  // Enable CORS for all routes
  // Set CORS headers to allow requests from any origin (you can specify specific origins if needed)
  response.setHeader("Access-Control-Allow-Origin", "*");

  // Define which HTTP methods are allowed
  response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");

  // Define which HTTP headers can be included in the actual request
  response.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );

  // Allow credentials (e.g., cookies) to be sent cross-origin
  response.setHeader("Access-Control-Allow-Credentials", "true");
}

// Create an HTTP server
const server = http.createServer(async (req, res) => {
  CORS(res);

  if (req.method === "GET") {
    if (req.url === "/comments") {
      try {
        // Call the connectToDB function to retrieve comment data
        const data = await connectToDB(collectionName.comments);

        // Set the response headers
        res.writeHead(200, { "Content-Type": "application/json" });

        // Send the JSON response
        res.end(JSON.stringify(data));
      } catch (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal Server Error");
      }
    } else if (req.url === "/currentUser") {
      try {
        // Call the connectToDB function to retrieve user data
        const data = await connectToDB(collectionName.userName);

        // Set the response headers
        res.writeHead(200, { "Content-Type": "application/json" });

        // Send the JSON response
        res.end(JSON.stringify(data));
      } catch (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal Server Error");
      }
    } else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not Found");
    }
  } else if (req.method === "POST") {
    // ... (existing POST route logic)
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

// Start the HTTP server on port 3000
const port = 3000; // Change this to your desired port number
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});