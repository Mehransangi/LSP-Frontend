import { useState, useEffect } from "react";

const images = [
  "/bg-1.webp",
  "/bg-2.webp",
  "/bg-3.jpg",
  "/bg-4.jpg",
  "/bg-5.jpg",
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 2000); // change image every 2 seconds

    return () => clearInterval(interval); // cleanup
  }, []);

  return (
    <div className="relative w-full max-w-7xl mx-auto overflow-hidden rounded-2xl">
      <div className="absolute inset-0 bg-black/50 z-10 pointer-events-none"></div>

      <div
        className="flex !transition-transform duration-1000 ease-in-out hover:scale-111"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images?.map((src, index) => (
          <div key={index} className="flex-shrink-0 w-full">
            <img
              src={src}
              alt={`slide-${index}`}
              className="w-full object-cover"
              style={{ height: "600px" }}
            />
          </div>
        ))}
      </div>

      {/* Optional: navigation dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, idx) => (
          <span
            key={idx}
            className={`h-2 w-2 rounded-full !transition-all duration-300 ${idx === currentIndex ? "bg-background" : "bg-gray-300"
              }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
