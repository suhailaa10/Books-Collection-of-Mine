/* eslint-disable no-unused-vars */

import React, { useState } from "react";
import Harrypotter from "../../../images/unnamed.jpg";


function CreateBook() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [stars, setStars] = useState(0);
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);
  const [submitted, setSubmitted] = useState("");
  const [image, setImage] = useState("");

  const createBook = async (e) => {
    e.preventDefault();
    console.table([title, slug]);


    const formData = new FormData();
    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("stars", stars);
    formData.append("description", description);
    formData.append("category", categories);
    formData.append("thumbnail", thumbnail);

    try {

      const response = await fetch("http://localhost:8000/api/books", {
        method: "POST",
        body: formData,
      });

      // const response = await fetch("http://localhost:8000/api/books", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     title: title,
      //     slug: slug,
      //     stars: stars,
      //     description: description,
      //     category: categories,
      //   }),
      // });

      if (response.ok) {
        setTitle("");
        setSlug("");
        setSubmitted(true);
      } else {
        console.log("Failed to submit data.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategoryChange = (e) => {
    setCategories(e.target.value.split(",").map((category) => category.trim()));
  }


  const onImageChange = (e) => {
    if(e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
      setThumbnail(e.target.files[0]);
    }
  }

  return (
    <div className="container text-white">
      <h1>Create Book</h1>
      {submitted ? (
        <p>Data subitted successfully!</p>
      ) : (
        <form className="bookdetails" onSubmit={createBook}>
          <div className="col-1">
          
           <br/>
            <img style={{marginTop:"30px"}}  src={image} />
          </div>
          <div className="col-2">
          <input className="btn btn-warning" style={{height:"45px",marginTop:"25px"}} 
            onChange={onImageChange}
            type="file" accept="image/gif, image/jpeg, image/png" />
            <div>
              <label>Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <label>Slug</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
              />
            </div>
            
            <div>
              <label>Stars</label>
              <input
                type="text"
                value={stars}
                onChange={(e) => setStars(e.target.value)}
              />
            </div>

            <div>
              <label>Description</label>
              <textarea
                rows="4"
                cols="50"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div>
              <label>Category</label>
              <input
                type="text"
                value={categories}
                onChange={handleCategoryChange}
              />
            </div>

            <input className="btn btn-warning" type="submit" />
          </div>
        </form>
      )}
    </div>
  );
}

export default CreateBook;
