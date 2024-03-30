const handleDelete = async (id, setBlogPosts, blogPosts, deleteSound) => {
    try {
      const response = await fetch(`https://newreactblogsitebackend-c5c3725b349e.herokuapp.com//api/blogPost/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      setBlogPosts(blogPosts.filter(post => post._id !== id));

      const audio = new Audio(deleteSound);
      audio.volume = 0.2;
      audio.play();

    } catch (error) {
      console.error('Error deleting blog post:', error);
    }
  };
  
  export default handleDelete;
  