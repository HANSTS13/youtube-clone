import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Avatar, Box, Button, Typography, Divider, TextField } from "@mui/material";
import {
  ThumbUp,
  ThumbDown,
  Share,
  Download,
  Bookmark,
} from "@mui/icons-material";
import Navbar from "../components/Navbar";
import { videos } from "../data/videos";

export default function Watch() {
  const { id } = useParams();
  const navigate = useNavigate();
  const video = videos.find((item) => item.id === id) || videos[0];
  const recommended = videos.filter((item) => item.id !== video.id);

  const [liked, setLiked] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([
    { name: "Alex", text: "Amazing video! Really enjoyed watching this." },
    { name: "Maria", text: "This looks exactly like a proper video page." },
  ]);

  function addComment(e) {
    e.preventDefault();
    if (!comment.trim()) return;

    setComments([{ name: "Hans", text: comment }, ...comments]);
    setComment("");
  }

  return (
    <Box className="youtube-app">
      <Navbar />

      <main className="watch-page">
        <section className="watch-left">
          <Box className="player">
            <iframe
              src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1&rel=0`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </Box>

          <Typography className="watch-video-title">{video.title}</Typography>

          <Box className="watch-actions-row">
            <Typography className="watch-stats">
              {video.views} • {video.time}
            </Typography>

            <Box className="watch-actions">
              <Button startIcon={<ThumbUp />} onClick={() => setLiked(!liked)}>
                {liked ? "Liked" : "Like"}
              </Button>
              <Button startIcon={<ThumbDown />}>Dislike</Button>
              <Button startIcon={<Share />}>Share</Button>
              <Button startIcon={<Download />}>Download</Button>
              <Button startIcon={<Bookmark />}>Save</Button>
            </Box>
          </Box>

          <Divider className="divider" />

          <Box className="channel-row">
            <Avatar className="watch-channel-avatar">
              {video.channel.charAt(0)}
            </Avatar>

            <Box className="channel-details">
              <Typography className="watch-channel-name">{video.channel}</Typography>
              <Typography className="sub-count">{video.subscribers}</Typography>
            </Box>

            <Button
              className={subscribed ? "subscribed-button" : "subscribe-button"}
              onClick={() => setSubscribed(!subscribed)}
            >
              {subscribed ? "Subscribed" : "Subscribe"}
            </Button>
          </Box>

          <Box className="description-box">
            <strong>{video.views} • {video.time}</strong>
            <p>{video.description}</p>
          </Box>

          <Box className="comments-section">
            <Typography className="comments-title">
              {comments.length} Comments
            </Typography>

            <form className="comment-form" onSubmit={addComment}>
              <Avatar className="comment-avatar">H</Avatar>
              <TextField
                variant="standard"
                placeholder="Add a comment..."
                fullWidth
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                InputProps={{ className: "comment-input" }}
              />
              <Button type="submit">Comment</Button>
            </form>

            {comments.map((item, index) => (
              <Box className="comment" key={index}>
                <Avatar className="comment-avatar">{item.name.charAt(0)}</Avatar>
                <Box>
                  <Typography className="comment-name">{item.name}</Typography>
                  <Typography className="comment-text">{item.text}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </section>

        <aside className="watch-right">
          {recommended.map((item) => (
            <Box
              className="recommended-video"
              key={item.id}
              onClick={() => navigate(`/watch/${item.id}`)}
            >
              <img src={`https://img.youtube.com/vi/${item.videoId}/mqdefault.jpg`} alt={item.title} />

              <Box>
                <Typography className="recommended-title">{item.title}</Typography>
                <Typography className="recommended-channel">{item.channel}</Typography>
                <Typography className="recommended-channel">
                  {item.views} • {item.time}
                </Typography>
              </Box>
            </Box>
          ))}
        </aside>
      </main>
    </Box>
  );
}