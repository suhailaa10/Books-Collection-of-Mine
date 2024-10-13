/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
//import NoImageSelected from "../../assets/no-image-selected.jpg";

function EditBook() {
  const navigate = useNavigate();
  const urlSlug = useParams();
  const baseUrl = `http://localhost:8000/api/books/${urlSlug.slug}`;

  const [bookId, setBookId] = useState("");
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [stars, setStars] = useState(0);
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);
  const [submitted, setSubmitted] = useState("");
  const [image, setImage] = useState("");

  const fetchData = async () => {
    try {
      const response = await fetch(baseUrl);

      if (!response.ok) {
        throw new Error("Failed to fetch data.");
      }

      const data = await response.json();
      setBookId(data._id);
      setTitle(data.title);
      setSlug(data.slug);
      setStars(data.stars);
      setCategories(data.category);
      setDescription(data.description);
      setThumbnail(data.thumbnail);
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();
  }, []);

  const createBook = async (e) => {
    e.preventDefault();
    console.table([title, slug]);

    const formData = new FormData(); //formData is a constructor creates a new 
    //formData object. form Data params "set()" will overwrite all the existing values
    // with new one, whereas, append() will append a new value onto the end of the existing set of values.

    formData.append("bookId", bookId);
    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("stars", stars);
    formData.append("description", description);
    formData.append("category", categories);

    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }

    try {
      const response = await fetch("http://localhost:8000/api/books", {
        method: "PUT",
        body: formData,
      });

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
  };

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
      setThumbnail(e.target.files[0]);
    }
  };

  const removeBook = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:8000/api/books/" + bookId,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        navigate("/books");
        console.log("Book removed.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className=" container text-white">
      {submitted ? (
        <p>Data subitted successfully!</p>
      ) : (
        <form className="bookdetails" onSubmit={createBook}>
          <div className="col-1">  
         
            {image ? (
              <img src={`${image}`} alt="preview image" />
            ) : (
              <img
                src={`http://localhost:8000/uploads/${thumbnail}`}
                alt="preview image" style={{marginTop:"30px"}}
              />
            )}
            
          </div>
          <div className="col-2">
          <button onClick={removeBook} style={{marginTop:"-35px"}} className="btn btn-danger">
        Delete Book
      </button>
          <input className="btn btn-warning" style={{height:"45px",marginTop:"25px"}}
              onChange={onImageChange}
              type="file"
              accept="image/gif, image/jpeg, image/png"
            />
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
              <label>Categories (comma-seperated)</label>
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

export default EditBook;