const request = require('supertest');
const app = require('../app');
const jwt = require('jsonwebtoken');
const Usermodel = require('../models/userModel');
const PostModel = require('../models/postModel');
jest.setTimeout(20000);
const testBlog = {
    //creating a random string for the title
    title: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
    //creating a random string for the content
    content: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
    //creating a random string for email
    email: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + '@gmail.com'
}
//testing authentication
describe('Login', () => {
    it('should return a token', () => {
        return request(app)
            .post('/auth/login')
            .send({
                email: '73@gmail.com',
                password: '123'
            })
            .expect(200)
            .then(res => {
                expect(res.header).toHaveProperty('auth-token');
                const decoded = jwt.verify(res.header['auth-token'], process.env.TOKEN);
                expect(decoded.email).toBe('73@gmail.com');
            }
            );
    }
    );
}
);
//testing signup
describe('Signup', () => {
    it('should return a msg if same mail accont exists ', () => {
        return request(app)
            .post('/auth/signUp')
            .send({
                name: "Severus",
                mail: "70@gmail.com",
                password: "123",
                about: "not much lol"
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('message');
                console.log(res.body.message);
                expect(res.body.message).toBe("email already exists");

            }
            );
    }
    );
    it('should return a token if mail doesnt exits ', () => {
        //generating random email
        let mail = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + "@gmail.com";

        return request(app)
            .post('/auth/signUp')
            .send({
                name: "Severus",
                mail: mail,
                password: "123",
                about: "not much lol"
            })
            .expect(200)
            .then(res => {
                //checking if the new object is inserted in monogdb
                Usermodel.findOne({ email: res.body.email })
                    .then(data => {
                        expect(data['email']).toBe(mail);
                    }
                    );

            }
            );

    }
    );
}
);
//getting all the blogs
describe('GET all the blogs', () => {
    it('should return all the blogs', async () => {
        const posts = await PostModel.aggregate([
            { $sort: { like: -1 } },
            { $limit: 10 }
        ]);
        let noOfPosts = posts.length;
        return request(app)
            .get('/blog/')
            .expect(200)
            .then(res => {
                expect(res.body.length).toBe(noOfPosts);
                //expect(true).toBe(true);
                //expect(res.body).toHaveSize(noOfPosts);

            }
            );
    }
    );
}
);
//getting blogs by pagination
describe('GET blogs by pagination', () => {
    it('should return blogs by pagination', async () => {
        const posts = await PostModel.aggregate([
            { $sort: { like: -1 } },
            { $skip: (1 - 1) * 5 },
            { $limit: 5 }
        ]);
        let noOfPosts = posts.length;
        return request(app)
            .get('/blog/1')
            .expect(200)
            .then(res => {
                expect(res.body.length).toBe(noOfPosts);
                //expect(true).toBe(true);
                //expect(res.body).toHaveSize(noOfPosts);

            }
            );
    }
    );
}
);
//posting a blog
describe('POST a blog', () => {
    it('should return a blog', async () => {
        return request(app)
            .post('/blog/')
            .set('auth-token', jwt.sign({ email: testBlog.email,name:'hghg',id:'kl' }, process.env.TOKEN))
            .send({
                userID: "lol",
                userEmail: testBlog.email,
                title: testBlog.title,
                tags: ["tag1", "tag2"],
                content: testBlog.content,
                like: 0,
                dislike: 0,
                moderatedBy: "No one yet moderated",
                lastUpdated: new Date()
            })
            .expect(200)
            .then(res => {
                expect(res.body['title']).toBe(testBlog.title);
                expect(res.body['content']).toBe(testBlog.content);
                expect(res.body['userEmail']).toBe(testBlog.email);
            }
            );
    }
    );
}
);
//updating likes and dislikes
describe('PUT likes and dislikes', () => {
    it('should return a blog', async () => {
        return request(app)
            .patch('/blog/react/62adea1191f60a4c92224432')
            .set('auth-token', jwt.sign({ email: testBlog.email,name:'hghg',id:'kl' }, process.env.TOKEN))
            .send({
                like:true
            })
            .expect(200)
            .then(res => async () => {
                const post=await PostModel.findById('62adea1191f60a4c92224432');
                expect(post['like']).toBe(1);

            }
            );
    }
    );
}
);


