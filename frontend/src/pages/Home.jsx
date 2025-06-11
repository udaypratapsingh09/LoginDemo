import { useAuth } from "../store/authContext";

export default function Home() {
  const {pending, emailVerified} = useAuth();
  return (
    <>
    {!emailVerified && !pending ? <h1>Login / verify email to continue</h1> : <h1> Home Page</h1>}
    </>
  )
}