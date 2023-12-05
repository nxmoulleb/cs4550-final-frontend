import * as client from "./users/userClient";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const [message, setMessage] = useState(<></>)
  const signIn = async () => {
    try{
        const response = await client.signin(credentials);
        console.log("signin response:", response);
        setMessage(<h1>Signed in</h1>);
        navigate("/account");
    } catch {
        setMessage(<h1>Username and password combination do not exist</h1>)
    }
  };

  useEffect(() => {
    setMessage(message)
  }, [message]);

  return (
    <div>
      <h1>Sign In</h1>
      <input
        value={credentials.username}
        onChange={(e) =>
          setCredentials({ ...credentials, username: e.target.value })
        }
        placeholder="Username"
      />
      <input
        value={credentials.password}
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
        placeholder="Password"
      />
      <button onClick={signIn}>Sign In</button>
      <button onClick={() => navigate("/register")}>Register</button>
      {message}
    </div>
  );
}

export default SignIn;