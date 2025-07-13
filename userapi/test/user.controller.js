const { expect } = require('chai') 
const userController = require('../src/controllers/user')
const db = require('../src/dbClient')

describe('User', () => {
  beforeEach(async () => {
    
    await db.flushdb()
  })

  describe('Create', () => {

    it('create a new user', async () => {
      const user = {
        username: 'yuliachernova',
        firstname: 'Yulia',
        lastname: 'Chernova'
  }

  await new Promise((resolve, reject) => {
    userController.create(user, (err, result) => {
      try {
        expect(err).to.be.equal(null)
        expect(result).to.be.equal('OK')
        resolve()
      } catch (e) {
        reject(e)
      }
    })
  })
})


    it('passing wrong user parameters', (done) => {
      const user = {
        firstname: 'Yulia',
        lastname: 'Chernova'
      }
      userController.create(user, (err, result) => {
        expect(err).to.not.be.equal(null)
        expect(result).to.be.equal(null)
        done()
      })
    })

    
  })
})
