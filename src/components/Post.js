import React from 'react'
import { getMyPost, setStoragePosts, storagePosts } from '../storage/Data';
import { Link } from '@mui/material';
import router from '../router/Router';
import { NavLink } from 'react-router-dom';

const Post = ({ post, setMyPosts, myPostFlag,setHomePosts }) => {
    console.log(post);


    function getTimeAgo(dateTime) {
        const currentDate = new Date();
        const providedDate = new Date(dateTime);

        const timeDifference = currentDate.getTime() - providedDate.getTime();

        const seconds = Math.floor(timeDifference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const months = Math.floor(days / 30);
        const years = Math.floor(months / 12);

        if (seconds < 60) {
            return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
        } else if (minutes < 60) {
            return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
        } else if (hours < 24) {
            return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
        } else if (days < 30) {
            return `${days} day${days !== 1 ? 's' : ''} ago`;
        } else if (months < 12) {
            return `${months} month${months !== 1 ? 's' : ''} ago`;
        } else {
            return `${years} year${years !== 1 ? 's' : ''} ago`;
        }
    }
    const deletePost = () => {

        storagePosts().forEach((strPost, i) => {
            if (strPost.id === post.id) {
                let localData = storagePosts()
                localData.splice(i, 1)
                setStoragePosts(localData)
                setMyPosts(getMyPost())

            }
        });
    }
    return (
        <>
            <div className='col-sm-6 col-lg-3 p-3'>
                <div className='p-3 shadow rounded-3 h-100 d-flex flex-column justify-content-center'>
                    <div>
                        <div className='text-center'>
                            <img className='rounded-3 shadow' src={post.postImage} alt="" width="100%" />
                        </div>
                    </div>

                    <div>
                        <div className='d-flex justify-content-center align-items-start mt-4'>
                            {post.title && <h4>{post.title}</h4>}<br /><br /><br /><br />
                            {post.category && <h6 className='text-danger m-3'>{post.category}</h6>}

                        </div>

                        <div>
                            <p> {post.description}</p>
                            <p>{getTimeAgo(post.date)}</p>



                        </div>
                        {myPostFlag &&
                        <div>
                        <NavLink to="/addPost" state={post}> <i className='fa fa-edit btn btn-light'    style={{ fontSize: "30px", color: "red", float: "right" }}></i></NavLink>
                            <i className='fa fa-trash btn btn-light' onClick={deletePost} style={{ fontSize: "30px", color: "red", float: "right" }}></i>
                        </div>
                        }



                    </div>


                </div>

            </div>



        </>
    )
}

export default Post