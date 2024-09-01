import React from 'react';
import {NavLink} from "react-router-dom";

import Plumber from "../../characters/plumber.jpg";
import Electriacian from "../../characters/electrician1.jpg";
import Carpenter from "../../characters/carpenter1.jpg";
import Mechanic from "../../characters/mechanic.jpg";
import Salon from "../../characters/salon.jpg";
import Painter from "../../characters/painter.jpg";
import Laundry from "../../characters/laundry.jpg";
import Gardener from "../../characters/gardener.jpg";
import PestControl from "../../characters/pest-control.jpg";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSid } from "../../state/sidSlice";
import { Navigate } from "react-router-dom";

const image = (props) => {
    
    if(props== 'Electrician')
    return(
        <>
        <img src={Electriacian} className="serviceCardImage" alt="Electricianimg"/>
        </>
    )
    else if(props == 'Mechanic')
    return(
        <>
           
                <img src={Mechanic} className="serviceCardImage" alt="Electricianimg"/>
        </>
    )

    else if(props == 'Carpenter')
    return(
        <>
           
                <img src={Carpenter} className="serviceCardImage" alt="Electricianimg"/>
        </>
    )

    else if(props == 'Plumber')
    return(
        <>
           
                <img src={Plumber} className="serviceCardImage" alt="Electricianimg"/>
        </>
    )

    else if(props == 'Pest Control')
    return(
        <>
           
                <img src={PestControl} className="serviceCardImage" alt="Electricianimg"/>
        </>
    )

    else if(props == 'Salon')
    return(
        <>
           
                <img src={Salon} className="serviceCardImage" alt="Electricianimg"/>
        </>
    )

    else if(props == 'Laundry')
    return(
        <>
           
                <img src={Laundry} className="serviceCardImage" alt="Electricianimg"/>
        </>
    )

    else if(props == 'Gardener')
    return(
        <>
           
                <img src={Gardener} className="serviceCardImage" alt="Electricianimg"/>
        </>
    )

    else if(props == 'Painter')
    return(
        <>
           
                <img src={Painter} className="serviceCardImage" alt="Electricianimg"/>
        </>
    )
}





const Card = (props) => {

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const changePage = () => {
        dispatch(setSid(props.sid));
        navigate("/CustomerHome");
    }
    


    return(
        <>
            <div className="card">
                    <div className="card-img-container">
                        
                        {image (props.title)}
                    </div>
                    <h2>{props.title}</h2>
                    <p>{props.text}</p>
                    <div className="btnBox">
                        <div className="btn">
                            <div  className = "btnText" onClick={changePage}>See More</div>
                        </div>
                    </div>
                </div>
        </>
    )
}

export default Card;