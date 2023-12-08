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
  };

  if (account && credentials) {
    return (
      <>
        <h1>Editing {account.username}'s page</h1>
        <h2>Info</h2>
        <form>
          <label>
            <h4 style={{ display: "inline" }}>First Name: </h4>
          </label>
          <input
            type="text"
            defaultValue={credentials.firstName}
            onChange={(e) =>
              setCredentials({ ...credentials, firstName: e.target.value })
            }
          />
          <br />
          <label>
            <h4 style={{ display: "inline" }}>Last Name: </h4>
          </label>
          <input
            type="text"
            defaultValue={credentials.lastName}
            onChange={(e) =>
              setCredentials({ ...credentials, lastName: e.target.value })
            }
          />
        </form>
        <h2>Private Info</h2>
        <form>
          <label>
            <h4 style={{ display: "inline" }}>Email: </h4>
          </label>
          <input
            type="text"
            defaultValue={credentials.email}
            onChange={(e) =>
              setCredentials({ ...credentials, email: e.target.value })
            }
          />
          <br />
          <label>
            <h4 style={{ display: "inline" }}>Password: </h4>
          </label>
          <input
            type="text"
            defaultValue={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
          />
        </form>
        <br />
        <button onClick={() => update()}>Save Changes</button>
        <button onClick={() => navigate("/account")}>Back to Profile</button>
      </>
    );
  } else {
    return <h1>Pleaselog in to view this page</h1>;
  }
}

export default AccountEdit;
