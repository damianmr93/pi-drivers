const server = require("../src/server")
const session = require("supertest")
const request = session(server)
const { Driver, Team } = require("../src/db")

describe("Test de backend", () => {
  describe("GET /drivers/:id", () => {
    it("Responde con status: 200", async () => {
      await request.get("/drivers/1").expect(200)
    })
  })
  describe('GET /drivers', () => {
    it('Responde con status: 200', async () => {
        await request.get('/drivers').expect(200)
    })
  })
  describe('GET /drivers/name?', () => {
    it('Responde con status 200', async () => {
        await request.get('/drivers/name?name=john').expect(200)
    })
  })
  describe('GET /teams', () => {
    it('Responde con status 200', async () => {
        await request.get('/drivers/teams').expect(200)
    })
  })
  describe('GET /teams', () => {
    it('El modelo de teams de la DB debe tener las propiedades "id" y "name"', async () => {
      const props = ['id', 'name']
      const { dataValues: team } = await Team.findByPk(1)
      props.forEach(prop => expect(team).toHaveProperty(prop))
    })
  })
})