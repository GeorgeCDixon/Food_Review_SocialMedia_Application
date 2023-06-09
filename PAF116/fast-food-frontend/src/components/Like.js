import React, { useState } from "react";
import { disLikePost, getPostById, likePost } from "../util/APIUtils";
import { toast } from "react-toastify";

const Like = props => {
  const [liked, setLiked] = useState(
    props.likes.filter(like => like.userId === props.currentUser.id).length > 0
  );
  const [likeCount, setLikeCount] = useState(props.likes.length);

  const handleLike = async () => {
    // like
    try {
      await likePost({
        postId: props.id,
        userId: props.currentUser.id
      });
      setLiked(true);
      setLikeCount(prevCount => prevCount + 1);
    } catch (error) {
      toast("Oops! something went wrong.", { type: "error" ,position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",});
    }
  };

  const handleDislike = async () => {
    try {
      const post = await getPostById(props.id);
      const like = post.likes.filter(
        like => like.userId === props.currentUser.id
      )[0];

      await disLikePost({
        likeId: like.id
      });
      setLiked(false);
      setLikeCount(prevCount => prevCount - 1);
    } catch (error) {
      console.log(error);
      toast("Oops! something went wrong.", { type: "error",position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark", });
    }
  };

  return (
    <>
      {!liked ? (
        <div
          type="button"
          onClick={handleLike}
          className={
            "inline-flex justify-center p-2 text-gray-200 rounded-lg cursor-pointer hover:text-gray-200 hover:bg-gray-600 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
          }
        >
          <div className="pr-2 ">{likeCount}</div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
            />
          </svg>
        </div>
      ) : (
        <div
          type="button"
          onClick={handleDislike}
          className={
            "inline-flex justify-center p-2 text-gray-200 rounded-lg cursor-pointer hover:text-gray-200 hover:bg-gray-600 dark:hover:bg-gray-600 dark:text-blue-500 dark:hover:text-blue-500"
          }
        >
          <div className="pr-2 ">{likeCount}</div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
            />
          </svg>
        </div>
      )}
    </>
  );
};

export default Like;
