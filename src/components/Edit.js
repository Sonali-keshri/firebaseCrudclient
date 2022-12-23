import React, { useState, useEffect } from "react";
import {  useNavigate, useParams } from 'react-router-dom';
import { toast} from 'react-toastify';

const Edit = () => {
//   const [getUserdata, setGetUserdata] = useState([]);
//   console.log(getUserdata);

const navigate = useNavigate();

  const [inpVal, setInpVal] = useState({
    name: "",
    email: "",
    age: "",
    mobile: "",
    work: "",
    add: "",
    desc: "",
  });

  const setData = (e) => {
    const { name, value } = e.target;
    setInpVal((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  };
  const toastOptions = {
    position:'bottom-right',
    autoClose:5000,
    pauseOnHover: true,
    draggable:true,
    theme:"dark",
  };


  const { id } = useParams("");
  console.log(id);

  const showdata = async () => {
    // const res = await fetch(`https://firebaseauth-crudapp.herokuapp.com/getuser/${id}`, {
    const res = await fetch(`https://fiirebasecrudserver.onrender.com/getuser/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      alert("error");
      console.log("error ");
    } else {
      setInpVal(data);
      
    }
  };

  useEffect(() => {
    showdata();
  }, []);

  const updateuser =async (e)=>{
    e.preventDefault();
    const {name, email, age, mobile, work, add, desc} = inpVal;
    // const res2 = await fetch(`https://firebaseauth-crudapp.herokuapp.com/updateuser/${id}`, {
    const res2 = await fetch(`https://fiirebasecrudserver.onrender.com/updateuser/${id}`, {
        method:"PATCH",
            headers:{
                "Content-Type": "application/json"
            },
        body: JSON.stringify({
            name, email, age, mobile, work, add, desc
        })
    });

    const data2 = await res2.json();
    console.log(data2);

    if(res2.status === 422 || !data2){
        alert("Please fill the form");
        console.log("error ");
    }else{
        // alert('data Updated');
        toast.success("Updated sucessfully", toastOptions) 
        navigate('/');
    }
  }

  return (
    <div className="container mt-5">
      <form className="row g-3 div-wrapper d-flex justify-content-center align-items-center container-md">
        <div className="col-md-5">
          <label htmlFor="inputname" className="form-label">
            Name
          </label>
          <input
            type="text"
            value={inpVal.name}
            onChange={setData}
            className="form-control"
            name="name"
            id="inputname"
          />
        </div>
        <div className="col-md-5">
          <label htmlFor="inputEmail" className="form-label">
            Email
          </label>
          <input
            type="email"
            value={inpVal.email}
            onChange={setData}
            className="form-control"
            name="email"
            id="inputEmail"
          />
        </div>
        <div className="col-md-5">
          <label htmlFor="inputAge" className="form-label">
            Age
          </label>
          <input
            type="number"
            value={inpVal.age}
            onChange={setData}
            className="form-control"
            name="age"
            id="inputAge"
          />
        </div>
        <div className="col-md-5">
          <label htmlFor="inputMobile" className="form-label">
            Mobile
          </label>
          <input
            type="number"
            value={inpVal.mobile}
            onChange={setData}
            className="form-control"
            name="mobile"
            id="inputMobile"
          />
        </div>

        <div className="col-md-5">
          <label htmlFor="inputWork" className="form-label">
            Work
          </label>
          <input
            type="text"
            value={inpVal.work}
            onChange={setData}
            className="form-control"
            name="work"
            id="inputWork"
          />
        </div>
        <div className="col-md-5">
          <label htmlFor="inputAddress" className="form-label">
            Address
          </label>
          <input
            type="text"
            value={inpVal.add}
            onChange={setData}
            className="form-control"
            name="add"
            id="inputAddress"
          />
        </div>
        <div className="col-md-10">
          <label htmlFor="descriptionArea" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            onChange={setData}
            value={inpVal.desc}
            name="desc"
            id="desctiptionArea"
            rows="5"
          ></textarea>
        </div>
        <div className="d-grid gap-2 col-md-10 mb-5">
          <button className="btn btn-primary" type="button" onClick={updateuser}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
