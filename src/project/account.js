import { useParams } from "react-router-dom";
import * as client from "./users/userClient";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Account() {
  const { id } = useParams();
  const [account, setAccount] = useState(null);
  const [editButton, setEditButton] = useState(<></>);
  const navigate = useNavigate();
  const findUserById = async (id) => {
    const user = await client.findUserById(id);
    setAccount(user);
  };
  const fetchAccount = async () => {
    const account = await client.account();
    setAccount(account);
  };
  const signout = async () => {
    await client.signout();
    navigate("/")
  }

  useEffect(() => {
    if (id) {
      findUserById(id);
    } else {
      fetchAccount();
      setEditButton(
        <button onClick={() => navigate("/accountEdit")}>Edit Profile</button>
      );
    }
  }, [account, id, navigate]);

  return (
    <>
      {account ? (
        <div>
          <h1>{account.username}'s Page</h1>
          <h2>Info</h2>
          <h4>First Name: {account.firstName || "N/A"}</h4>
          <h4>Last Name: {account.lastName || "N/A"}</h4>
          <h2>Work</h2>
          {editButton}
          <button onClick={() => signout()}>Sign Out</button>
        </div>
      ) : (
        <>loading</>
      )}
    </>
  );
}

export default Account;
