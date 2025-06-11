import { Link } from "react-router-dom";
import { useAuth } from "../store/authContext"; // Adjust the import path as needed

export default function Navbar() {
  const { username, pending, emailVerified, logout } = useAuth();
  const loggedIn = username && emailVerified;
  const loggedInContent = (
    <>
      <span className="text-sm sm:text-base">Welcome, {username}!</span>
      <button
        onClick={logout}
        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm sm:text-base">
        Logout
      </button>
    </>
  );

  return (
    <nav className="bg-gray-800 text-white px-4 py-3 flex justify-between items-center">
      {/* Left Side: Auth Buttons or Welcome Message */}
      <div className="flex items-center space-x-4">
        {pending && <span>Loading...</span>}
        {!pending && loggedIn && loggedInContent}
        {!pending && !loggedIn && (
          <>
            <Link to="/login" className="hover:underline text-sm sm:text-base">
              Login
            </Link>
            <Link to="/signup" className="hover:underline text-sm sm:text-base">
              Signup
            </Link>
          </>
        )}
      </div>

      {/* Center: App Name */}
      <div className="absolute left-1/2 transform -translate-x-1/2 text-lg sm:text-xl font-semibold">
        <Link to="/" className="hover:text-gray-300">
          MyApp
        </Link>
      </div>

      {/* Right Side: Empty to balance flex layout */}
      <div className="w-24" />
    </nav>
  );
}
