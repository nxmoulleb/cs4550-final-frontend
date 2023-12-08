import { useParams } from "react-router-dom";
import * as userClient from "./users/userClient";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as collectionsClient from "./collections/collectionsClient";

function Account() {
  const { id } = useParams();
  const [account, setAccount] = useState(null);
  const [editButton, setEditButton] = useState(<></>);
  const [collection, setCollection] = useState();
  const navigate = useNavigate();
  const findUserById = async (id) => {
    const user = await userClient.findUserById(id);
    setAccount(user);
  };
  const fetchAccount = async () => {
    const acc = await userClient.account();
    getCollection(acc._id);
    setAccount(acc);
  };
  const signout = async () => {
    await userClient.signout();
    navigate("/");
  };
  const getCollection = async (id) => {
    const coll = await collectionsClient.getCollectionByUserId(id);
    console.log(coll);
    setCollection(coll);
  }


  useEffect(() => {
    if (id) {
      findUserById(id);
      getCollection(id);
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
          <h3>{account.username}'s Collection</h3>
          <table>
            <thead>
              <tr>
                <td>Name</td>
                <td>Artist</td>
              </tr>
            </thead>
            <tbody>
              {collection && collection.itemData.map((item) => {
                return (
                  <tr key={item.objectId}>
                    <td>{item.objectName}</td>
                    <td>{item.artistName}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <>loading</>
      )}
    </>
  );
}

export default Account;
