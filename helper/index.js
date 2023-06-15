window.addEventListener(
  "message",
  (event) => {
    const text_data = `${event?.data?.["trim"]?.()}`;
    if (!text_data?.includes("iframe.resize")) return;

    const data = JSON.parse(text_data);
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
