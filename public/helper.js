window.addEventListener("message",(function(t){var e;null!=t&&null!==(e=t.data)&&void 0!==e&&e.setMyHeight&&Array.prototype.forEach.call(document.getElementsByTagName("iframe"),(function(e){e.contentWindow===t.source&&(e.style.transition="height 0.2s ease-in-out",e.style.height="".concat(t.data.setMyHeight,"px"))}))}),!1);