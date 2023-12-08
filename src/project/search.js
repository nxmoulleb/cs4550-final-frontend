import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function Search() {
  const { query } = useParams();
  const [results, setResults] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState("");
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

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
    for (let i = 0; i < result.data.objectIDs.length; i++) {
      const processed = await getObjectById(result.data.objectIDs[i]);
      if (processed) {
        resultData.push(processed);
        setCount(localCount);
        localCount += 1;
      }
    }
    setResults(resultData);
    setLoading(`Done! Found ${localCount} results for \'${localSearch}\'`);
    setCount(0);
  };

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
    console.log("query:", query);
    async function onQueryChange() {
      await searchAPI();
    }
    if (query) {
      onQueryChange();
    }
  }, [query]);

  useEffect(() => {
    if (count !== 0) {
      setLoading(`Fetching results, please be patient. ${count} found so far`);
    }
  }, [loading, count]);

  return (
    <div>
      <label></label>
      <input
        type="text"
        defaultValue={search}
        placeholder="Search some art"
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={(e) => navigate(`/search/${search.replace(" ", "-")}`)}>
        Search
      </button>
      <h1>{loading}</h1>
      <table>
        <thead>
          <tr>
            <td>Name</td>
          </tr>
        </thead>
        <tbody>
          {results.map((object) => {
            return (
              <tr key={object.objectID}>
                <a href={`#/details/${object.objectID}`}>
                  <td>
                    {object.title}, a {object.objectName} by{" "}
                    {object.artistDisplayName || "Unknown"}
                  </td>
                </a>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Search;
