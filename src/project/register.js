import * as userClient from "./users/userClient";
import * as collectionsClient from "./collections/collectionsClient";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [message, setMessage] = useState(<></>);
  const navigate = useNavigate();
  const register = async () => {
    try {
      await userClient.register(credentials);
      const account = await userClient.account();
      await collectionsClient.createCollection(account._id, account.username);
      setMessage(<h1>Congrats you registered</h1>);
      navigate("/account");
    } catch (e) {
      console.log("problem with registering:", e);
      setMessage(
        <h1>An account already exists which uses that username or email</h1>
      );
    }
  };

  useEffect(() => {
    setMessage(message);
  }, [message]);

  return (
    <div class="d-flex justify-content-center w-100">
      <div class="w-50 rounded bg-secondary-subtle p-3">
        <h1 class="text-center mb-3">Register a New Account</h1>
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
            placeholder="Username"
            id="floatingUsername"
            class="form-control"
          />
          <label for="floatingUsername">Password</label>
        </div>
        <div class="form-floating mb-3">
          <input
            value={credentials.email}
            onChange={(e) =>
              setCredentials({ ...credentials, email: e.target.value })
            }
            placeholder="Username"
            id="floatingUsername"
            class="form-control"
          />
          <label for="floatingUsername">Email</label>
        </div>
        <div class="justify-content-center d-flex align-items-center mb-3">
          <button class="btn btn-primary" onClick={register}>Register</button>
        </div>
        {message}
      </div>
    </div>
  );
}

export default Register;
