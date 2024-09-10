
export const Post = ({post, count}) => {
    console.log("Post component received post", post);
    return (
        <div className= "post">
            <article key={post.id}>
                <header>
                    <h3> Post Title: {post.title}</h3>
                    <p> Post Body: {post.body}</p>
                </header>
                <footer> 
                    <p> Post Likes: {count}</p>
                </footer>
            </article>
        </div>
    )
}