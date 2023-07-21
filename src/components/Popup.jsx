import axios from "axios";
import React, { useState, useEffect } from "react";

function Popup({ albumId, onClose }) {
  const [images, setImages] = useState([]);

  const fetchAlbums = () => {
    axios
      .get("https://jsonplaceholder.typicode.com/photos")
      .then((response) => {
        const data = response.data;
        const filteredImages = data.filter((photo) => photo.albumId === albumId);
        setImages(filteredImages);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchAlbums();
  }, [albumId]);

  return (
    <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
      <div className="relative max-w-3xl p-4 bg-white rounded-lg shadow-xl max-h-screen overflow-y-auto">
        <div className="grid grid-cols-3 gap-4 mt-8">
          {images.map((image) => (
            <div key={image.id} className="flex flex-col items-center">
              <img
                src={image.url}
                alt={`Album Image ${image.id}`}
                className="w-full h-auto rounded"
              />
              <p className="mt-2 text-center">{image.title}</p>
            </div>
          ))}
        </div>
        <button
          className="fixed top-2 right-5 px-2 py-1 bg-red-500 text-white rounded-md"
          onClick={onClose}
        >
         <span className="sr-only">Close menu</span>
  {/* Heroicon name: outline/x */}
  <svg
    className="h-6 w-6 "
    xmlns="http://www.w3.org/2000/svg"
    fill="red"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
        </button>
      </div>
    </div>
  );
}

export default Popup;
