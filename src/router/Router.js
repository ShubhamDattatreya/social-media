import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import Home from "../layout/Home";
import AddPost from "../components/AddPost";
import MyPosts from "../layout/MyPosts";



const router = [

    {
        path: "/signup",
        element: SignUp
    },


    {
        path: "/login",
        element: Login
    },
    {
        path: "/",
        element: Home
    },


    {
        path: "/addPost",
        element: AddPost
    },


    {     
        name : "myPosts",
        path: "/myPosts",
        element: MyPosts
    },








]

export default router