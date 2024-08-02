import React, { useContext, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { getProperty, deleteResidency } from "../utils/api";
import { PuffLoader } from "react-spinners";
import { FaShower } from "react-icons/fa";
import { AiTwotoneCar } from "react-icons/ai";
import { MdLocationPin, MdMeetingRoom } from "react-icons/md";
import Map from "../components/Map/Map";
import useAuthCheck from "../hooks/useAuthCheck";
import { useAuth0 } from "@auth0/auth0-react";
import UserDetailContext from "../context/UserDetailContext.js";
import { toast } from "react-toastify";
import "./Property/Property.css";

const MyEstate = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate(); // Add the useNavigate hook
  const id = pathname.split("/").slice(-1)[0];
  const { data, isLoading, isError } = useQuery(["resd", id], () => getProperty(id));
  const { validateLogin } = useAuthCheck();
  const { user } = useAuth0();
  const {
    userDetails: { token },
  } = useContext(UserDetailContext);

  const { mutate: deleteResidencyMutation } = useMutation(
    (id) => deleteResidency(id, token),
    {
      onSuccess: () => {
        toast.success("Deletion successful", { position: "bottom-right" });
        navigate("/my_estates"); // Redirect to "my_estates" page
      },
      onError: (error) => {
        toast.error(`Error: ${error.message}`, { position: "bottom-right" });
      },
    }
  );

  const handleDelete = () => {
    if (validateLogin()) {
      if (window.confirm("Are you sure you want to delete this estate? This action cannot be undone.")) {
        deleteResidencyMutation(id);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="wrapper">
        <div className="flexCenter paddings">
          <PuffLoader />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="wrapper">
        <div className="flexCenter paddings">
          <span>Error while fetching the property details</span>
        </div>
      </div>
    );
  }

  return (
    <div className="wrapper">
      <div className="flexColStart paddings innerWidth property-container">
        <img src={data?.image} alt="home image" />
        <div className="flexCenter property-details">
          <div className="flexColStart left">
            <div className="flexStart head">
              <span className="primaryText">{data?.title}</span>
              <span className="orangeText" style={{ fontSize: "1.5rem" }}>
                $ {data?.price}
              </span>
            </div>
            <div className="flexStart facilities">
              <div className="flexStart facility">
                <FaShower size={20} color="#1F3E72" />
                <span>{data?.facilities?.bathrooms} Bathrooms</span>
              </div>
              <div className="flexStart facility">
                <AiTwotoneCar size={20} color="#1F3E72" />
                <span>{data?.facilities.parkings} Parking</span>
              </div>
              <div className="flexStart facility">
                <MdMeetingRoom size={20} color="#1F3E72" />
                <span>{data?.facilities.bedrooms} Room/s</span>
              </div>
            </div>
            <span className="secondaryText" style={{ textAlign: "justify" }}>
              {data?.description}
            </span>
            <div className="flexStart" style={{ gap: "1rem" }}>
              <MdLocationPin size={25} />
              <span className="secondaryText">
                {data?.address} {data?.city} {data?.country}
              </span>
            </div>
            {/* Booked Users Section */}
            <div className="booked-users">
              <h3>Booked Users:</h3>
              {data?.bookedUsers && data.bookedUsers.length > 0 ? (
                <ul>
                  {data.bookedUsers.map((user, index) => (
                    <li key={index}>{`Email: ${user.email}, Date: ${user.date}`}</li>
                  ))}
                </ul>
              ) : (
                <p>No users have booked this property yet.</p>
              )}
            </div>
            
            <button className="button" onClick={handleDelete}>
              Delete your estate
            </button>
          </div>
          <div className="map">
            <Map address={data?.address} city={data?.city} country={data?.country} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyEstate;
