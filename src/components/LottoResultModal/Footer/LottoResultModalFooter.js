import $LottoRestartButton from "./RestartButton/LottoRestartButton.js";
import $LottoResultRevenueText from "./RevenueText/LottoResultRevenueText.js";

const $LottoResultModalFooter = (revenueRate) => {
  const $lottoResultModalFooter = createElement("div");

  $lottoResultModalFooter.appendChild($LottoResultRevenueText(revenueRate));
  $lottoResultModalFooter.appendChild($LottoRestartButton());

  return $lottoResultModalFooter;
};

export default $LottoResultModalFooter;
