const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Blog 1',
    author: "Bigerrr",
    url: "http://qffjq.coop/pfyogu"
  },
  {
    title: 'Blog 2',
    author: "Bigerrr",
    url: "http://javdb.com"
  },
]


beforeEach(async () =>{
  await Blog.deleteMany({})

  for(let blog of initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('blogs are returned as json', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
    
  expect(response.body).toHaveLength(initialBlogs.length)
})

test('json has attribute id', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

test('blog post test', async () => {
  await api
    .post('/api/blogs')
    .send(initialBlogs[0])
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await api.get('/api/blogs')
  expect(blogsAtEnd.body).toHaveLength(initialBlogs.length + 1)
})

describe('deletion of a blog', () => {
  test('delete blog by id', async () => {
    const blogs = await api.get('/api/blogs')
    const blogsToDelete = blogs.body[0]

    await api
      .delete(`/api/blogs/${blogsToDelete.id}`)
      .expect(204)
  })
})

describe('update a blog', () => {
  test('update by id', async () => {
    const blogs = await api.get('/api/blogs')
    const blogsToUpdate = blogs.body[0]

    await api
      .put(`/api/blogs/${blogsToUpdate.id}`)
      .send({
        title: 'Blog 2',
        author: "Bigerrr",
        url: "http://javdb.com"
      })
      .expect(201)
  })
})

describe('register new users', () => {
  test('new user with 2 characters password', async () => {
    await api
      .post('/api/users')
      .send({
        "username": 'testUser',
        "password": '12'
      })
      .expect(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})