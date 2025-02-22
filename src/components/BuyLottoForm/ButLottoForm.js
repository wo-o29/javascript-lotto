import { isInRange } from "../../utils/predicate.js";
import $BuyLottoInputBox from "./InputBox/BuyLottoInputBox.js";
import $BuyLottoLabel from "./Label/BuyLottoLabel.js";
import $LottoTicket from "../LottoTicket/LottoTicket.js";
import $LottoGameForm from "../LottoGameForm/LottoGameForm.js";
import { LOTTO_RULE } from "../../constants/lotto.js";
import validationLottoPrice from "../../validation/validationLottoPrice.js";
import generateLottoNumberSets from "../../lotto/generateLottoNumberSets.js";

const handleBuyLottoInputValueRange = (event) => {
  if (event.target.closest(".buy-lotto-input")) {
    const lottoPrice = Number(event.target.value);
    const $buyLottoSubmitButton = document.querySelector(
      ".buy-lotto-submit-button"
    );

    if (isInRange(lottoPrice, LOTTO_RULE.MIN_PRICE, LOTTO_RULE.MAX_PRICE)) {
      $buyLottoSubmitButton.disabled = false;
      return;
    }

    $buyLottoSubmitButton.disabled = true;
  }
};

const handleBuyLottoFormSubmit = (event) => {
  event.preventDefault();

  try {
    const $buyLottoInput = document.querySelector(".buy-lotto-input");
    const lottoPrice = Number($buyLottoInput.value);

    validationLottoPrice(lottoPrice);
    const lottoNumberSets = generateLottoNumberSets(lottoPrice);

    const $lottoGameBox = document.querySelector(".lotto-game-box");
    $lottoGameBox.appendChild($LottoTicket(lottoNumberSets));
    $lottoGameBox.appendChild($LottoGameForm(lottoPrice, lottoNumberSets));

    const $buyLottoSubmitButton = document.querySelector(
      ".buy-lotto-submit-button"
    );
    $buyLottoInput.disabled = true;
    $buyLottoSubmitButton.disabled = true;
  } catch (error) {
    alert(error.message);
  }
};

const $BuyLottoForm = () => {
  const $buyLottoForm = createElement("form", {
    className: "buy-lotto-form",
  });

  $buyLottoForm.appendChild($BuyLottoLabel());
  $buyLottoForm.appendChild($BuyLottoInputBox());

  $buyLottoForm.addEventListener("input", handleBuyLottoInputValueRange);
  $buyLottoForm.addEventListener("submit", handleBuyLottoFormSubmit);

  return $buyLottoForm;
};

export default $BuyLottoForm;
