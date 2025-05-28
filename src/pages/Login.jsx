import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import "../styles/login.css";
import Logo from '../assets/images/logo.avif';
import { MdEmail } from "react-icons/md";
import { FaUnlock } from "react-icons/fa6";
import { IoEye, IoEyeOff } from "react-icons/io5";
import googleIcon from '../assets/images/google.webp';
import facebookicon from '../assets/images/facebook.png';
import {UserContext} from '../context/UserContext'; 

const Login = () => {
    const [isShowPassword, setisShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { loginUser } = useContext(UserContext); // Use UserContext

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api/auth/signin', { email, password });
            console.log(response.data);

            // Handle successful login
            loginUser(response.data.user); // Update user context
            navigate('/dashboard'); // Redirect to dashboard
        } catch (error) {
            console.error(error);
            alert('Login failed. Please check your credentials.');
        }
    };

    return (
        <>
           <section className='loginSection'>
                <div className='loginBox'>
                    <div className='logo text-center'>
                        <img src={Logo} width="80px" alt="Logo" />
                        <h5 className='font-weight-bold'>Login to Mediscan</h5>
                    </div>
                    <div className='wrapper mt-3 card border p-3'>
                        <form onSubmit={handleLogin}>
                            <div className='form-group mb-3 position-relative'>
                                <span className='icon'><MdEmail /></span>
                                <input 
                                    type='text' 
                                    className='form-control' 
                                    placeholder='Enter your email / Phone Number' 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className='form-group mb-3 position-relative'>
                                <span className='icon2'><FaUnlock /></span>
                                <input 
                                    type={isShowPassword ? 'text' : 'password'} 
                                    className='form-control' 
                                    placeholder='Enter your password' 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <span className='toggleShowPassword' onClick={() => setisShowPassword(!isShowPassword)}>
                                    {isShowPassword ? <IoEye /> : <IoEyeOff />}
                                </span>
                            </div>
                            <button type='submit' className='btn btn-primary'>Sign In</button>
                            <div className='text-center mt-2'>
                                <a href='#' className='text-primary'>Forgot Password?</a>
                            </div>
                            <div className='text-center mt-3'>
                                <span>or</span>
                            </div>
                            <button type="button" className='btn btn-danger mt-3 custom-btn'>
                                <img src={googleIcon} width="50px" className="btn-icon" alt="Google" />&nbsp;
                                SignIn with Google
                            </button>
                            <button type='button' className='btn btn-primary mt-21 custom-btn2'>
                                <img src={facebookicon} width="50px" className="btn-icon2" alt="Facebook" /> &nbsp;
                                SignIn with Facebook
                            </button>
                        </form>
                    </div>

                    <div className='wrapper mt-3 card border footer p-3'>
                        <span className='text-center'>
                            Don't have an Account?
                            <Link to="/Signup" className='link-color ml-2'>Register</Link>
                        </span>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Login;