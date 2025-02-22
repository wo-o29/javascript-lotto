const $LottoTicketItem = (lottoNumbers) => {
  const $lottoTicketItem = createElement("li", {
    class: "lotto-ticket-item",
  });

  $lottoTicketItem.appendChild(
    createElement("img", {
      src: "lotto-ticket.png",
      alt: "로또 티켓",
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
