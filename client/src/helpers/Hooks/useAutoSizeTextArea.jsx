import { useEffect } from "react";

// Updates the height of a <textarea> when the value changes.
const useAutoSizeTextArea = (
  textAreaRef,
  value
) => {
  useEffect(() => {
    if (textAreaRef) {
      textAreaRef.style.height = "0px";
      const scrollHeight = textAreaRef.scrollHeight;

      textAreaRef.style.height = Math.min(scrollHeight, 72) + "px";
    }
  }, [textAreaRef, value]);
};

export default useAutoSizeTextArea;
