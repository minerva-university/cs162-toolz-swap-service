import React from 'react'
import "../stylesheets/createListing.css";

const UpdateProfile = () => {
    return (
        <div>
        <form className="tool-create-form-container" onSubmit={""}>

        <h3 className="tool-create-banner-text">
            Update your Profile
        </h3>

      <br/><br/>
                

      <label>Username
        <input type="text" placeholder="Username" value={""} onChange={""}></input>
      </label>
      <label>Full Name
        <input type="text" placeholder="Full Name" value={""} onChange={""}></input>
      </label>
      <label>Address
        <input type="text" placeholder="Address" value={""} onChange={""}></input>
      </label>
      <label>City
        <input type="text" placeholder="City" value={""} onChange={""}></input>
      </label>
      <label>Phone
        <input type="text" placeholder="Phone" value={""} onChange={""}></input>
      </label>
      <label>Email
        <input type="text" placeholder="Email" value={""} onChange={""}></input>
      </label>
      <label>Bio
        <input type="text" placeholder="Bio" value={""}></input>
      </label>
      <h2>Add a Photo</h2>
      <br/>
      <input type="file" onChange={"e => this.setState({ photos: e.target.files })"} multiple />

      <br/>

      <div className="tool-create-errors">
        {"this.renderErrors()"}
      </div>

      <input className="tool-create-submit-btn" type="submit" value="Submit"/>

      </form>
        </div>
    )
}

export default UpdateProfile
