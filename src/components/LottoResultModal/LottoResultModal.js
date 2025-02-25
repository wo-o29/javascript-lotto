import $LottoResultModalBody from "./Body/LottoResultModalBody.js";
import $LottoResultModalHeader from "./Header/LottoResultModalHeader.js";
import $LottoResultFooter from "./Footer/LottoResultModalFooter.js";
import initWebLottoGame from "../../lotto/initWebLottoGame.js";

const closeModal = () => {
  const $modalBackground = document.querySelector(".modal-background");

  if (!$modalBackground) {
    throw new Error("모달이 존재하지 않습니다.");
  }

  $modalBackground.remove();
};

const handleLottoResultModalClick = (event) => {
  if (event.target.closest(".modal-close-button")) {
    closeModal();
    return;
  }

  if (event.target.closest(".lotto-restart-button")) {
    closeModal();
    initWebLottoGame();
    return;
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

  $modalBackGround.addEventListener("click", handleLottoResultModalClick);
};

export default $LottoResultModal;
