const handleUpdate = async (id, editedPost, setBlogPosts, blogPosts, setEditingPostId, setErrorMessageEdit) => {
    if (editedPost.title.trim() === '' || editedPost.content.trim() === '') {
      setErrorMessageEdit('Title and content cannot be empty');
      return;
    }
  
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
      setErrorMessageEdit('');
    } catch (error) {
      console.error('Error updating blog post:', error);
    }
  };
  
  export default handleUpdate;
  