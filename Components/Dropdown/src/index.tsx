import { useEffect } from "react";
import "./style.css";

const Dropdown = function ({ options }) {
  useEffect(() => {
    console.log("dd mount");
    const domId = document.getElementById("root");
    const initSelected = document.createElement("div");
    const ul = document.createElement("ul");

    initSelected.textContent = "Select Value";
    initSelected.classList.add("ddPlace");
    domId?.appendChild(initSelected);

    domId?.addEventListener("click", () => {
      ul.classList.toggle("hide");
    });
    domId?.addEventListener("blur", () => {
      console.log("blur");
    });
    ul.classList.add("hide");
    ul.classList.add("dd");
    ul.addEventListener("click", (e) => {
      e.stopPropagation();
      //@ts-ignore
      initSelected.textContent = e.target.innerHTML;
      ul.classList.toggle("hide");
    });

    options.forEach((option) => {
      const li = document.createElement("li");
      li.textContent = option.label;
      li.setAttribute("name", option.value);
      ul.appendChild(li);
    });
    domId?.appendChild(ul);
    return () => console.log("dd un-mount");
  }, []);
  return null;
};

export default Dropdown;
