import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { storageUsers } from '../storage/Data'
import { loggrdinUser } from '../storage/Data'
import '../Css/log.css'

function Login() {

    const [user, setUser] = useState({})

    const [error, setError] = useState({})
    const [submit, setsubmit] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        verify()

    }, [user])


    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })


    }

    const userExist = () => {
        let userExist = storageUsers().find(e => (e.email === user.email))
        let passwordExist = userExist?.password === user.password;
        return { user: userExist, password: passwordExist }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setsubmit(true)
        if (verify()) {
            localStorage.setItem("loggedInUser", JSON.stringify(storageUsers().find(e => e.email === user.email)))
            navigate("/")
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




        if (!user.email) {
            setErrorMessage("email", "please enter email")
        } else if (!emailRegex.test(user.email)) {
            setErrorMessage("email", "enter a valid email")
        } else if (!userExist().user) {
            setErrorMessage("email", "Email does not exist")
        }

        if (!user.password) {
            setErrorMessage("password", "please enter password")
        } else if (user.password.length < 5) {
            setErrorMessage("password", "please enter valid password")

        } else if (!userExist().password) {
            setErrorMessage("password", "password does not match")
        }




        setError(localVal)
        return valid

    }
    return (
        <>


            <h1 className='text-center'> Log In page</h1>
            <div className='p-5'>
                <center>

                
            <form className='from2'>


                <div class="mb-3">
                    <label htmlFor="exampleInputEmail1" class="form-label">Email address</label>
                    <input type="email" name='email' value={user.email} onChange={handleChange} class="form-control width2" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    {submit && error.email && <p className='text-danger'>{error.email}</p>}

                </div>

                <div class="mb-3">
                    <label htmlFor="exampleInputPassword1" class="form-label">Password</label>
                    <input type="password" name='password' value={user.password} onChange={handleChange} class="form-control width2" id="exampleInputPassword1" />
                    {submit && error.password && <p className='text-danger'>{error.password}</p>}
                </div>



                <button type="submit" onClick={handleSubmit} class="btn btn-primary">Submit</button>

                <p><Link to="/signup">Create an Account</Link></p>
            </form>

            </center>
            </div>

        </>)
}

export default Login