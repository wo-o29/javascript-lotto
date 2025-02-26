const $LottoResultItem = (matchKey, prizeMoney, matchCount) => {
  const $lottoResultItem = createElement("li", {
    class: "lotto-result-item",
  });

  $lottoResultItem.appendChild(
    createElement("span", {
      textContent: matchKey === "5B" ? "5개 + 보너스볼" : `${matchKey}개`,
    })
  );
  $lottoResultItem.appendChild(
    createElement("span", {
      textContent: prizeMoney.toLocaleString(),
    })
  );
  $lottoResultItem.appendChild(
    createElement("span", {
      textContent: `${matchCount}개`,
    })
  );

  return $lottoResultItem;
};

export default $LottoResultItem;
