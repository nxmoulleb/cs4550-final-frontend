import { HashRouter } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";
import SignIn from "./project/signin";
import Register from "./project/register";
import Account from "./project/account";
import Search from "./project/search";
import AccountEdit from "./project/accountEdit";
import Home from "./project/home";
import Details from "./project/details";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/"               element={<Home />} />
        <Route path="/signin"         element={<SignIn />} />
        <Route path="/register"       element={<Register />} />
        <Route path="/account"        element={<Account />} />
        <Route path="/account/:id"    element={<Account />} />
        <Route path="/accountEdit"    element={<AccountEdit />} />
        <Route path="/search"         element={<Search />}/>
        <Route path="/search/:query"  element={<Search />}/>
        <Route path="/details/:id"    element={<Details />}/>
      </Routes>
    </HashRouter>
  );
}

export default App;
