import React, { useState, useEffect, useRef } from 'react';
import pingSound from '../src/soundEffect/tapSound.mp3';
import handleSubmit from './components/SubmitForm';
import handleUpdate from './components/UpdatePost';
import handleDelete from './components/DeletePost';
import fetchPosts from './components/FetchPosts';
import Navbar from './navbar/Navbar';
import Footer from './footer/Footer';
import './sass/App.css'

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
  <>
<Navbar />
  <div className='postWrapper'>
    <h1>Write a post</h1>
    <form onSubmit={handleSubmitPost}>
    <div className='formContainer'>
      <input
      type="name"
      name="title"
      placeholder="Enter your name"
      value={newPost.title}
      onChange={handleInputChange}
      maxLength={15}/>
      <br></br>
      <textarea
      className='textArea'
      name="content"
      placeholder="Enter content"
      value={newPost.content}
      onChange={handleInputChange}
      maxLength={200}/>
      <button type="submit" className='addBtn'>Add Post</button>
      </div>
    {errorMessage && <p className="error">{errorMessage}</p>}
      <br></br>
    <hr className="separator"/>
    </form>

    {blogPosts.map((post, i ) => (
      <div key={i} className='contentWrapper' ref={i === blogPosts.length - 1 ? newPostRef : null}>
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
        <textarea
          className='textArea'
          name="content"
          placeholder="Enter content"
          value={editedPost.content}
          onChange={(e) => setEditedPost({ ...editedPost, content: e.target.value })}
          maxLength={200}/>
        {errorMessageEdit && <p className="errorEdit">{errorMessageEdit}</p>}
        <button className='backBtn' onClick={handleCancelEdit}>Back</button>
      </>
    ) : (
      <>
          <h4>{post.title}</h4>
          <p className='blogText'>{post.content}</p>
        </>
      )}
    </div>
    ))}
  <Footer />
  </div>
  </>
);
};

export default BlogPosts;