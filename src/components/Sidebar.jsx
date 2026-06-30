import { Drawer, Box, Button } from "@mui/material";
import { Home, Whatshot, Subscriptions, History, ThumbUp, MusicNote, SportsEsports } from "@mui/icons-material";

export default function Sidebar({ setCategory }) {
  return (
    <Drawer variant="permanent" className="sidebar">
      <Box className="sidebar-content">
        <Button startIcon={<Home />} onClick={() => setCategory("All")}>Home</Button>
        <Button startIcon={<Whatshot />} onClick={() => setCategory("Technology")}>Trending</Button>
        <Button startIcon={<Subscriptions />} onClick={() => setCategory("Music")}>Subscriptions</Button>
        <Button startIcon={<MusicNote />} onClick={() => setCategory("Music")}>Music</Button>
        <Button startIcon={<SportsEsports />} onClick={() => setCategory("Gaming")}>Gaming</Button>
        <Button startIcon={<History />} onClick={() => setCategory("Programming")}>History</Button>
        <Button startIcon={<ThumbUp />} onClick={() => setCategory("Sports")}>Liked Videos</Button>
      </Box>
    </Drawer>
  );
}