import {Link} from "react-router-dom"
import {useNavigate} from "react-router-dom"

export const NavBar = ({currentUser}) => {
    const navigate = useNavigate()

const handleLogout = () => {
    localStorage.removeItem("learning_user");
    navigate("/login", {replace: true});
    //navigate("/login", { replace: true }): This programmatically
    // redirects the user to the login page after they log out.
    //THERE IS NO CLICK FOR THEM TO BE ABLE TO DO THIS TO JUST GO TO LOG IN MANUALLY BY CLICKING A LINK
    // WHY WE NEED TO PROGROMATICALLY DO TI FOR THEM. WITH AN INITIAL LOG IN THOUGH WE DONT NEED A FUNCTION TO PROGROMATICALLY
    // NAVIGATE TO LOG IN FOR THEM WE CAN JUST USE A LINK TEHY CLICK 
};

return (
<nav>
<ul>
{localStorage.getItem("learning_user") ? (
    //if the user is logged in show the logout link
    <section>
    <li>
      <Link
        to=""
        onClick={handleLogout} //call handlelogout when clicking logout 
      >
        Logout
      </Link>
    </li>
    <li>
      <Link
        to="/myPosts">
        Click to get All of My Posts
      </Link>
    </li>
    <li>
      <Link
        to={`/profile/${currentUser.id}`}>
        Click to get Profile Information
      </Link>
    </li>
    <li>
        <Link
        to="/allPosts">
        Click to Get all Posts
        </Link>
    </li>
    <li>
      <Link
      to="/favorites">
      Click to get your liked posts
      </Link>
    </li>
    <li>
        <Link
        to="/newPost">
        Click to Create New Post
        </Link>
    </li>
    </section>
  ) : (
    // if user is not loged in show log in link 
    <li>
    <Link to="/login"> Login </Link> 
    </li>
    // no function needed just navigate to /login
  )}
  </ul>
  </nav>
);
}

//This is a React Router DOM component that renders an <a> tag with an href attribute, which navigates to a new page when clicked.
//<Link to="/login"> Login </Link>
//React Router will detect the click and route to the specified path without reloading the entire page, as it uses the history API behind the scenes.
// No function is called here. This is just a simple link that navigates to a path

//navigate("/login", { replace: true }):
// This is programmatic navigation. Instead of relying on a user click to navigate, you manually trigger navigation within a function.
//The { replace: true } option means that the current URL will be replaced in the browser's history (i.e., it won’t create a new entry in the browser history).
// The user won’t be able to go back to the previous page using the back button.