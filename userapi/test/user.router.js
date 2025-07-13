const app = require('../src/index');
const chai = require('chai');
const db = require('../src/dbClient');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const { expect } = chai;

describe('User REST API', () => {
  beforeEach(async () => {
    await db.flushdb();
  });

  after(async () => {
    await db.quit();
    app.close();
  });

  describe('POST /user', () => {
    it('should create a new user', (done) => {
      const user = {
        username: 'yuliachernova',
        firstname: 'Yulia',
        lastname: 'Chernova',
      };

      chai.request(app)
        .post('/user')
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.status).to.equal('success');
          expect(res).to.be.json;
          done();
        });
    });

    it('should return error on missing username', (done) => {
      const user = { firstname: 'Yulia', lastname: 'Chernova' };

      chai.request(app)
        .post('/user')
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.equal('error');
          expect(res).to.be.json;
          done();
        });
    });
  });

  describe('GET /user/:username', () => {
    it('should retrieve a user', async () => {
      await db.hSet('testuser', { firstname: 'Test', lastname: 'User' });

      const res = await chai.request(app).get('/user/testuser');
      expect(res).to.have.status(200);
      expect(res.body.status).to.equal('success');
      expect(res.body.user.firstname).to.equal('Test');
    });

    it('should return 404 for unknown user', async () => {
      const res = await chai.request(app).get('/user/unknown');
      expect(res).to.have.status(404);
      expect(res.body.status).to.equal('error');
    });
  });

  describe('PUT /user/:username', () => {
    it('should update an existing user', async () => {
      await db.hSet('testuser', { firstname: 'Test', lastname: 'User' });


      const res = await chai.request(app)
        .put('/user/edituser')
        .send({ firstname: 'New', lastname: 'Name' });

      expect(res).to.have.status(200);
      expect(res.body.status).to.equal('success');

      const data = await db.hGetAll('edituser');
      expect(data.firstname).to.equal('New');
    });

    it('should return error when user does not exist', async () => {
      const res = await chai.request(app)
        .put('/user/missinguser')
        .send({ firstname: 'X' });

      expect(res).to.have.status(400);
      expect(res.body.status).to.equal('error');
    });
  });

  describe('DELETE /user/:username', () => {
    it('should delete a user', async () => {
      await db.hSet('testuser', { firstname: 'Test', lastname: 'User' });

      const res = await chai.request(app).delete('/user/todelete');
      expect(res).to.have.status(200);
      expect(res.body.status).to.equal('success');

      const exists = await db.exists('todelete');
      expect(exists).to.equal(0);
    });

    it('should return error when deleting non-existent user', async () => {
      const res = await chai.request(app).delete('/user/nouser');
      expect(res).to.have.status(404);
      expect(res.body.status).to.equal('error');
    });
  });
});
