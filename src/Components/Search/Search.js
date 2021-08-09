import React from 'react';
import './Search.css'; 
import map from '../../Images/Map.png';


const Search = () => {
    return (
        <div className="final-page">
            <div className="direction">
                <form className="road-direction" action="">
                    <label className="input-label" htmlFor="">Pick From:</label>
                    <br />
                    <input type="text" className="input-area" placeholder="Started Destination" required />
                    <br />
                    <label className="input-label" htmlFor="">Pick To:</label>
                    <br />
                    <input type="text" className="input-area" placeholder="Ultimate Destination" required />
                    <br />
                    <input type="submit" className="search-btn" value="Search" />
                </form>
            </div>
            <div className='map-area'>
                 <img className="map-img" src={map} alt="" />
            </div>
        </div>
    );
};

export default Search;