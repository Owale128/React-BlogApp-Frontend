const handleSubmit = async (newPost, setBlogPosts, blogPosts, setNewPost, setErrorMessage, newPostRef, pingSound) => {
    if (newPost.title.trim() === '' || newPost.content.trim() === '') {
      setErrorMessage('Title and content cannot be empty');
      return;
    }
  
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
      setErrorMessage('');
  
      setTimeout(() => {
        if (newPostRef.current) {
          newPostRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
  
      const audio = new Audio(pingSound);
      audio.playbackRate = 1.8;
      audio.play();
    } catch (error) {
      console.error('Error creating blog post:', error);
    }
  };
  
  export default handleSubmit;
  