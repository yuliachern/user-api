const { expect } = require('chai')
let db

describe('Redis', () => {
  
  before(() => {
    db = require('../src/dbClient')
  })
  
  it('should connect to Redis', async () => {
    const response = await db.ping()
    expect(response).to.eql('PONG')
  })
})
