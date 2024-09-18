import { useEffect, useState } from "react";
import { getAllPosts } from "../services/postService";
import { Post } from "../components/Post";
import { FilteredPosts } from "../components/FilteredPosts";
import { Link } from "react-router-dom";

export const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [filteredPosts, setFilteredPosts] = useState([]);
  useEffect(() => {
    console.log("Fetching posts...");
    getAllPosts()
      .then((thePosts) => {
        console.log("Posts fetched successfully:", thePosts); // Log the fetched posts
        setPosts(thePosts); // Set the posts in state
      })
      .catch((error) => {
        console.error("Error while fetching posts:", error); // Log the error
      });
  }, []);
  

  const getAndSetAllPosts = () => {
    getAllPosts().then((thePosts) => {
        setPosts(thePosts);
    })
  };
  

  // More descriptive function to handle filtered posts
  const applyFilteredPosts = (filteredPosts) => {
    setFilteredPosts(filteredPosts); // Update filtered posts
    setIsFiltered(true); // Flag to indicate filtering happened
  };
  return (
    <div>
      <div className="posts">
        {!isFiltered
          ? posts.map((eachPost) => {
              let likeCount = 0;
              if (eachPost.userPostsLikes) {
                likeCount = eachPost.userPostsLikes.length;
              }
              return (
                <div key={eachPost.id}>
                <Link to={`/post/${eachPost.id}`}>
                  <h3>{eachPost.title}</h3>
                </Link>
                <p>{eachPost.body}</p>
                <p>Likes: {likeCount}</p>
              </div>
              );
            })
          : filteredPosts.map((eachPost) => {
              let likeCount = 0;
              if (eachPost.userPostsLikes) {
                likeCount = eachPost.userPostsLikes.length;
              }
              return (
                <div key={eachPost.id}>
                  <Link to={`/post/${eachPost.id}`}>
                    <h3>{eachPost.title}</h3>
                  </Link>
                  <p>{eachPost.body}</p>
                  <p>Likes: {likeCount}</p>
                </div>
              );
            })}
      </div>
      {posts.length > 0 && (
        <FilteredPosts postsInput={posts} onFilterPosts={applyFilteredPosts} />
      )}
    </div>
  );
};







//            console.log("what is value of posts", thePosts);

// posts.forEach((post) => {
//     if(post.userPostLike){
//         likeCount += post.userPostLike.length;
//     }
//     });

//       console.log("rendering each post inside map", eachPost);
//   console.log("what is likeCount and eachPost.userPostLike.length", likeCount, eachPost.userPostsLikes.length);
