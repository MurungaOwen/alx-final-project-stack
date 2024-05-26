import { stub } from 'sinon';
import * as chai from 'chai';
import * as chaiHttp from 'chai-http';
import app from '../server.js';
import userModel from '../models/userModel.js';

// Apply chaiHttp middleware
chai.use(chaiHttp);

const { expect } = chai;

describe("Test user endpoints", () => {
    describe("Signup a user `/register`", () => {
        it("returns an error when no firstname or lastname is provided", (done) => {
            const formData = {};
            chai.request(app)
                .post('/register')
                .send(formData)
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('error');
                    done();
                });
        });

        it("returns an error when no phonenumber is provided", (done) => {
            const formData = { "firstname": "test", "lastname": "test" };
            chai.request(app)
                .post('/register')
                .send(formData)
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('error');
                    done();
                });
        });

        it("returns an error when no password is provided", (done) => {
            const formData = { "firstname": "test", "lastname": "test", "phonenumber": "test" };
            chai.request(app)
                .post('/register')
                .send(formData)
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('error');
                    done();
                });
        });

        it("works well for correct data", (done) => {
            const formData = { "firstname": "test", "lastname": "test", "phonenumber": "test", "password": "test" };
            chai.request(app)
                .post('/register')
                .send(formData)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                });
        });

        it("correct output when user was already registered", (done) => {
            const userExistsStub = stub(userModel, "getUserWithPhone").returns(Promise.resolve({})); // Assuming getUserWithPhone returns a Promise

            const formData = { "firstname": "test", "lastname": "test", "phonenumber": "test", "password": "test" };
            chai.request(app)
                .post('/register')
                .send(formData)
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    userExistsStub.restore();
                    done();
                });
        });
    });
});
