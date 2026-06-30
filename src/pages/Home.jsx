import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Box, Chip, Typography } from "@mui/material";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import VideoCard from "../components/VideoCard";
import { videos } from "../data/videos";

const categories = ["All", ...new Set(videos.map((video) => video.category))];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

  const filteredVideos = useMemo(() => {
    return videos.filter((video) => {
      const categoryMatch =
        selectedCategory === "All" || video.category === selectedCategory;

      const text = `${video.title} ${video.channel} ${video.category}`.toLowerCase();
      const searchMatch = text.includes(search.toLowerCase());

      return categoryMatch && searchMatch;
    });
  }, [selectedCategory, search]);

  return (
    <Box className="youtube-app">
      <Navbar />
      <Sidebar setCategory={setSelectedCategory} />

      <main className="main">
        <Box className="category-bar">
          {categories.map((category) => (
            <Chip
              key={category}
              label={category}
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category ? "chip active-chip" : "chip"}
            />
          ))}
        </Box>

        {search && (
          <Typography className="results-title">
            Search results for "{search}"
          </Typography>
        )}

        <Box className="video-grid">
          {filteredVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </Box>
      </main>
    </Box>
  );
}