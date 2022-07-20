import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('Wrong credentials')
    }
  }

  const logout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url
    }
    const savedBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(savedBlog))
  }

  const blogPart = () => (
    <div>
      <h2>blogs</h2>
      <p>{user.username} logged in<button onClick={logout}>logout</button></p>
      <form onSubmit={addBlog}>
        <label>title:<input
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        /></label><br/>
        <label>author:<input
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        /></label><br/>
        <label>url:<input
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        /></label><br/>
        <button type="submit">create</button>
      </form>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  const loginPart = () => (
    <div>
      <h2>Please Login First</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )

  return (
    <div>
      { user === null
        ? loginPart() 
        : blogPart()}
    </div>
  )
}

export default App
