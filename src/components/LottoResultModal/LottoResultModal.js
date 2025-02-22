import $LottoResultModalBody from "./Body/LottoResultModalBody.js";
import $LottoResultModalHeader from "./Header/LottoResultModalHeader.js";
import $LottoResultFooter from "./Footer/LottoResultModalFooter.js";

const handleLottoResultModalClose = (event) => {
  console.log(event.target.closest(".modal-close-button"));
  if (event.target.closest(".modal-close-button")) {
    const $modalBackground = document.querySelector(".modal-background");
    $modalBackground.remove();
  }
};

const $LottoResultModal = (prizeResult, revenueRate) => {
  const $modalBackGround = createElement("div", {
    className: "modal-background",
  });
  const $modalBox = createElement("div", {
    className: "modal-box",
  });

  $modalBox.appendChild($LottoResultModalHeader());
  $modalBox.appendChild($LottoResultModalBody(prizeResult));
  $modalBox.appendChild($LottoResultFooter(revenueRate));

  $modalBackGround.appendChild($modalBox);

  const appContainer = document.getElementById("app");

  if (!appContainer) {
    throw new Error("app이 없습니다.");
  }

  appContainer.appendChild($modalBackGround);

  $modalBackGround.addEventListener("click", handleLottoResultModalClose);
};

export default $LottoResultModal;
