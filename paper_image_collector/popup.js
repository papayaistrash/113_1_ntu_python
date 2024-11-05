// popup.js
document.addEventListener("DOMContentLoaded", () => {
    const imageContainer = document.getElementById("imageContainer");
    chrome.storage.local.get("images", (result) => {
      const images = result.images || [];
      images.forEach((item) => {
        const imgElem = document.createElement("img");
        imgElem.src = item.url;
        const descElem = document.createElement("p");
        descElem.textContent = item.description;
        imageContainer.appendChild(imgElem);
        imageContainer.appendChild(descElem);
      });
    });
  });