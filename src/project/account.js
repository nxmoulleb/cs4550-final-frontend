import { useParams } from "react-router-dom";
import * as userClient from "./users/userClient";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as collectionsClient from "./collections/collectionsClient";

function Account() {
  const { id } = useParams();
  const [curSession, setCurSession] = useState(null);
  const [account, setAccount] = useState(null);
  const [editButton, setEditButton] = useState(<></>);
  const [collection, setCollection] = useState();
  const [collabIds, setCollabIds] = useState();
  const navigate = useNavigate();

  const findUserById = async (id) => {
    const user = await userClient.findUserById(id);
    setAccount(user);
  };
  const signout = async () => {
    await userClient.signout();
    navigate("/");
  };
  const getCollection = async (id) => {
    const coll = await collectionsClient.getCollectionByUserId(id);
    setCollection(coll);
    const ids = coll.collaberators.map((item) => item.userId);
    setCollabIds(ids);
  };
  const deleteObject = async (objectId) => {
    if (id) {
      await collectionsClient.deleteItemInCollection(id, objectId);
      getCollection(id);
    } else {
      await collectionsClient.deleteItemInCollection(account._id, objectId);
      getCollection(account._id);
    }
  };
  const leaveReview = async () => {
    console.log("fuck you");
  };

  // let useEffectCalls = 0;
  useEffect(() => {
    // useEffectCalls += 1;
    // console.log(useEffectCalls);
    const fetchAccount = async () => {
      const acc = await userClient.account();
      if (acc) {
        await getCollection(acc._id);
        setAccount(acc);
      }
    };

    const fetchCurSession = async () => {
      const session = await userClient.account();
      if(session) {
        setCurSession(session);
      }
    }

    fetchCurSession();

    if (id) {
      findUserById(id);
      getCollection(id);
    } else {
      fetchAccount();
      setEditButton(
        <button onClick={() => navigate("/accountEdit")}>Edit Profile</button>
      );
    }
  }, [id]);

  return (
    <>
      {account ? (
        <div>
          <h1>{account.username}'s Page</h1>
          <h2>Info</h2>
          <h4>First Name: {account.firstName || "N/A"}</h4>
          <h4>Last Name: {account.lastName || "N/A"}</h4>
          {!id && (
            <div>
              {editButton}
              <button onClick={() => signout()}>Sign Out</button>
              <button onClick={() => navigate("/search/users")}>
                Invite Collaberators
              </button>
              <h3>{account.username}'s Collaberators</h3>
              <table>
                <thead>
                  <tr>
                    <td>Username</td>
                  </tr>
                </thead>
                <tbody>
                  {collection.collaberators &&
                    collection.collaberators.map((item) => {
                      return (
                        <tr key={item._id}>
                          <td>
                            <a href={`/#/account/${item.userId}`}>
                              {item.userName}
                            </a>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          )}
          <h3>{account.username}'s Collection</h3>
          <table>
            <thead>
              <tr>
                <td>Name</td>
                <td>Artist</td>
              </tr>
            </thead>
            <tbody>
              {collection &&
                collection.itemData.map((item) => {
                  return (
                    <tr key={item.objectId}>
                      <td>
                        <a href={`/#/details/${item.objectId}`}>
                          {item.objectName}
                        </a>
                      </td>
                      <td>{item.artistName}</td>
                      <td>
                        <button onClick={() => deleteObject(item.objectId)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          {console.log("collabids:", collabIds)}
          {account && console.log('account', account)}
          {id && collabIds && curSession && collabIds.includes(String(curSession._id)) && (
            <button onClick={() => leaveReview()}>Review Collection</button>
          )}
        </div>
      ) : (
        <>Please sign in to view your account</>
      )}
    </>
  );
}

export default Account;
