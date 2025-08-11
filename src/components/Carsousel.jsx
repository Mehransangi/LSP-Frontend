import { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

const Carsousel = ({ children }) => {
  const [curr, setCurr] = useState(0);
  const totalSlides = children.length;

  const prev = () => {
    setCurr((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const next = () => {
    setCurr((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative overflow-hidden w-full">
      <div
        className="flex transition-transform ease-in duration-500"
        style={{ transform: `translateX(-${curr * 100}%)`, width: `${totalSlides * 100}%` }}
      >
        {children.map((child, index) => (
          <div key={index} className="w-full flex-shrink-0">
            {child}
          </div>
        ))}
      </div>

      <div className="absolute inset-0 flex items-center justify-between p-4 pointer-events-none">
        <button
          onClick={prev}
          className="pointer-events-auto bg-[#bdd1ff40] rounded-full p-2 shadow hover:bg-[#bdd1ff] transition-colors"
        >
          <FaChevronLeft />
        </button>
        <button
          onClick={next}
          className="pointer-events-auto bg-[#bdd1ff40] rounded-full p-2 shadow hover:bg-[#bdd1ff] transition-colors"
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default Carsousel;
