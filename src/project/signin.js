import * as client from "./users/userClient";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const [message, setMessage] = useState(<></>);
  const signIn = async () => {
    try {
      await client.signin(credentials);
      setMessage(<h1>Signed in</h1>);
      navigate("/account");
    } catch {
      setMessage(<h1>Username and password combination do not exist</h1>);
    }
  };

  useEffect(() => {
    setMessage(message);
  }, [message]);

  return (
    <div class="d-flex justify-content-center w-100">
      <div class="w-50 rounded bg-secondary-subtle p-3">
        <h1 class="text-center mb-3">Sign In</h1>
        <div class="form-floating mb-3">
          <input
            value={credentials.username}
            onChange={(e) =>
              setCredentials({ ...credentials, username: e.target.value })
            }
            placeholder="Username"
            id="floatingUsername"
            class="form-control"
          />
          <label for="floatingUsername">Username</label>
        </div>
        <div class="form-floating mb-3">
          <input
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
            placeholder="Password"
            id="floatingPassword"
            class="form-control"
          />
          <label for="floatingPassword">Password</label>
        </div>
        <div class="justify-content-center d-flex align-items-center mb-3">
          <button class="btn btn-primary m-1" onClick={signIn}>
            Sign In
          </button>
          <button
            class="btn btn-secondary m-1"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </div>
        <div class="text-center mw-100">{message}</div>
      </div>
    </div>
  );
}

export default SignIn;
