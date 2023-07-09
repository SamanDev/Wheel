if (!isSecureContext) {
  location.protocol = "https:";
}
(async () => {
  window.addEventListener("load", () => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("sw.js");
    }
  });

  if (window.matchMedia("(display-mode: standalone)").matches) {
    document.querySelector("#redhand").hidden = true;
  }

  document.querySelector("#redhand").addEventListener("click", () => {
    navigator.registerProtocolHandler("web+app", "/play?mode=%s");
  });
})();
