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
  GET: async function (res, col) {
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
  POST: async function (req, res, col) {
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
          let result;
          if (commentData.replyingTo === undefined) {
            result = await collection.insertOne(commentData);
          } else {
            let query;
            if (commentData.parentUser === undefined) {
              query = { "user.username": commentData.replyingTo };
            } else {
              query = { "user.username": commentData.parentUser };
            }
            const update = {
              $push: { replies: commentData },
            };
            result = await collection.updateOne(query, update);
          }

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
  PUT: async function (req, res, documentId) {
    try {
      let incomingData = "";
      req.on("data", (chunk) => {
        incomingData += chunk.toString("utf8");
      });

      req.on("end", async () => {
        try {
          const updatedData = JSON.parse(incomingData);

          const db = await connectToDB();
          const collection = db.collection(collectionName.comments);

          let isComment = false;
          let filter = { id: parseInt(documentId) };;
          const findComment = await collection.find(filter).toArray();
          if (findComment.length > 0) {
            isComment = true;
          }

          let update;
          if (isComment === true) {
            filter = { id: parseInt(documentId) };
            update = { $set: { content: updatedData.content } };
          } else {
            filter = { "replies.id": parseInt(documentId) };
            update = { $set: { "replies.$.content": updatedData.content } };
          }

          const result = await collection.updateOne(filter, update);

          console.log(documentId)
          if (result.matchedCount === 1 && result.modifiedCount === 1) {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(
              JSON.stringify({
                success: true,
                message: "Document updated successfully",
              })
            );
          } else {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(
              JSON.stringify({
                success: false,
                message: "Document not found or not updated",
              })
            );
          }
        } catch (error) {
          console.error("Error while processing the PUT request:", error);
          res.writeHead(400, { "Content-Type": "text/plain" });
          res.end("Bad Request: " + error.message);
        }
      });
    } catch (err) {
      console.error("Error while handling PUT request:", err);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Internal Server Error");
    }
  },
  DELETE: async function (res, col, documentId) {
    try {
      const db = await connectToDB();
      const collection = db.collection(collectionName[col]);

      let isComment = false;

      const query = { id: parseInt(documentId) };
      const findComment = await collection.find(query).toArray();
      if (findComment.length > 0) {
        isComment = true;
      }

      async function deleteComment() {
        const result = await collection.deleteOne({
          id: parseInt(documentId),
        });

        console.log(result);
        console.log(documentId);
        if (result.deletedCount === 1) {
          console.log("Comment deleted successfully");
          res.writeHead(204);
          res.end();
        } else {
          console.log("Comment not found");
          res.writeHead(404, { "Content-Type": "text/plain" });
          res.end("Comment not found");
        }
      }

      async function deleteReply() {
        const query = { "replies.id": parseInt(documentId) };
        const update = {
          $pull: { replies: { id: parseInt(documentId) } },
        };

        const result = await collection.updateOne(query, update);

        if (result.modifiedCount === 1) {
          console.log("Reply deleted successfully.");
          res.writeHead(204);
          res.end();
        } else {
          console.log("Reply not found");
          res.writeHead(404, { "Content-Type": "text/plain" });
          res.end("Reply not found");
        }
      }

      isComment === true ? deleteComment() : deleteReply();
    } catch (err) {
      console.error("Error:", err);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Internal Server Error");
    }
    isComment = false;
  },
};

// Create an HTTP server
const server = http.createServer(async (req, res) => {
  // CORS(res);
  cors()(req, res, async () => {
    if (req.method === "GET") {
      if (req.url === "/comments") {
        controller.GET(res, "comments");
      } else if (req.url === "/currentUser") {
        controller.GET(res, "userName");
      } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Not Found");
      }
    } else if (req.method === "POST") {
      if (req.url === "/newPost") {
        controller.POST(req, res, "comments");
      } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Not Found");
      }
    } else if (req.method === "PUT") {
      if (req.url.startsWith("/update/")) {
        const documentId = req.url.split("/").pop();
        controller.PUT(req, res, documentId);
      } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Not Found");
      }
    } else if (req.method === "DELETE") {
      if (req.url.startsWith("/delete/")) {
        const documentId = req.url.split("/").pop();
        controller.DELETE(res, "comments", documentId);
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
