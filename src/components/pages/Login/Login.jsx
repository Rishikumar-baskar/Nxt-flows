import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    console.log('Login attempt:', { email, password });
    navigate('/Exploreflow');
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left side - Logo and branding */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-48 lg:min-h-screen">
        <div className="flex flex-col lg:flex-row items-center gap-3 sm:gap-4 lg:gap-6 text-center lg:text-left">
          <img 
            src="NXT.png" 
            alt="NXT Logo" 
            className="w-16 sm:w-20 lg:w-24 xl:w-30 h-auto"
          />
          <div className="flex flex-col lg:flex-row items-center lg:items-end">
            <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">NXT</span>
            <span className="text-xl sm:text-2xl lg:text-4xl font-normal text-gray-900 lg:ml-3 lg:mb-0">
              Flows
            </span>
          </div>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-white">
        <div className="w-full max-w-sm sm:max-w-md px-2 sm:px-4">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">Sign In</h1>
            <p className="text-sm sm:text-base text-gray-600">Corporate Login</p>
          </div>

          {/* Form */}
          <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
            {/* Email field */}
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                required
              />
            </div>

            {/* Password field */}
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                required
              />
            </div>

            {/* Error message */}
            {error && (
              <div className="text-red-600 text-xs sm:text-sm text-center">{error}</div>
            )}

            {/* Forgot password link */}
            <div className="text-right">
              <a 
                href="#" 
                className="text-blue-600 text-xs sm:text-sm hover:text-blue-700 transition-colors"
              >
                Forgot Password?
              </a>
            </div>

            {/* Sign in button */}
            <button 
              type="submit" 
              className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-2 sm:py-3 px-4 rounded-lg transition-colors duration-200 active:transform active:translate-y-px text-sm sm:text-base"
            >
              Sign In
            </button>

            {/* Sign up link */}
            <div className="text-center text-xs sm:text-sm text-gray-600">
              Not a member yet?{' '}
              <a 
                href="#" 
                className="text-blue-600 hover:text-blue-700 transition-colors"
              >
                Sign Up
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;