/* eslint-disable no-unused-vars */
import React, {useState, useEffect } from "react";
import {Link} from "react-router-dom";

function Book () {
    const baseUrl = "http://localhost:8000/api/books";
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError ] = useState(null);
    const [ selectedCategory, setSelectedCategory ] = useState(" ");


    useEffect(() => {
        const fetchData = async () => {
          try {
    
            let url = baseUrl;
            if(selectedCategory) {
              url += `?category=${selectedCategory}`
            }
    
            const response = await fetch(url);
    
            if (!response.ok) {
              throw new Error("Failed to fetch data.");
            }
    
            const jsonData = await response.json();
            setData(jsonData);
            setIsLoading(false);
          } catch (error) {
            console.log(error);
            setError("Error fetching data. Please try again later.");
            setIsLoading(false);
          }
        };
        fetchData();
      }, [selectedCategory]);

      const top = () => {
        window.scrollTo(0,0);
      };

return (
    <div className="bg-warning">
        <h1 className="text-dark" ><b>Books</b></h1>
        <p className=" container text-dark">
        Dive into your collection of cherished books,  where each title tells a story worth sharing. From gripping adventures to heartfelt tales, these are the books that have inspired you. 
        </p>
        <Link to="/CreateBook" className="text-primary "> + Add New Book </Link>

        <div className="filters " >
            <label className="text-dark" > <b>Categories</b></label>
            <select style={{height:"40px"}} className="form-select" aria-label="Default select example" onChange={(e) => setSelectedCategory(e.target.value)}>
                <option  selected value="">All</option>
                <option value="Romance">Romance</option>
                <option value="Science">Science</option>
                <option value="Crime">Crime</option>
                <option value="Food">Food</option>
                <option value="Adventure">Adventure</option>
                <option value="Thriller">Thriller</option>
                <option value="Fiction">Fiction</option>
                <option value="other">other</option>

            </select>
        </div>
        {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul className="books" >
          {data.map((item) => (
            <li key={item._id}>
              <Link to={ `/books/${item.slug}`}>
                <img
                  src={`http://localhost:8000/uploads/${item.thumbnail}`}
                  alt={item.title}
                />
                <h2 className="container text-dark" 
                style={{fontSize:"18px", }}>{item.title}</h2>
              </Link>
            </li>
          ))}
        </ul>
 )}

<button style={{marginRight:"900px"}} onClick={top} className='b-t-top' >Back to Top</button>

    </div>





)

}

export default Book;