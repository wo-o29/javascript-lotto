import { LOTTO_RULE } from "./constants/lotto.js";
import generateLottoNumberSets from "./lotto/generateLottoNumberSets.js";
import { isInRange } from "./utils/predicate.js";
import validationLottoPrice from "./validation/validationLottoPrice.js";

const $buyLottoForm = document.querySelector(".buy-lotto-form");
const $buyLottoInput = document.querySelector(".buy-lotto-input");
const $buyLottoSubmitButton = document.querySelector(
  ".buy-lotto-submit-button"
);

$buyLottoInput.addEventListener("input", () => {
  const price = Number($buyLottoInput.value);

  if (isInRange(price, LOTTO_RULE.MIN_PRICE, LOTTO_RULE.MAX_PRICE)) {
    $buyLottoSubmitButton.disabled = false;
    return;
  }

  $buyLottoSubmitButton.disabled = true;
});

$buyLottoForm.addEventListener("submit", (event) => {
  event.preventDefault();

  try {
    const lottoPrice = Number($buyLottoInput.value);
    validationLottoPrice(lottoPrice);
    const lottoNumberSets = generateLottoNumberSets(lottoPrice);
  } catch (error) {
    alert(error.message);
  }
});
