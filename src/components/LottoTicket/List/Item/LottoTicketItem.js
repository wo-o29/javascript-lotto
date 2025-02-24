const $LottoTicketItem = (lottoNumbers) => {
  const $lottoTicketItem = createElement("li", {
    class: "lotto-ticket-item",
  });

  $lottoTicketItem.appendChild(
    createElement("span", {
      class: "lotto-ticket-icon",
      textContent: "🎟️",
    })
  );
  $lottoTicketItem.appendChild(
    createElement("span", {
      textContent: lottoNumbers.join(", "),
    })
  );

  return $lottoTicketItem;
};

export default $LottoTicketItem;
