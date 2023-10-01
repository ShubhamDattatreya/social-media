import React, { useEffect, useState } from 'react'
import categories from "../storage/categories.json"
import { loggrdinUser, setStoragePosts, storagePosts } from '../storage/Data'
import { useLocation, useNavigate } from 'react-router-dom'
import router from '../router/Router';

function AddPost() {
    const [post, setPost] = useState({})
    const [error, setError] = useState({})
    const [submit, setsubmit] = useState(false)
    const [isUpdating, setIsUpdating] = useState(false)


    const navigate = useNavigate();
    const location =useLocation();

    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value })
    }


    useEffect(() => {
        verify()

    }, [post])
    useEffect(()=>{
        if(location.state){
            setPost(location.state)
            setIsUpdating(true)
            
        }
    },[])

    const handleSubmit = (e) => {
        e.preventDefault()

        setsubmit(true)

        if (verify()) {
            if(isUpdating){
                updatePost()
            }else{
                addPost()
            }
        }




    }
    const updatePost=()=>{
        storagePosts().forEach((strPost ,i)=>{
            if(strPost.id ==post.id){
                let localData = storagePosts()
                localData[i] = post 
                setStoragePosts(localData)
                navigate("/myPosts")
            }
        });
    }

    const addPost = () => {
        post.userId = loggrdinUser().email
        post.id = Math.random()
        post.date = new Date()
        localStorage.setItem("posts", JSON.stringify(storagePosts().concat(post)))
        navigate("/myPosts")

    }

    const verify = () => {
        let localVal = {}
        let valid = true


        const setErrorMessage = (key, message) => {
            localVal[key] = message
            valid = false
        }

        if (!Boolean(post.postImage)) {
            setErrorMessage("postImage", "please enter image url")
        }


        if (!Boolean(post.category)) {
            setErrorMessage("category", "please select category")
        }

        if (!Boolean(post.title)) {
            setErrorMessage("title", "please enter title")
        }


        if (!Boolean(post.description)) {
            setErrorMessage("description", "please enter description")
        }





        setError(localVal)
        return valid

    }
    return (
        <>    <center>
            <div>
                {
                    isUpdating ? "UpdatePost" : "Create New Post"
                }
            </div>
        </center>

            <hr />

            <div className='d-flex '>

                <form className='w-50 p-5' >
                    <div className="form-group">
                        <label htmlFor="postImage">Image Url</label>
                        <input type="text" name="postImage" id="postImage" onChange={handleChange} value={post.postImage} className="form-control" aria-describedby="emailHelp" placeholder="enter image url" />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                        {submit && error.postImage && <p className='text-danger'>{error.postImage}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input type="text" name="title" id="title" onChange={handleChange} value={post.title} className="form-control" placeholder="enter title" />
                        {submit && error.title && <p className='text-danger'>{error.title}</p>}

                    </div>

                    <div className="form-group">
                        <label htmlFor="category">Category</label>
                        <select className='form-control' name="category" id="category" value={post.category} onChange={handleChange}>
                            <option disabled selected>--select--</option>

                            {categories.map((e, i) => (
                                (
                                    <option key={i} value={e}>{e}</option>
                                )
                            ))}


                        </select>
                        {submit && error.category && <p className='text-danger'>{error.category}</p>}


                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea name="description" id="description" value={post.description} onChange={handleChange} className="form-control" placeholder="enter Description" />
                            {submit && error.description && <p className='text-danger'>{error.description}</p>}

                        </div>


                    </div>

                    <button type="submit" className="btn btn-primary" onClick={handleSubmit}>{isUpdating?"Update" : "Create"}</button>
                </form>


                <div className='col-md-4 px-5  mt-5'>
                    <div className='text-center'>
                        <img className='rounded-3 shadow' src={post.postImage} alt="" width="100%" />
                        {post.title && <h3>{post.title}</h3>}
                        {post.category && <h5>{post.category}</h5>}
                        {post.description && <p>{post.description}</p>}

                    </div>
                </div>

            </div>

        </>

    )
}

export default AddPost