import $LottoResultItem from "./Item/LottoResultItem.js";
import $LottoResultItemHeader from "./ItemHeader/LottoResultItemHeader.js";
import { LOTTO_PRIZE_MONEY } from "../../../../constants/lotto.js";

const $LottoResultList = (prizeResult) => {
  const $lottoResultList = createElement("ul", {
    className: "lotto-result-list",
  });

  $lottoResultList.appendChild($LottoResultItemHeader());
  Array.from(prizeResult).forEach(([matchKey, matchCount]) => {
    $lottoResultList.appendChild(
      $LottoResultItem(matchKey, LOTTO_PRIZE_MONEY.get(matchKey), matchCount)
    );
  });

  return $lottoResultList;
};

export default $LottoResultList;
