import { useEffect, useState, useContext } from 'react';
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { faBell, faComment, faEdit, faEnvelope, faPhone, faPlus, faStar } from "@fortawesome/free-solid-svg-icons"; // import the icons you need
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import the FontAwesomeIcon component
import axios from "axios";
import {Modal} from "reactstrap";
import Resizer from 'react-image-file-resizer';
import {toast} from 'react-toastify';
import "../stylesheets/userProfile.css";
import  userAvatar from "../images/userAvatar.jpg";
import {Link} from "react-router-dom";

config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

const UserProfile =()=> {
 const [valuess, setValues]=useState({name:'',username:"", country: '',email:"", phone:0, bio:"", valueStory:"", loading:false})
 const [values, setValuess]=useState({
    "id": 1,
    "username": "test_user_1",
    "first_name": "Mike",
    "last_name": "Tyson",
    "email": "mike@toolz.com",
    "phone": "555-666-7722",
    "address": "16 Turk St.",
    "profile_photo": null,
    "bio": "I am Mike Tyson, The greatest Boxer of all time!!",
    "city": "San Fracisco, CA",
    "saved_places": [],
    "rented_tools": []
})
 const [active, setActive] = useState(1)
 const [showForm, setShowForm] = useState(false)
 const [name, setname] = useState("")
 const [country, setCountry] = useState("")
 const [email, setemail] = useState("")
 const [phone, setphone] = useState("")
 const [bio, setBio] = useState("")
 const [image, setImage]=useState(userAvatar)
 const [imagePreview, setImagePreview]=useState("")
 const [imageLoading, setImageLoading]=useState("")
 const [password, setPassword] = useState('')
 const [showSide, setShowside] = useState(false)
 const submit =async () => {
    try{
      const {data} = await axios.put(`/api/update-profile/${values.email}`, {...values, image})
      toast.success("Profile updated!")
      setShowForm(false)
    }catch(err){
      toast.error(err)
    }
  }

  const handleImage =async(e)=>{

    let file=e.target.files[0]
    setImagePreview(window.URL.createObjectURL(file))
    setImageLoading(true)
    console.log(file)
    Resizer.imageFileResizer(file,720, 500, "JPEG", 100, 0, async(uri)=>{
        try{
            let {data}= await axios.post('/api/upload-dp', {image: uri })
            setValues({...values, loading:false})
            console.log(data)
            setImage(data.Location)
            setImagePreview(data.Location)
            toast.success("Profile image updated!")

        }catch(err){
            console.log(err)
            setValues({...values, loading:false})
            toast.error('Upload failed',err)
        }
    }) 
 }
 
 const changeTab = (index) => {
   setActive(index)
 }

 const handleChange = e=>{setValues({...valuess, [e.target.name] : e.target.value})}

 return (
   <>

   <div className="container">
       <form onSubmit={submit}>
       <Modal  style={{top:20 }} centered visible={showForm} width={1000} footer={false} onCancel={()=> setShowForm(false)}>
       {/* <div className="w-100 mb-3"><Badge count='X' onClick={() => setShowForm(!showForm)} style={{marginLeft:"47vw"}}></Badge></div> */}
       <label htmlFor="name" >Name</label>

       <input type="text" className="form-control" id="name" name="name" value={valuess.name} onChange={handleChange} />
       <label htmlFor="username" >Username</label>
       <input type="text" className="form-control" id="username" name="username" value={valuess.username} onChange={handleChange} />
       <label htmlFor="email">Email</label>
       <input type="email" className="form-control" id="email" name="email" value={valuess.email} onChange={handleChange} />
       <label htmlFor="country">Country</label>
       <input type="text" className="form-control" id="country" name="country"  value={valuess.country} onChange={handleChange}/>
       <label htmlFor="phone">Phone</label>
       <input type="text" className="form-control" id="phone" name="phone" value={valuess.phone} onChange={handleChange} />
       <label htmlFor="bio">Bio</label>
       <textarea id="bio" className="form-control" name="bio" value={valuess.bio} onChange={handleChange} >
       </textarea>
       <label htmlFor="story">Your Unique Story</label>
       <textarea id="story" className="form-control" name="valueStory" value={valuess.valueStory} onChange={handleChange} >
       </textarea>
       <label className = 'btn btn-outline-secondary btn-block test-left mt-3 mb-3'>
           Upload Profile Photo
           <input type='file' name = 'image' onChange={handleImage} accept="image/*" hidden/>
       </label>

       {imagePreview && (<div className='pt-3 pb-3' style={{paddingTop:'10px'}}><img src={imagePreview} alt="profile pic" style={{height:"150px"}}/>
       </div>)}
       <button className="submitProfileBtn"  id="submit" onClick={() => submit()}>   Submit</button>
     </Modal></form>


     <div className="profile-header">
       <div className="profilePageImg">
         <img src={image} alt="Profile picture" className="profileShadow"/>
       </div>
       <div className="profile-nav-info">
         
         <div className="user-bio">
            <h4 className="bio-heading">Name</h4>
            <h4 className="user-name">{values.first_name}&nbsp;{values.last_name}</h4>
         </div>
         <br />
         <div className="user-bio">
            <h4 className="bio-heading">Userame</h4>
            <h4 className="user-name" >{values.username}</h4>
         </div>
         <br />
         <div className="user-bio">
           <h4 className="bio-heading">Location</h4>
         </div>
         <div className="address">
           <p id="state" className="state">Address: {values.address}</p>
         </div>
         <div className="address">
           <p id="state" className="state">City: {values.city}</p>
         </div>
        <br />
        <div className="user-bio">
            <h4 className="bio-heading">Bio</h4>
                <p className="bio">{values.bio}</p>
         </div>


       </div>


       {/* <div className="profile-option">
         <div className="notification">
           <FontAwesomeIcon icon={faBell}></FontAwesomeIcon>
           <span className="alert-message">3</span>
         </div>
       </div> */}
     </div>

     <div className="main-bd">
       <div className="left-side">
         <div className="profile-side">
           <p className="mobile-no">  <FontAwesomeIcon icon={faPhone}></FontAwesomeIcon>&nbsp; {values.phone}</p>
           <p className="user-mail">  <FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon>&nbsp; {values.email}</p>
           {/*<div >
              <h3>Bio</h3>
             <p >
               {bio}
             </p>
           </div> */}


           <div className="profile-btn">
             {/* <button className="chatbtn" id="chatBtn"> <FontAwesomeIcon icon={faComment}></FontAwesomeIcon>&nbsp; Chat</button>
             <button className="createbtn" id="Create-post"> <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>&nbsp; Create</button> */}
           </div>
           <div style={{width:"100%", justifyContent:"center", display:'flex'}}>
           <Link to= {`/UpdateProfile`} >
           
           <button className="updateProfileBtn" id="Create-post" onClick={() => setShowForm(true)}> <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>&nbsp; 
           Update Profile
           </button>
           </Link>
       </div>
         </div>
       </div>
     </div>
   </div>


</>


 )







}



export default UserProfile;