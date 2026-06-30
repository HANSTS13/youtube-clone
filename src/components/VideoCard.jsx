import { Avatar, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function VideoCard({ video }) {
  const navigate = useNavigate();

  return (
    <Box className="video-card" onClick={() => navigate(`/watch/${video.id}`)}>
      <Box className="thumbnail-box">
        <img src={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`} alt={video.title} />
        <span className="video-duration">{video.duration}</span>
      </Box>

      <Box className="video-info">
        <Avatar className="channel-avatar">{video.channel.charAt(0)}</Avatar>

        <Box>
          <Typography className="video-title">{video.title}</Typography>
          <Typography className="channel-name">{video.channel}</Typography>
          <Typography className="video-stats">{video.views} • {video.time}</Typography>
        </Box>
      </Box>
    </Box>
  );
}