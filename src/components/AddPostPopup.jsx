import React, { useState , useContext } from "react";
import { Card, CardHeader, CardBody, Typography } from "@material-tailwind/react";
import axios from 'axios';
import { UserContext } from "../Context/UserContext";
import { v4 as uuidv4 } from "uuid";
const AddPostPopup = ({ onClose, onAddPost , posts , setPosts }) => {
  const [title, setTitle] = useState("");
  const {userId} = useContext(UserContext)
  const uniqueId = uuidv4();
  const [body, setBody] = useState("");
  const [postInfo, setPostInfo] = useState({
    userId: userId.id,
    id: uniqueId,
    title: "",
    body: "",
  });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Validate inputs (optional)
//     if (!title || !body) {
//       alert("Please fill in both title and body fields.");
//       return;
//     }
//     // Call the onAddPost function with the new post data
//     onAddPost({ title, body });
//     // Close the popup
//     onClose();
//   };

  const handlePostSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        postInfo
      );
      console.log("New post created:", response.data);
      setPosts((prev) => [...prev, response.data]);
   
    } catch (error) {
      console.error("Error creating post:", error);
    }
    console.log(postInfo)
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
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
              Add New Post
            </Typography>
            <button className="text-gray-500 hover:text-gray-900" onClick={onClose}>
              Close
            </button>
          </CardHeader>

          <CardBody className="px-4 py-3">
            <form onSubmit={handlePostSubmit}>
              <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
                  Title:
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={postInfo.title}
                //   onChange={(e) => setTitle(e.target.value)}
                onChange={handleChange}
                  className="border rounded-md p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="body" className="block text-gray-700 text-sm font-bold mb-2">
                  Body:
                </label>
                <textarea
                  id="body"
                  name="body"
                  value={postInfo.body}
                //   onChange={(e) => setBody(e.target.value)}
                onChange={handleChange}

                  className="border rounded-md p-2 w-full resize-none"
                  rows="4"
                ></textarea>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="ml-4 px-4 py-2 bg-sky-500 text-white rounded-md text-sm font-medium hover:bg-sky-600"
                >
                  Add Post
                </button>
              </div>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default AddPostPopup;
