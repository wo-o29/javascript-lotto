import $WinningNumberInputBox from "./WinningNumber/WinningNumberInputBox.js";
import $BonusNumberInputBox from "./BonusNumber/BonusNumberInputBox.js";

const $LottoGameInputContainer = () => {
  const $lottoGameInputContainer = createElement("div", {
    class: "lotto-game-input-container",
  });

  $lottoGameInputContainer.appendChild($WinningNumberInputBox());
  $lottoGameInputContainer.appendChild($BonusNumberInputBox());

  return $lottoGameInputContainer;
};

export default $LottoGameInputContainer;
