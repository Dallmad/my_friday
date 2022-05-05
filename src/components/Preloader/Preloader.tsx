import React from 'react';
import preloader from "../../assets/images/loading-buffering.gif";

export const Preloader = () => {
    return (
        <div>
            <img src={preloader} alt="loading" style={{display: 'block', margin: 'auto'}}/>
        </div>
    );
};
