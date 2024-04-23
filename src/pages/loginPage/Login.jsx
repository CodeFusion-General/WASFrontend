// eslint-disable-next-line no-unused-vars
import React, {useState} from 'react';
import { FaUser, FaLock } from "react-icons/fa";
import {login} from '../../api/authentication/AuthenticationApi.jsx';
const LoginPage = () => {
  const [authenticate, setAuthenticate] = useState({username : '', password : '' });
  const handleLogin = async () => {

    try {
      await login(authenticate.username, authenticate.password);
      alert('Login successful');
      window.location.href = '/';
    }
    catch (error) {
      if(error.message === "Unexpected error: User not found"){
        alert('Login failed: User not found.');
      }
      else {
        alert('Login failed: Password wrong.');
      }
    }

  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center font-roboto-slab" style={{ backgroundImage: `url('src/assets/WASBackground.jpg')` }}>
      <div className="bg-white/10 border border-white/20 backdrop-blur-md shadow-lg text-white rounded-lg px-10 py-8 w-104">
        <h1 className="text-4xl text-center mb-10">Login</h1>

        <div className="mb-8">
          <div className="flex items-center border border-white/20 rounded-full">
            <FaUser className="ml-3 text-lg text-white"/>
            <input
              className="w-full h-12 bg-transparent outline-none pl-2 pr-10 rounded-full text-base text-white"
              type="text"
              placeholder="Username"
              onChange={e => setAuthenticate({ ...authenticate, username: e.target.value })}
            />
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center border border-white/20 rounded-full">
            <FaLock className="ml-3 text-lg text-white"/>
            <input
              className="w-full h-12 bg-transparent outline-none pl-2 pr-10 rounded-full text-base text-white"
              type="password"
              placeholder="Password"
              onChange={e => setAuthenticate({ ...authenticate, password: e.target.value })}
            />
          </div>
        </div>

    <div className="remember-forgot flex justify-between items-center mb-4">
      <label className="flex items-center text-sm">
        <input type="checkbox" className="text-white mr-2" />
        Remember me
      </label>
      <a href="#" className="text-white text-sm hover:underline">
        Forgot password?
      </a>
    </div>

    <button
        className="w-full h-11 bg-white rounded-full shadow text-base text-gray-800 font-semibold hover:bg-gray-100 transition-colors"
        onClick={handleLogin}
    >
      Login
    </button>

    <div className="register-link text-sm text-center mt-5">
      <p>
        Don&apos;t have an account? 
        <a href="/boss-register" className="text-white font-semibold hover:underline">
          Sign up
        </a>
      </p>
    </div>
  </div>
</div>

  );
};

export default LoginPage;