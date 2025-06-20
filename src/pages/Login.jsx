import { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    axios.post('http://localhost:8080/api/login', {
      email,
      password
    })
    .then((res) => {
      alert(res.data); 
      // Redirect to dashboard or home
      
    })
    .catch((error) => {
      if (error.response) {
        // Backend returned 401 with message
        alert(error.response.data); // "Invalid email" or "Invalid password"
      } else {
        alert('An error occurred. Please try again.');
      }
      console.error('Login error:', error);
    });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4" style={{ width: '22rem' }}>
        <h3 className="text-center mb-4">LOGIN</h3>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label>Email</label>
            <input type="email" className="form-control" required onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input type="password" className="form-control" required onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-dark w-100">LOGIN</button>
        </form>
        <p className="mt-3 text-center">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}