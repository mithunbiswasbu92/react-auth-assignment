import React from 'react';
import './Home.css'
import { Link } from 'react-router-dom';
import img1 from '../../Images/Frame.png';
import img2 from '../../Images/Frame-2.png';
import img3 from '../../Images/Frame-1.png';
import img4 from '../../Images/Group.png';

const Home = () => {
    return (
        <div className="main-div">
            <h1>Choose A Riding Vehicle</h1>
            <div className="sub-div">
                <div className="ride-div">
                    <Link to="search"><img className="ride-div-img" src={img1} alt="" /></Link>
                </div>
                <div className="ride-div">
                    <Link to="search"><img className="ride-div-img" src={img2} alt="" /></Link>
                </div>
                <div className="ride-div">
                    <Link to="search"><img className="ride-div-img" src={img3} alt="" /></Link>
                </div>
                <div className="ride-div">
                    <Link to="search"><img className="ride-div-img" src={img4} alt="" /></Link>
                </div>
            </div>
        </div>
    );
};

export default Home;