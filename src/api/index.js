const { MongoClient } = require('mongodb');
const http = require('http');
const cors = require('cors'); // Import the cors package
require('dotenv').config();

// MongoDB connection URL
const url = process.env.MONGODB_URI

// Database and collection names
const dbName = 'comments'; // Change this to your database name
const collectionName = 'comments'; // Change this to your collection name

// Create a function to connect to the MongoDB database
async function connectToDB() {
  try {
    const client = new MongoClient(url);
    
    // Connect to the MongoDB server
    await client.connect();
    
    // Access the database
    const db = client.db(dbName);
    
    // Access the collection
    const collection = db.collection(collectionName);
    
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

// Create an HTTP server
const server = http.createServer(async (req, res) => {
  // Enable CORS for all routes
  cors()(req, res, () => {});

  if (req.method === 'GET' && req.url === '/data') {
    try {
      // Call the connectToDB function to retrieve data
      const data = await connectToDB();
      
      // Set the response headers
      res.writeHead(200, { 'Content-Type': 'application/json' });
      
      // Send the JSON response
      res.end(JSON.stringify(data));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error');
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

// Start the HTTP server on port 3000
const port = 3000; // Change this to your desired port number
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});