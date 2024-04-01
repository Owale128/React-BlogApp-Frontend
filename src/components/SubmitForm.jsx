const handleSubmit = async (newPost, setBlogPosts, blogPosts, setNewPost, setErrorMessage, newPostRef, postSound) => {
    if (newPost.title.trim() === '' || newPost.content.trim() === '') {
      setErrorMessage('Title and content cannot be empty');
      return;
    }
  
    try {
      const response = await fetch('https://newreactblogsitebackend-c5c3725b349e.herokuapp.com/post', {
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
        const audio = new Audio(postSound);
        audio.volume = 0.2;
        audio.play();
      }, 100);

    } catch (error) {
      console.error('Error creating blog post:', error);
    }
  };
  
  export default handleSubmit;
  