import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { FaPlus } from "react-icons/fa";
import AddPostPopup from "./AddPostPopup";
import "./custom-scrollbar.css"; // Import the custom CSS file
import PostDetailsPopup from "./PostDetailsPopup";
function Post() {
  const [posts, setPosts] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [comments, setComments] = useState([]);
  const [showPostDetails, setShowPostDetails] = useState(false);
  const [showAddPostPopup, setShowAddPostPopup] = useState(false);
 
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6; 
  const pageNeighbours = 2; 

  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("auth")) ?? ""
  );


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
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

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

  const pageNumbers = generatePageNumbers(totalPages, currentPage);
  return (
    <>
      <div className="bg-slate-100 pb-12 mt-24">
        {token=== 1 && (<div className="cursor-pointer group flex items-left gap-2 mx-40 pt-8  ">
          <span
            className="text-gray-500 group-hover:text-gray-900 flex  gap-2"
            onClick={() => setShowAddPostPopup(true)}
          ><FaPlus className="w-6 h-6 text-gray-500 group-hover:text-gray-900" />
            Add New Post
          </span>
          
        </div> ) }
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

      {showPostDetails && selectedPostId && (
        <PostDetailsPopup
          post={currentPosts.find((post) => post.id === selectedPostId)}
          comments={comments}
          setComments = {setComments}
          onClose={() => setShowPostDetails(false)}
          
        />
      )}

      {showAddPostPopup && (
        <AddPostPopup
          onClose={() => setShowAddPostPopup(false)}
          posts={posts}
          setPosts={setPosts}
          
         
          // onAddPost={handleAddPost}
        />
      )}
    </>
  );
}

export default Post;
