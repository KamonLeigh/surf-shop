const Post = require('../models/post');
const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: 'dyzzjvtmd',
    api_key: '211586969937944',
    api_secret: process.env.CLOUDINARY_SECRET
});


module.exports = {
    // Posts Index
    async postIndex(req, res, next) {

        const posts = await Post.find({});
        res.render('posts/index', {posts});

    },
    // Posts New
    postNew(req, res, next){
        res.render('posts/new');
    },
    // Posts Create
    async postCreate(req, res, next) {
        
        req.body.post.images = [];

        for(const file of req.files){
           
            const image = await cloudinary.v2.uploader.upload(file.path);
           
           req.body.post.images.push({
                url: image.secure_url,
                public_id: image.public_id
           });
            
        }
        
        // use req.body to create a new post
        const post = await Post.create(req.body.post);
        res.redirect(`/posts/${post.id}`);
    },
    async postShow(req, res, next){
        const post = await Post.findById(req.params.id);
        res.render('posts/show', {post});
    },

    async postEdit(req, res, next){
        const post = await Post.findById(req.params.id);
        res.render('posts/edit', { post});
    },
    async postUpdate(req, res, next){
        // handle any deletion of existing images
        

        // handle uploading of any new images 
        const post = await Post.findByIdAndUpdate(req.params.id, req.body.post);
        res.redirect(`/posts/${post.id}`);
    },
    async postDelete(req, res, next){
        await Post.findByIdAndRemove(req.params.id);
        res.redirect('/posts');
    }
}