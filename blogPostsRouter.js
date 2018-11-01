
const express = require("express");
const router = express.Router();

const {BlogPosts} = require("./models");


function lorem(){
    return (
            "lorem laborum deserunt ut sit enim voluptate anim nulla non consequat aliqua. Anim nisi est tempor"
    );
}

BlogPosts.create("10 things -- you won't believe #4", lorem(), "Billy Bob");
BlogPosts.create("Lions and tigers and bears oh my", lorem(), "Lefty Lil");


router.get("/", (req,res)=>{
    res.status(200).json(BlogPosts.get());
});

router.post("/blog-posts", (req,res)=>{
    const requiredFields = ["title", "content", "author"];
    for (let i = 0; i < requiredFields.length; i++){
        const field = requiredFields[i];
        if(!(field in req.body)){
            const msg = `Missing ${field} in request body`
            console.error(msg);
            return res.status(400).send(msg);
        }
    }
    const item = BlogPosts.create(
        req.body.title,
        req.body.content,
        req.body.author
      );
    res.status(201).json(item);
});

router.delete("/:id", (req,res)=>{
    BlogPosts.delete(req.params.id);
    console.log(`Deleted blog post ${req.params.id}`);
    res.status(204).end();
});

router.put("/:id", (req,res) =>{
    const requiredFields = ["title", "content", "author"];
    for (let i = 0; i < requiredFields.length; i++){
        const field = requiredFields[i];
        if(!(field in req.body)){
            const msg = `Missing ${field} in request body`
            console.error(msg);
            return res.status(400).send(msg);
        }
    }
    if(req.params.id !== req.body.id){
        const msg = `Request path id ${req.params.id} and request body id ${req.body.id} must match`;
        console.error(msg);
        return status(400).send(msg);
    }
    console.log(`Updating blog posts ${req.params.id}`);
    const updateItem = BlogPosts.update({
        id: req.params.id,
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        publishDate: req.body.publishDate
    });
    res.status(200).json(updateItem);
});

module.exports = router;
