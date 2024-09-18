import { Route, Outlet, Routes } from "react-router-dom";
import { AllPosts } from "../components/AllPosts";
import { NavBar } from "../components/nav/NavBar";
import { useState, useEffect } from "react";
import { Post } from "../components/Post";
import { Profile } from "../components/Profile"; 
import {NewPost} from "../components/NewPost"
import {MyPosts} from "../components/MyPosts"
import {EditPost} from "../components/EditPost"
import {Favorites} from "../components/Favorites"

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const localLearningUser = localStorage.getItem("learning_user");
    const learningUserObject = JSON.parse(localLearningUser);
    setCurrentUser(learningUserObject);
  }, []);

  return (
<Routes>
  <Route
    path="/"
    element={
      <>
        <NavBar currentUser={currentUser} />
        <Outlet />
      </>
    }
  >
    {/* Route for all posts */}
    <Route path="allPosts" element={<AllPosts />} />

    <Route path="myPosts" element={<MyPosts currentUser={currentUser}/>} />
    <Route path="edit/:postId" element={<EditPost currentUser={currentUser} />} />

    <Route path="newPost" element={<NewPost currentUser={currentUser} />} />

    <Route path="favorites" element={<Favorites currentUser={currentUser} />} />

    {/* Dynamic route for an individual post */}
    <Route path="post/:postId"  element={<Post currentUser={currentUser} />}  />
   
      {/* Nested route for viewing the author's profile */}
     <Route path="profile/:userId" element={<Profile currentUser={currentUser}/>} />
    </Route>
</Routes>
  );
};

{/* 
//    <Route path="login" element={<Login />} /> */}