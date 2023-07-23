import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
} from "@material-tailwind/react";
import { FaPlus } from "react-icons/fa";
function Post() {
  const [Posts, setPosts] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [comments, setComments] = useState([]);
  const [showPostDetails, setShowPostDetails] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6; // Number of posts to display per page
  const pageNeighbours = 2; // Number of pagination buttons to show on each side of the current page

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      setPosts(response.data);
    } catch (error) {
      console.error("Error retrieving data:", error);
    }
  };

  const fetchComments = async (postId) => {
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
      );
      setComments(response.data);
    } catch (error) {
      console.error("Error retrieving comments:", error);
    }
  };

  const handlePostClick = (postId) => {
    setSelectedPostId(postId);
    fetchComments(postId);
  };

  const handleToggleDetails = (postId) => {
    setSelectedPostId(postId);
    setShowPostDetails((prevShowPostDetails) => !prevShowPostDetails);
    if (!showPostDetails) {
      fetchComments(postId);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSelectedPostId(null);
    setShowPostDetails(false);
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = Posts.slice(indexOfFirstPost, indexOfLastPost);

  const generatePageNumbers = (totalPages, currentPage) => {
    let startPage = Math.max(1, currentPage - pageNeighbours);
    let endPage = Math.min(totalPages, currentPage + pageNeighbours);

    const totalPageNumbers = pageNeighbours * 2 + 1;
    let pages = [];

    if (totalPages > totalPageNumbers) {
      const hasLeftSpill = startPage > 1;
      const hasRightSpill = totalPages - endPage > 0;

      if (hasLeftSpill && !hasRightSpill) {
        endPage = Math.min(startPage + totalPageNumbers - 1, totalPages);
      } else if (!hasLeftSpill && hasRightSpill) {
        startPage = Math.max(endPage - totalPageNumbers + 1, 1);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const totalPages = Math.ceil(Posts.length / postsPerPage);
  const pageNumbers = generatePageNumbers(totalPages, currentPage);

  return (
    <>
      <div className="bg-slate-100 pb-12 mt-24">
        <div className="cursor-pointer group flex items-left gap-2 mx-40 pt-8">
          <span className="text-gray-500 group-hover:text-gray-900">
            Add New Post
          </span>
          <FaPlus className="w-6 h-6 text-gray-500 group-hover:text-gray-900" />
        </div>

        <div className="grid grid-cols-1 gap-6 p-16 mx-20 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
          {currentPosts.map((post) => (
            <Card
              key={post.id}
              color="white"
              shadow={true}
              className="w-full max-w-[26rem] rounded-md overflow-hidden "
              onClick={() => handlePostClick(post.id)}
            >
              <CardHeader
                color="lightBlue"
                floated={false}
                shadow={false}
                className="flex items-center justify-between px-4 py-3 border-l-4 border-sky-500 rounded-none"
              >
                <Typography variant="h6" className="text-black " color="white">
                  {post.title}
                </Typography>
              </CardHeader>

              <button
                className={`block text-sky-500 group-hover:text-slate-800 transition duration-200 text-left py-2 px-8 hover:text-sky-900${
                  showPostDetails && selectedPostId === post.id
                    ? " text-black"
                    : " text-black"
                }`}
                onClick={() => handleToggleDetails(post.id)}
              >
                {showPostDetails && selectedPostId === post.id
                  ? "Hide Details"
                  : "Show Details →"}
              </button>
            
              {showPostDetails && selectedPostId === post.id && (
                <CardBody className="px-4 py-3">
                  <Typography>{post.body}</Typography>
                  <hr className="my-4 border-gray-300" />
                  <h2 className="text-lg font-bold mb-4">Comments :</h2>

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
                            <h3 className="text-md font-bold">
                              {comment.name}
                            </h3>
                            <Typography className="text-gray-700">
                              {comment.body}
                            </Typography>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardBody>
              )}
            </Card>
          ))}
        </div>
        <div className="flex justify-center mt-6">
          <ul className="flex gap-2">
            
            {currentPage > 1 && (
              <>
                <li>
                  <button
                    className={`px-3 py-1 rounded-md bg-sky-500 text-white`}
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    Previous
                  </button>
                </li>
                {currentPage > pageNeighbours + 1}
              </>
            )}
            {pageNumbers.map((pageNumber) => (
              <li key={pageNumber}>
                <button
                  className={`px-3 py-1 rounded-md ${
                    currentPage === pageNumber
                      ? "bg-sky-500 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                  onClick={() => handlePageChange(pageNumber)}
                >
                  {pageNumber}
                </button>
              </li>
            ))}
            {currentPage < totalPages && (
              <>
                {currentPage < totalPages - pageNeighbours}
                <li>
                  <button
                    className={`px-3 py-1 rounded-md bg-sky-500 text-white`}
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    Next
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}
export default Post;