import { getUserPostLikesByUserId, getUPLikesForFavorite, deleteLikeService} from "../services/postService";
import { useEffect, useState } from "react";
import {Topics} from "../components/Topics";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

export const Favorites = ({currentUser}) => {
    console.log("rendering favorites");
    console.log("Current User:", currentUser);
    const navigate = useNavigate();  // To detect if we navigated back
    const [UPLikes, setUPLikes] = useState([]);

  // Function to refresh the user's liked posts
  const triggerRefresh = () => {
    if (currentUser) {
      console.log("User ID:", currentUser.id);
      getUserPostLikesByUserId(currentUser.id)
        .then((UPLikeResponse) => {
        //   console.log("User Post Likes Response:", UPLikeResponse);

          let urlString = createStringForPostsFromUPLikes(UPLikeResponse);
        //   console.log("What is this url string before we try to use it:", urlString);

          getUPLikesForFavorite(urlString)
            .then((ourLikes) => {
              setUPLikes(ourLikes);
            //   console.log("What is UP likes right after useEffect:", ourLikes);
            });
        })
        .catch(error => console.error('Error:', error));
    }
  };

  // Fetch the likes when the component mounts or whenever navigation changes
  useEffect(() => {
    console.log("Triggering refresh due to navigation");
    triggerRefresh();
  }, [navigate]);  // Trigger re-fetch on navigation
//returns something like this
//[
//     { "id": 1, "userId": 1, "postId": 1 },
//     { "id": 21, "userId": 1, "postId": 9 }
//   ]
  


const createStringForPostsFromUPLikes = (UPLikes) => {
    // console.log("what is UPLikes before we go create a string", UPLikes);

const postIDs = UPLikes.map((eachUP) => {
    return eachUP.postId; 
})
let urlString = `http://localhost:8088/posts?`
postIDs.forEach((eachID) => {
    urlString += `id=${eachID}&`
})
// urlString = urlString.slice(0, -1); //removes last character from string which for us is extra &
//The -1 excludes the last character from the result.
//so in our slice we are slicing the whole thing minus the last character and returning that slice

urlString += `_embed=userPostsLikes`
//ex of string http://localhost:8088/posts?id=1&id=9&_embed=userPostsLikes
return urlString;
}
//ex of structure we get back here 
//[
    // {
    //     "id": 1,
    //     "title": "Post 1",
    //     "body": "This is post 1",
    //     "userId": 1,
    //     "topicId": 1,
    //     "userPostsLikes": [
    //       { "id": 1, "userId": 1, "postId": 1 },
    //       { "id": 2, "userId": 2, "postId": 1 }
    //     ]
    //   },

    const deleteLike = (postId) => {
        deleteLikeService(postId, currentUser.id).then(() => {
          // Trigger a refresh of likes after deletion
          triggerRefresh();  // Call the refresh function to reload the likes
        }).catch(error => console.error('Error deleting like:', error));
      };


    return (
        <div>
            { UPLikes && UPLikes.length > 0 && (
            UPLikes.map((eachLike) => {
                return (
                <div key={eachLike.id}>
                    <section>
                    <header>
                        <Link to={`/post/${eachLike.id}`}>
                        <h2> Section Title {eachLike.title} </h2>
                        </Link>
                    </header>
                </section>
                <button onClick={() => deleteLike(eachLike.id)}> 
                Click to Remove Like 
                    </button>
                </div>
                );
            })
        )}
        </div>
    )
    

}