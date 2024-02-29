'use client';
import React from 'react';

export default function Video(){

    return (
      <div className="mx-auto">
        <p className="my-5">
          <b>Video:</b>
        </p>
        <div
          className="bg-light mx-auto border border-2 border-black bg-black"
          style={{ width: "450px", height: "250px" }}
        >
          <video autoPlay controls className='w-full h-full'>
            <source src="//vjs.zencdn.net/v/oceans.mp4" type="video/mp4"/>
          </video>
          
          
        </div>
      </div>
    );
}