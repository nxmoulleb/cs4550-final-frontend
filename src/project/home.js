
import { useNavigate } from "react-router-dom";

function Home() {

  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate("/search")}>Look for new art!</button>
      <button onClick={() => navigate("/signin")}>signin</button>
    </div>
  );
}
export default Home;
