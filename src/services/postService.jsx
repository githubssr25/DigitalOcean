export const getAllPosts = () => {

// return fetch('http://localhost:8088/posts?_expand=topic&_expand=user&_embed=userPostsLikes')
//    .then(response => {

    return fetch('http://localhost:8088/posts?_expand=user&_expand=topic')
    .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log("Fetched posts data:", data);
    return data;
  })
  .catch(error => {
    console.error("Error fetching posts:", error);
  });
};

export const getAllTopics = () => {
    return fetch('http://localhost:8088/topics')
    .then(response => response.json())
    .then(data =>{
        console.log("fetched topics", data);
        return data;
    })
}



// postService.jsx

export const getPostById = (postId) => {
    return fetch(`http://localhost:8088/posts/${postId}?_expand=topic&_expand=user&_embed=userPostsLikes`)
      .then((response) => response.json())
      .then((data) => {
        console.log("API Response for Post ID:", postId, data);
        return data;
      });
  };

  //first part of how to get favorites gets back 
//   [
//     { "id": 1, "userId": 1, "postId": 1 },
//     { "id": 21, "userId": 1, "postId": 9 }
//   ]
  
export const getUserPostLikesByUserId = (userId) => {
    const url = `http://localhost:8088/userPostsLikes?userId=${userId}`;
    // console.log("Fetching likes for user with URL:", url);

    return fetch(url)
    .then((response) => response.json())
    .then((data) => {
        return data;
    })
    .catch((error) => {
        console.error("Error fetching user likes:", error);
    });
}

export const getUPLikesForFavorite = (urlString) => {
    console.log("what is the url we are passing in service for getUPLikesForFavorite", urlString);
    return fetch(urlString)
    .then((response) => response.json())
    .then((data) => {
        // console.log("response in post service for getUPLikesForFavorite", data);
        return data;
    })
}

 
export const addPostLike = (newUserPostLikes) => {
    return fetch(`http://localhost:8088/userPostsLikes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newUserPostLikes)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to add like. Please check the server and request.');
        }
        return response.json();
    })
    .then(data => {
        console.log("Successfully added like:", data);
        return data;  // This is the newly created like entry in the database
    })
    .catch(error => {
        console.error("Error while adding like:", error);
    });
};


export const updatePost = (post) => {
    return fetch(`http://localhost:8088/posts/${post.id}` , {
    method: "PUT",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
})
}

export const addPost = (newUserPost) => {
    return fetch(`http://localhost:8088/posts`, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
        },
        body: JSON.stringify(newUserPost)
    })
}

export const deletePostService = (postId) => {
    return fetch(`http://localhost:8088/posts/${postId}`, {
        method: "DELETE",
        headers: {
            "Content-Type" : "application/json",
        }
    });
}

export const deleteLikeService = (postId, userId) => {
    return fetch(`http://localhost:8088/userPostLikes?userId=${parseInt(userId)}&postId=${parseInt(postId)}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Failed to delete like.");
      }
      return response.json();
    }).catch(error => {
      console.error("Error while deleting like:", error);
    });
  };
  



export const getPostsByUserId = (userId) => {
    return fetch(`http://localhost:8088/posts?userId=${userId}`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        return data;
    })

}

export const getUsersByUserId = (userId) => {
    return fetch(`http://localhost:8088/users/${userId}`)
    .then(response => response.json())
    .then(data => {
        console.log("what is data from getUsersByUserId in post service", data);
        return data;
    })
}


//ex
// [
//     {
//       "id": 1,
//       "title": "Understanding React Hooks",
//       "userPostLike": [
//         { "userId": 2, "postId": 1 },
//         { "userId": 3, "postId": 1 }
//       ]
//     },
//     {
//       "id": 2,
//       "title": "Mastering JavaScript Closures",
//       "userPostLike": [
//         { "userId": 1, "postId": 2 }
//       ]
//     }
//   ]

//this is response 
// {
//     "ok": true,
//     "status": 200,
//     "statusText": "OK",
//     "headers": {
//       "content-type": "application/json"
//     },
//     "body": ReadableStream, // This is the raw response body
//     "url": "http://localhost:8088/posts?_embed=userPostLike",
//     "json": function json() { [native code] }  // Method to extract JSON
//   }

//this is response.json 
// [
//     {
//       "id": 1,
//       "title": "Understanding React Hooks",
//       "userPostLike": [
//         { "userId": 2, "postId": 1 },
//         { "userId": 3, "postId": 1 }
//       ]
//     },
//     {
//       "id": 2,
//       "title": "Mastering JavaScript Closures",
//       "userPostLike": [
//         { "userId": 1, "postId": 2 }
//       ]
//     }
//   ]

// this is data
// [
//     {
//       id: 1,
//       title: "Understanding React Hooks",
//       userPostLike: [
//         { userId: 2, postId: 1 },
//         { userId: 3, postId: 1 }
//       ]
//     },
//     {
//       id: 2,
//       title: "Mastering JavaScript Closures",
//       userPostLike: [
//         { userId: 1, postId: 2 }
//       ]
//     }
//   ]
  