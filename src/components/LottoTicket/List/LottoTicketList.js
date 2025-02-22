import $LottoTicketItem from "./Item/LottoTicketItem.js";

const $LottoTicketList = (lottoNumberSets) => {
  const $lottoTicketList = createElement("ul", {
    class: "lotto-ticket-list",
  });

  lottoNumberSets.forEach((lottoNumbers) => {
    $lottoTicketList.appendChild($LottoTicketItem(lottoNumbers));
  });

  return $lottoTicketList;
};

export default $LottoTicketList;
