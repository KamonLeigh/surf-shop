const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const geocodingClient = mbxGeocoding({accessToken: process.env.MAPBOX_TOKEN});
const Post = require('../models/post');
const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: 'dyzzjvtmd',
    api_key: '211586969937944',
    api_secret: process.env.CLOUDINARY_SECRET
});

const mapToken = process.env.MAPBOX_KEY;


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

        const response = await geocodingClient
                            .forwardGeocode({
                                query: req.body.post.location,
                                limit:1
                            })
                            .send();
        req.body.post.coordinates = response.body.features[0].geometry.coordinates
        
        // use req.body to create a new post
        const post = await Post.create(req.body.post);
        res.redirect(`/posts/${post.id}`);
    },
    async postShow(req, res, next){
        const post = await Post.findById(req.params.id);
        res.render('posts/show', {post, mapToken});
    },

    async postEdit(req, res, next){
        const post = await Post.findById(req.params.id);
        res.render('posts/edit', { post});
    },
    async postUpdate(req, res, next){
       
        // find the post by the id
        const post = await Post.findById(req.params.id);

        // check if there's any images for deletions
        if(req.body.deleteImages && req.body.deleteImages.length){
            
            // assign deleteImages from req.body to its own variable
            const deleteImages = req.body.deleteImages;

          
            // loop over deleteImages 
            for(const public_id of deleteImages){
               

                // delete images from cloudnary
                 await cloudinary.v2.uploader.destroy(public_id);

                // delete image from post.images 

           

                for(const image of post.images){

                    if(image.public_id === public_id){
                        
                        const index = post.images.indexOf(image);

                        post.images.splice(index, 1);

                    }
                }
            }

        }

        // check if there are any new images for upload
        if(req.files){

            for (const file of req.files) {

                const image = await cloudinary.v2.uploader.upload(file.path);
                    // add images to post.images array
                    post.images.push({
                    url: image.secure_url,
                    public_id: image.public_id
                });

            }

        }

        // check if location was updated
         if(req.body.post.location !== post.location){

              const response = await geocodingClient
                  .forwardGeocode({
                      query: req.body.post.location,
                      limit: 1
                  })
                  .send();

             post.coordinates = response.body.features[0].geometry.coordinates
             post.location = req.body.post.location;

         }

        
        // update the post with any new properties
        post.title = req.body.post.title;
        post.description = req.body.post.description;
        post.price = req.body.post.price;

        // save the updated post to the database 
        post.save();

        // redirct page
        res.redirect(`/posts/${post.id}`);
    },
    async postDelete(req, res, next){
        const post = await Post.findById(req.params.id);

        for(const image of post.images){

             await cloudinary.v2.uploader.destroy(image.public_id);

        }

        await post.remove();
        res.redirect('/posts');
    }
}