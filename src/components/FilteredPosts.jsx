import {useEffect, useState} from "react"
import {getAllPosts} from "../services/postService"
import {Post} from "../components/Post"

export const FilteredPosts = ({postsInput, onFilterPosts}) => {

const [filteredTopicPosts, setFilteredTopicPosts] = useState([]);
const [filteredSearchPosts, setFilteredSearchPosts] = useState([]);
const [inputTopic, setInputTopic] = useState('');
const [didItFilter, setDidItFilter] = useState(false);

useEffect(() => {
    if(postsInput){
    setFilteredTopicPosts(postsInput);
    setFilteredSearchPosts(postsInput);
    }
}, []);
const handleSubmitTopic = (e) => {
    setInputTopic(e.target.value);
}

const handleFilterTopicButtonClick = () => {
    console.log("Entered handleFilterTopicButtonClick method");
    console.log("postsInput:", postsInput);
    console.log("inputTopic:", inputTopic);

    if (postsInput) {
        const filteredTopic = filteredTopicPosts.filter((post) => {
            return post.topic.name.toLowerCase().includes(inputTopic.toLowerCase());
        });

        console.log("Filtered posts:", filteredTopic);
        onFilterPosts(filteredTopic); //from the parent 
        setFilteredTopicPosts(filteredTopic);
        setDidItFilter(true);
        console.log("what is value now of didItFilter", didItFilter);
    } 
    }

return (
    <div>
        <div>
        <div className="filterByTopic">
        <form onSubmit={(e) => e.preventDefault()}>
            <label> Filter by Topic </label>
            <input 
            type="text"
            id="topic"
            name="topic"
            value={inputTopic}
            onChange={handleSubmitTopic}
            />
        </form>
        <button type="submit" onClick={handleFilterTopicButtonClick}> Submit for Filter By Topic </button>
        </div>
    </div>
    </div>
)
}


//   const foundTickets = allTickets.filter((ticket) => 
//     ticket.description.toLowerCase().includes(searchTerm.toLowerCase())
// );

// useEffect(() => {
// getAllPosts.then((thePosts) => {
//     const filteredPosts = thePosts.filter((post) => 
//     let postDescription = post.description;
//     postDescription.toLowerCase().includes()

//     }) 
// })





