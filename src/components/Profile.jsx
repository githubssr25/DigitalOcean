import { getAllTopics, addPost, getPostsByUserId, getUsersByUserId} from "../services/postService";
import { updateUser} from "../services/userService";
import { useEffect, useState } from "react";
import {Topics} from "../components/Topics";
import { useNavigate, Link } from 'react-router-dom';
import { useParams } from "react-router-dom";

export const Profile = ({ currentUser }) => {
  const { userId } = useParams(); // Grab the postId from the URL
  console.log("Profile received author from the Post:", currentUser);

  const [user, setUser] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userAuthor, setUserAuthor] = useState("");
  const [userCohortNumber, setUserCohortNumber] = useState(0);

  useEffect(() => {
    getUsersByUserId(userId).then((user) => {
      console.log("what are the users you get back in profile", user);
      setUser(user);
    });
    getPostsByUserId(userId).then((posts) => {
      console.log(
        "in profile useEffect what are posts from getPostsByUserId",
        posts
      );
      setUserPosts(posts);
    });
    setUserAuthor(user.name);  // Initialize author name
    setUserEmail(user.email);  // Initialize email
    setUserCohortNumber(user.cohort);  // Initialize cohort number
  }, []);

  useEffect(() => {
    if (parseInt(user.id) === parseInt(currentUser.id)) {
      setIsCurrentUser(true);
    } else {
      setIsCurrentUser(false);
    }
  }, [user, currentUser]);
  

  const EditedProfile = () => {
    if (isCurrentUser) {
      const editedProfile = {
        id: currentUser.id,
        name: userAuthor,
        email: userEmail,
        cohort: `Cohort ${userCohortNumber}`
      };
      updateUser(editedProfile).then(() => {
        console.log("Profile updated successfully.");
      }).catch(error => console.error("Error updating profile:", error));
    }
  };
 
  return (
    <div className="author-info">
      <article>
        <header>
          Author Name: {user.name}
          {isCurrentUser && (
            <>
              <label> Edit Current Author </label>
              <input
                type="text"
                value={userAuthor}
                onChange={(e) => {
                  setUserAuthor(e.target.value)
                }}
              />
            </>
          )}
        </header>
        <section>
          Email: {user.email}
          {isCurrentUser && (
            <>
              <label> Edit Current Email</label>
              <input
                type="text"
                value={userEmail}
                onChange={(e) => {
                  setUserEmail(e.target.value)
                }}
              />
            </>
          )}
        </section>
        <section>
          <span> Cohort Number: {user.cohort} </span>
          {isCurrentUser && (
            <>
            <label> Edit Current Cohort Number </label>
            <input 
            type="number"
            value={userCohortNumber}
            onChange={(e) => {
             setUserCohortNumber(e.target.value)
            }}
            />
            </>
          )
          }
        </section>
        <>
          {isCurrentUser && (
            <button onClick ={() => EditedProfile()}> Click Any Edits to Profile Info </button>
          )}
          </>
        <section>
          <span> number of posts written: {userPosts.length} </span>
        </section>
      </article>
    </div>
  );
};