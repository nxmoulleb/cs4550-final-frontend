import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function Search() {
  const { query } = useParams();
  const [results, setResults] = useState();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState("");
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  const getObjectById = async (id) => {
    try {
      const result = await axios.get(
        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
      );
      return result.data;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const searchAPI = async () => {
      const localSearch = query.replace("-", " ");
      setSearch(localSearch);
      setResults([]);
      setLoading(`Fetching results, please be patient. ${count} found so far`);
      const result = await axios.get(
        `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${localSearch}`
      );
      let resultData = [];
      let localCount = 0;
      if (result.data.objectIDs) {
        for (let i = 0; i < result.data.objectIDs.length; i++) {
          const processed = await getObjectById(result.data.objectIDs[i]);
          if (processed) {
            resultData.push(processed);
            setCount(localCount);
            localCount += 1;
          }
        }
      }
      setResults(resultData);
      setLoading(`Done! Found ${localCount} results for \'${localSearch}\'`);
      setCount(0);
    };

    async function onQueryChange() {
      await searchAPI();
    }
    if (query) {
      setCount(0);
      onQueryChange();
    }
  }, [query]);

  useEffect(() => {
    if (count !== 0) {
      setLoading(`Fetching results, please be patient. ${count} found so far`);
    }
  }, [loading, count]);

  return (
    <div class="d-flex justify-content-center w-100 container">
      <div class="rounded bg-secondary-subtle p-2 w-75">
        <div class="input-group mb-2">
          <input
            type="text"
            defaultValue={search}
            placeholder="Search some art"
            onChange={(e) => setSearch(e.target.value)}
            class="form-control"
            aria-describedby="button-addon2"
          />
          <button
            class="btn btn-secondary"
            id="button-addon2"
            onClick={(e) => navigate(`/search/${search.replace(" ", "-")}`)}
          >
            Search
          </button>
        </div>

        <h3>{loading}</h3>
        {results && results.length > 0 ? (
          <table>
            <thead>
              <tr>
                <td>Name</td>
              </tr>
            </thead>
            <tbody>
              {results.map((object) => {
                return (
                  <tr
                    class="rounded border-2 border-top-0 border-end-0 border-start-0"
                    key={object.objectID}
                  >
                    <a href={`#/details/${object.objectID}`}>
                      <td class="p-2">
                        {object.title}, a {object.objectName} by{" "}
                        {object.artistDisplayName || "Unknown"}
                      </td>
                    </a>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <h4>Search the MET's vast collection</h4>
        )}
      </div>
    </div>
  );
}

export default Search;
