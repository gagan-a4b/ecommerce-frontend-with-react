import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from './Header';
import { signup } from '../components/auth';
import { toast } from 'react-toastify';
import AuthForm from '../components/AuthForm';

function Signup() {
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await signup(username, password, email);
      toast.success('Signup successful. Please log in.');
      navigate('/login');
    } catch (err) {
      toast.error('Signup failed: ' + err.message);
    }
  };

  return (
    <div className="pt-44 h-screen bg-gray-100">
      <Header showAuthButtons={false} showUserLinks={false} />

      <div className="flex justify-center items-center mt-10">
        <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md space-y-6">
          <h2 className="text-2xl font-bold text-center text-gray-700">Create an Account</h2>

          <AuthForm
            type="signup"
            username={username}
            setUsername={setUsername}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            handleSubmit={handleSignup}
          />

          <p className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
