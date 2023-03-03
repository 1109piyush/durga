import React, { useState, useRef, useEffect } from "react";
import durga from "./goddess.png";
import diya from "./diya.png";
import arti from "./arti.mp3";
import { Link } from "react-router-dom";
import { products } from "../products";

function NavratriHeader() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const diyaRef = useRef(null);
  const audioRef = useRef(new Audio(arti));

  const handleDiyaClick = () => {
    audioRef.current.play();
  };

  useEffect(() => {
    const audio = audioRef.current;

    diyaRef.current.addEventListener("mousedown", handleDiyaClick);
    diyaRef.current.addEventListener("touchstart", handleDiyaClick);

    return () => {
      audio.pause();
      diyaRef.current.removeEventListener("mousedown", handleDiyaClick);
      diyaRef.current.removeEventListener("touchstart", handleDiyaClick);
    };
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchmove", handleTouchMove);
      document.addEventListener("touchend", handleTouchEnd);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDragging]);

  const handleMouseDown = (event) => {
    setIsDragging(true);
  };

  const handleMouseMove = (event) => {
    setPosition({
      x: event.pageX - diyaRef.current.offsetWidth / 2,
      y: event.pageY - diyaRef.current.offsetHeight / 2,
    });
  };

  const handleMouseUp = (event) => {
    setIsDragging(false);
    audioRef.current.pause();
  };

  const handleTouchStart = (event) => {
    setIsDragging(true);
  };

  const handleTouchMove = (event) => {
    setPosition({
      x: event.touches[0].pageX - diyaRef.current.offsetWidth / 2,
      y: event.touches[0].pageY - diyaRef.current.offsetHeight / 2,
    });
  };

  const handleTouchEnd = (event) => {
    setIsDragging(false);
    audioRef.current.pause();
  };

  return (
    <div>
      <section style={{ height: `${durga.height}px`, position: 'relative' }}>
        <img
          src={durga}
          alt="Goddess"
          className="mx-auto w-full max-w-4xl absolute inset-0"
          style={{ zIndex: -1 }}
        />
        <img
          src={diya}
          alt="Diya"
          className="w-8 cursor-move absolute top-10 left-10"
          ref={diyaRef}
          style={{
            zIndex: 0,
            transform: `translate(${position.x}px, ${position.y}px)`,
          }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        />
      </section>
      <section className="flex flex-wrap justify-center mt-10 absolute top-72 " style={{ zIndex: -1 }}>

        {products.map((product) => (
          <div key={product.id} className="m-4 w-64">
            <Link to={`/product/${product.id}`}>
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-cover"
              />
              <h2 className="text-lg font-semibold mt-2">{product.title}</h2>
              <p className="mt-1">{product.shortDescription}</p>
            </Link>
          </div>
        ))}
      </section>
    </div>
  );
}

export default NavratriHeader;
