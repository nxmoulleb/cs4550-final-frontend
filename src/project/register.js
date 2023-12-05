import * as client from "./users/userClient";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [message, setMessage] = useState(<></>)
  const navigate = useNavigate();
  const register = async () => {
    try { 
      console.log('credentials:', credentials);
      await client.register(credentials);
      setMessage(<h1>Congrats you registered</h1>)
      navigate("/account")
    } catch (e) {
      console.log('problem with registering:', e);
      setMessage(<h1>An account already exists which uses that username or email</h1>)
    }
  };

  useEffect(() => {
    setMessage(message)
  }, [message]);

  return (
    <div>
      <h1>Register a New Account</h1>
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
      <input
        value={credentials.email}
        onChange={(e) =>
          setCredentials({ ...credentials, email: e.target.value })
        }
        placeholder="Email"
      />
      <button onClick={register}>Register</button>
      {message}
    </div>
  );
}

export default Register;