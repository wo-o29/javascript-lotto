import { LOTTO_RULE } from "../constants/lotto.js";
import generateLottoNumbers from "./generateLottoNumber.js";

export const generateLottoNumberSets = (price) => {
  const purchaseQuantity = price / LOTTO_RULE.MULTIPLE_PRICE;

  return Array.from({ length: purchaseQuantity }, () => generateLottoNumbers());
};
