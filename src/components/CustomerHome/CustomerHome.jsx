// -----------CustomerHome---------
import React, { useState, useEffect } from "react";
import "./CustomerHome.css";
import WorkerCard from "./WorkerCard";
import Footer from "../Common/Footer";
import Header from "../Common/Header";
import { selectSid } from '../../state/sidSlice'
import { selectUser } from "../../state/userSlice";
import { useSelector, useDispatch } from "react-redux";

import { MdPhone } from 'react-icons/md';
import { MdLocationOn } from 'react-icons/md';
import { MdEmail } from 'react-icons/md';

const CustomerHome = () => {

  const sid = useSelector(selectSid);

  const user = useSelector(selectUser);

  const [worker, setWorker] = useState([]);
  const [order, setOrder] = useState('n');

  const getWorkerData = async (sid, user) => {
    const Data = await fetch("http://localhost:5000/getworkerdata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        sid: sid,
        user: user
      }),
    })
      .then((res) => res.json())
      .then((Data) => {
        setWorker(Data);
      });
  };

  const getWorkerDetails = async (sid, type, user) => {
    const Data = await fetch("http://localhost:5000/getworkerdetails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        sid: sid,
        type: type,
        user: user
      }),
    })
      .then((res) => res.json())
      .then((Data) => {
        setWorker(Data);
      });
  };

  useEffect(() => {
    if (order == 'n')
      getWorkerData(sid, user);
    else
      getWorkerDetails(sid, order, user);


  }, [order]);

  return (
    <>
      <div className="head"></div>
      <div className="main-content">
        <div class="sorting">
          <button class="dropbtn">Sort By</button>
          <div class="dropdown-content">
            <a onClick={async () => { setOrder('rh'); }}>{"Rating (High to Low)"}</a>
            <a onClick={async () => { setOrder('rl'); }}>{"Rating (Low to High)"}</a>
            <a onClick={async () => { setOrder('ph'); }}>{"Price/Hr (High to Low)"}</a>
            <a onClick={async () => { setOrder('pl'); }}>{"Price/Hr (Low to High)"}</a>
            <a onClick={async () => { setOrder('oh'); }}>{"Orders (High to Low)"}</a>
            <a onClick={async () => { setOrder('ol'); }}>{"Orders (Low to High)"}</a>
            <a onClick={async () => { setOrder('eh'); }}>{"Experience (High to Low)"}</a>
            <a onClick={async () => { setOrder('el'); }}>{"Experience (Low to High)"}</a>
          </div>
        </div>
        <div className="card-section">
          <div className="card-content">

            {worker.map((getwr) => (
              <WorkerCard
                name={getwr.WorkerName}
                price={getwr.WorkPrice}
                rating={getwr.AverageRating}
                projects={getwr.Orders}
                about={getwr.workDesc}
                reviewCustName={getwr.ReviewerName}
                review={getwr.Review}
                id={getwr.Username}
              />
            ))}

          </div>
        </div>

        <div className="contact" id="contact">
          <h1>Contact Us</h1>
          <div className="contact-grid">
            <div className="contact-card">
              <MdPhone className="icon" />
              <h2>Phone</h2>
              <p>+92 310 5004239 </p>
              <p>+92 311 4193173 </p>
              <p>+92 333 5759396 </p>
              <p>+92 309 0106401 </p>
            </div>


            <div className="contact-card mid-card">
              <MdLocationOn className="icon" />
              <h2>Address</h2>
              <p>Military College of Signals, NUST</p>
            </div>

            <div className="contact-card ">
              <MdEmail className="icon" />
              <h2>Email</h2>
              <p>mkhattak.bse2021mcs@student.nust.edu.pk</p>
              <p>mhanif.bse2021mcs@student.nust.edu.pk</p>
              <p>zsohail.bse2021mcs@student.nust.edu.pk</p>
              <p>rashraf.bse2021mcs@student.nust.edu.pk</p>
            </div>

          </div>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3324.0709686499017!2d73.06105811505151!3d33.5775065807378!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38df9369c223da7f%3A0xa69202fe0256feee!2sMilitary%20College%20of%20Signals%2C%20NUST!5e0!3m2!1sen!2s!4v1672641895525!5m2!1sen!2s"
            title="Military College of Signals"
            width="100%"
            height="100%"
            style={{ border: '0px' }}
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CustomerHome;