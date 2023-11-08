import { useLocation } from "react-router-dom";
import { PropsWithChildren, useLayoutEffect } from "react";

const Wrapper = ({ children }:PropsWithChildren) => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return children;
};

export default Wrapper;