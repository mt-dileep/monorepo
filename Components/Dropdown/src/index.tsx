import React, { useEffect, useRef } from "react";
import "./style.css";

const VanillaDropdown = function ({ options }) {
  const parentRef = useRef(null);

  useEffect(() => {
    const placeholder = document.createElement("div");
    const ddList = document.createElement("ul");
    placeholder.textContent = "Select Value";
    placeholder.classList.add("ddPlace");
    parentRef.current?.appendChild(placeholder);

    parentRef.current?.addEventListener("click", () => {
      ddList.classList.toggle("hide");
    });
    ddList.classList.add("hide");
    ddList.classList.add("dd");
    ddList.addEventListener("click", (e) => {
      e.stopPropagation();
      //@ts-ignore
      placeholder.textContent = e.target.innerHTML;
      ddList.classList.toggle("hide");
    });

    options.forEach((option) => {
      const li = document.createElement("li");
      li.textContent = option.label;
      li.setAttribute("name", option.value);
      ddList.appendChild(li);
    });
    parentRef.current?.appendChild(ddList);
    return () => {
      parentRef.current?.removeChild(placeholder);
      parentRef.current?.removeChild(ddList);
    };
  }, []);
  return <div ref={parentRef} />;
};

export default VanillaDropdown;
