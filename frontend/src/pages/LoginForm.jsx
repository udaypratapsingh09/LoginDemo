import Input from "../components/Input";
import { Link } from "react-router";
import { handleLogin } from "../utils/authHandler";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

export default function LoginForm() {
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");
    const password = formData.get("password");
    const id = toast.loading("Logging in...");
    const response = await handleLogin({ username, password });
    if (response.success) {
      toast.update(id, {
        render: "Logged in successfully",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      navigate("/");
    } else {
      toast.update(id, {
        render: response.message,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
        onSubmit={handleSubmit}>
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
        <Input
          label="Username"
          id="username"
          type="text"
          name="username"
          required
        />
        <Input
          label="Password"
          id="password"
          type="password"
          name="password"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition">
          Log In
        </button>

        <p className="text-sm text-center mt-4">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
