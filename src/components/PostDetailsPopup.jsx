import React , {useState , useContext , useEffect} from "react";
import axios from 'axios';
import { v4 as uuidv4 } from "uuid";
import { UserContext } from "../Context/UserContext";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";

const PostDetailsPopup = ({ post, comments, onClose , setComments }) => {
  const [showFormComment, setShowFormComment] = useState(false);
  const {userId}  = useContext(UserContext);
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("auth")) ?? 0
  );
  const uniqueId = uuidv4();
  const [newComment, setNewComment] = useState({
    id: uniqueId,
    name: userId.name,
    email: userId.email,
    postId: post.id,
    body: "",
  });

  const handleComment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/comments",
        newComment
      );
      console.log("New comment created:", response.data);
      setShowFormComment(!showFormComment);
      setComments((prev) => [...prev, response.data]);
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex items-center justify-center">
      <div className="h-full w-full flex items-center justify-center">
        <Card
          color="white"
          shadow={true}
          className="w-full max-w-[26rem] rounded-md overflow-hidden"
        >
          <CardHeader
            color="lightBlue"
            floated={false}
            shadow={false}
            className="flex items-center justify-between px-4 py-3 border-l-4 border-sky-500 rounded-none"
          >
            <Typography variant="h6" className="text-black" color="white">
              {post.title}
            </Typography>
            <button className="text-gray-500 hover:text-gray-900" onClick={onClose}>
              Close
            </button>
          </CardHeader>

          <CardBody className="px-4 py-3">
            <Typography>{post.body}</Typography>
            <hr className="my-4 border-gray-300" />
            <h2 className="text-lg font-bold mb-4">Comments : {comments.length}</h2>
            <div className="flex items-center mt-4 space-x-4 w-full">
              {showFormComment ? (
                <form className="w-full flex gap-3" onSubmit={handleComment}>
                  <input
                    type="text"
                    name="body"
                    value={newComment.body}
                    onChange={(e) =>
                      setNewComment((prev) => ({
                        ...prev,
                        body: e.target.value,
                      }))
                    }
                    placeholder="Type here"
                    className="input input-sm input-bordered w-full "
                  />
                  <button type="submit" className="btn btn-sm ">
                    comment
                  </button>
                </form>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    token
                      ? setShowFormComment(!showFormComment)
                      : alert("You must logged in to add comment ");
                  }}
                  className="flex items-center text-sm text-gray-500 hover:underline text-black"
                >
                  <svg
                    aria-hidden="true"
                    className="mr-1 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  Reply
                </button>
              )}
            </div>

            <div className="max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-sky-500 scrollbar-thumb-rounded-full scrollbar-track-transparent scrollbar-track-rounded-full">
              {comments.map((comment) => (
                <div key={comment.id} className="bg-gray-100 p-6">
                  <div className="flex flex-col space-y-4">
                    <div className="bg-white p-4 rounded-lg shadow-md flex items-start">
                      <img
                        src="https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
                        alt="User Avatar"
                        className="w-12 h-12 rounded-full mr-4"
                      />
                      <div>
                        <h3 className="text-md font-bold">{comment.name}</h3>
                        <Typography className="text-gray-700">
                          {comment.body}
                        </Typography>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default PostDetailsPopup;
