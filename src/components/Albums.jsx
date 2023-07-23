import axios from "axios";
import React, { useState, useEffect } from "react";
import Popup from "./Popup";

function Albums() {
  const [albums, setAlbums] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageNeighbours = 6;

  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/albums"
      );
      setAlbums(response.data);
    } catch (error) {
      console.error("Error retrieving data:", error);
    }
  };

  const generatePageNumbers = (totalPages, currentPage, pageRange) => {
    let startPage = Math.max(1, currentPage - Math.floor(pageRange / 2));
    let endPage = Math.min(totalPages, startPage + pageRange - 1);

    if (endPage - startPage + 1 < pageRange) {
      startPage = Math.max(1, endPage - pageRange + 1);
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const handleViewImage = (albumId) => {
    setSelectedAlbumId(albumId);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const [showPopup, setShowPopup] = useState(false);
  const [selectedAlbumId, setSelectedAlbumId] = useState(null);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const pageRange = 5;
  const indexOfLastAlbum = currentPage * pageNeighbours;
  const indexOfFirstAlbum = indexOfLastAlbum - pageNeighbours;
  const currentAlbums = albums.slice(indexOfFirstAlbum, indexOfLastAlbum);
  const totalPages = Math.ceil(albums.length / pageNeighbours);
  const pageNumbers = generatePageNumbers(totalPages, currentPage, pageRange);

  return (
    <>
      <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-800">
        Albums
      </h1>{" "}
      <div className="flex flex-wrap gap-7 justify-center">
        {currentAlbums.map((album) => (
          <div
            key={album.id}
            className="h-88 max-w-sm rounded overflow-hidden shadow-xl hover:opacity-90 hover:scale-95 transition-all duration-300"
          >
            <img
              className="w-full h-2/3 opacity-60"
              src="https://i.pinimg.com/564x/c9/9d/92/c99d92520f2e90252be6ebac00bd1466.jpg"
              alt="Sunset in the mountains"
            />
            <div className="px-6 py-4 flex flex-col justify-between">
              <div className="text-xl mb-4 h-10">{album.title}</div>
              <button
                onClick={() => handleViewImage(album.id)}
                className="px-4 py-2 bg-transparent border-solid border-2 border-sky-600 text-gray-600 rounded mt-auto transition-colors duration-300 ease-in-out hover:text-white hover:bg-sky-600"
              >
                View Images
              </button>
            </div>
          </div>
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

      {showPopup && (
        <Popup albumId={selectedAlbumId} onClose={handleClosePopup} />
      )}
    </>
  );
}

export default Albums;
