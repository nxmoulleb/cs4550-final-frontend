import { useEffect, useState } from "react";
import * as collectionsClient from "./collections/collectionsClient";
import * as userClient from "./users/userClient";

function Home() {
  const [collections, setCollection] = useState([]);
  const [account, setAccount] = useState();
  const [reviewerCollections, setReviewerCollections] = useState();

  useEffect(() => {
    const getRecentCollections = async () => {
      const colls = await collectionsClient.findRecentCollections();
      setCollection(colls);
    };

    const getAccount = async () => {
      const acc = await userClient.account();
      if (acc) {
        setAccount(acc);
        const colls = await collectionsClient.findReviewerCollections(
          String(acc._id)
        );
        setReviewerCollections(colls);
      }
    };

    getRecentCollections();
    getAccount();
  }, []);

  return (
    <div>
      {account && <h1 class="p-2 text-center">Welcome to Collectr, {account.username}!</h1>}
      <div class="d-flex justify-content-center w-100 container">
        <div class={`row gx-2 w-75`}>
          {account && (
            <div class="col-6 col-md-4">
              <div class="p-2 rounded bg-secondary-subtle ">
                <h3>Collections you review</h3>
                {reviewerCollections ? (
                  <table class="w-100">
                    <thead>
                      <tr>
                        <td>
                          <h5>Username</h5>
                        </td>
                        <td>
                          <h5>Collection Size</h5>
                        </td>
                      </tr>
                    </thead>
                    <tbody>
                      {reviewerCollections.map((item) => {
                        return (
                          <tr key={item._id}>
                            <td>
                              <a href={`/#/account/${item.ownerId}`}>
                                {item.ownerUsername}
                              </a>
                            </td>
                            <td>{item.itemData.length}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                ) : (
                  <h4>You have not been invited to review any collections</h4>
                )}
              </div>
            </div>
          )}
          <div
            class={`${
              !account ? "w-100" : "col-12 col-md-8"
            } rounded bg-secondary-subtle`}
          >
            <div class="p-2 rounded bg-secondary-subtle ">
              <h3>Recently Active Collections</h3>
              <table class="w-100">
                <thead>
                  <tr>
                    <td>
                      <h5>Username</h5>
                    </td>
                    <td>
                      <h5>Collection Size</h5>
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {collections.map((item) => {
                    return (
                      <tr key={item._id}>
                        <td>
                          <a href={`/#/account/${item.ownerId}`}>
                            {item.ownerUsername}
                          </a>
                        </td>
                        <td>{item.itemData.length}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;
