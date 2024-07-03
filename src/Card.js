import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function Card({ videoData }) {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    if (videoData && videoData.links) {
      setLinks(videoData.links);
    }
  }, [videoData]);

console.log(videoData)
  return (
    <>
      <div className="card" style={{ width: "24rem" }} >
        <img
        key={videoData.title}
          className="card-img-top"
          src={videoData.thumbnail}
          alt="Card imag cap"
        />
        <div className="card-body">
          <h5 className="card-title" >Title: {videoData.title}</h5>
          <h5 className="card-title">Author: {videoData.author}</h5>
          <h5 className="card-title">Video Time: {videoData.lengthSeconds}</h5>
          {links.map((link, index) => (
            <>
            <div key={index}>
              <hr/>
              <p className="card-text" align='center'> {index+1}</p>
              <p className="card-text">Size: {link.size}</p>
              <p className="card-text">Quality: {link.quality}</p>
             Download Link: <a key={index} href={link.link} target="_blank" onClick={()=>toast.success("Downloading start...")} rel="noreferrer">
                {link.link.split("=")[0]}
              </a>
              </div>
            </>
          ))}
        
        </div>
      </div>
    </>
  );
}

export default Card;
