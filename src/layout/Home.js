import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { loggrdinUser, storageUsers } from '../storage/Data'
import { useNavigate } from 'react-router-dom'
import Posts from '../components/Posts';
import { storagePosts } from '../storage/Data';


function Home() {
    const [homePosts, setHomePosts] = useState([])
    const navigate = useNavigate();
    useEffect(() => {
        if (JSON.stringify(loggrdinUser) === "{}") {
            navigate("/login")
        }
    }, [])

    useEffect(() => {
        setHomePosts(storagePosts())
    }, [])


    return (
        <>

        <h1>Home Page</h1>
            <Navbar />
            <Posts posts={homePosts} setHomePosts={setHomePosts}  />
        </>
    )
}

export default Home