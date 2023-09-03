const { MongoClient, ObjectId } = require("mongodb");
const http = require("http");
require("dotenv").config();

const cors = require("cors");

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
async function connectToDB() {
  try {
    const client = new MongoClient(url);

    // Connect to the MongoDB server
    await client.connect();

    // Access the database
    const db = client.db(dbName);

    return db; // Return the database connection
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

const controller = {
  GET: async function(res, col){
    try {
      // Call the connectToDB function to retrieve comment data
      const data = await connectToDB();
  
      // Access the "comments" collection from the database connection
      const collection = data.collection(collectionName[col]);
  
      // Make a GET request (find documents)
      const query = {}; // You can specify a query here if needed
      const documents = await collection.find(query).toArray();
  
      // Set the response headers
      res.writeHead(200, { "Content-Type": "application/json" });
  
      // Send the JSON response
      res.end(JSON.stringify(documents));
    } catch (err) {
      console.error("Error while processing the GET request:", err);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Internal Server Error");
    }
  },
  POST: async function(req, res, col){
    try {
      // Extract the incoming data from the request
      let incomingData = "";
      req.on("data", (chunk) => {
        incomingData += chunk.toString("utf8");
      });

      req.on("end", async () => {
        try {
          // Parse the incoming JSON data
          const commentData = JSON.parse(incomingData);

          // Call the connectToDB function to get the "comments" collection
          const data = await connectToDB();

          // Access the "comments" collection from the database connection
          const collection = data.collection(collectionName[col]);

          // Insert the comment data into the "comments" collection
          const result = await collection.insertOne(commentData);

          // Set the response headers
          res.writeHead(201, { "Content-Type": "application/json" });

          // Send a JSON response with the result (e.g., the inserted comment data)
          res.end(JSON.stringify(result));
        } catch (error) {
          console.error("Error while processing the POST request:", error);
          res.writeHead(400, { "Content-Type": "text/plain" });
          res.end("Bad Request: " + error.message);
        }
      });
    } catch (err) {
      console.error("Error while handling POST request:", err);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Internal Server Error");
    }
  },
  DELETE: async function (res, col, documentId) {
    try {
      // Call the connectToDB function to retrieve the database connection
      const db = await connectToDB();
      // Access the specified collection from the database connection
      const collection = db.collection(collectionName[col]);
  
      // Perform the DELETE operation
      const result = await collection.findOneAndDelete({ id: parseInt(documentId)});
  
      if (result) {
        console.log('Document deleted successfully');
        res.writeHead(204); // Send a 204 (No Content) response for successful deletion
        res.end();
      } else {
        console.log('Document not found');
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Document not found');
      }
    } catch (err) {
      console.error('Error:', err);
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error');
    }
  }
}
  


// Create an HTTP server
const server = http.createServer(async (req, res) => {
  // CORS(res);
  cors()(req, res, async () => {
    if (req.method === "GET") {
      if (req.url === "/comments") {
        controller.GET(res, "comments")
      } else if (req.url === "/currentUser") {
        controller.GET(res, "userName")
      } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Not Found");
      }
    } else if (req.method === "POST") {
      if (req.url === "/comments") {
       controller.POST(req, res, "comments")
      } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Not Found");
      }
    }  else if (req.method === "DELETE") {
      if (req.url.startsWith('/delete/')) {
        const documentId = req.url.split('/').pop();
        controller.DELETE(res, 'comments', documentId);
      } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Not Found");
      }
    }
  });
});

// Start the HTTP server on port 3000
const port = 3000; // Change this to your desired port number
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
