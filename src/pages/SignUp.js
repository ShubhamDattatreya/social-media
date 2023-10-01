import React, { useEffect, useState } from 'react'
import { storageUsers } from '../storage/Data'
import { Link, useNavigate } from 'react-router-dom'
import '../Css/Sin.css'


function SignUp() {
    const [user, setUser] = useState({})

    const [error, setError] = useState({})
    const [submit, setsubmit] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        verify()

    }, [user])

    const userExist = () => {
        let exist = storageUsers().find(e => e.email === user.email)
        return Boolean(exist)
    }


    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })


    }



    const handleSubmit = (e) => {
        e.preventDefault();
        setsubmit(true)
        if (verify()) {
            localStorage.setItem("myData", JSON.stringify(storageUsers().concat(user)))
            navigate("/login")
        }

    }

    const verify = () => {
        let localVal = {}
        let valid = true

        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g

        const setErrorMessage = (key, message) => {
            localVal[key] = message
            valid = false
        }

        if (!Boolean(user.username)) {
            setErrorMessage("username", "please enter username")
        } else if (user.username.length < 5) {
            setErrorMessage("username", "username is invalid")
        }


        if (!user.email) {
            setErrorMessage("email", "please enter email")
        } else if (!emailRegex.test(user.email)) {
            setErrorMessage("email", "enter a valid email")
        } else if (userExist()) {
            setErrorMessage("email", "user already exist")
        }


        if (!user.password) {
            setErrorMessage("password", "please enter password")
        }
        else if (user.password.length < 5) {
            setErrorMessage("password", "please enter valid password")

        }

        if (!user.confirm) {
            setErrorMessage("confirm", "please enter confirm password")
        }
        else if (user.password !== user.confirm) {
            setErrorMessage("confirm", " password does not match")

        }


        setError(localVal)
        return valid

    }



    
    
    return (
        <>
            <h1 className='text-center'> Sign Up page</h1>

        <div className='p-5'>
        <center>

            <form className='from'>
                <div class="mb-3">
                    <label htmlFor="exampleInputEmail1" class="form-label">user name</label>
                    <input type="name" name='username' value={user.username} onChange={handleChange} class="form-control width" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    {submit && error.username && <p className='text-danger'>{error.username}</p>}

                </div>

                <div class="mb-3">
                    <label htmlFor="exampleInputEmail1" class="form-label">Email address</label>
                    <input type="email" name='email' value={user.email} onChange={handleChange} class="form-control width" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    {submit && error.email && <p className='text-danger'>{error.email}</p>}

                </div>

                <div class="mb-3">
                    <label htmlFor="exampleInputPassword1" class="form-label">Password</label>
                    <input type="password" name='password' value={user.password} onChange={handleChange} class="form-control width" id="exampleInputPassword1" />
                    {submit && error.password && <p className='text-danger'>{error.password}</p>}
                </div>

                <div class="mb-3">
                    <label htmlFor="exampleInputPassword1" class="form-label">confirm Password</label>
                    <input type="password" name='confirm' value={user.confirm} onChange={handleChange} class="form-control width" id="exampleInputPassword1" />
                    {submit && error.confirm && <p className='text-danger'>{error.confirm}</p>}
                </div>

                <button type="submit" onClick={handleSubmit} class="btn btn-primary">Submit</button>

                <p><Link to="/login">Already have an account</Link></p>
            </form>

            </center>
            </div>
        </>)
}

export default SignUp