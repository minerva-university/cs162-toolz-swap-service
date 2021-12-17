import React, { Component } from "react";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import About from "./pages/About";
import CreateListing from "./pages/CreateListing";
import CreateRequest from "./pages/CreateRequest";
import EditListing from "./pages/EditListing";
import ListingExpanded from "./pages/ListingExpanded";
import MyListings from "./pages/MyListings";
import MyRequests from "./pages/MyRequests";
import Requests from "./pages/Requests";
import SavedListings from "./pages/SavedListings";
import UserProfile from "./pages/UserProfile";
import UpdateProfile from "./pages/UpdateProfile";
import SignUp from './auth_pages/Register';
import Login from './auth_pages/Login'
import LoginFail from './auth_pages/LoginFail'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useRouteMatch,
  useParams,
  Redirect,  
} from "react-router-dom";
import NavBar from "./components/Navbar";
import toolz_logo from "./images/toolz_logo.png";

// <img className="navlogo" alt="logo" src="https://github.com/fsiino/thuro/blob/master/app/assets/images/thuro-logo.png?raw=true"/>

class App extends Component {
  render() {
    return (
      <div className="App">
      <header className="navbar"> 
          <Link to="/">
            <img className="navlogo" alt="logo" src={toolz_logo}/>
          </Link>
        <NavBar/>
      </header>
        <Routes>
            <Route element={<HomePage />}  path="/" />
            <Route element={<SearchPage />} path="/SearchPage" />
            <Route element={<About />} path="/About" />
            <Route element={<CreateListing />} path="/CreateListing" />
            <Route element={<CreateRequest />} path="/CreateRequest" />
            <Route element={<EditListing />} path="/EditListing" />
            <Route element={<ListingExpanded />} path="/ListingExpanded/:tool_id" />
            <Route element={<MyListings />} path="/MyListings" />
            <Route element={<MyRequests />} path="/MyRequests" />
            <Route element={<Requests />} path="/Requests" />
            <Route element={<SavedListings />} path="/SavedListings" />
            <Route element={<UserProfile />} path="/UserProfile" />
            <Route element={<UpdateProfile />} path="/UpdateProfile" />
            <Route element={<SignUp />} path="/signup" />
            <Route element={<Login />} path="/login" />
            <Route element={<LoginFail />} path="/loginfail" />
        </Routes>
      </div>
    )
}}

export default App;