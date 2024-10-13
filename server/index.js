require ("dotenv").config(); // This is going to contain all mongodb connection string.
const cors = require ("cors"); // This allows react application to reach server.
const express = require ("express");
const Connectdb = require ('./Connectdb');
const Book = require ('./models/Books');
const multer = require("multer");

const app = express(); // To start the server.
const PORT = process.env.PORT || 8000;

Connectdb();

// Middlewares
app.use(cors()); // Initializing cors.
app.use(express.urlencoded({extended: true})); // The 'extended: true' precise that the 'req.body' object will contain values of any type instead of just strings.
app.use (express.json());
app.use("/uploads", express.static("uploads"));

//Get All Books
app.get("/api/books", async(req,res) => {
    try{
        const category = req.query.category; // We will able to capture category.
    //const stars = req.query.stars;
    const filter = {};
    if(category) {
      filter.category = category;
    }
    const data = await Book.find(filter);
    if (!data) {
      throw new Error("An error occurred while fetching books.");
    }
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching books." });
  }
});

// Get A Single Book
app.get("/api/books/:slug", async (req, res) => {
    try {
      const slugParam = req.params.slug;// This indicates the book of which slug that we choose
      const data = await Book.findOne({ slug: slugParam});
  
      if (!data) {
        throw new Error("An error occurred while fetching a book.");
      }
      
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json({ error: "An error occurred while fetching books." });
    }
  });

  // Create A Book
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + "-" + file.originalname);
  }
})

const upload = multer({ storage: storage })

app.post("/api/books", upload.single("thumbnail")  ,async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.file);

    const newBook = new Book({
      title: req.body.title,
      slug: req.body.slug,
      stars: req.body.stars,
      description: req.body.description,
      category: req.body.category,
      thumbnail: req.file.filename,
    })

    await Book.create(newBook);
    res.json("Data Submitted");
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching books." });
  }
});


// Update A Book
app.put("/api/books", upload.single("thumbnail"), async (req, res) => {
  try {

    const bookId = req.body.bookId;

    const updateBook = {
      title: req.body.title,
      slug: req.body.slug,
      stars: req.body.stars,
      description: req.body.description,
      category: req.body.category,
    }

    if (req.file) {
      updateBook.thumbnail = req.file.filename;
    }

    await Book.findByIdAndUpdate(bookId, updateBook)
    res.json("Data Submitted");
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching books." });
  }
});


app.delete("/api/books/:id", async(req,res) => {
  const bookId = req.params.id;

  try {
    await Book.deleteOne({_id: bookId});
    res.json("How dare you!" + req.body.bookId);
  } catch (error) {
    res.json(error);
  }
});




app.get("/", (req,res) => {
    res.json("Hello!");
});

app.get("*", (req, res) => {
  res.sendStatus("404");
});

app.listen(PORT, () => {
    console.log(`Server is running on Port: ${PORT}`)
});