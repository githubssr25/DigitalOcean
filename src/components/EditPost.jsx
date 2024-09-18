import {Link} from "react-router-dom"
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPostById, updatePost, getAllTopics} from "../services/postService";

export const EditPost = ({currentUser}) => {

    console.log("EditPost component mounted");

    const { postId } = useParams();  // Grab the postId from the URL
    console.log("Post ID in EditPost component:", postId);

const [editedPost, setEditedPost] = useState({});
const [yourTopic, setYourTopic] = useState('');
const [yourTitle, setYourTitle] = useState('');
const [yourBody, setYourBody] = useState('');
const [allTopics, setAllTopics] = useState([]);


useEffect( () => {
    getPostById(postId).then((data) => {
        setEditedPost(data);
        console.log("what is editedPost after call setEditedPost from useEffect", data);
        setYourTopic(data.topic);
        console.log("what is your topic now after useEffect", yourTopic);
        setYourTitle(data.title);
        setYourBody(data.body);
    });

    getAllTopics().then((topics) => {
        setAllTopics(topics);
        console.log("fetched all topics:", topics);
    })
}, [postId]);

//dont make dep array empty becasue what if user has 2 posts 
// they log in click on one then they want to get other well itll sitll display what it had upon first render
//if we odnt incldue thsi in the dep array 


//  "posts": [
    // {
    //     "id": 1,
    //     "title": "Understanding React Hooks",
    //     "body": "React hooks allow you to use state and lifecycle methods in functional components...",
    //     "date": "2024-09-01",
    //     "userId": 1,
    //     "topicId": 1
    //   },

const handleTopicChange = (event) => {
    const topicId = event.target.value;
    const ourTopic = allTopics.find((eachTopic) => eachTopic.id === topicId);
    setYourTopic(ourTopic);
}

const submitUpdatedPost = () => {
    const newEditedPost = {
        title: yourTitle,
        topic: yourTopic,
        content: yourBody,
        date: editedPost.date,
        userId: editedPost.userId,
        topicId: yourTopic.id
    };
updatePost(newEditedPost);
}
//we need to specify date userId topicId otherwise what we are udpating back to dB
// is ap ost with all those embedded objects we fetched not just the post with the stuff we want 

// SPREAD OPERATOR COPIES ALL PROP FROM ORIGINAL EDITED POST INCLUDED ALL THE ONES WE DONT WANT LIKE EMBEDDED OBJECTS
// SO IF WE WANT TO FILTER OUT EMBEDDED OBJECTS DONT USE THIS 



return (
    <div>
     <form className="editPost">
        <fieldset>
            <legend> Edit Post </legend>
            <label htmlFor="postTitle"> Post Title: </label>
            <input
            type="text"
            id="postTitle"
            value={yourTitle}
            onChange={(e) => setYourTitle(e.target.value)}
            />
            <label htmlFor="postContent">Post Content:</label>
            <input
            type="text"
            id="postContent"
            value={yourBody}
            onChange={(e) => setYourBody(e.target.value)}
            />
             <div className ="topics" >
                <label htmlFor="topic-selections" > Select a topic: </label>
                <select
                id="topic-selections"
                onChange={(e) => handleTopicChange(e)}
                >
                {allTopics.map((eachTopic) => {
                    return (
                        <option key={eachTopic.id} value={eachTopic.id}>
                            Topic Name: {eachTopic.name}
                        </option>
                    ) })
                }
                </select>
            </div>
        <button 
        type="button"
        onClick={(e) => {
            e.preventDefault();
            submitUpdatedPost();
        }}
        >
            Submit Updated Post
        </button>
        </fieldset>
     </form>
    </div>

)
}