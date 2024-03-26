const handleDelete = async (id, setBlogPosts, blogPosts) => {
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
  
  export default handleDelete;
  