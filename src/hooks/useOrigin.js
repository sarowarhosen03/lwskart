import { useEffect, useState } from "react";

export default function useOrigin() {
  const [origin, setOrigin] = useState(null);
  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);
  return origin;
}
