import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";

const PostDetailsPopup = ({ post, comments, onClose }) => {
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
            <h2 className="text-lg font-bold mb-4">Comments :</h2>

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
