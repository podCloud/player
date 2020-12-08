window.addEventListener(
  "message",
  (event) => {
    if (event?.data?.setMyHeight) {
      Array.prototype.forEach.call(
        document.getElementsByTagName("iframe"),
        function (element) {
          if (element.contentWindow === event.source) {
            element.style.transition = "height 0.2s ease-in-out";
            element.style.height = `${event.data.setMyHeight}px`;
          }
        }
      );
    }
  },
  false
);
