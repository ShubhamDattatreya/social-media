import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Posts from '../components/Posts'
import { getMyPost } from '../storage/Data'

function MyPosts() {
    const [myPosts, setMyPosts] = useState([])

    useEffect(() => {
        setMyPosts(getMyPost())
    }, [])

    return (
        <>

            <Navbar />

            <Posts posts={myPosts} setMyPosts={setMyPosts} myPostFlag={true} />
        </>
    )
}

export default MyPosts