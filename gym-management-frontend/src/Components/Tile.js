import React from 'react';
import { Link } from 'react-router-dom';
import './Tile.css';

const Tile = ({ url, svg, name }) => {
    return (
        <Link to={url} className="tile">
            <div className="tile-content">
                <div className="tile-svg">
                        {svg}
                </div>
                <div className="tile-name">
                        <p>{name}</p>
                </div>
            </div>
        </Link>
    );
};

export default Tile;