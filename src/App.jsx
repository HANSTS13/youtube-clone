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
    title: "React JS Crash Course for Beginners",
    channel: "Code Academy",
    views: "1.2M views",
    time: "2 days ago",
    category: "React",
    thumbnail:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Build a Modern Website with JavaScript",
    channel: "Web Dev Pro",
    views: "850K views",
    time: "1 week ago",
    category: "JavaScript",
    thumbnail:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Material UI Tutorial for React Apps",
    channel: "UI Master",
    views: "430K views",
    time: "4 days ago",
    category: "UI",
    thumbnail:
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Learn Python Programming in One Video",
    channel: "Python Hub",
    views: "2.1M views",
    time: "3 weeks ago",
    category: "Python",
    thumbnail:
      "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Responsive Web Design Complete Guide",
    channel: "Frontend World",
    views: "670K views",
    time: "6 days ago",
    category: "CSS",
    thumbnail:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "GitHub Pages Deployment Tutorial",
    channel: "Deploy Easy",
    views: "390K views",
    time: "1 month ago",
    category: "GitHub",
    thumbnail:
      "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=800&q=80",
  },
];

const categories = [
  "All",
  "React",
  "JavaScript",
  "UI",
  "Python",
  "CSS",
  "GitHub",
];

function App() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredVideos = videos.filter((video) => {
    const matchesCategory =
      selectedCategory === "All" || video.category === selectedCategory;

    const matchesSearch =
      video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.channel.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

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

          <Box className="searchBox">
            <InputBase
              placeholder="Search videos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="searchInput"
            />
            <IconButton>
              <Search />
            </IconButton>
          </Box>

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
            {filteredVideos.map((video, index) => (
              <Card className="videoCard" key={index}>
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
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default App;
