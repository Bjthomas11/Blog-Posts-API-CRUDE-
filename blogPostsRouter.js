
const express = require("express");
const router = express.Router();

const {BlogPosts} = require("./models");


function initalText(){
    return (
            "lorem laborum deserunt ut sit enim voluptate anim nulla non consequat aliqua. Anim nisi est tempor"
    );
}

BlogPosts.create("Who is the greatest NBA Player ever?", initalText(), "Brian Thomas");
BlogPosts.create("Why is baseball fading away?", initalText(), "Mike Trout");


router.get("/", (req,res)=>{
    res.json(BlogPosts.get());
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
    blogPosts.delete(req.params.id);
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
    res.status(201).end();
});

module.exports = router;
