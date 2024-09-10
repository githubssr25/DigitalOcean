import {useEffect, useState} from "react"
import {getAllPosts} from "../services/postService"
import {Post} from "../components/Post"

export const AllPosts = () => {
    const [posts, setPosts] = useState([]);


    useEffect(() => {
        console.log("fetching posts");
        getAllPosts().then((thePosts) => {
            console.log("what is value of posts", thePosts);
            setPosts(thePosts);
        })
    }, []);

    // posts.forEach((post) => {
    //     if(post.userPostLike){
    //         likeCount += post.userPostLike.length;
    //     } 
    //     });

        return (
            <div className="posts">
                {posts.map((eachPost) => {
                    console.log("rendering each post inside map", eachPost);
                    let likeCount = 0;
                    if(eachPost.userPostLike){
                        likeCount = eachPost.userPostLike.length;
                        console.log("what is likeCount and eachPost.userPostLike.length", likeCount, eachPost.userPostLike.length);
                    }
                   return ( <Post post={eachPost} count={likeCount} key={eachPost.id} /> );
                })}
            </div>
        )




}