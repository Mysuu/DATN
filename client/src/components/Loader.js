/* eslint-disable no-unused-vars */
import React from 'react'
import { useState } from "react";
import MoonLoader from "react-spinners/MoonLoader";

function Loader() {
    let [loading, setLoading] = useState(true);
    return (
        <div style={{marginTop:'200px'}}>
            <div className="sweet-loading text-center">
                <MoonLoader color='#000' loading={loading} size={60} style={{marin: '2px'}} />
            </div>
        </div>
    )
}

export default Loader
