const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    let count = 0
    blogs.forEach(blog => {
        count += blog.likes
    });
    return count
}

const favoriteBlog = (blogs) => {
    let maxLikes = -1, maxBlog = {}
    blogs.forEach(blog => {
        if (blog.likes > maxLikes) {
            maxLikes = blog.likes
            maxBlog = blog
        }
    })
    return {
        title: maxBlog.title,
        author: maxBlog.author,
        likes: maxLikes
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}