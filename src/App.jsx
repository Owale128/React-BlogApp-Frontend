import React, { useState, useEffect } from 'react';
import './App.css'

const BlogPosts = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const [editingPostId, setEditingPostId] = useState(null);
  const [editedPost, setEditedPost] = useState({ title: '', content: '' });

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
      const { post } = await response.json();
  
      setBlogPosts([...blogPosts, post]);
  
      setNewPost({ title: '', content: '' });
    } catch (error) {
      console.error('Error creating blog post:', error);
    }
  };

  const handleUpdate = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/blogPost/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedPost),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const updatedPost = { ...editedPost, _id: id };
      setBlogPosts(blogPosts.map(post => post._id === id ? updatedPost : post));
      setEditingPostId(null);

    } catch (error) {
      console.error('Error updating blog post:', error);
    }
  };

  const handleEdit = async (id, title, content) => {
    setEditingPostId(id);
    setEditedPost({ title, content });
  };
  const handleCancelEdit = () => {
    setEditingPostId(null);
    setEditedPost({ title: '', content: '' });
  };


  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/blogPost/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      setBlogPosts(blogPosts.filter(post => post._id !== id));
    } catch (error) {
      console.error('Error deleting blog post:', error);
    }
  };

  return (
    <div className='wrapper'>
      <h1>Blog Posts</h1>
      <form onSubmit={handleSubmit}>
      <div className='formContainer'>
        <input
        className='title'
          type="text"
          name="title"
          placeholder="Enter title"
          value={newPost.title}
          onChange={handleInputChange}
        />
        <br></br>
        <textarea
        className='textArea'
          name="content"
          placeholder="Enter content"
          value={newPost.content}
          onChange={handleInputChange}
        ></textarea>
        <button type="submit" className='addBtn'>Add Post</button>
        </div>
        <br></br>
      </form>
      {blogPosts.map((post, i ) => (
        <div key={i} className='wrapper2'>
          <span className='deleteBtn' onClick={() => handleDelete(post._id)}>X</span>
          <h4 className='postTitle'>{post.title}</h4>
          <p className='postContent'>{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default BlogPosts;