import { getAllTopics, addPost} from "../services/postService";
import { useEffect, useState } from "react";
import {Topics} from "../components/Topics";
import { useNavigate } from 'react-router-dom';


export const NewPost = ({currentUser}) => {
    const [topics, setTopics] = useState([]);
    const [indTopic, setTopic] = useState({});
    const [postTitle, setPostTitle] = useState('');
    const [postBody, setPostBody] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        getAllTopics().then((topics) => {
            setTopics(topics);
        });
    }, []);

const processTopicNewPost = (topic) => {
    console.log("Selected topic:", topic);  // Add this log
    setTopic(topic);
}

const sendNewPost = () => {
    console.log("Attempting to send post with the following details:");
    console.log("Title:", postTitle);
    console.log("Body:", postBody);
    console.log("Selected topic:", indTopic);
    console.log("User ID:", currentUser.id);

    if (!indTopic.id) {
        console.error("No topic selected");
        return;
      }

    const newPost = {
        title: postTitle,
        body: postBody,
        date: new Date().toISOString().split('T')[0],
        userId: currentUser.id,
        topicId: indTopic.id
    }
addPost(newPost)
.then((response) => {
    console.log("post successful added", response.json());
    navigate('/myPosts')
//MUST PUT I IN THE .THEN() YOU DONT WANT TO CALL THIS NAVIGATE UNTIL AFTER POST HAS SUCCESSFULLY BEEN ADDED
// YOU NED TO WAIT DONT WANT TO IMMEADIATELY TRIGGER. ONLY NAVIGATE AFTER POST SUCCESSFULLY ADDED
// IE THE PROMISE RESOLVES. 
})
.catch((error) => {
    console.error("error happend adding post", error);
})



}


    return (
        <div>
            <form className="newPost">
            <h2> Create New Post </h2>
            <div className="form-title">
                <label>
                Post Title:
                <input
                type="text"
                id="postTitle"
                value={postTitle}
                onChange={(e) => setPostTitle(e.target.value)} 
                />  
                </label>
                Set your Body
                <label>
                <input
                type="text"
                id="postBody"
                value={postBody}
                onChange={(e) => setPostBody(e.target.value)} 
                />  
                </label>
                <div>
                <h3> Select a topic  </h3>
                <Topics topics={topics} processTopicNewPost={processTopicNewPost}/>
                </div>
                <div>
                <button onClick={(e) => {e.preventDefault(); sendNewPost();}} > Submit Post </button>
                </div>
            </div>
            </form>
        </div>
    )

}


//     "id": 7,
//     "title": "Introduction to CSS Grid Layout",
//     "body": "CSS Grid is a two-dimensional layout system for the web...",
//     "date": "2024-07-28",
//     "userId": 7,
//     "topicId": 4