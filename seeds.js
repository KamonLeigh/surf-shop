const faker = require('faker');
const Post = require('./models/post');


async function seedPosts(){
    await Post.remove({});

    for(const i of new Array(40)){

        const post = {
            title: faker.lorem.word(),
            description: faker.lorem.text(),
            coordinates: [-122.0842499, 37.4224764],
            author: {
                '_id': '5c9667781256602bf51a12bc',
                'username': 'ian',

            }   
        }

        await Post.create(post);
    }
    console.log('40 new posts created');
}

module.exports = seedPosts;