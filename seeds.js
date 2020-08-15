const faker  = require('faker');
const Post   = require('./models/post');

async function seedPosts(){
    await Post.remove({});
    for(const i of new Array(40))
    {
        const post ={
            title : faker.lorem.word(),
            description:faker.lorem.text(),
            author:{
                '_id' : '5f2e7bcc1e2e0832d85211ad',
                'username' : 'Ashish'
            }
        }
        console.log(post);
        await Post.create(post);
    }
    console.log("40  data added");
}

module.exports =seedPosts;