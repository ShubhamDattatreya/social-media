import React from 'react'
import FaceIcon from '@mui/icons-material/Face';
import { Select } from '@mui/material';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { loggrdinUser } from '../storage/Data';
import router from '../router/Router';

function Navbar() {
    const location = useLocation()
    const navigate = useNavigate();

    const handleOptionChange = (e) => {
        let value = e.target.value;

        optionOparation[value]();
    }

    const logout = () => {
        localStorage.removeItem("loggedInUser")
        navigate("/login")
    }

    const optionOparation = {
        addPost: () => navigate("/addPost"),
        myPosts: () => navigate("/myPosts"),
        logout: () => logout()
    }
    return (
        <>
            <div>
                <div className='d-flex justify-content-between m-3'>
                    <div className='d-flex align-items-center '>
                        {/* <i class="fa fa-address-book" style={{ fontSize: "36px" }}></i> */}
                        <NavLink to="/">
                        <FaceIcon />
                        </NavLink>
                        <select className='me-3 ms-1' style={{ border: "none" }} onChange={handleOptionChange}>

                            <option >{loggrdinUser().email}</option>

                            <option value="addPost">
                                Add Post
                            </option>
                            {location.pathname !== router.find(route =>  route.name === "myPosts" ).path &&
                                <option value="myPosts">
                                    My Post
                                </option>}

                            <option value="logout">
                                Logout
                            </option>


                        </select>




                    </div>
                </div>





            </div>




        </>)
}

export default Navbar