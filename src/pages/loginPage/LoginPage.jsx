// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { FaUser, FaLock } from "react-icons/fa";
import { login } from '../../api/authentication/AuthenticationApi.jsx';

const LoginPage = () => {
  const [authenticate, setAuthenticate] = useState({ username: '', password: '' });

  const handleLogin = async () => {
    try {
      await login(authenticate.username, authenticate.password);
      window.location.href = '/';
    } catch (error) {
      const message = error.message === "Unexpected error: User not found"
          ? 'Login failed: User not found.'
          : 'Login failed: Password wrong.';
      alert(message);
    }
  };

  return (
      <div className="flex items-center justify-center min-h-screen bg-cover bg-center font-roboto-slab" style={{ backgroundImage: `url('src/assets/WASBackground.jpg')` }}>
        <div className="bg-white/60 border border-gray-300 backdrop-blur-md shadow-lg text-gray-800 rounded-lg px-10 py-8 w-104">
          <h1 className="text-4xl text-center mb-10">Login</h1>

          <div className="mb-8">
            <div className="flex items-center border border-gray-300 rounded-full">
              <FaUser className="ml-3 text-lg text-gray-800"/>
              <input
                  className="w-full h-12 bg-transparent outline-none pl-2 pr-10 rounded-full text-base text-gray-800"
                  type="text"
                  placeholder="Username"
                  onChange={e => setAuthenticate({ ...authenticate, username: e.target.value })}
              />
            </div>
          </div>

          <div className="mb-4">
            <div className="flex items-center border border-gray-300 rounded-full">
              <FaLock className="ml-3 text-lg text-gray-800"/>
              <input
                  className="w-full h-12 bg-transparent outline-none pl-2 pr-10 rounded-full text-base text-gray-800"
                  type="password"
                  placeholder="Password"
                  onChange={e => setAuthenticate({ ...authenticate, password: e.target.value })}
              />
            </div>
          </div>

          <div className="remember-forgot flex justify-between items-center mb-4">
            <label className="flex items-center text-sm text-gray-800">
              <input type="checkbox" className="mr-2" />
              Remember me
            </label>
            <a href="#" className="text-gray-800 text-sm hover:underline">
              Forgot password?
            </a>
          </div>

          <button
              className="w-full h-11 bg-gray-800 rounded-full shadow text-base text-white font-semibold hover:bg-gray-900 transition-colors"
              onClick={handleLogin}
          >
            Login
          </button>

          <div className="register-link text-sm text-center mt-5">
            <p>
              Don’t have an account?
              <a href="/boss-register" className="text-gray-800 font-semibold hover:underline">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
  );
};

export default LoginPage;
