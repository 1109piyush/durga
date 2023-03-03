import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";

import { products } from "./products";

function ProductPage() {
  const { productId } = useParams();
  const product = products.find((p) => p.id == productId);

  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef();

  if (!product) {
    return <div>Product not found.</div>;
  }

  const handlePlayMusic = () => {
    const audio = audioRef.current;
    setIsPlaying(true);
    audio.play();
  };

  const handleStopMusic = () => {
    const audio = audioRef.current;
    setIsPlaying(false);
    audio.pause();
    audio.currentTime = 0;
  };

  return (
    <>
    <div className="flex flex-col lg:flex-row bg-white rounded-lg shadow-md overflow-hidden">
      <div className="w-full lg:w-1/2">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 w-full lg:w-1/2">
        <h2 className="text-lg font-medium mb-2">{product.title}</h2>
        <p className="text-gray-700 text-base mb-4">{product.shortDescription}</p>
        <button
          className="inline-flex items-center bg-blue-500 hover:bg-blue-600 text-white rounded-full py-2 px-4 focus:outline-none"
          onClick={handlePlayMusic}
          disabled={isPlaying}
        >
          Play Music
        </button>
       
          <button
            className="inline-flex items-center bg-red-500 hover:bg-red-600 text-white rounded-full py-2 px-4 ml-4 focus:outline-none"
            onClick={handleStopMusic}
          >
            Stop Music
          </button>
      <audio ref={audioRef} src={product.music} />
      </div>
    </div>
      <div className="p-4 w-full">
        <p className="text-gray-700 text-base">{product.longDescription}</p>
      </div>
    </>
  );
};

export default ProductPage;
