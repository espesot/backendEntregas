import { describe, before, after, it, beforeEach} from 'mocha'
import mongoose from 'mongoose'
import supertest from 'supertest'
import chai from 'chai'
import dbConnect from '../configs/db.config.js'

const expect = chai.expect

const resqueter = supertest('http://localhost:3000')

const mockUser = {
  firstName: 'user',
  lastName: 'user',
  email: 'admin@admin.com',
  age:'20',
  password: '111111'
} 

const mockProduct = {
  title: 'Producto1',
  description: 'Prodcuto1 descripcion',
  code: 'ASFE243',
  price:10,
  status: true,
  stock: 10,
  category: 'A1',
  thumbnails: ['./img/imagen1.jpg', './img/imagen2.jpg']
}

let cookie = {}

describe('Test Ecommerce',()=>{
  before(async()=>{
    await dbConnect()
  })

  beforeEach(async()=>{
    await mongoose.connection.collection('users').deleteMany({})
    await mongoose.connection.collection('prodcuts').deleteMany({})
    await mongoose.connection.collection('carts').deleteMany({})
  })

  after(async()=>{
    mongoose.connection.close()
  })

  describe('Users',()=>{
    it('Crear Usuario',async()=>{
      const{statusCode, ok, _body} = await resqueter.post('/api/users').send(mockUser)
      expect(statusCode).to.equal(201)
      expect(ok).to.be.true
      expect(_body.status).to.be.equal('success')
    })

    it('Get Users',async()=>{
      await resqueter.post('/api/users').send(mockUser)
      const{statusCode, ok, _body} = await resqueter.get('/api/users?email=admin@admin.com')
      expect(statusCode).to.equal(200)
      expect(ok).to.be.true
      expect(_body.status).to.be.equal('success')
      expect(_body.user.firstName).to.be.equal(mockUser.firstName)
    })
  })

  describe('Sessions',()=>{
    it('Login', async () =>{
      await resqueter.post('/api/users').send(mockUser)
      const{statusCode, ok, headers} = await resqueter.post('/api/auth/login').send({
        email: mockUser.email,
        password: mockUser.password
      })
      const split = headers['set-cookie'][0].split('=')
      cookie = {
        name:split[0],
        token:split[1]
      }
      expect(statusCode).to.equal(200)
      expect(ok).to.be.true
      expect(cookie.token).to.be.ok      
    })

    it('Session activa',async()=>{
      const{statusCode, ok, _body} = await resqueter.get('/api/sessions/current').set('Cookie',[`${cookie.name}=${cookie.token}`])
      expect(statusCode).to.equal(200)
      expect(ok).to.be.true
      expect(_body.status).to.be.equal('success')
      expect(_body.session.user.email).to.be.equal(mockUser.email)
    })
  })

  describe('Prodcuts',()=>{
    it('Crear Productos', async()=>{
      const{statusCode, ok, _body} = await resqueter.post('/api/products').send(mockProduct).set('Cookie',[`${cookie.name}=${cookie.token}`])
      expect(statusCode).to.equal(201)
      expect(ok).to.be.true
      expect(_body.status).to.be.equal('success')
    })

    it('get Prodcuts',async()=>{
      const{statusCode, ok, _body} = await resqueter.get('/api/products')
      expect(statusCode).to.equal(200)
      expect(ok).to.be.true
      expect(_body.status).to.be.equal('success')
    })
  })

  describe('Carts',()=>{
    it('New Cart',async()=>{
      const{statusCode, ok, _body} = await resqueter.post('/api/carts')
      expect(statusCode).to.equal(201)
      expect(ok).to.be.true
      expect(_body.status).to.be.equal('success')
    })
    
    it('Product by CartId', async()=>{
      const response = await resqueter.post('/api/carts')
      const createdCart = response._body.createdCart 
      const{statusCode,ok,_body} = await resqueter.get(`/api/carts/${createdCart.id}`)
      expect(statusCode).to.equal(200)
      expect(ok).to.be.true
      expect(_body.status).to.be.equal('success')
      expect(_body.prodcuts.items).to.be.an('array').that.is.empty
    })
  })
})