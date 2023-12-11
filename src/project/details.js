import axios from "axios";
import * as userClient from "./users/userClient";
import * as collectionsClient from "./collections/collectionsClient";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Details() {
  const { id } = useParams();
  const [object, setObject] = useState({});
  const [account, setAccount] = useState({});

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
      if ((collection.itemData && !alreadyInCollection) || !collection.itemData) {
        collectionsClient.updateCollectionItems(account._id, data);
      }
    }
  };

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
    }
    updateAccount();
    updateObject();
  }, []);

  return (
    <div>
      {account && (
        <button onClick={() => addToCollection()}>
          Add this piece to my collection
        </button>
      )}
      <h1>{object.title}</h1>
      <h2>by {object.artistDisplayName || "Unknown"}</h2>
      <img
        src={object.primaryImage}
        alt={object.title}
        style={{ width: "75%", height: "75%" }}
      />
      <h3>Info</h3>
      <h4>Dimensions</h4>
      <p>{object.dimensions}</p>
      <h4>Medium</h4>
      <p>{object.medium}</p>
      <h4>Date</h4>
      <p>{object.objectDate}</p>
      <h4>Classification</h4>
      <p>{object.classification}</p>
    </div>
  );
}

export default Details;
