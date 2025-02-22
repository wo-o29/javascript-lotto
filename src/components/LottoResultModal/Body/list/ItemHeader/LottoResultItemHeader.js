const $LottoResultItemHeader = () => {
  const $lottoResultItemHeader = createElement("li", {
    className: "lotto-result-item-header",
  });

  $lottoResultItemHeader.appendChild(
    createElement("span", {
      textContent: "일치 갯수",
    })
  );
  $lottoResultItemHeader.appendChild(
    createElement("span", {
      textContent: "당첨금",
    })
  );
  $lottoResultItemHeader.appendChild(
    createElement("span", {
      textContent: "당첨 갯수",
    })
  );

  return $lottoResultItemHeader;
};

export default $LottoResultItemHeader;
