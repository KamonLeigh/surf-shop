const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapBoxToken = process.env.MAPBOX_KEY;
const geocodingClient = mbxGeocoding({accessToken: mapBoxToken});
const Post = require('../models/post');
const { cloudinary } = require('../cloudinary');

module.exports = {
    // Posts Index
    async postIndex(req, res, next) {
        const { dbQuery } = res.locals;
        delete res.locals.dbQuery;

        const posts = await Post.paginate(dbQuery, {
            page: req.query.page || 1,
            limit: 10,
            sort:'-_id'
            
        });
        posts.page = Number(posts.page)

        if(!post.docs.length && res.locals.query) {
            res.locals.error = 'No results match that query.';
        }
        res.render('posts/index', {
            posts,
            mapBoxToken,
            title: 'Posts Index'
        });

    },
    // Posts New
    postNew(req, res, next){
        res.render('posts/new');
    },
    // Posts Create
    async postCreate(req, res, next) {
        
        req.body.post.images = [];

        for(const file of req.files){
           
           
           req.body.post.images.push({
                url: file.secure_url,
                public_id: file.public_id
           });
            
        }

        const response = await geocodingClient
                            .forwardGeocode({
                                query: req.body.post.location,
                                limit:1
                            })
                            .send();
        req.body.post.geometry = response.body.features[0].geometry;
        req.body.post.author = req.user._id;
        
        // use req.body to create a new post
       
        let post = new Post(req.body.post);
        post.properties.description = `<strong><a href="/posts/${post._id}">${post.title}</a></strong><p>${post.location}</p><p>${post.description.substring(0, 20)}...</p>`;
        post.save();

        req.session.success = 'Post created successfully';
        res.redirect(`/posts/${post.id}`);
    },
    async postShow(req, res, next){
        
        const post = await Post.findById(req.params.id).populate({
            path: 'reviews',
            options:{sort:{'_id': -1}},
            populate:{
                path:'author',
                model: 'User'
            }
        });

        //const floorRating = post.calculateAvgRating();
        const floorRating = post.avgRating;

        res.render('posts/show', {post, mapBoxToken, floorRating});
    },

    async postEdit(req, res, next){
        res.render('posts/edit');
    },
    async postUpdate(req, res, next){
       
        // destructure post from res.locals
        const { post } = req.locals;

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

              
                    // add images to post.images array
                    post.images.push({
                    url: file.secure_url,
                    public_id: file.public_id
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

             post.geometry = response.body.features[0].geometry
             post.location = req.body.post.location;

         }

        
        // update the post with any new properties
        post.title = req.body.post.title;
        post.description = req.body.post.description;
        post.price = req.body.post.price;
        post.properties.description = `<strong><a href="/posts/${post._id}">${post.title}</a></strong><p>${post.location}</p><p>${post.description.substring(0, 20)}...</p>`;

        // save the updated post to the database 
        await post.save();

        // redirct page
        res.redirect(`/posts/${post.id}`);
    },
    async postDelete(req, res, next){
        const { post } = res.locals;

        for(const image of post.images){

             await cloudinary.v2.uploader.destroy(image.public_id);

        }

        await post.remove();
        req.session.success = 'Post deleted sucessfully!';
        res.redirect('/posts');
    }
}