export const getAllPosts = () => {
   return fetch('http://localhost:8088/posts?_embed=userPostLike')
    .then(response => response.json())
    .then(data => {
        console.log(data)
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
  