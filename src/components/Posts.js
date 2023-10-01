import React from 'react'
import Post from './Post'

function Posts({ posts, setMyPosts, setHomePosts,myPostFlag }) {
    console.log(posts);
    return (
        <>
            {/* <h3 className='px-4'> {myPostFlag ? "My Posts" : "Home"}</h3> */}

            <div className='container'>
                <div className="row">
                    {
                        posts.map((post, i) => {
                            return (
                                <Post post={post} key={i} setMyPosts={setMyPosts} myPostFlag={myPostFlag}  setHomePosts={setHomePosts} />

                            )

                        })
                    }

                </div>

            </div>


        </>
    )
}

export default Posts