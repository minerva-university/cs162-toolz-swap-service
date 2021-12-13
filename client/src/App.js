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
import SignUp from './auth_pages/Register';
import Login from './auth_pages/Login'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useRouteMatch,
  useParams,
  Redirect,  
} from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Routes>
            <Route element={<HomePage />}  path="/" />
            <Route element={<SearchPage />} path="/SearchPage" />
            <Route element={<About />} path="/About" />
            <Route element={<CreateListing />} path="/CreateListing" />
            <Route element={<CreateRequest />} path="/CreateRequest" />
            <Route element={<EditListing />} path="/EditListing" />
            <Route element={<ListingExpanded />} path="/ListingExpanded" />
            <Route element={<MyListings />} path="/MyListings" />
            <Route element={<MyRequests />} path="/MyRequests" />
            <Route element={<Requests />} path="/Requests" />
            <Route element={<SavedListings />} path="/SavedListings" />
            <Route element={<UserProfile />} path="/UserProfile" />
            <Route element={<SignUp />} path="/signup" />
            <Route element={<Login />} path="/login" />
        </Routes>
      </div>
    )
}}

export default App;