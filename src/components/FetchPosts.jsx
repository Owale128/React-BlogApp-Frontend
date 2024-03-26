const fetchBlogPosts = async (setBlogPosts) => {
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
  
  export default fetchBlogPosts;
  