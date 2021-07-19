const router = require("express").Router();
const Category = require("../models/Category");

//CREATE
router.post("/", async (req,res) => {
    const newCat = new Category(req.body);
    try{
        const savedCat = await newCat.save();
        res.status(200).json(savedCat);
    } catch(err){
        res.status(500).json(err);
    }
});

//DELETE
router.delete("/:id", async (req,res) => {
    const cat = await Category.findById(req.params.id);
    try{
        cat.delete();
        res.status(200).json("Category has been deleted");
    }catch(err){
        res.status(500).json(err);
    }
});

//GET ALL CATEGORIES
router.get("/", async (req,res) => {
    try{
        const cats = await Category.find();
        res.status(200).json(cats);
    } catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;
