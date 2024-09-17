import { useState } from 'react'
import './App.css'
import hazy from './assets/hazy.png';

interface Post{
  id: number;
  image: string;
  comments: string[];
  likes: number;
  tags: string[];

}

function App() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      image: hazy,
      comments: ["Great photo!", "I love this!"],
      likes: 10,
      tags: ["#nature", "#photography"]
    },
    {
      id: 2,
      image: hazy,
      comments: ["Great photo!", "I love this!"],
      likes: 10,
      tags: ["#nature", "#photo"]
    },
    {
      id: 3,
      image: hazy,
      comments: ["Nice!"],
      likes: 4,
      tags: ["#nature", "#photography"]
    },
    {
      id: 4,
      image: hazy,
      comments: ["Great photo!", "I love this!"],
      likes: 10,
      tags: ["#nature", "#photo"]
    },
  ]);

  const[likeFilter, setLikeFilter] = useState<number>(0);
  const[searchQuery, setSearchQuery] = useState<string>("");

  // Function to handle liking a post + 
  const likePost = (postId: number) => {
    setPosts(posts.map((post) => {
      if(post.id === postId){
        return {...post, likes: post.likes + 1};
      }
      return post;
    }));
  }
  
  // Function to handle search query change 
  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value.toLowerCase());
  }

  // Function to handle like filter change 
 const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLikeFilter(parseInt(event.target.value.toLowerCase()));
  }

  // Filter post based on the likeFilter and searchQuery
  const filteredPosts = posts.filter(post => 
    post.likes >= likeFilter &&
    post.tags.find(tag => tag.includes(searchQuery)) ||
    posts.comments.some(comment => comment.includes(searchQuery))
  );
 

  return (
    <>
      <div>
        <label>
          Filter posts by likes: <strong>{likeFilter}</strong> +
        <input 
          type="range"
          min={0}
          max={20}
          value={likeFilter}
          onChange={handleSliderChange}
        />
        </label>
        </div>
        <input
          type="text"
          placeholder="Search posts by comments"
          value={searchQuery}
          onChange={handleSearchChange}
        />

        <div style={{display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem"}}>
          {filteredPosts.map(post => (
            <>
            <div key={post.id}>
              <img 
                src={post.image}
                alt="Post"
                style={{width: "100%"}}
              />
              <p>{post.likes} likes</p>
              <ul>
                {post.comments.map(comment => (
                  <li key={comment}>{comment}</li>
                ))}
              </ul>
              <ul>
                {post.tags.map(tag => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
              <button onClick={() => likePost(post.id)}>+</button>
            </div>
            </>
          ))}
        </div>
    </>
  )
}



export default App
