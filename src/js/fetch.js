  // METHODS - HTTP REQUESTS
  const httpRequest = {
    update: function (id, update) {
      fetch(`http://localhost:3000/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json', // You may need to adjust the content type based on your application's needs
        },
        body: JSON.stringify(update) // If you have data to send in the request, it needs to be converted to a JSON string
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json(); // If you expect JSON data in the response
        })
        .then(data => {
          // Handle the response data here
        })
        .catch(error => {
          console.error('Error:', error);
        });
    },
    vote: function (scoreContianer, mode) {
      const postContainer = scoreContianer.parentElement.parentElement;
      let content;
      let change;
      let score = scoreContianer.innerText;
      mode === "upvote" ? (change = score++) : (change = score--);
      if (postContainer.childNodes[3].childNodes[1]) {
        content = postContainer.childNodes[3].childNodes[1];
      } else {
        content = postContainer.childNodes[3];
      }
      for (let x in comments) {
        if (comments[x].content === content) {
          comments[x].score = change;
        } else {
          for (let y in comments[x].replies[y]) {
            const reply = comments[x].replies[y];
            if ((reply.content = content)) {
              reply.score = change;
            }
          }
        }
      }
    },
    post: function (src) {
      const postData = src;
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      };
      // Possible put id here to insert new replies and replytoreplies to database
      fetch("http://localhost:3000/newPost", params).then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      });
    },
    delete: function (id) {
      const options = {
        method: "DELETE", // Use the DELETE HTTP method
        headers: {
          "Content-Type": "application/json", // Set the content type if needed
          // You may also need to include authentication headers or other headers here
        },
      };

      // Send the DELETE request
      fetch(`http://localhost:3000/delete/${id}`, options)
        .then((response) => {
          if (response.ok) {
            // Resource successfully deleted
            console.log("Resource deleted successfully");
          } else {
            // Handle error cases here
            console.error("Error deleting resource");
          }
        })
        .catch((error) => {
          console.error("Fetch error:", error);
        });
    },
  };