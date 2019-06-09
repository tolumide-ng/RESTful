require('should');
const request = require('supertest');
const mongoose = require('mongoose');

process.env.ENV = 'test';

const app = require('./../app');

const Book = mongoose.model('Book');
const agent = request.agent(app);

describe('Book CRUD test', () => {
  it('Should allow book to be posted and return read and _id', (done) => {
    const bookpost = { title: 'Think Big', genre: 'Life', author: 'Ben Carson' };

    agent.post('/api/books')
      .send(bookpost)
      .expect(200)
      .end((err, result) => {
        result.body.theBook.should.have.property('_id');
        // console.log(result.body);
        done();
      });
  });

  afterEach((done) => {
    Book.deleteMany({}).exec();
    done();
  });

  after((done) => {
    mongoose.connection.close();
    app.server.close(done);
  });
});
