import React, { useState, useEffect } from 'react';

const BlogPosts = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', content: '' });

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/blogPosts');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setBlogPosts(data);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      }
    };

    fetchBlogPosts();

    return () => {};
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/blogPost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data);
    
      setBlogPosts([...blogPosts, newPost]);

      setNewPost({ title: '', content: '' });
    } catch (error) {
      console.error('Error creating blog post:', error);
    }
  };

  return (
    <div>
      <h1>Blog Posts</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Enter title"
          value={newPost.title}
          onChange={handleInputChange}
        />
        <textarea
          name="content"
          placeholder="Enter content"
          value={newPost.content}
          onChange={handleInputChange}
        ></textarea>
        <button type="submit">Add Post</button>
      </form>
      {blogPosts.map((post) => (
        <div key={post._id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default BlogPosts;