import React from "react";
import { useState } from "react";
import { MdLensBlur, MdMotionPhotosPause, MdStarRate } from "react-icons/md";
import profile from "../../characters/profile1.jpg";
import "./WorkerCard.css";
import Calendar from "react-calendar";
import { selectUser } from "../../state/userSlice";
import { useSelector, useDispatch } from "react-redux";



const WorkerCard = (props) => {
  const [modal, setModal] = useState(false);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState();
  const [numofhr, setNumOfHr] = useState();
  const [booking, setBooking] = useState([]);
  const [options, setOptions] = useState([]);
  let rat, rev;
  if (props.rating == null)
    rat = 'No Ratings Yet'
  else rat = props.rating

  if (props.review == null)
    rev = 'No Reviews Yet'
  else rev = props.review


  const user = useSelector(selectUser);
  let op = []

  const getWorkerBooking = async () => {
    const Data = await fetch("http://localhost:5000/getWorkerBookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        date: date.toDateString(),
        id: props.id
      }),
    })
      .then((res) => res.json())
      .then(async (Data) => {
        await Data.map((booking) => {
          booking.BookDate = booking.BookDate.split('T')[0];
          booking.BookTime = booking.BookTime.split('T')[1];
          booking.BookTime = booking.BookTime.split('.')[0];
          booking.EndTime = booking.EndTime.split('T')[1];
          booking.EndTime = booking.EndTime.split('.')[0];
        }
        )
        setOptions([])
        op = [];
        let i;
        let t;

        for (i = 8; i <= 19; i++) {
          if (i < 10)
            t = `0${i}:00:00`
          else
            t = `${i}:00:00`
          if (Data.length != 0) {
            Data.map((booking) => {
              if ((booking.EndTime <= t) || (booking.BookTime > t)) {
                op.push(t);
              }
            })
          }
          else {
            op.push(t)
          }

        }
        setOptions(op)

      });
  };

  const saveBooking = async (url, id, time, date, user, hrs) => {
    const Data = await fetch("http://localhost:5000/savebooking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        id: id,
        time: time,
        date: date.toDateString(),
        user: user,
        hrs: hrs
      }),
    })
      .then((res) => res.json())
      .then(async (Data) => {
      });
  };


  const handleChangeTime = (time) => {
    setTime(time.target.value);
  };
  const handleChangehrs = (numofhr) => {
    setNumOfHr(numofhr.target.value);
  };
  const onChange = async date => {
    setDate(date);
    await getWorkerBooking("http://localhost:5000/getWorkerBooking");
  };
  const showPopup = () => {
    setModal(!modal);
  };
  const saveBookingButton = async () => {
    showPopup();
    await saveBooking("http://localhost:5000/savebooking", props.id, time, date, user, numofhr);

  };



  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  return (
    <>
      <div className="main-div">
        <div className="worker-card">
          <div className="left-side">
            <div className="worker-img">
              <img src={profile}></img>
            </div>
            <div className="btn-box">
              <div className="btn">
                <div className="btnText" onClick={showPopup}>
                  Hire Me
                </div>
              </div>
            </div>
          </div>
          <div className="right-side">
            <div className="right-top">
              <h1 className="price">${props.price}/ hr</h1>
              <h1 className="rname">{props.name} </h1>
              <p className="star">
                <div className="staricon">
                  <MdStarRate />
                </div>
                <p>{rat}</p>
              </p>
              <p className="projects">Total projects: {props.projects}</p>
            </div>

            <div className="right-about">
              <h2>Know About Me</h2>
              <p>{props.about}</p>
            </div>

            <div className="right-review">
              <h2>Reviews</h2>
              <div className="review-content">
                <div className="review-img">
                  <img src={profile}></img>
                </div>
                <div className="review-review">
                  <h3>{props.reviewCustName}</h3>
                  <p>{rev}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {modal && (
        <div className="modal">
          <div className="popup-div" id="popup">
            <div className="popup-box">
              <div className="some-text">
                <h2>Choose Your task date and start time:</h2>
              </div>
              <div className="inner-content">
                <div className="col1">
                  <div className="name-pic">
                    <div className="image-part">
                      <img src={profile}></img>
                    </div>
                    <div className="name-part">
                      <h2>{props.name}</h2>
                    </div>
                  </div>
                  <div className="select-date">
                    <h3>Select date</h3>
                  </div>
                  <div className="calendar">
                    <div>
                      <Calendar onChange={onChange} value={date}></Calendar>
                    </div>
                  </div>
                  <form>
                    <div className="timing-slot">
                      <label name="lbl">
                        <select className="options" name="op" id="opt" onChange={handleChangeTime}>
                          <option selected value="select">
                            Select timing
                          </option>
                          {
                            options.map((op) => {
                              return (
                                <option value={op}>{op}</option>
                              )
                            })
                          }
                        </select>
                      </label>
                      <label name="lbl1">
                        <select className="options" name="op1" id="opt" onChange={handleChangehrs}>
                          <option selected value="select1">
                            Number Of Hours
                          </option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>

                        </select>
                      </label>
                    </div>
                  </form>
                </div>

                <div className="col-2">
                  <div className="reqtext">
                    <h3 className="req-text">Request for :</h3>
                    <div className="show-date-time">
                      <h4>Date</h4>
                      <p
                        className="date"
                        style={{ backgroundColor: "#9A2727" }}
                      >
                        {date.toDateString()}
                      </p>
                      <h4>Time</h4>
                      <p>{time}</p>
                    </div>
                  </div>
                  <div className="confirm">
                    <div className="confirm-btn">
                      <button className="bconfirm" onClick={saveBookingButton}>
                        Confirm
                      </button>
                    </div>
                  </div>
                </div>

                <button className="close-modal" onClick={showPopup}>
                  CLOSE
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WorkerCard;