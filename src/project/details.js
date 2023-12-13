import axios from "axios";
import * as userClient from "./users/userClient";
import * as collectionsClient from "./collections/collectionsClient";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Details() {
  const { id } = useParams();
  const [object, setObject] = useState({});
  const [account, setAccount] = useState({});
  const [users, setUsers] = useState();
  const [added, setAdded] = useState(false);

  const addToCollection = async () => {
    if (account) {
      const collection = await collectionsClient.getCollectionByUserId(
        account._id
      );
      const data = {
        objectId: String(id),
        objectName: object.title,
        artistName: object.artistDisplayName,
      };
      let alreadyInCollection = false;
      collection.itemData.forEach((element) => {
        if (element.objectId === String(id)) {
          alreadyInCollection = true;
        }
      });
      if (
        (collection.itemData && !alreadyInCollection) ||
        !collection.itemData
      ) {
        collectionsClient.updateCollectionItems(account._id, data);
      }
    }
    setAdded(true);
    await findObjectInCollections();
  };

  async function findObjectInCollections() {
    const colls = await collectionsClient.findObjectInCollections(id);
    const userData = colls.map((coll) => {
      return { userName: coll.ownerUsername, id: coll.ownerId };
    });
    setUsers(userData);
  }

  useEffect(() => {
    async function updateAccount() {
      const acc = await userClient.account();
      setAccount(acc);
    }

    async function updateObject() {
      const result = await axios.get(
        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
      );
      setObject(result.data);
      console.log(result.data);
    }

    updateObject();
    updateAccount();
    if (!users || added) {
      findObjectInCollections();
      setAdded(false);
    }
  }, [users]);

  return (
    <div class="d-flex justify-content-center w-100 container">
      <div class="w-75 row">
        <div class="col-6 col-md-4 g-2">
          <div class="p-2 rounded bg-secondary-subtle ">
            {account && (
              <button class="btn btn-secondary mb-3" onClick={() => addToCollection()}>
                Add this piece to my collection
              </button>
            )}
            <h3>This piece is in the following users collections</h3>
            <table>
              <tbody>
                {users &&
                  users.map((user) => {
                    return (
                      <tr key={user.id}>
                        <td>
                          <a href={`/#/account/${user.id}`}>{user.userName}</a>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
        <div class="col-12 col-md-8 g-2">
          <div class="p-2 rounded bg-secondary-subtle ">
            <h1>{object.title}</h1>
            <h2>by {object.artistDisplayName || "Unknown"}</h2>
            <img
              src={object.primaryImage || object.primaryImageSmall}
              alt={object.title}
              style={{ width: "75%", height: "75%" }}
            />
            <h3>Info</h3>
            <h4>Dimensions</h4>
            <p>{object.dimensions || 'N/A'}</p>
            <h4>Medium</h4>
            <p>{object.medium || 'N/A'}</p>
            <h4>Date</h4>
            <p>{object.objectDate || 'N/A'}</p>
            <h4>Classification</h4>
            <p>{object.classification || 'N/A'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
