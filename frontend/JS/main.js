document.body.onload = () => {
  const gear = document.querySelector(".options");
  const hideList = document.querySelector(".options ul");

  gear.addEventListener("click", () => {
    if (gear.classList.contains("active")) {
      gear.classList.remove("active");
      hideList.classList.add("hide");
      hideList.classList.remove("show");
    } else {
      gear.classList.add("active");
      hideList.classList.remove("hide");
      hideList.classList.add("show");
    }
  });
  document.addEventListener("click", (e) => {
    if (
      !(
        (e.target.localName == "ul" && e.target.classList.contains("hide")) ||
        (e.target.localName == "svg" && e.target.classList.contains("ul"))
      )
    ) {
      gear.classList.remove("active");
      hideList.classList.add("hide");
      hideList.classList.remove("show");
    }
  });
};
