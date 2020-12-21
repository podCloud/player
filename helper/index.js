window.addEventListener(
  "message",
  (event) => {
    const data = JSON.parse(`${event?.data?.["trim"]?.()}`);
    if (data?.height) {
      Array.prototype.forEach.call(
        document.getElementsByTagName("iframe"),
        function (element) {
          if (element.contentWindow === event.source) {
            element.style.transition = "height 0.2s ease-in-out";
            element.style.height = `${data.height}px`;
          }
        }
      );
    }
  },
  false
);
