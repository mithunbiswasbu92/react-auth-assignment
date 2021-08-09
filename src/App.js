 import React, { createContext, useState } from "react";
 import {
   BrowserRouter as Router,
   Switch,
   Route
 } from "react-router-dom";
import SignUp from "./Components/SignUp/SignUp";
import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";
import NotFound from "./Components/NotFound/NotFound";
import Search from "./Components/Search/Search";
import PrivateRoute from './Components/PrivateRoute/PrivateRoute'; 

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({})
  console.log(loggedInUser)
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}> 
    <Router>
      <Header />
      <Switch>
        <Route path="/home">
          <Home></Home>
        </Route>
        <Route path="/signUp">
          <SignUp />
        </Route> 
        <PrivateRoute path="/search">
          <Search></Search>
        </PrivateRoute>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>  
      </Router>
    </UserContext.Provider>
  );
}

export default App;
