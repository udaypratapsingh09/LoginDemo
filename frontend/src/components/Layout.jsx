import { Outlet } from "react-router-dom";
import { AuthProvider } from "../store/authContext";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <AuthProvider>
      <Navbar />
      <Outlet />
    </AuthProvider>
  );
}
