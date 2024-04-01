const handleUpdate = async (id, editedPost, setBlogPosts, blogPosts, setEditingPostId, setErrorMessageEdit, updateSound) => {
    if (editedPost.title.trim() === '' || editedPost.content.trim() === '') {
      setErrorMessageEdit('Title and content cannot be empty');
      return;
    }
  
    try {
      const response = await fetch(`https://newreactblogsitebackend-c5c3725b349e.herokuapp.com/update/${id}`, {
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

        const audio = new Audio(updateSound);
        audio.volume = 0.2;
        audio.play();

    } catch (error) {
      console.error('Error updating blog post:', error);
    }
  };
  
  export default handleUpdate;
  