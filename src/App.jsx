import React, { useState, useEffect, useRef } from 'react';
import pingSound from '../src/soundEffect/tapSound.mp3';
import handleSubmit from './components/SubmitForm';
import handleUpdate from './components/UpdatePost';
import handleDelete from './components/DeletePost';
import fetchPosts from './components/FetchPosts';
import './App.css'

const BlogPosts = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const [editedPost, setEditedPost] = useState({ title: '', content: '' });
  const [editingPostId, setEditingPostId] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorMessageEdit, setErrorMessageEdit] = useState('');
  const newPostRef = useRef(null);

  useEffect(() => {
    fetchPosts(setBlogPosts);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  };

  const handleSubmitPost = (e) => {
    e.preventDefault();
    handleSubmit(newPost, setBlogPosts, blogPosts, setNewPost, setErrorMessage, newPostRef, pingSound);
  };

  const handleUpdatePost = (id) => {
    handleUpdate(id, editedPost, setBlogPosts, blogPosts, setEditingPostId, setErrorMessageEdit);
  };

  const handleEdit = async (id, title, content) => {
    setEditingPostId(id);
    setEditedPost({ title, content });
    setErrorMessageEdit('');
  };
  const handleCancelEdit = () => {
    setEditingPostId(null);
    setEditedPost({ title: '', content: '' });
    setErrorMessageEdit('');
  };

  const handleDeletePost = (id) => {
    handleDelete(id, setBlogPosts, blogPosts);
  };

return (
  <div className='wrapper'>
    <h1>Blog Posts</h1>
    <form onSubmit={handleSubmitPost}>
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
    {errorMessage && <p className="error">{errorMessage}</p>}
      <br></br>
    </form>
    {blogPosts.map((post, i ) => (

      <div key={i} className='wrapper2' ref={i === blogPosts.length - 1 ? newPostRef : null}>
<span className='deleteBtn' onClick={() => handleDeletePost(post._id)}>Delete</span>
        {editingPostId === post._id ? (
          <>
            <span className='updateBtn' onClick={() => handleUpdatePost(post._id)}>Update</span>
          </>
        ) : (
          <span className='editBtn' onClick={() => handleEdit(post._id, post.title, post.content)}>Edit</span>
          )}
        {editingPostId === post._id ? (
          <>
            <input
              className='title'
              type="text"
              name="title"
              placeholder="Enter title"
              value={editedPost.title}
              onChange={(e) => setEditedPost({ ...editedPost, title: e.target.value })}
            />
            <br></br>
            <textarea
              className='textArea'
              name="content"
              placeholder="Enter content"
              value={editedPost.content}
              onChange={(e) => setEditedPost({ ...editedPost, content: e.target.value })}
            ></textarea>
            {errorMessageEdit && <p className="errorEdit">{errorMessageEdit}</p>}
            <button className='backBtn' onClick={handleCancelEdit}>Back</button>
          </>
        ) : (
          <>
            <h4 className='postTitle'>{post.title}</h4>
            <p className='postContent'>{post.content}</p>
          </>
        )}
      </div>

    ))}
  </div>
);
};

export default BlogPosts;