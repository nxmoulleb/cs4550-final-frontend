import { useParams } from "react-router-dom";
import * as userClient from "./users/userClient";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as collectionsClient from "./collections/collectionsClient";
import * as reviewClient from "./reviews/reviewsClient";

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
      if (session) {
        setCurSession(session);
      }
    };

    fetchCurSession();

    if (id) {
      findUserById(id);
      getCollection(id);
    } else {
      fetchAccount();
      setEditButton(
        <button
          class={"btn btn-primary p-2 m-1"}
          onClick={() => navigate("/accountEdit")}
        >
          Edit Profile
        </button>
      );
    }
  }, [id]);

  return (
    <div class="d-flex justify-content-center w-100 container">
      {account ? (
        <div class="w-75 row gx-2">
          <div class="col-6 col-md-4">
            <div class="p-2 rounded bg-secondary-subtle ">
              <h1>{account.username}</h1>
              <h2>Info</h2>
              <h5 style={{"display":"inline-block"}}>First Name:</h5> <p style={{"display":"inline-block"}}>{account.firstName || "N/A"}</p>
              <br/>
              <h5 style={{"display":"inline-block"}}>Last Name:</h5> <p style={{"display":"inline-block"}}>{account.lastName || "N/A"}</p>
              {!id && (
                <div>
                  <h3>{account.username}'s reviewers:</h3>
                  {collection.collaberators.length > 0 ? (
                    <table class="w-100">
                      <thead>
                        <tr>
                          <td>
                            <h5>Username</h5>
                          </td>
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
                  ) : (
                    <p>No Collaberators Yet</p>
                  )}
                  <div class="pt-2">
                    {editButton}
                    <button
                      class={"btn btn-danger p-2 m-1"}
                      onClick={() => signout()}
                    >
                      Sign Out
                    </button>
                    <button
                      class={"btn btn-primary p-2 m-1"}
                      onClick={() => navigate("/search/users")}
                    >
                      Invite Collaberators
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div class="col-12 col-md-8 gx-2">
            <div class="p-2 rounded bg-secondary-subtle ">
              <h3>{account.username}'s Collection</h3>
              <table class="w-100">
                <thead>
                  <tr>
                    <td>
                      <h5>Name</h5>
                    </td>
                    <td>
                      <h5>Artist</h5>
                    </td>
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
                          {!id && (
                            <td>
                              <button
                                class={"btn btn-danger p-1"}
                                onClick={() => deleteObject(item.objectId)}
                              >
                                Delete
                              </button>
                            </td>
                          )}
                        </tr>
                      );
                    })}
                </tbody>
              </table>
              {!id && <button class="btn btn-primary" onClick={() => navigate(`/reviews/${account._id}`)}>Check Reviews</button>}
              {id &&
                collabIds &&
                curSession &&
                collabIds.includes(String(curSession._id)) && (
                  <button
                    class={"btn btn-secondary p-2 m-1"}
                    onClick={() => navigate(`/reviews/${id}`)}
                  >
                    Leave a Review
                  </button>
                )}
            </div>
          </div>
        </div>
      ) : (
        <>Please sign in to view your account</>
      )}
    </div>
  );
}

export default Account;
