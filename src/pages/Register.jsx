import { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    //Call your backend API here
    console.log({ name, email, password });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4" style={{ width: '22rem' }}>
        <h3 className="text-center mb-4">REGISTRATION</h3>
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label>Name</label>
            <input type="text" className="form-control" required onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="mb-3">
            <label>Email</label>
            <input type="email" className="form-control" required onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input type="password" className="form-control" required onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-dark w-100">REGISTER</button>
        </form>
        <p className="mt-3 text-center">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}