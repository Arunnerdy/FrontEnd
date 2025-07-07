import { useState } from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
    const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:8080/api/login', {
        email,
        password
      });

      const { token, role } = res.data;

      // Store the token in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('role', role); 

      // Redirect based on role
      if (role === 'ROLE_ADMIN') {
        navigate('/projects');
      } else if (role === 'ROLE_PROJECT_MANAGER') {
        navigate('/project-manager-dashboard');
      } else {
        navigate('/team-member-dashboard');
      }

    } catch (error) {
      if (error.response) {
        alert(error.response.data); // e.g., "Invalid email"
      } else {
        alert("An error occurred. Please try again.");
      }
      console.error("Login error:", error);
    }
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