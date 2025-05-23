import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

const LoginForm = () => {
  const handleLogin = (e) => {
    e.preventDefault();
    
    console.log('Intentando iniciar sesión...');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 border border-gray-300 rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded"
        >
          Log In
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don’t have an account?{' '}
          <NavLink to="/signup" className="text-green-600 hover:underline">
            Sign up
          </NavLink>
        </p>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({});


export default connect(mapStateToProps)(LoginForm);
