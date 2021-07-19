const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const catRoute = require("./routes/categories");
const multer = require("multer");
const path = require("path")
const cors = require('cors');

dotenv.config()
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
    }).then(console.log("Connected to MongoDB")).catch((err) => console.log(err));

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,"./images")
    },
    filename: (req,file,cb) => {
        cb(null, req.body.name);
    }
});

const upload = multer({storage: storage})

PORT = process.env.PORT || 5000;

app.use(cors());
app.options('*', cors())
app.post('/api/upload', upload.single("file"), (req,res) => res.status(200).json("File has been uploaded"))
app.use(express.json());
app.use('/images', express.static(path.join(__dirname,"images")))
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/posts', postRoute);
app.use('/api/categories',catRoute);


app.listen(PORT, () => console.log("Server has started on port: ", PORT));