import Input from "../components/Input";
import { Link } from "react-router";
import { handleSignup } from "../utils/authHandler";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

export default function SignupForm() {
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");
    const password = formData.get("password");
    const confirm = formData.get("confirm");
    const email = formData.get("email");

    if (confirm != password) {
      toast.error("Passwords do not match");
      return;
    }
    const id = toast.loading("Signing up...");
    const response = await handleSignup({ username, email, password });
    if (response.success) {
      toast.update(id, {
        render: "Verify email to proceed",
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
    <div className="min-h-screen flex items-center justify-center ">
      <form
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
        onSubmit={handleSubmit}>
        <h2 className="text-2xl font-semibold mb-6 text-center">Signup</h2>
        <Input
          label="Username"
          id="username"
          type="text"
          name="username"
          required
        />
        <Input label="Email" id="email" type="email" name="email" required />
        <Input
          label="Password"
          id="password"
          type="password"
          name="password"
          required
        />
        <Input
          label="Confirm Password"
          id="confirm"
          type="password"
          name="confirm"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition">
          Sign Up
        </button>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
