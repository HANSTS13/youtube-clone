import { useMemo, useState } from "react";
import { videos } from "./data/videos";
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
  Divider,
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
  PlayCircle,
  SportsSoccer,
  MusicNote,
  Movie,
  SportsEsports,
} from "@mui/icons-material";

import "./App.css";

const categories = ["All", ...new Set(videos.map((video) => video.category))];

function App() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchInput, setSearchInput] = useState("");
  const [activeSearch, setActiveSearch] = useState("");
  const [selectedVideo, setSelectedVideo] = useState(videos[0]);
  const [liked, setLiked] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const filteredVideos = useMemo(() => {
    return videos.filter((video) => {
      const matchesCategory =
        selectedCategory === "All" || video.category === selectedCategory;

      const text = `${video.title} ${video.channel} ${video.category}`.toLowerCase();
      const matchesSearch = text.includes(activeSearch.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, activeSearch]);

  function handleSearch(e) {
    e.preventDefault();
    const value = searchInput.trim();
    setActiveSearch(value);
    setSelectedCategory("All");

    const foundVideo = videos.find((video) => {
      const text = `${video.title} ${video.channel} ${video.category}`.toLowerCase();
      return text.includes(value.toLowerCase());
    });

    if (foundVideo) {
      setSelectedVideo(foundVideo);
    }
  }

  function chooseCategory(category) {
    setSelectedCategory(category);
    setActiveSearch("");
    setSearchInput("");

    const firstVideo =
      category === "All"
        ? videos[0]
        : videos.find((video) => video.category === category);

    if (firstVideo) {
      setSelectedVideo(firstVideo);
    }
  }

  function playVideo(video) {
    setSelectedVideo(video);
    setLiked(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const recommendedVideos = videos.filter(
    (video) => video.videoId !== selectedVideo.videoId
  );

  return (
    <Box className="app">
      <AppBar position="fixed" className="navbar">
        <Toolbar className="toolbar">
          <Box className="leftNav">
            <IconButton color="inherit">
              <Menu />
            </IconButton>

            <Typography variant="h6" className="logo">
              <span className="ytIcon">▶</span> YouTube
            </Typography>
          </Box>

          <form className="searchBox" onSubmit={handleSearch}>
            <InputBase
              placeholder="Search videos..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="searchInput"
            />
            <IconButton type="submit" className="searchBtn">
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
          <Button startIcon={<Home />} onClick={() => chooseCategory("All")}>
            Home
          </Button>
          <Button startIcon={<Whatshot />} onClick={() => chooseCategory("News")}>
            Trending
          </Button>
          <Button startIcon={<MusicNote />} onClick={() => chooseCategory("Music")}>
            Music
          </Button>
          <Button startIcon={<SportsSoccer />} onClick={() => chooseCategory("Sports")}>
            Sports
          </Button>
          <Button startIcon={<Movie />} onClick={() => chooseCategory("Movies")}>
            Movies
          </Button>
          <Button startIcon={<SportsEsports />} onClick={() => chooseCategory("Gaming")}>
            Gaming
          </Button>
          <Button startIcon={<Subscriptions />} onClick={() => chooseCategory("Education")}>
            Education
          </Button>
          <Button startIcon={<History />} onClick={() => chooseCategory("Travel")}>
            Travel
          </Button>
          <Button startIcon={<ThumbUp />} onClick={() => chooseCategory("Fitness")}>
            Fitness
          </Button>
        </Box>

        <Box className="mainContent">
          <Box className="watchLayout">
            <Box className="watchMain">
              <Box className="playerWrapper">
                <iframe
                  src={`https://www.youtube.com/embed/${selectedVideo.videoId}?rel=0`}
                  title={selectedVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </Box>

              <Typography variant="h5" className="watchTitle">
                {selectedVideo.title}
              </Typography>

              <Box className="videoMeta">
                <span>
                  {selectedVideo.views} • {selectedVideo.time}
                </span>

                <Box className="actionButtons">
                  <Button
                    startIcon={<ThumbUp />}
                    onClick={() => setLiked(!liked)}
                    className={liked ? "activeAction" : ""}
                  >
                    {liked ? "Liked" : "Like"}
                  </Button>
                  <Button startIcon={<PlayCircle />}>Share</Button>
                </Box>
              </Box>

              <Divider className="divider" />

              <Box className="channelBox">
                <Avatar className="channelAvatar">
                  {selectedVideo.channel.charAt(0)}
                </Avatar>

                <Box className="channelInfo">
                  <Typography className="channelName">
                    {selectedVideo.channel}
                  </Typography>
                  <Typography className="subscribers">
                    {selectedVideo.subscribers}
                  </Typography>
                </Box>

                <Button
                  className={subscribed ? "subscribedBtn" : "subscribeBtn"}
                  onClick={() => setSubscribed(!subscribed)}
                >
                  {subscribed ? "Subscribed" : "Subscribe"}
                </Button>
              </Box>

              <Box className="descriptionBox">
                <Typography>{selectedVideo.description}</Typography>
              </Box>
            </Box>

            <Box className="recommended">
              <Typography variant="h6" className="sectionTitle">
                Recommended
              </Typography>

              {recommendedVideos.map((video) => (
                <Box
                  className="recommendedItem"
                  key={video.videoId}
                  onClick={() => playVideo(video)}
                >
                  <img
                    src={`https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`}
                    alt={video.title}
                  />
                  <Box>
                    <Typography className="recommendedTitle">
                      {video.title}
                    </Typography>
                    <Typography className="recommendedChannel">
                      {video.channel}
                    </Typography>
                    <Typography className="recommendedChannel">
                      {video.views}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>

          <Box className="categories">
            {categories.map((category) => (
              <Chip
                key={category}
                label={category}
                onClick={() => chooseCategory(category)}
                color={selectedCategory === category ? "error" : "default"}
                className="chip"
              />
            ))}
          </Box>

          <Typography variant="h6" className="sectionTitle">
            {activeSearch
              ? `Search results for "${activeSearch}"`
              : selectedCategory === "All"
              ? "Explore Videos"
              : `${selectedCategory} Videos`}
          </Typography>

          <Box className="videoGrid">
            {filteredVideos.length === 0 ? (
              <Box className="noResult">
                <Typography variant="h5">No videos found</Typography>
                <Typography>
                  Try searching music, sports, movies, gaming, travel, or cooking.
                </Typography>
              </Box>
            ) : (
              filteredVideos.map((video) => (
                <Card
                  className="videoCard"
                  key={video.videoId}
                  onClick={() => playVideo(video)}
                >
                  <Box className="thumbWrapper">
                    <CardMedia
                      component="img"
                      image={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`}
                      alt={video.title}
                    />
                    <span className="duration">12:45</span>
                  </Box>

                  <CardContent className="cardContent">
                    <Avatar className="smallAvatar">
                      {video.channel.charAt(0)}
                    </Avatar>

                    <Box>
                      <Typography className="videoTitle">
                        {video.title}
                      </Typography>
                      <Typography className="videoChannel">
                        {video.channel}
                      </Typography>
                      <Typography className="videoChannel">
                        {video.views} • {video.time}
                      </Typography>
                    </Box>
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