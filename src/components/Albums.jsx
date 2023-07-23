import axios from "axios";
import React, { useState, useEffect } from "react";
import Popup from "./Popup";

function Albums() {
  const [albums, setAlbums] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const albumsPerPage = 6;

  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/albums"
      );
      // const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
      setAlbums(response.data);
    } catch (error) {
      console.error("Error retrieving data:", error);
    }
  };
  console.log(albums);

  const indexOfLastAlbum = currentPage * albumsPerPage;
  const indexOfFirstAlbum = indexOfLastAlbum - albumsPerPage;
  const currentAlbums = albums.slice(indexOfFirstAlbum, indexOfLastAlbum);

  const totalPages = Math.ceil(albums.length / albumsPerPage);

  const getDisplayRange = () => {
    const rangeSize = 4;
    const displayRange = [];
    let start = Math.max(1, currentPage - Math.floor(rangeSize / 2));
    let end = Math.min(totalPages, start + rangeSize - 1);

    if (totalPages - end < Math.floor(rangeSize / 2)) {
      start = Math.max(1, start - (rangeSize - (totalPages - end)));
    }

    for (let i = start; i <= end; i++) {
      displayRange.push(i);
    }

    if (start > 1) {
      displayRange.unshift("...");
    }
    if (end < totalPages) {
      displayRange.push("...");
    }
    return displayRange;
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleViewImage = (albumId) => {
    setSelectedAlbumId(albumId);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const [showPopup, setShowPopup] = useState(false);
  const [selectedAlbumId, setSelectedAlbumId] = useState(null);

  return (
    <>
      <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-800">
        Albums
      </h1>{" "}
      <div className="flex flex-wrap gap-7 justify-center ">
        {currentAlbums.map((album) => (
          <div
            key={album.id}
            className="h-88 max-w-sm rounded overflow-hidden shadow-xl hover:opacity-90 hover:scale-95 transition-all duration-300"
          >
            <img
              className="w-full h-2/3  opacity-60 "
              src="https://i.pinimg.com/564x/c9/9d/92/c99d92520f2e90252be6ebac00bd1466.jpg"
              alt="Sunset in the mountains"
            />
            <div className="px-6 py-4 flex flex-col justify-between">
              <div className=" text-xl mb-4 h-10 ">{album.title}</div>
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
        <nav className="block">
          <ul className="flex pl-0 rounded list-none flex-wrap">
            {getDisplayRange().map((pageNumber, index) => (
              <li key={index}>
                {pageNumber === "..." ? (
                  <span className="text-sm px-4 py-2 mx-1">...</span>
                ) : (
                  <button
                    onClick={() => paginate(pageNumber)}
                    className={`text-sm px-4 py-2 mx-1 mb-4 focus:outline-none ${
                      currentPage === pageNumber
                        ? "bg-sky-500 text-white"
                        : "bg-sky-100 text-black hover:bg-gray-400"
                    } rounded`}
                  >
                    {pageNumber}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
      {showPopup && (
        <Popup albumId={selectedAlbumId} onClose={handleClosePopup} />
      )}
    </>
  );
}

export default Albums;