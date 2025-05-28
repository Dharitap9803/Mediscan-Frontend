import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../styles/signup.css";
import Logo from '../assets/images/logo.avif';
import { MdEmail } from "react-icons/md";
import { FaUnlock, FaUserCircle, FaPhone } from "react-icons/fa";
import { IoEye, IoEyeOff, IoShieldCheckmarkSharp, IoHomeSharp } from "react-icons/io5";
import googleIcon from '../assets/images/google.webp';
import facebookIcon from '../assets/images/facebook.png';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Button } from '@mui/material';

const Signup = () => {
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        password: '',
        confirmPassword: '',
        termsAccepted: false
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        if (!formData.termsAccepted) {
            alert("You must accept the terms and conditions");
            return;
        }
    
        try {
            const response = await axios.post('http://localhost:3001/api/auth/signup', formData);
    
            // Check if the response status is in the range of successful responses
            if (response.status >= 200 && response.status < 300) {
                alert("Signup successful!");
                navigate('/login'); // Redirect to login page
            } else {
                alert(`Signup failed: ${response.data.message}`);
            }
        } catch (error) {
            if (error.response) {
                alert(`Signup failed: ${error.response.data.message || 'An error occurred'}`);
            } else if (error.request) {
                alert('Signup failed: No response from server');
            } else {
                alert(`Signup failed: ${error.message}`);
            }
        }
    };    

    return (
        <section className='loginSection signUpSection'>
            <div className='row'>
                <div className='col-md-8 d-flex align-items-center flex-column part1 justify-content-center'>
                    <h1>Welcome to MediScan! Your Health, Our Priority</h1>
                    <p>Join MediScan today and take the first step towards smarter healthcare. Our AI-powered platform helps you monitor your health, analyze medical reports, and receive expert recommendations—all in one place. Sign up now and experience the future of medical care!</p>
                    <div className='w-100 mt-4'>
                        <Link to={'/'}>
                            <Button className="btn-blue btn-lg btn-big"><IoHomeSharp /> &nbsp; Go to Home</Button>
                        </Link>
                    </div>
                </div>
                <div className='col-md-4 pr-0'>
                    <div className='loginBox'>
                        <div className='logo text-center'>
                            <img src={Logo} width="80px" alt="Logo" />
                            <h5 className='font-weight-bold'>Register a New Account</h5>
                        </div>
                        <div className='wrapper mt-3 card border p-3'>
                            <form onSubmit={handleSubmit}>
                                <div className='form-group mb-3 position-relative'>
                                    <span className='icon'><FaUserCircle /></span>
                                    <input type='text' className='form-control' placeholder='Enter your name' name='name' value={formData.name} onChange={handleChange} />
                                </div>
                                <div className='form-group mb-3 position-relative'>
                                    <span className='icon'><MdEmail /></span>
                                    <input type='email' className='form-control' placeholder='Enter your email' name='email' value={formData.email} onChange={handleChange} />
                                </div>
                                <div className='form-group mb-3 position-relative'>
                                    <span className='icon'><FaPhone /></span>
                                    <input type='text' className='form-control' placeholder='Enter your Phone Number' name='mobile' value={formData.mobile} onChange={handleChange} />
                                </div>
                                <div className='form-group mb-3 position-relative'>
                                    <span className='icon2'><FaUnlock /></span>
                                    <input type={isShowPassword ? 'text' : 'password'} className='form-control' placeholder='Enter your password' name='password' value={formData.password} onChange={handleChange} />
                                    <span className='toggleShowPassword' onClick={() => setIsShowPassword(!isShowPassword)}>
                                        {isShowPassword ? <IoEye /> : <IoEyeOff />}
                                    </span>
                                </div>
                                <div className='form-group mb-3 position-relative'>
                                    <span className='icon2'><IoShieldCheckmarkSharp /></span>
                                    <input type={isShowConfirmPassword ? 'text' : 'password'} className='form-control' placeholder='Confirm your password' name='confirmPassword' value={formData.confirmPassword} onChange={handleChange} />
                                    <span className='toggleShowPassword' onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}>
                                        {isShowConfirmPassword ? <IoEye /> : <IoEyeOff />}
                                    </span>
                                </div>
                                <FormControlLabel
                                    control={<Checkbox name='termsAccepted' checked={formData.termsAccepted} onChange={handleChange} />}
                                    label="I agree to the Terms & Conditions"
                                />
                                <button type='submit' className='btn btn-primary'>Sign Up</button>
                                <div className='text-center mt-3'>
                                    <span>or</span>
                                </div>
                                <button type="button" className='btn btn-danger mt-3 custom-btn'>
                                    <img src={googleIcon} width="50px" className="btn-icon" alt="Google" />&nbsp;
                                    Sign In with Google
                                </button>
                                <button type='button' className='btn btn-primary mt-2 custom-btn2'>
                                    <img src={facebookIcon} width="50px" className="btn-icon2" alt="Facebook" /> &nbsp;
                                    Sign In with Facebook
                                </button>
                            </form>
                        </div>
                        <div className='wrapper mt-3 card border footer p-3'>
                            <span className='text-center'>
                                Already have an Account?
                                <Link to="/Login" className='link-color ml-2'>Sign In</Link>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Signup;
