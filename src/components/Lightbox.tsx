"use client";

import { useState } from "react";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

const images = [
  "/ai (1)-min.jpg",
  "/ai (2)-min.jpg",
  "/ai (3)-min.jpg",
  "/ai (4)-min.jpg",
];

export const LightboxGallery = () => {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`images ${index + 1}`}
          className="cursor-pointer w-[150px] h-[150px] object-cover rounded-lg shadow-md hover:scale-105 transition"
          onClick={() => {
            setPhotoIndex(index);
            setIsOpen(true);
          }}
        />
      ))}

      {isOpen && (
        <Lightbox
          mainSrc={images[photoIndex]}
          nextSrc={images[(photoIndex + 1) % images.length]}
          prevSrc={images[(photoIndex + images.length - 1) % images.length]}
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() =>
            setPhotoIndex((photoIndex + images.length - 1) % images.length)
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % images.length)
          }
        />
      )}
    </div>
  );
};
