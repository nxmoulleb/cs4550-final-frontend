import * as userClient from "./users/userClient";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AccountEdit() {
  const [account, setAccount] = useState(null);
  const [credentials, setCredentials] = useState(account);
  const navigate = useNavigate();
  const fetchAccount = async () => {
    const account = await userClient.account();
    setAccount(account);
    setCredentials(account);
  };

  useEffect(() => {
    fetchAccount();
  }, []);

  const update = async () => {
    await userClient.updateUser(credentials);
    navigate("/account")
  };

  if (account && credentials) {
    return (
      <div class="d-flex justify-content-center w-100 container">
        <div class="rounded bg-secondary-subtle p-2 w-50">
          <h1>Editing {account.username}'s Information</h1>
          <h2>Public Info</h2>

          <div class="input-group">
            <span class="input-group-text">First Name:</span>
            <input
              type="text"
              defaultValue={credentials.firstName}
              onChange={(e) =>
                setCredentials({ ...credentials, firstName: e.target.value })
              }
              class="form-control"
            />
          </div>

          <div class="input-group">
            <span class="input-group-text">Last Name:</span>
            <input
              type="text"
              defaultValue={credentials.lastName}
              onChange={(e) =>
                setCredentials({ ...credentials, lastName: e.target.value })
              }
              class="form-control"
            />
          </div>

          <h2>Private Info</h2>
          <div class="input-group">
            <span class="input-group-text">Email:</span>
            <input
              type="text"
              defaultValue={credentials.email}
              onChange={(e) =>
                setCredentials({ ...credentials, email: e.target.value })
              }
              class="form-control"
            />
          </div>
          <div class="input-group">
            <span class="input-group-text">Password:</span>
            <input
              type="text"
              defaultValue={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              class="form-control"
            />
          </div>
          <br />
          <button class="btn btn-primary" onClick={() => update()}>Save Changes</button>
          <button class="btn btn-danger" onClick={() => navigate("/account")}>Cancel Changes</button>
        </div>
      </div>
    );
  } else {
    return <h1>Pleaselog in to view this page</h1>;
  }
}

export default AccountEdit;
