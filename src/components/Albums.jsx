import axios from "axios";
import React, { useState, useEffect } from "react";
import Popup from "./Popup";
// function Albums() {
//   const [albums, setAlbums] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [showPopup, setShowPopup] = useState(false);
//   const [selectedAlbumId, setSelectedAlbumId] = useState(null);
//   const albumsPerPage = 6;

//   useEffect(() => {
//     fetchAlbums();
//   }, []);

//   const fetchAlbums = async () => {
//     try {
//       const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
//       setAlbums(response.data);
//     } catch (error) {
//       console.error("Error retrieving data:", error);
//     }
//   };

//   const indexOfLastAlbum = currentPage * albumsPerPage;
//   const indexOfFirstAlbum = indexOfLastAlbum - albumsPerPage;
//   const currentAlbums = albums.slice(indexOfFirstAlbum, indexOfLastAlbum);

//   const totalPages = Math.ceil(albums.length / albumsPerPage);

//   const getDisplayRange = () => {
//     const rangeSize = 4; 
//     const displayRange = [];
//     let start = Math.max(1, currentPage - Math.floor(rangeSize / 2));
//     let end = Math.min(totalPages, start + rangeSize - 1);

//     if (totalPages - end < Math.floor(rangeSize / 2)) {
//       start = Math.max(1, start - (rangeSize - (totalPages - end)));
//     }

//     for (let i = start; i <= end; i++) {
//       displayRange.push(i);
//     }

//     if (start > 1) {
//       displayRange.unshift("...");
//     }
//     if (end < totalPages) {
//       displayRange.push("...");
//     }
//     return displayRange;
//   };

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);



//   const handleViewImage = (albumId) => {
//     setSelectedAlbumId(albumId);
//     setShowPopup(true);
//   };

//   // Function to close the popup
//   const handleClosePopup = () => {
//     setShowPopup(false);
//   };


//   return (
//     <>
//       <h2 className="text-2xl font-bold mb-4">Albums</h2>
//       <div className="flex flex-wrap gap-7 justify-center ">
//         {currentAlbums.map((album) => (
//           <div key={album.id} className="max-w-sm rounded overflow-hidden shadow-lg">
//             <img
//               className="w-full"
//               src="https://images.unsplash.com/photo-1518998053901-5348d3961a04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
//               alt="Sunset in the mountains"
//             />
//             <div className="px-6 py-4">
//               <div className="font-bold text-xl mb-2">{album.title}</div>
//               <button> view image  </button>
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className="flex justify-center mt-6">
//         <nav className="block">
//           <ul className="flex pl-0 rounded list-none flex-wrap">
//             {getDisplayRange().map((pageNumber, index) => (
//               <li key={index}>
//                 {pageNumber === "..." ? (
//                   <span className="text-sm px-4 py-2 mx-1">...</span>
//                 ) : (
//                   <button
//                     onClick={() => paginate(pageNumber)}
//                     className={`text-sm px-4 py-2 mx-1 focus:outline-none ${
//                       currentPage === pageNumber
//                         ? "bg-sky-500 text-white"
//                         : "bg-sky-100 text-black hover:bg-gray-400"
//                     } rounded`}
//                   >
//                     {pageNumber}
//                   </button>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </nav>
//       </div>

//     </>
//   );
// }

// export default Albums;


function Albums() {
    const [albums, setAlbums] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const albumsPerPage = 6; // Number of albums to display per page
  
    useEffect(() => {
      fetchAlbums();
    }, []);
  
    const fetchAlbums = async () => {
      try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
        setAlbums(response.data);
      } catch (error) {
        console.error("Error retrieving data:", error);
      }
    };
  
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
  
    // Function to handle click on "View Image" button
    const handleViewImage = (albumId) => {
      setSelectedAlbumId(albumId);
      setShowPopup(true);
    };
  
    // Function to close the popup
    const handleClosePopup = () => {
      setShowPopup(false);
    };
  
    // State to manage the popup visibility and album ID
    const [showPopup, setShowPopup] = useState(false);
    const [selectedAlbumId, setSelectedAlbumId] = useState(null);
  
    return (
      <>
        <h2 className="text-2xl font-bold mb-4">Albums</h2>
        <div className="flex flex-wrap gap-7 justify-center ">
          {currentAlbums.map((album) => (
            <div key={album.id} className="max-w-sm rounded overflow-hidden shadow-lg">
              <img
                className="w-full"
                src="https://images.unsplash.com/photo-1518998053901-5348d3961a04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
                alt="Sunset in the mountains"
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{album.title}</div>
                <button
                  onClick={() => handleViewImage(album.id)}
                  className="px-4 py-2 bg-sky-500 text-white rounded"
                >
                  View Image
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
        {/* Render the Popup component when showPopup is true */}
        {showPopup && <Popup albumId={selectedAlbumId} onClose={handleClosePopup} />}
      </>
    );
  }
  
  export default Albums;