const $LottoResultModalClose = () => {
  const $modalCloseBox = createElement("p", {
    class: "modal-close-box",
  });
  const $modalCloseButton = createElement("button", {
    class: "modal-close-button",
    type: "button",
  });

  $modalCloseButton.appendChild(
    createElement("img", {
      src: "close.svg",
      alt: "모달 닫기",
    })
  );
  $modalCloseBox.appendChild($modalCloseButton);

  return $modalCloseBox;
};

export default $LottoResultModalClose;
