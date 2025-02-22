import getLottoResult from "../../lotto/getLottoResult.js";
import validationBonusNumber from "../../validation/validationBonusNumber.js";
import validationWinningNumbers from "../../validation/validationWinningNumbers.js";
import $LottoGameInputContainer from "./InputContainer/LottoGameInputContainer.js";
import $LottoGameSubmitButton from "./SubmitButton/LottoGameSubmitButton.js";

const handleLottoGameInputsAllFilled = () => {
  const $lottoGameInputs = document.querySelectorAll(".lotto-game-input");
  const isAllFilled = Array.from($lottoGameInputs).every(
    ($inputEl) => $inputEl.value
  );

  const $lottoGameSubmitButton = document.querySelector(
    ".lotto-game-submit-button"
  );
  $lottoGameSubmitButton.disabled = !isAllFilled;
};

const handleLottoGameFormSubmit = (event, lottoPrice, lottoNumberSets) => {
  event.preventDefault();

  try {
    const $lottoGameInputs = document.querySelectorAll(".lotto-game-input");
    const [bonusNumber, ...winningNumbers] = Array.from($lottoGameInputs)
      .reverse()
      .map(($inputEl) => Number($inputEl.value));

    validationWinningNumbers(winningNumbers);
    validationBonusNumber(bonusNumber, winningNumbers);

    const { prizeResult, revenueRate } = getLottoResult(
      lottoNumberSets,
      winningNumbers,
      bonusNumber,
      lottoPrice
    );
  } catch (error) {
    alert(error.message);
  }
};

const $LottoGameForm = (lottoPrice, lottoNumberSets) => {
  const $lottoGameForm = createElement("form");
  const $lottoGameGuideText = createElement("p", {
    textContent: "지난 주 당첨번호 6개와 보너스 번호 1개를 입력해 주세요.",
  });

  $lottoGameForm.appendChild($lottoGameGuideText);
  $lottoGameForm.appendChild($LottoGameInputContainer());
  $lottoGameForm.appendChild($LottoGameSubmitButton());

  $lottoGameForm.addEventListener("input", handleLottoGameInputsAllFilled);
  $lottoGameForm.addEventListener("submit", (event) =>
    handleLottoGameFormSubmit(event, lottoPrice, lottoNumberSets)
  );

  return $lottoGameForm;
};

export default $LottoGameForm;
