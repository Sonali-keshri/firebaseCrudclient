import React, {useState, useEffect} from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import profile from "../assets/a.jpg";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import WorkIcon from "@mui/icons-material/Work";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const Details = () => {

  const navigate = useNavigate();
   
  const [getUserdata , setGetUserdata] = useState([]);
  console.log(getUserdata)
  
    const {id} = useParams('');
    console.log(id);


  const getdata = async ()=>{

    const res = await fetch(`https://firebaseauth-crudapp.herokuapp.com/getuser/${id}`, {
        method:"GET",
        headers:{
            "Content-Type": "application/json"
        }
    });

    const data = await res.json();
    console.log(data);

    if(res.status === 422 || !data){
        alert("error");
        console.log("error ");
    }else{
        setGetUserdata(data);
        console.log("Get data");
    }
    
}

useEffect(()=>{
    getdata()
},[])

const toastOptions = {
  position:'bottom-right',
  autoClose:5000,
  pauseOnHover: true,
  draggable:true,
  theme:"dark",
};
const deleteuser = async (id)=>{
  const res2 = await fetch(`/deleteuser/${id}`, {
      method:"DELETE",
      headers:{
          "Content-Type": "application/json"
      }
  });
  const deletedata = await res2.json();
  console.log(deletedata);

  if(res2.status === 422 || !deletedata){
      alert("error");
      console.log("error ");
  }else{
      console.log("user deleted");
      toast.success("User deleted", toastOptions)
      navigate('/');
  }
}

  return (
    <div className="container mt-3 ">
      <h1 style={{ fontwight: 400 }}>Welcome {getUserdata.name}</h1>
      <Card sx={{ maxWidth: 600 }}>
        <CardContent>
          <div className="detailBtn mt-2">
            <Link to={`/edit/${getUserdata._id}`}><button className="btn btn-primary btn-sm mx-2">
              <EditIcon />
            </button></Link>
            <button className="btn btn-danger btn-sm mx-2" onClick={()=>deleteuser(getUserdata._id)} >
              <DeleteForeverIcon />
            </button>
          </div>
          <div className="row ">
            <div className="left_view col-lg-6 col-md-6 col-12">
              <img src={profile} alt="img" className="profileImg" />
              <h4 className="mt-3">
                Name: <span>{getUserdata.name}</span>
              </h4>
              <h5 className="mt-3">
                Age: <span>{getUserdata.age}</span>
              </h5>
              <p className="mt-3">
                <MailOutlineIcon /> Email: <span>{getUserdata.email}</span>
              </p>
              <p>
                <WorkIcon /> Occupation: <span>{getUserdata.work}</span>
              </p>
            </div>
            <div className="right_view col-lg-6 col-md-6 col-12">
              <p className="mt-5">
                <PhoneIphoneIcon />
                Mobile: <span>+91 {getUserdata.mobile}</span>
              </p>
              <p className="mt-3">
                <LocationOnIcon />
                Location: <span>{getUserdata.add}</span>
              </p>

              <p className="mt-3">
                Description: <span>
                {getUserdata.desc}
                </span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Details;
