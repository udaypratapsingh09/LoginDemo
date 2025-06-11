const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import axios from "axios";

console.log({API_BASE_URL});

const handleLogin = async ({ username, password }) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/login`,
      {
        username,
        password,
      },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error(error.response.data || error);
  }
};

const handleSignup = async ({ username, email, password }) => {
  try {
    console.log(`${API_BASE_URL}/auth/signup`);
    const response = await axios.post(
      `${API_BASE_URL}/auth/signup`,
      {
        username,
        email,
        password,
      },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export { handleLogin, handleSignup };
