const request = require('supertest');
const app = require('../app');
const jwt = require('jsonwebtoken');
const Usermodel = require('../models/userModel');
jest.setTimeout(20000);
//testing authentication
describe('Authentication', () => {
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
        return request(app)
            .post('/auth/signUp')
            .send({
                name: "Severus",
                mail: "newmail@gmail.com",
                password: "123",
                about: "not much lol"
            })
            .expect(200)
            .then(res => {
                //checking if the new object is inserted in monogdb
                Usermodel.findOne({ email: res.body.email })
                    .then(data => {
                        expect(data).toHaveProperty('name');
                        expect(data['email']).toBe('newmail@gmail.com');
                    }
                    );

            }
            );

    }
    );
}
);
