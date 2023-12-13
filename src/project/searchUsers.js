import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as userClient from "./users/userClient";
import * as collectionsClient from "./collections/collectionsClient";

function SearchUsers() {
  const { query } = useParams();
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [account, setAccount] = useState();
  const [collabIds, setCollabIds] = useState([]);
  const navigate = useNavigate();

  const addReviewer = async (userId, userName) => {
    if (account) {
      await collectionsClient.updateCollectionCollaberators(
        String(account._id),
        { userId: String(userId), userName: userName }
      );
      const collab = await collectionsClient.getCollectionByUserId(account._id);
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
      const filtered = usersTemp.filter(
        (user) =>
          user.username.includes(search) ||
          (user.firstName && user.firstName.includes(search)) ||
          (user.lastName && user.lastName.includes(search)) ||
          user.email.includes(search)
      );
      setUsers(filtered);
    }

    async function updateAccount() {
      const acc = await userClient.account();

      if (acc) {
        const collab = await collectionsClient.getCollectionByUserId(acc._id);
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
    <div class="d-flex justify-content-center w-100 container">
      <div class="rounded bg-secondary-subtle p-2 w-75">
        <div class="input-group mb-2">
          <input
            type="text"
            defaultValue={search}
            placeholder="Search users"
            onChange={(e) => setSearch(e.target.value)}
            class="form-control"
            aria-describedby="button-addon2"
          />
          <button
            class="btn btn-secondary"
            id="button-addon2"
            onClick={(e) =>
              navigate(`/search/users/${search.replace(" ", "-")}`)
            }
          >
            Search
          </button>
        </div>
        <table class="w-100">
          <thead>
            <tr>
              <td class="p-1" style={{"padding-right": 10}}><h4>Username</h4></td>
              <td class="p-1" style={{"padding-right": 10}}><h4>First Name </h4></td>
              <td class="p-1" style={{"padding-right": 10}}><h4>Last Name</h4></td>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((object) => {
                return (
                  <tr key={object._id}>
                    <td class="p-1">
                      <a href={`/#/account/${object._id}`}>{object.username}</a>
                    </td>
                    <td class="p-1">{object.firstName}</td>
                    <td class="p-1">{object.lastName}</td>
                    {account &&
                      account._id !== object._id &&
                      !collabIds.includes(String(object._id)) && (
                        <td>
                          <button
                            onClick={async () =>
                              addReviewer(object._id, object.username)
                            }
                            class="btn btn-secondary p-1 m-1"
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
    </div>
  );
}

export default SearchUsers;
