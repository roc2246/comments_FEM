// Delete once data is on server
import data from "./data.json";
// ///////////////////////////////////

// async function fetchData() {
//     try {
//       const response = await fetch('data.json');

//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }

//       const data = await response.json();
//       // Use the fetched data here
//       console.log(data);
//     } catch (error) {
//       // Handle errors
//       console.error('Fetch error:', error);
//     }
//   }

//   // Call the function to retrieve the data
//   fetchData();

for (let comment in data.comments) {
    const container = document.querySelector("main");
  
    const post = data.comments[comment];
  
    if (post.replies.length > 0) {
    console.log(post);
      container.innerHTML += `${post.content} <br><br>`;
      for (let reply in post.replies) {
        container.innerHTML += `${post.replies[reply].content} <br><br><br>`;
      }
    } else {
      container.innerHTML += `${post.content} <br><br>`;
    }
  }
  