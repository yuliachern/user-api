const app = require('../src/index')
const chai = require('chai')
const chaiHttp = require('chai-http').default || require('chai-http')

const db = require('../src/dbClient')

chai.use(chaiHttp)
const { expect } = chai;


describe('User REST API', () => {
  
    beforeEach(() => {
      // Clean DB before each test
      db.flushdb()
    })
    
    after(() => {
      app.close()
      db.quit()
    })

  describe('POST /user', () => {

    it('create a new user', (done) => {
      const user = {
        username: 'yuliachernova',
        firstname: 'Yulia',
        lastname: 'Chernova'
      }
      chai.request(app)
        .post('/user')
        .send(user)
        .then((res) => {
          expect(res).to.have.status(201)
          expect(res.body.status).to.equal('success')
          expect(res).to.be.json
          done()
        })
        .catch((err) => {
           throw err
        })
    })
    
    it('pass wrong parameters', (done) => {
      const user = {
        firstname: 'Yulia',
        lastname: 'Chernova'
      }
      chai.request(app)
        .post('/user')
        .send(user)
        .then((res) => {
          chai.expect(res).to.have.status(400)
          chai.expect(res.body.status).to.equal('error')
          chai.expect(res).to.be.json
          done()
        })
        .catch((err) => {
           throw err
        })
    })
  })

  // describe('GET /user', ()=> {
  //   // TODO Create test for the get method
  // })
})
