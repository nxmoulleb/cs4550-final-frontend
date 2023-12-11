import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as userClient from "./users/userClient";
import * as collectionsClient from "./collections/collectionsClient";

function SearchUsers() {
  const { query } = useParams();
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [account, setAccount] = useState();
  const [collaberators, setCollaberators] = useState([]);
  const [collabIds, setCollabIds] = useState([]);
  const navigate = useNavigate();

  const addReviewer = async (userId, userName) => {
    console.log();
    if (account) {
      await collectionsClient.updateCollectionCollaberators(
        String(account._id),
        { userId: String(userId), userName: userName }
      );
      const collab = await collectionsClient.getCollectionByUserId(account._id);
      setCollaberators(collab.collaberators);
      let collabIdsLocal = [];
      collab.collaberators.forEach((item) => {
        collabIdsLocal.push(item.userId);
      });
      setCollabIds(collabIdsLocal);
    }
  };

  useEffect(() => {
    const searchAPI = async () => {
      const localSearch = query.replace("-", " ");
      setSearch(localSearch);
    };

    async function onQueryChange() {
      await searchAPI();
    }

    async function updateUsers() {
      const usersTemp = await userClient.findAllUsers();
      setUsers(usersTemp);
    }

    async function updateAccount() {
      const acc = await userClient.account();

      if (acc) {
        const collab = await collectionsClient.getCollectionByUserId(acc._id);
        setCollaberators(collab.collaberators);
        let collabIdsLocal = [];
        collab.collaberators.forEach((item) => {
          collabIdsLocal.push(item.userId);
        });
        setCollabIds(collabIdsLocal);
      }

      setAccount(acc);
    }

    updateUsers();
    updateAccount();

    if (query) {
      onQueryChange();
    }
  }, [query]);

  return (
    <div>
      <input
        type="text"
        defaultValue={search}
        placeholder="Search users"
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        onClick={(e) => navigate(`/search/users/${search.replace(" ", "-")}`)}
      >
        Search
      </button>
      <table>
        <thead>
          <tr>
            <td>Username</td>
            <td>First Name</td>
            <td>Last Name</td>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((object) => {
              return (
                <tr key={object._id}>
                  <a href={`/#/account/${object._id}`}><td>{object.username}</td></a>
                  <td>{object.firstName}</td>
                  <td>{object.lastName}</td>
                  {account &&
                    account._id !== object._id &&
                    !collabIds.includes(String(object._id)) && (
                      <td>
                        <button
                          onClick={async () =>
                            addReviewer(object._id, object.username)
                          }
                        >
                          Make reviewer
                        </button>
                      </td>
                    )}
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default SearchUsers;
