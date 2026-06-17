import { useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  IconButton,
  Avatar,
  Button,
  Card,
  CardMedia,
  CardContent,
  Chip,
} from "@mui/material";

import {
  Menu,
  Search,
  VideoCall,
  Notifications,
  Home,
  Whatshot,
  Subscriptions,
  History,
  ThumbUp,
} from "@mui/icons-material";

import "./App.css";

const videos = [
  {
    title: "React JS Full Course",
    channel: "Programming with Mosh",
    views: "3.2M views",
    time: "1 year ago",
    category: "React",
    videoId: "SqcY0GlETPk",
    thumbnail: "https://img.youtube.com/vi/SqcY0GlETPk/hqdefault.jpg",
  },
  {
    title: "JavaScript Tutorial for Beginners",
    channel: "Programming with Mosh",
    views: "8.5M views",
    time: "3 years ago",
    category: "JavaScript",
    videoId: "W6NZfCO5SIk",
    thumbnail: "https://img.youtube.com/vi/W6NZfCO5SIk/hqdefault.jpg",
  },
  {
    title: "Material UI React Tutorial",
    channel: "Codevolution",
    views: "700K views",
    time: "2 years ago",
    category: "UI",
    videoId: "vyJU9efvUtQ",
    thumbnail: "https://img.youtube.com/vi/vyJU9efvUtQ/hqdefault.jpg",
  },
  {
    title: "Python Full Course",
    channel: "freeCodeCamp",
    views: "40M views",
    time: "4 years ago",
    category: "Python",
    videoId: "rfscVS0vtbw",
    thumbnail: "https://img.youtube.com/vi/rfscVS0vtbw/hqdefault.jpg",
  },
  {
    title: "CSS Flexbox Tutorial",
    channel: "Web Dev Simplified",
    views: "1M views",
    time: "2 years ago",
    category: "CSS",
    videoId: "fYq5PXgSsbE",
    thumbnail: "https://img.youtube.com/vi/fYq5PXgSsbE/hqdefault.jpg",
  },
  {
    title: "Git and GitHub Tutorial",
    channel: "freeCodeCamp",
    views: "6M views",
    time: "3 years ago",
    category: "GitHub",
    videoId: "RGOj5yH7evk",
    thumbnail: "https://img.youtube.com/vi/RGOj5yH7evk/hqdefault.jpg",
  },
];

const categories = ["All", "React", "JavaScript", "UI", "Python", "CSS", "GitHub"];

function App() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVideo, setSelectedVideo] = useState(videos[0]);

  const filteredVideos = videos.filter((video) => {
    const categoryMatch =
      selectedCategory === "All" || video.category === selectedCategory;

    const searchMatch =
      video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.channel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.category.toLowerCase().includes(searchTerm.toLowerCase());

    return categoryMatch && searchMatch;
  });

  function handleSearch(e) {
    e.preventDefault();

    if (filteredVideos.length > 0) {
      setSelectedVideo(filteredVideos[0]);
    }
  }

  return (
    <Box className="app">
      <AppBar position="fixed" className="navbar">
        <Toolbar>
          <IconButton color="inherit">
            <Menu />
          </IconButton>

          <Typography variant="h6" className="logo">
            ▶ YouTube Clone
          </Typography>

          <form className="searchBox" onSubmit={handleSearch}>
            <InputBase
              placeholder="Search videos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="searchInput"
            />
            <IconButton type="submit">
              <Search />
            </IconButton>
          </form>

          <Box className="navIcons">
            <IconButton color="inherit">
              <VideoCall />
            </IconButton>
            <IconButton color="inherit">
              <Notifications />
            </IconButton>
            <Avatar className="avatar">H</Avatar>
          </Box>
        </Toolbar>
      </AppBar>

      <Box className="layout">
        <Box className="sidebar">
          <Button startIcon={<Home />}>Home</Button>
          <Button startIcon={<Whatshot />}>Trending</Button>
          <Button startIcon={<Subscriptions />}>Subscriptions</Button>
          <Button startIcon={<History />}>History</Button>
          <Button startIcon={<ThumbUp />}>Liked Videos</Button>
        </Box>

        <Box className="mainContent">
          <Box className="playerSection">
            <iframe
              src={`https://www.youtube.com/embed/${selectedVideo.videoId}`}
              title={selectedVideo.title}
              allowFullScreen
            ></iframe>

            <h2>{selectedVideo.title}</h2>
            <p>
              {selectedVideo.channel} • {selectedVideo.views} • {selectedVideo.time}
            </p>
          </Box>

          <Box className="categories">
            {categories.map((category) => (
              <Chip
                key={category}
                label={category}
                onClick={() => setSelectedCategory(category)}
                color={selectedCategory === category ? "error" : "default"}
                className="chip"
              />
            ))}
          </Box>

          <Box className="videoGrid">
            {filteredVideos.length === 0 ? (
              <h2 className="noResult">No videos found</h2>
            ) : (
              filteredVideos.map((video, index) => (
                <Card
                  className="videoCard"
                  key={index}
                  onClick={() => setSelectedVideo(video)}
                >
                  <CardMedia
                    component="img"
                    height="180"
                    image={video.thumbnail}
                    alt={video.title}
                  />
                  <CardContent>
                    <Typography variant="h6" className="videoTitle">
                      {video.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {video.channel}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {video.views} • {video.time}
                    </Typography>
                  </CardContent>
                </Card>
              ))
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default App;