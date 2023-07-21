import axios from "axios";
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, Typography, Avatar } from "@material-tailwind/react";

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
      const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
      setPosts(response.data);
    } catch (error) {
      console.error("Error retrieving data:", error);
    }
  };

  const fetchComments = async (postId) => {
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
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
      <div className="grid grid-cols-3 gap-6 p-8">
        {currentPosts.map((post) => (
          <Card
            key={post.id}
            color="white"
            shadow={true}
            className="w-full max-w-[26rem] rounded-md overflow-hidden"
            onClick={() => handlePostClick(post.id)}
          >
            <CardHeader
              color="lightBlue"
              floated={false}
              shadow={false}
              className="flex items-center justify-between px-4 py-3"
            >
              <Typography variant="h6" className="text-black " color="white">
                {post.title}
              </Typography>
              <button
                className={`px-3 py-1 rounded-md ${
                  showPostDetails && selectedPostId === post.id ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
                }`}
                onClick={() => handleToggleDetails(post.id)}
              >
                {showPostDetails && selectedPostId === post.id ? "Hide Details" : "Show Details"}
              </button>
            </CardHeader>
            {showPostDetails && selectedPostId === post.id && (
              <CardBody className="px-4 py-3">
                <Typography variant="subtitle1" color="gray">
                  Post Body:
                </Typography>
                <Typography>{post.body}</Typography>
                <hr className="my-4 border-gray-300" />
                <Typography variant="subtitle1" color="gray">
                  Comments:
                </Typography>
                {comments.map((comment) => (
                  <div key={comment.id} className="my-2">
                    <Typography>{comment.body}</Typography>
                    <Typography variant="caption" color="gray">
                      By: {comment.name}
                    </Typography>
                  </div>
                ))}
              </CardBody>
            )}
          </Card>
        ))}
      </div>
      <div className="flex justify-center mt-6">
        <ul className="flex gap-2">
          {/* Generate pagination buttons */}
          {currentPage > 1 && (
            <>
              <li>
                <button
                  className={`px-3 py-1 rounded-md bg-blue-500 text-white`}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  Previous
                </button>
              </li>
              {currentPage > pageNeighbours + 1 }
            </>
          )}
          {pageNumbers.map((pageNumber) => (
            <li key={pageNumber}>
              <button
                className={`px-3 py-1 rounded-md ${
                  currentPage === pageNumber ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
                }`}
                onClick={() => handlePageChange(pageNumber)}
              >
                {pageNumber}
              </button>
            </li>
          ))}
          {currentPage < totalPages && (
            <>
              {currentPage < totalPages - pageNeighbours }
              <li>
                <button
                  className={`px-3 py-1 rounded-md bg-blue-500 text-white`}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  Next
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </>
  );
}

export default Post;
