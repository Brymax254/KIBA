import React from 'react';

const Login = () => {
  console.log('Login component rendered');
  return (
    <div className="container">
      <h1>Login Page</h1>
      <form className="login-form">
        <input type="text" placeholder="Username" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
