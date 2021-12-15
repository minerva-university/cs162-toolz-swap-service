import { useEffect, useState, useContext } from 'react';
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { faBell, faComment, faEdit, faEnvelope, faPhone, faPlus, faStar } from "@fortawesome/free-solid-svg-icons"; // import the icons you need
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import the FontAwesomeIcon component
import axios from "axios";
import {
    Button,
    Modal,
    ModalFooter,
    Form,
    FormGroup,
    Input,
    Label,
  } from "reactstrap";
  import Resizer from 'react-image-file-resizer';
  import {toast} from 'react-toastify';
  import "../stylesheets/erics.css";
  import  userAvatar from "../images/userAvatar.jpg";

config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

const UserProfile =()=> {
 const [valuess, setValues]=useState({name:'',username:"", country: '',email:"", phone:0, bio:"", valueStory:"", loading:false})
 const [values, setValuess]=useState({name:'Nahom',username:"Nahom@58", country: 'Ethiopia',email:"nahom@gmail.com", phone:5556667744, bio:"I am in cs162", valueStory:"I don't have a story", loading:false})
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
      const {data} = await axios.put(`/api/update-profile/${values.email}`, {...valuess, image})
      toast.success("Profile updated!")
      setShowForm(false)
    }catch(err){
      toast.error(err)
    }
  }
 
  // const getUser = async() =>{
  //     try{
  //       const {data} = await axios.get(`/api/get-profile${asPath}`)
  //       if(data)setValues(data)
  //       if(data && data.image) setImage(data.image)
  //     }catch(err){
  //         console.log(err)
  //     }
  // }
  // console.log(values)

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
         <h3 className="user-name">{values.name}</h3>
         <div className="user-bio">
         <h4 className="bio-heading">Bio</h4>
           <p className="bio">{values.bio}</p>
         </div>
         <div className="address">
           <p id="state" className="state">{values.country}</p>
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
           {/* <div className="user-rating">
             <h3 className="rating">4.5</h3>
             <div className="rate">
               <div className="star-outer">
                 <div className="star-inner">
                   <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                   <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                   <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                   <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                   <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                 </div>
               </div>
               <span className="no-of-user-rate"><span>123</span>&nbsp;&nbsp;reviews</span>
             </div>
           </div>           */}
           <div style={{width:"100%", justifyContent:"center", display:'flex'}}>
           <button className="updateProfileBtn" id="Create-post" onClick={() => setShowForm(true)}> <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>&nbsp; Update Profile</button>
       </div>
         </div>
       </div>
       

       <div className="right-side">
       
         <div className="profile-body">

             <div className="profile-settings tab">
               <div className="account-setting">
                 <h3>User Detail</h3>
                 <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit omnis eaque, expedita nostrum, facere libero provident laudantium. Quis, hic doloribus! Laboriosam nemo tempora praesentium. Culpa quo velit omnis, debitis
                   maxime, sequi animi dolores commodi odio placeat, magnam, cupiditate facilis impedit veniam? Soluta aliquam excepturi illum natus adipisci ipsum quo, voluptatem, nemo, commodi, molestiae doloribus magni et. Cum, saepe enim
                   quam voluptatum vel debitis nihil, recusandae, omnis officiis tenetur, ullam rerum.</p>
               </div>
             </div> 
         </div>
       </div>
     </div>
   </div>


</>


 )







}



export default UserProfile;