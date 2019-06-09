const should = require('should');
const sinon = require('sinon');
const bookController = require('../controller');

describe('Book controller test', () => {
  describe('Post', () => {
    it('should not allow an empty title on post', () => {
      // eslint-disable-next-line func-names
      const Book = function (book) { this.save = () => { }};
      const req = {
        body: {
          author: 'Tolumide',
        },
      };

      const res = {
        status: sinon.spy(),
        send: sinon.spy(),
        json: sinon.spy(),
      };

      const controller = bookController(Book);
      controller.post(req, res);

      res.status.calledWith(400).should.equal(true, `Bad Status ${res.status.args[0][0]}`);
      res.json.calledWith('Title is required').should.equal(true);
    });
  });
});
