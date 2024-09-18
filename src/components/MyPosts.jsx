import { getPostsByUserId, deletePostService} from "../services/postService";
import { useEffect, useState } from "react";
import {Link} from "react-router-dom"
import { useNavigate } from "react-router-dom";


export const MyPosts = ({currentUser}) => {

  const navigate = useNavigate();


    console.log('MyPosts component mounted');  // <-- Add this here

    const [myPosts, setMyPosts] = useState([]);


    useEffect(() => {
        if (currentUser && currentUser.id) {
          getPostsByUserId(currentUser.id)
            .then((posts) => {
              console.log("Posts fetched:", posts);
              setMyPosts(posts);
            });
        } else {
          console.log("No currentUser or user ID found");
        }
      }, [currentUser]);


const deletePost = (postId) => {
deletePostService(postId).then((deletedPost) => {
  const updatedPosts = myPosts.filter(post => post.id !== postId);
  setMyPosts(updatedPosts);
  console.log("deletedpost successfully deleted", deletedPost, deletedPost.json());
})
.catch((error) => {
  console.error("error happened deleting post", error);
})
}

return (
        <div>
        <div className="myPosts">
        {myPosts.map((eachPost) => {
            return (
            <div key={eachPost.id}>
          <Link to={`/post/${eachPost.id}`}>
          <h3> {eachPost.title} </h3>
          </Link>
        <button 
        className="btn-myPost" 
        onClick={() => deletePost(eachPost.id)} 
        > 
        Delete This Post
        </button>

        <button 
              className="btn-edit"
              onClick={() => navigate(`/edit/${eachPost.id}`)}  // This triggers navigation
            >
              Edit this post
            </button>
        </div>
            );
        })}
      </div>
    </div>
)

}

//  <button 
// className="btn-edit"
// >
// <Link to={`/myPosts/edit/${eachPost.id}`}>
// <h3> {eachPost.title} </h3>
//   </Link>
//   Edit this post 
// </button>