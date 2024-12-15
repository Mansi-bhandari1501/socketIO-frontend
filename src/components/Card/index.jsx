import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import "./card.css";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {
  Avatar,
  Box,
  Button,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import RepeatIcon from "@mui/icons-material/Repeat";
import { ReactComponent as SendIcon } from "../../utils/send-icon.svg";
import LikeIcon from "@mui/icons-material/ThumbUpOffAlt";
import CommentIcon from "@mui/icons-material/CommentOutlined";
import InputEmoji from "react-input-emoji";
import { useDispatch, useSelector } from "react-redux";
import {
  createComment,
  deleteComment,
  fetchComment,
  updateComment,
} from "../../features/comment/commentAction";
import Profile from "../../assets/profile.png";
import { ReactionBarSelector } from "@charkour/react-reactions";
import { addReaction, getReactions } from "../../features/reaction/reactionAction";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { deletePost, fetchPost, updatePost } from "../../features/post/postAction";

const emojiMap = {
  Like: (
    <LikeIcon
      sx={{
        height: "24px",
        width: "24px",
        marginRight: "4px",
        color: "#5E5E5E",
      }}
    />
  ),
  Celebrate: "👏",
  Support: "🫰",
  Love: "❤️",
  Insightful: "💡",
  Funny: "😂",
};

export const convertToHour = (dateTime) => {
  const date = new Date(dateTime);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${hours}:${minutes}`;
};

const Cards = (props) => {
  const { images = [], postId, content, body } = props;
  const [expanded, setExpanded] = React.useState(false);
  const [commentBody, setCommentBody] = useState("");
  const [emoji, setEmoji] = useState(emojiMap.Like);
  const [emojiType, setEmojiType] = useState("Like");

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const token = user.userToken;
  const reactions = useSelector((state) => state.reaction.reactions);
  const userId = useSelector((state) => state.user.userInfo._id);
  const comments = useSelector((state) => state.comments.comments.comment);

  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState(null);
  const [currentComment, setCurrentComment] = useState(null);
  const [commentAnchorEl, setCommentAnchorEl] = useState(null);

  const [editCommentId, setEditCommentId] = useState(null); 
  const [editedCommentBody, setEditedCommentBody] = useState(""); 

  const handlePostOptionsClick = (e) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  };

  const handleCommentOptionsClick = (e, comment) => {
    e.stopPropagation();
    setCurrentComment(comment);
    setCommentAnchorEl(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setCommentAnchorEl(null);
  };

  const handleMenuItemClick = (action, id) => {

    setCurrentAction(action);
    handleCloseMenu();
    if (action === "Report") {
      setOpenDialog(true);
    } else if (action === "Post-Edit") {
      console.log("Edit post:", id);
      // Example: dispatch(updatePost({ postId: id, body: 'New body' }));
    } else if (action === "Post-Delete") {
      dispatch(deletePost({ postId: id, token })).finally(() => {
        dispatch(fetchPost({ token }));
      })
      console.log("Delete post:", id);
    } else if (action === "Post-Report") {
      setOpenDialog(true);
      console.log("Edit post:", id);
            dispatch(updatePost({ postId: id,data:{is_reported:true},token }));

    } else {
      console.log(action, currentComment || content);
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleCommentDelete = (id) => {
    console.log("Delete comment id: ", id);
    dispatch(deleteComment({ commentId: id, postId, token }));
  };

  const handleCommentEdit = (comment) => {
    setOpen(true);
    setEditCommentId(comment?._id); 
    setEditedCommentBody(comment?.body); 
  };


  const handleSaveEditedComment = (commentId) => {
    dispatch(updateComment({ commentId, postId, body: editedCommentBody ,userId, token }))
      .then(() => {
        dispatch(fetchComment({postId, token}))
          .then(() => {
            console.log("Comments fetched successfully");
          })
          .catch((error) => {
            console.error("Error fetching comments:", error);
          });
        setEditCommentId(null);
        setEditedCommentBody("");
      })
      .catch((error) => {
        console.error("Error updating comment:", error);
      });
  };
  

  const handleCancelEdit = () => {
    setEditCommentId(null);
    setOpen(false);
    setEditedCommentBody("");
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
    dispatch(fetchComment({postId,token}));
  };

  const handleComment = () => {
    dispatch(createComment({ postId, userId, body: commentBody, token })).then(() => {
    dispatch(fetchComment({postId,token}));
    });
    setCommentBody("");
  };

  const handleEmojiSelect = (key) => {
    if (key === emojiType) {
      setEmoji(emojiMap.Like);
      setEmojiType("Like");
    } else {
      setEmoji(emojiMap[key]);
      setEmojiType(key);
    }

    dispatch(addReaction({ postId, userId, type: key, token })).then(() => {
    dispatch(getReactions({postId, token}));
    });
  };
  const date = new Date(content.createdAt);
  // Ensure content.likes is an array
  const likes = Array.isArray(reactions) ? reactions : [];
  // const commentsList = Array.isArray(content?.comments) ? content.comments : [];
  const commentsList = Array.isArray(comments) ? comments : [];
  const uniqueReactions = [...new Set(likes?.map((like) => like?.type))];
  
  return (
    <Card
      sx={{
        width: "750px",
        marginBottom: "2px",
        borderRadius: "8px",
        position: "relative",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <CardHeader
          avatar={<Avatar aria-label="recipe" src={Profile} sx={{ height: "50px", width: "50px" }} />}
          title={`${content?.userid?.username}` || undefined}
          subheader={`${date.getDate()} ${date.toLocaleString("default", {
            month: "long",
          })} ${date.getFullYear()}`}
        />
        <MoreHorizIcon className="options" sx={{ margin: "10px" }} onClick={handlePostOptionsClick} />
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
          {userId === content?.userid?._id ? (
            <>
              {/* <MenuItem onClick={() => handleMenuItemClick("Post-Edit", content?._id)}>Edit</MenuItem> */}
              <MenuItem onClick={() => handleMenuItemClick("Post-Delete", content?._id)}>Delete</MenuItem>
            </>
          ) : (
            <MenuItem onClick={() => handleMenuItemClick("Post-Report", content?._id)}>Report</MenuItem>
          )}
        </Menu>
      </Box>
      <CardContent sx={{ marginTop: "0px", paddingTop: "0px" }}>
        <Typography variant="body2" color="text.secondary">
          {content.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {body}
        </Typography>
      </CardContent>
      {images.length > 0 && (
        <Box width={"100%"} height={"auto"} className="carousel-container">
          <Carousel
            navButtonsAlwaysVisible={true}
            indicators={false}
            showThumbs={false}
            showStatus={false}
            infiniteLoop={true}
            renderArrowNext={(onClickHandler, hasNext) =>
              hasNext && (
                <button
                  type="button"
                  style={{ fontSize: "12px", zIndex: 2 }}
                  onClick={onClickHandler}
                  className="carousel-button next"
                >
                  <FaArrowRight />
                </button>
              )
            }
            renderArrowPrev={(onClickHandler, hasPrev) =>
              hasPrev && (
                <button
                  type="button"
                  style={{ fontSize: "12px", zIndex: 2 }}
                  onClick={onClickHandler}
                  className="carousel-button prev"
                >
                  <FaArrowLeft />
                </button>
              )
            }
          >
            {images.map((image, index) => (
              <div key={index} className="carousel-image-wrapper">
                <img src={image} alt={`Slide ${index}`} className="carousel-image" />
              </div>
            ))}
          </Carousel>
        </Box>
      )}

      <Divider sx={{ marginBottom: "5px" }} />
      <CardActions className="post-action">
        <Stack direction={"row"} spacing={1}>
          <Typography
            sx={{
              fontFamily: "system-ui",
              fontStyle: "normal",
              fontWeight: "400",
              fontSize: "14px",
            }}
          >
            {likes.length}
          </Typography>

          <Stack direction={"row"} spacing={0.5}>
            {uniqueReactions.map((reactionType, i) => (
              <Stack direction={"row"} key={i} sx={{ gap: "1px", fontSize: "15px", display: "inline-block" }}>
                {emojiMap[reactionType]}
              </Stack>
            ))}
          </Stack>
        </Stack>

        <Button
          className="reaction-btn"
          aria-label="add to favorites"
          sx={{ color: "#00000080", textTransform: "none" }}
        >
          <Box sx={{ fontSize: "25px" }}>{emoji}</Box>
          <Typography variant="h6">{emojiType}</Typography>
          <Box className="reaction-type">
            <ReactionBarSelector
              style={{ width: "310px" }}
              reactions={[
                { label: "Like", node: emojiMap.Like, key: "Like" },
                {
                  label: "Celebrate",
                  node: emojiMap.Celebrate,
                  key: "Celebrate",
                },
                { label: "Support", node: emojiMap.Support, key: "Support" },
                { label: "Love", node: emojiMap.Love, key: "Love" },
                {
                  label: "Insightful",
                  node: emojiMap.Insightful,
                  key: "Insightful",
                },
                { label: "Funny", node: emojiMap.Funny, key: "Funny" },
              ]}
              onSelect={handleEmojiSelect}
            />
          </Box>
        </Button>
        <IconButton aria-label="add to favorites" onClick={handleExpandClick}>
          <CommentIcon sx={{ color: "#00000080" }} />
          <Typography variant="h6">Comment</Typography>
        </IconButton>
        {/* <IconButton aria-label="add to favorites">
          <RepeatIcon />
          <Typography variant="h6">Repost</Typography>
        </IconButton>
        <IconButton aria-label="add to favorites">
          <SendIcon />
          <Typography variant="h6">Share</Typography>
        </IconButton> */}
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <Avatar
            aria-label="recipe"
            src={Profile || user?.userInfo?.profileImage}
            sx={{ height: "50px", width: "50px" }}
          />
          <InputEmoji
            multiline
            value={commentBody}
            placeholder="Add a comment..."
            onChange={setCommentBody}
            cleanOnEnter
            onEnter={handleComment}
          />
          <Button variant="contained" onClick={handleComment}>
            Post
          </Button>
        </CardContent>
        <Divider />
        <CardContent>
          <Stack flexDirection={"row"}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                width: "100%",
              }}
            >
              {commentsList?.map((comment) => (
                <Box key={comment?._id} sx={{ display: "flex" }}>
                  <Avatar
                    aria-label="recipe"
                    src={Profile || comment?.user?.profileImage}
                    sx={{ height: "50px", width: "50px" }}
                  />
                  <Box sx={{ width: "100%", marginLeft: "15px" }}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        backgroundColor: "#F2F2F2",
                        width: "100%",
                        gap: "5px",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography sx={{ padding: "5px" }} color={"black"}>
                          {comment?.userId?.username} 
                        </Typography>
                        <Stack direction={"row"} alignItems="center">
                          <Typography sx={{ padding: "5px" }} color={"black"}>
                            {convertToHour(comment?.updatedAt)}
                          </Typography>
                          {userId === comment?.userId?._id && (
                            <IconButton onClick={() => handleCommentEdit(comment)} aria-label="edit">
                              <MoreHorizIcon />
                            </IconButton>
                          )}
                        </Stack>
                      </Box>

                      {open && userId === comment?.userId?._id && editCommentId === comment?._id  ? (
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            padding: "5px",
                          }}
                        >
                          <TextField
                            value={editedCommentBody}
                            // onChange={setEditedCommentBody}
                            onChange={(e) => setEditedCommentBody(e.target.value)}
                            placeholder="Edit comment..."
                          />
                          <Button onClick={() => handleSaveEditedComment(comment?._id)} variant="contained">
                            Save
                          </Button>
                          <Button onClick={handleCancelEdit} variant="outlined">
                            Cancel
                          </Button>
                        </Box>
                      ) : (
                        <Typography sx={{ padding: "5px" }} color={"black"}>
                          {comment?.body}
                        </Typography>
                      )}
                    </Box>
                    {userId === comment?.user?._id && (
                      <Box sx={{ fontSize: "10px" }}>
                        <IconButton sx={{ fontSize: "12px" }} onClick={() => handleCommentDelete(comment.comment._id)}>
                          Delete
                        </IconButton>
                      </Box>
                    )}
                  </Box>
                </Box>
              ))}
            </Box>
          </Stack>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default Cards;
