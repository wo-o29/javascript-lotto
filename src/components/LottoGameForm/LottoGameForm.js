import $LottoGameInputContainer from "./InputContainer/LottoGameInputContainer.js";
import $LottoGameSubmitButton from "./SubmitButton/LottoGameSubmitButton.js";

const $LottoGameForm = () => {
  const $lottoGameForm = createElement("form");
  const $lottoGameGuideText = createElement("p", {
    textContent: "지난 주 당첨번호 6개와 보너스 번호 1개를 입력해 주세요.",
  });

  $lottoGameForm.appendChild($lottoGameGuideText);
  $lottoGameForm.appendChild($LottoGameInputContainer());
  $lottoGameForm.appendChild($LottoGameSubmitButton());

  return $lottoGameForm;
};

export default $LottoGameForm;
