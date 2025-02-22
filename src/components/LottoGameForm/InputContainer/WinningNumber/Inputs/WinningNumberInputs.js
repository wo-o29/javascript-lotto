import { LOTTO_RULE } from "../../../../../constants/lotto.js";
import $WinningNumberInput from "./Input/WinningNumberInput.js";

const $WinningNumberInputs = () => {
  const $winningNumberInputs = createElement("p", {
    class: "winning-number-input-box",
  });

  for (let i = 0; i < LOTTO_RULE.LOTTO_LENGTH; i++) {
    $winningNumberInputs.appendChild($WinningNumberInput());
  }

  return $winningNumberInputs;
};

export default $WinningNumberInputs;
