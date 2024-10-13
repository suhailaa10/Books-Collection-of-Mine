/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

function SingleBook() {
  const [data, setData] = useState([]);
  const urlSlug = useParams();
  const baseUrl =  `http://localhost:8000/api/books/${urlSlug.slug}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(baseUrl);

        if (!response.ok) {
          throw new Error("Failed to fetch data.");
        }

        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  function StarRating({ numberOfStars} ) {
    const stars = [];

    for(let i = 0; i < numberOfStars; i++ ) {
      stars.push(<span key={i}>⭐</span>)
    }

    return <div>Rating: {stars}</div>
  }

  return (
    <div className="text-white">
     
    <Link className="btn warning btn-warning" to={"/books"}>🔙 Books</Link>
    <div className="bookdetails">

      <div className="col-1">
      <Link className="btn btn-info"  to={`/editbook/${data.slug}`}>Edit</Link>
        <img src={`http://localhost:8000/uploads/${data?.thumbnail}`}
        alt={data?.title} /><br /><br />
      </div>

      <div className="col-2">
        <h1 >{data?.title}</h1>
        <StarRating numberOfStars={data?.stars} />
        <ul className="container" style={{listStyle:"none",fontWeight:"bold", marginTop:"10px"}}>
          {data?.category?.map((item, index)=> (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <p className="container">{data?.description}</p>
        
      </div>
    </div>
    </div>
  );
}

export default SingleBook;
