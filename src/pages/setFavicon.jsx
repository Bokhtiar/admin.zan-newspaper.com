import icon from "../assets/icon/JPG Logo.jpg"; // ঠিক path দিন

export function setFavicon() {
  const favicon = document.querySelector("link[rel='icon']");
  if (favicon) {
    favicon.setAttribute("href", icon);
  }
}
