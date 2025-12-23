import { useEffect, useState } from "react";

export const useIsMobile = (maxWidth = 768) => {
  const [isMobile, setIsMobile] = useState(
    window.innerWidth <= maxWidth
  );

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${maxWidth}px)`);

    const listener = () => setIsMobile(media.matches);

    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [maxWidth]);

  return isMobile;
};
