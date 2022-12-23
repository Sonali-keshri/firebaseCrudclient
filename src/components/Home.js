import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { toast } from "react-toastify";
import { useUserAuth } from "../context/userAuthContext";
// import { CircularProgress } from "@mui/material";
import load from "../assets/load.gif";

// import {MdEdit, MdVisibility} from 'react-icons/md'
// import {RiDeleteBin5Fill}  from 'react-icons/ri'

const Home = () => {
  const [getUserdata, setGetUserdata] = useState([]);
  const [loader, setLoader] = useState(true);
  console.log(getUserdata);

  const { user, logout } = useUserAuth();
  console.log(user);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error.message);
    }
  };

  const getdata = async () => {
    const res = await fetch(
      // "https://firebaseauth-crudapp.herokuapp.com/getdata",
      "https://fiirebasecrudserver.onrender.com/getdata",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      alert("error");
      console.log("error ");
    } else {
      setGetUserdata(data);
      setLoader(false);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const deleteuser = async (id) => {
    const res2 = await fetch(
      // `https://firebaseauth-crudapp.herokuapp.com/deleteuser/${id}`,
      `https://fiirebasecrudserver.onrender.com/deleteuser/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const deletedata = await res2.json();
    console.log(deletedata);

    if (res2.status === 422 || !deletedata) {
      alert("error");
      console.log("error ");
    } else {
      console.log("user deleted");
      toast.error("User deleted", toastOptions);
      getdata();
    }
  };

  return (
    <>
      {loader ? (
        <div className="loaderBox">
          <img
            src={load}
            alt="loader"
            className="loader"
          />
        </div>
      ) : (
        <div className="mt-3">
          <div className="container">
            <div className="add_Btn mt-3 mb-3">
              <button className="btn btn-primary">
                <Link to="/register" className="addlink">
                  Add data
                </Link>
              </button>
              <button
                className="btn btn-outline-primary my-2 mx-2"
                type="submit"
                onClick={handleLogout}
              >
                Log Out
              </button>
            </div>
            <table className="table">
              <thead>
                <tr className="table-dark">
                  <th scope="col">Id</th>
                  <th scope="col">UserName</th>
                  <th scope="col">Email</th>
                  <th scope="col">Job</th>
                  <th scope="col">Number</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {getUserdata.map((element, id) => {
                  return (
                    <>
                      <tr key={id}>
                        <th scope="row">{id + 1}</th>
                        <td>{element.name}</td>
                        <td>{element.email}</td>
                        <td>{element.work}</td>
                        <td>{element.mobile}</td>
                        <td className="d-flex justify-content-between ">
                          <Link to={`view/${element._id}`}>
                            <button className="btn btn-success button">
                              <VisibilityIcon />
                            </button>
                          </Link>
                          <Link to={`edit/${element._id}`}>
                            <button className="btn btn-primary button">
                              <EditIcon />
                            </button>
                          </Link>
                          <button
                            className="btn btn-danger button"
                            onClick={() => deleteuser(element._id)}
                          >
                            <DeleteForeverIcon />
                          </button>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
