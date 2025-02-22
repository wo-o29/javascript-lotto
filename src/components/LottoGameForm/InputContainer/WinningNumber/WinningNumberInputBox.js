import $WinningNumberLabel from "./label/WinningNumberLabel.js";
import $WinningNumberInputs from "./Inputs/WinningNumberInputs.js";

const $WinningNumberInputBox = () => {
  const $winningNumberInputBox = createElement("div", {
    class: "lotto-game-input-box",
  });

  $winningNumberInputBox.appendChild($WinningNumberLabel());
  $winningNumberInputBox.appendChild($WinningNumberInputs());

  return $winningNumberInputBox;
};

export default $WinningNumberInputBox;
