
import {Link} from "react-router-dom"
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPostById, addPostLike, updatePost} from "../services/postService";
import { useNavigate } from "react-router-dom"

export const Post = ({currentUser}) => {
    const { postId } = useParams();  // Grab the postId from the URL
    console.log("Post ID in Post component:", postId);
    const [postDetails, setPostDetails] = useState(null);
    const [likeCount, setLikeCount] = useState(0);

    const navigate = useNavigate()

    console.log("what is value of currentUser", currentUser);

    useEffect(() => {
        // Debug: Ensure postId is available and correct
        console.log("Post ID in Post component:", postId);
    
        if (postId) {
          getPostById(postId).then((details) => {
            // Debug: Check if API returns the correct details
            console.log("Fetched post details:", details);
    
            if (details) {
              setPostDetails(details);
    
              // Calculate likes if userPostsLikes exists
              if (details.userPostsLikes) {
                setLikeCount(details.userPostsLikes.length);
              }
            } else {
              console.log("No post details found for postId:", postId);
            }
          });
        }
      }, [postId]);

      const addLikeToDB = () => {
        const newUserPostLikes = {
            userId: currentUser.id,
            postId: parseInt(postId)
        }
        console.log("what is this newUserPostLikes we are adding ot the DB", newUserPostLikes);
        addPostLike(newUserPostLikes).then(() => {
            setLikeCount(prevCount => prevCount +1);
        });
        navigate("/favorites")

      }

      const editPost = (event) => {
        const updatedPost = {...postDetails, body: event.target.value}
        setPostDetails(updatedPost);
      }

      const saveEditedPost = () => {
        updatePost(postDetails);
      }
  
      return (
        <div className="post">
          {postDetails === null ? (
            <div>Waiting for post details...</div>  // Display this message while waiting for data
          ) : (
            <article key={postDetails.id}>
              <header>
                <h3>Post Title: <strong>{postDetails.title}</strong></h3>
                <p>Post Body: {postDetails.body}</p>
              </header>
      
              {/* Author and Date section */}
              <section>
                <Link to={`/profile/${postDetails.user.id}`}>
                <p>Author: {postDetails.user.name}</p>
                </Link>
                <p>Email: {postDetails.user.email}</p>
                <p>Topic: {postDetails.topic.name}</p>
                <p>Date: <span>{postDetails.date}</span></p>
              </section>
      
              <footer>
                <p>Post Likes: {likeCount}</p>
                {parseInt(currentUser.id) !== parseInt(postDetails.user.id) ? (
           <button className="btn btn-secondary" onClick={addLikeToDB}> Click to Like</button>
       ) : (
           <div className="form-group">
            <label> Edit Post </label>
            <input
            type="text"
            value={postDetails.body}
            onChange={editPost}
            />
            <button onClick={saveEditedPost}> Edit Post </button>

            </div>
       )}
              </footer>
            </article>
          )}
        </div>
      );
      
};