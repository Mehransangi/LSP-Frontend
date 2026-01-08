import { useEffect } from "react";
import { useLocation } from "react-router";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth" // optional — use "auto" for instant jump
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
