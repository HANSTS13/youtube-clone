import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Box, Typography, IconButton, InputBase, Avatar } from "@mui/material";
import { Menu, Search, VideoCall, Notifications } from "@mui/icons-material";

export default function Navbar() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    navigate(`/?search=${search.trim()}`);
  }

  return (
    <AppBar position="fixed" className="topbar">
      <Toolbar className="topbar-content">
        <Box className="left-section">
          <IconButton className="icon-btn">
            <Menu />
          </IconButton>

          <Box className="youtube-logo" onClick={() => navigate("/")}>
            <span className="play-box">▶</span>
            <Typography className="logo-text">YouTube</Typography>
          </Box>
        </Box>

        <form className="search-wrapper" onSubmit={handleSubmit}>
          <InputBase
            className="search-input"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit" className="search-button">
            <Search />
          </button>
        </form>

        <Box className="right-section">
          <IconButton className="icon-btn">
            <VideoCall />
          </IconButton>
          <IconButton className="icon-btn">
            <Notifications />
          </IconButton>
          <Avatar className="profile-avatar">H</Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
}