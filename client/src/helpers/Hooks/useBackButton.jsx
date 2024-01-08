import { useEffect, useContext } from "react";
import { NavigationType, UNSAFE_NavigationContext } from "react-router-dom";

export const useBackListener = (callback) => {
  const navigator = useContext(UNSAFE_NavigationContext).navigator;

  useEffect(() => {
    const listener = ({ location, action }) => {
      if (action === NavigationType.Pop) {
        callback({ location, action });
      }
    };

    const unlisten = navigator.listen(listener);
    return unlisten;
  }, [callback, navigator]);
};
