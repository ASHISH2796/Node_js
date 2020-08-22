const faker  = require('faker');
const Post   = require('./models/post');
const cities = require('./cities');

async function seedPosts(){
    await Post.remove({});
    for(const i of new Array(600)) {
        const random1000 = Math.floor(Math.random() * 1000);
        const title = faker.lorem.word();
        const description = faker.lorem.text();
        const postData = {
            title,
            description,
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            geometry: {
                type: 'Point',
                coordinates: [cities[random1000].longitude, cities[random1000].latitude],
            },
            author:{
                '_id' : '5f2e7bcc1e2e0832d85211ad',
                'username' : 'Ashish'
            }
        }
        let post = new Post(postData);
        post.properties.description = `<strong><a href="/post/${post._id}">${title}</a></strong><p>${post.location}</p><p>${description.substring(0, 20)}...</p>`;
        await post.save();
    }
    console.log('600 new posts created');
}

module.exports =seedPosts;