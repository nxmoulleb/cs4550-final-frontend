import { HashRouter } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";
import SignIn from "./project/signin";
import Register from "./project/register";
import Account from "./project/account";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/signin" />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
