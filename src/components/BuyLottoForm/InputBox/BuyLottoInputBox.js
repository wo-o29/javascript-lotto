import $BuyLottoInput from "./Input/BuyLottoInput.js";
import $BuyLottoSubmitButton from "./SubmitButton/BuyLottoSubmitButton.js";

const $BuyLottoInputBox = () => {
  const $buyLottoInputBox = createElement("p", {
    class: "buy-lotto-input-box",
  });

  $buyLottoInputBox.appendChild($BuyLottoInput());
  $buyLottoInputBox.appendChild($BuyLottoSubmitButton());

  return $buyLottoInputBox;
};

export default $BuyLottoInputBox;
