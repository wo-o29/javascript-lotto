var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var _isFrozen;
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const createElement = (tag, props = {}) => {
  if (!tag || typeof tag !== "string") {
    throw new Error("태그는 문자열이어야 합니다.");
  }
  const element = document.createElement(tag);
  Object.entries(props).forEach(([key, value]) => {
    if (key === "style" && typeof value === "object") {
      Object.entries(value).forEach(([styleKey, styleValue]) => {
        element.style.setProperty(styleKey, styleValue);
      });
    }
    if (key === "class") {
      element.classList.add(value);
    }
    element[key] = value;
  });
  return element;
};
const $LottoGameTitle = () => {
  return createElement("h2", {
    className: "lotto-game-title",
    textContent: "🎱 내 번호 당첨 확인 🎱"
  });
};
const isMultipleOf = (number, multiple) => {
  if (typeof number !== "number" || typeof multiple !== "number") {
    throw new Error("인자가 숫자가 아닙니다.");
  }
  return number % multiple === 0;
};
const isInRange = (number, min, max) => {
  if (typeof number !== "number" || typeof min !== "number" || typeof max !== "number") {
    throw new Error("인자가 숫자가 아닙니다.");
  }
  return number >= min && number <= max;
};
const isDuplicate = (array) => {
  if (!Array.isArray(array)) {
    throw new Error("인자가 배열이 아닙니다.");
  }
  return new Set(array).size !== array.length;
};
const hasNotInteger = (array) => {
  if (!Array.isArray(array)) {
    throw new Error("인자가 배열이 아닙니다.");
  }
  return array.some((number) => !Number.isSafeInteger(number));
};
const $BuyLottoInput = () => {
  return createElement("input", {
    type: "text",
    id: "buy-lotto",
    className: "buy-lotto-input",
    placeholder: "구입 금액(최소 금액 1,000원, 최대 금액 100,000원)",
    minLength: "4",
    maxLength: "6",
    inputMode: "numeric",
    autofocus: true
  });
};
const $BuyLottoSubmitButton = () => {
  return createElement("button", {
    type: "submit",
    className: "buy-lotto-submit-button",
    disabled: true,
    textContent: "구입"
  });
};
const $BuyLottoInputBox = () => {
  const $buyLottoInputBox = createElement("p", {
    className: "buy-lotto-input-box"
  });
  $buyLottoInputBox.appendChild($BuyLottoInput());
  $buyLottoInputBox.appendChild($BuyLottoSubmitButton());
  return $buyLottoInputBox;
};
const $BuyLottoLabel = () => {
  return createElement("label", {
    htmlFor: "buy-lotto",
    textContent: "구입할 금액을 입력해 주세요."
  });
};
const $LottoTicketCountText = (lottoTicketCount) => {
  return createElement("span", {
    textContent: `총 ${lottoTicketCount}개를 구매했습니다.`
  });
};
const $LottoTicketItem = (lottoNumbers) => {
  const $lottoTicketItem = createElement("li", {
    class: "lotto-ticket-item"
  });
  $lottoTicketItem.appendChild(
    createElement("img", {
      src: "lotto-ticket.png",
      alt: "로또 티켓"
    })
  );
  $lottoTicketItem.appendChild(
    createElement("span", {
      textContent: lottoNumbers.join(", ")
    })
  );
  return $lottoTicketItem;
};
const $LottoTicketList = (lottoNumberSets) => {
  const $lottoTicketList = createElement("ul", {
    class: "lotto-ticket-list"
  });
  lottoNumberSets.forEach((lottoNumbers) => {
    $lottoTicketList.appendChild($LottoTicketItem(lottoNumbers));
  });
  return $lottoTicketList;
};
const $LottoTicket = (lottoNumberSets) => {
  const $lottoTicketBox = createElement("div", {
    class: "lotto-ticket-box"
  });
  $lottoTicketBox.appendChild($LottoTicketCountText(lottoNumberSets.length));
  $lottoTicketBox.appendChild($LottoTicketList(lottoNumberSets));
  return $lottoTicketBox;
};
const getRevenueRate = (revenue, cost) => {
  if (typeof revenue !== "number" || typeof cost !== "number") {
    throw new Error("인자가 숫자가 아닙니다.");
  }
  return revenue / cost * 100;
};
class FrozenMap extends Map {
  constructor(entries) {
    super();
    __privateAdd(this, _isFrozen);
    __privateSet(this, _isFrozen, false);
    if (!entries) {
      return;
    }
    for (const [key, value] of entries) {
      super.set(key, value);
    }
    __privateSet(this, _isFrozen, true);
  }
  freeze() {
    __privateSet(this, _isFrozen, true);
  }
  getIsFrozen() {
    return __privateGet(this, _isFrozen);
  }
  set(key, value) {
    if (__privateGet(this, _isFrozen)) {
      throw new Error("Freeze 상태에서는 set 메서드를 사용할 수 없습니다.");
    }
    super.set(key, value);
  }
  delete() {
    throw new Error("Frozen Map객체는 delete 메서드를 사용할 수 없습니다.");
  }
  clear() {
    throw new Error("Frozen Map객체는 clear 메서드를 사용할 수 없습니다.");
  }
}
_isFrozen = new WeakMap();
const LOTTO_RULE = Object.freeze({
  MULTIPLE_PRICE: 1e3,
  MIN_PRICE: 1e3,
  MAX_PRICE: 1e5,
  MIN_LOTTO_NUMBER: 1,
  MAX_LOTTO_NUMBER: 45,
  LOTTO_LENGTH: 6
});
const LOTTO_PRIZE_MONEY = new FrozenMap([
  [3, 5e3],
  [4, 5e4],
  [5, 15e5],
  ["5B", 3e7],
  [6, 2e9]
]);
const LOTTO_RESULT_MESSAGES_MAP = Array.from(LOTTO_PRIZE_MONEY).reduce(
  (messages, [key, value]) => {
    const prizeMoney = value.toLocaleString();
    if (key === "5B") {
      messages.set(key, `5개 일치, 보너스 볼 일치 (${prizeMoney}원) - `);
      return messages;
    }
    messages.set(key, `${key}개 일치 (${prizeMoney}원) - `);
    return messages;
  },
  new FrozenMap()
);
LOTTO_RESULT_MESSAGES_MAP.freeze();
const getIntersection = (array1, array2) => {
  if (!Array.isArray(array1) || !Array.isArray(array2)) {
    throw new Error("인자가 배열이 아닙니다.");
  }
  const uniqueSet = new Set(array2);
  return array1.filter((value) => uniqueSet.has(value));
};
const shuffle = (array) => {
  if (!Array.isArray(array)) {
    throw new Error("인자가 배열이 아닙니다.");
  }
  const copyArray = [...array];
  for (let i = copyArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copyArray[i], copyArray[j]] = [copyArray[j], copyArray[i]];
  }
  return copyArray;
};
const calculatePrizeResult = (lottoNumbers, winningNumbers, bonusNumber) => {
  const initResult = Array.from(LOTTO_PRIZE_MONEY).map(([key]) => [key, 0]);
  const result = new Map(initResult);
  lottoNumbers.forEach((numbers) => {
    const count = getIntersection(numbers, winningNumbers).length;
    if (!LOTTO_PRIZE_MONEY.has(count)) {
      return;
    }
    if (count === 5 && numbers.includes(bonusNumber)) {
      const prevCount2 = result.get("5B");
      result.set("5B", prevCount2 + 1);
      return;
    }
    const prevCount = result.get(count);
    result.set(count, prevCount + 1);
  });
  return result;
};
const getTotalPrizeMoney = (result) => {
  return Array.from(result).reduce((acc, [matchKey, count]) => {
    return acc + count * LOTTO_PRIZE_MONEY.get(matchKey);
  }, 0);
};
const getLottoResult = (lottoNumbers, winningNumbers, bonusNumber, lottoPrice) => {
  const prizeResult = calculatePrizeResult(
    lottoNumbers,
    winningNumbers,
    bonusNumber
  );
  const totalPrizeMoney = getTotalPrizeMoney(prizeResult);
  const revenueRate = getRevenueRate(totalPrizeMoney, lottoPrice);
  return { prizeResult, revenueRate };
};
const ERROR_MESSAGE = Object.freeze({
  INVALID_INTEGER: "정수만 입력 가능합니다.",
  INVALID_MULTIPLE_OF_THOUSAND: `${LOTTO_RULE.MULTIPLE_PRICE}원 단위로 입력해 주세요.`,
  INVALID_MIN_PRICE: `최소 구입 금액은 ${LOTTO_RULE.MIN_PRICE}원입니다.`,
  INVALID_OVER_MAX_PRICE: `최대 구입 금액은 ${LOTTO_RULE.MAX_PRICE}원입니다.`,
  INVALID_LOTTO_NUMBER_RANGE: `${LOTTO_RULE.MIN_LOTTO_NUMBER}부터 ${LOTTO_RULE.MAX_LOTTO_NUMBER}까지의 숫자를 입력해 주세요.`,
  INVALID_DUPLICATE_NUMBER: "중복된 숫자는 입력할 수 없습니다.",
  INVALID_LOTTO_LENGTH: `${LOTTO_RULE.LOTTO_LENGTH}개의 숫자를 입력해 주세요.`,
  INVALID_DUPLICATE_BONUS_NUMBER: "보너스 번호는 당첨 번호와 중복될 수 없습니다.",
  INVALID_RESTART: "y 또는 n을 입력해 주세요."
});
const ERROR_PREFIX = "[ERROR]";
class CustomError extends Error {
  constructor(message) {
    super(`${ERROR_PREFIX} ${message}`);
  }
}
const validationBonusNumber = (bonusNumber, winningNumbers) => {
  if (!Number.isSafeInteger(bonusNumber)) {
    throw new CustomError(ERROR_MESSAGE.INVALID_INTEGER);
  }
  if (!isInRange(
    bonusNumber,
    LOTTO_RULE.MIN_LOTTO_NUMBER,
    LOTTO_RULE.MAX_LOTTO_NUMBER
  )) {
    throw new CustomError(ERROR_MESSAGE.INVALID_LOTTO_NUMBER_RANGE);
  }
  if (isDuplicate([bonusNumber, ...winningNumbers])) {
    throw new CustomError(ERROR_MESSAGE.INVALID_DUPLICATE_BONUS_NUMBER);
  }
};
const validationWinningNumbers = (winningNumbers) => {
  if (winningNumbers.length !== LOTTO_RULE.LOTTO_LENGTH) {
    throw new CustomError(ERROR_MESSAGE.INVALID_LOTTO_LENGTH);
  }
  if (isDuplicate(winningNumbers)) {
    throw new CustomError(ERROR_MESSAGE.INVALID_DUPLICATE_NUMBER);
  }
  if (hasNotInteger(winningNumbers)) {
    throw new CustomError(ERROR_MESSAGE.INVALID_INTEGER);
  }
  const isInvalidLottoNumberRange = winningNumbers.some(
    (number) => !isInRange(
      number,
      LOTTO_RULE.MIN_LOTTO_NUMBER,
      LOTTO_RULE.MAX_LOTTO_NUMBER
    )
  );
  if (isInvalidLottoNumberRange) {
    throw new CustomError(ERROR_MESSAGE.INVALID_LOTTO_NUMBER_RANGE);
  }
};
const $WinningNumberLabel = () => {
  return createElement("label", {
    htmlFor: "winning-number",
    textContent: "당첨 번호"
  });
};
const $WinningNumberInput = () => {
  return createElement("input", {
    type: "text",
    inputMode: "numeric",
    minLength: "1",
    maxLength: "2",
    id: "winning-number",
    class: "lotto-game-input"
  });
};
const $WinningNumberInputs = () => {
  const $winningNumberInputs = createElement("p", {
    class: "winning-number-input-box"
  });
  for (let i = 0; i < LOTTO_RULE.LOTTO_LENGTH; i++) {
    $winningNumberInputs.appendChild($WinningNumberInput());
  }
  return $winningNumberInputs;
};
const $WinningNumberInputBox = () => {
  const $winningNumberInputBox = createElement("div", {
    class: "lotto-game-input-box"
  });
  $winningNumberInputBox.appendChild($WinningNumberLabel());
  $winningNumberInputBox.appendChild($WinningNumberInputs());
  return $winningNumberInputBox;
};
const $BonusNumberInput = () => {
  return createElement("input", {
    type: "text",
    inputMode: "numeric",
    minLength: "1",
    maxLength: "2",
    id: "bonus-number",
    class: "lotto-game-input"
  });
};
const $BonusNumberLabel = () => {
  return createElement("label", {
    htmlFor: "bonus-number",
    textContent: "보너스 번호"
  });
};
const $BonusNumberInputBox = () => {
  const $bonusNumberInputBox = createElement("div", {
    class: "lotto-game-input-box"
  });
  $bonusNumberInputBox.appendChild($BonusNumberLabel());
  $bonusNumberInputBox.appendChild($BonusNumberInput());
  return $bonusNumberInputBox;
};
const $LottoGameInputContainer = () => {
  const $lottoGameInputContainer = createElement("div", {
    class: "lotto-game-input-container"
  });
  $lottoGameInputContainer.appendChild($WinningNumberInputBox());
  $lottoGameInputContainer.appendChild($BonusNumberInputBox());
  return $lottoGameInputContainer;
};
const $LottoGameSubmitButton = () => {
  return createElement("button", {
    type: "submit",
    class: "lotto-game-submit-button",
    textContent: "결과 확인하기",
    disabled: true
  });
};
const $LottoResultItem = (matchKey, prizeMoney, matchCount) => {
  const $lottoResultItem = createElement("li", {
    className: "lotto-result-item"
  });
  $lottoResultItem.appendChild(
    createElement("span", {
      textContent: matchKey === "5B" ? "5개 + 보너스볼" : `${matchKey}개`
    })
  );
  $lottoResultItem.appendChild(
    createElement("span", {
      textContent: prizeMoney.toLocaleString()
    })
  );
  $lottoResultItem.appendChild(
    createElement("span", {
      textContent: `${matchCount}개`
    })
  );
  return $lottoResultItem;
};
const $LottoResultItemHeader = () => {
  const $lottoResultItemHeader = createElement("li", {
    className: "lotto-result-item-header"
  });
  $lottoResultItemHeader.appendChild(
    createElement("span", {
      textContent: "일치 갯수"
    })
  );
  $lottoResultItemHeader.appendChild(
    createElement("span", {
      textContent: "당첨금"
    })
  );
  $lottoResultItemHeader.appendChild(
    createElement("span", {
      textContent: "당첨 갯수"
    })
  );
  return $lottoResultItemHeader;
};
const $LottoResultList = (prizeResult) => {
  const $lottoResultList = createElement("ul", {
    className: "lotto-result-list"
  });
  $lottoResultList.appendChild($LottoResultItemHeader());
  Array.from(prizeResult).forEach(([matchKey, matchCount]) => {
    $lottoResultList.appendChild(
      $LottoResultItem(matchKey, LOTTO_PRIZE_MONEY.get(matchKey), matchCount)
    );
  });
  return $lottoResultList;
};
const $LottoResultModalBody = (prizeResult) => {
  const $lottoResultModalBody = createElement("div", {
    className: "modal-body"
  });
  $lottoResultModalBody.appendChild($LottoResultList(prizeResult));
  return $lottoResultModalBody;
};
const $LottoResultModalClose = () => {
  const $modalCloseBox = createElement("p", {
    class: "modal-close-box"
  });
  const $modalCloseButton = createElement("button", {
    class: "modal-close-button",
    type: "button"
  });
  $modalCloseButton.appendChild(
    createElement("img", {
      src: "/close.svg",
      alt: "모달 닫기"
    })
  );
  $modalCloseBox.appendChild($modalCloseButton);
  return $modalCloseBox;
};
const $LottoResultModalTitle = () => {
  return createElement("h2", {
    className: "modal-title",
    textContent: "🏆 당첨 통계 🏆"
  });
};
const $LottoResultModalHeader = () => {
  const $lottoResultModalHeader = createElement("div", {
    class: "modal-header"
  });
  $lottoResultModalHeader.appendChild($LottoResultModalClose());
  $lottoResultModalHeader.appendChild($LottoResultModalTitle());
  return $lottoResultModalHeader;
};
const $LottoRestartButton = () => {
  return createElement("button", {
    type: "button",
    class: "lotto-restart-button",
    textContent: "다시 시작하기"
  });
};
const $LottoResultRevenueText = (revenueRate) => {
  return createElement("p", {
    className: "lotto-result-revenue-text",
    textContent: `당신의 총 수익률은 ${revenueRate.toLocaleString()}%입니다.`
  });
};
const $LottoResultModalFooter = (revenueRate) => {
  const $lottoResultModalFooter = createElement("div");
  $lottoResultModalFooter.appendChild($LottoResultRevenueText(revenueRate));
  $lottoResultModalFooter.appendChild($LottoRestartButton());
  return $lottoResultModalFooter;
};
const closeModal = () => {
  const $modalBackground = document.querySelector(".modal-background");
  $modalBackground.remove();
};
const handleLottoResultModalClick = (event) => {
  if (event.target.closest(".modal-close-button")) {
    closeModal();
    return;
  }
  if (event.target.closest(".lotto-restart-button")) {
    closeModal();
    initWebLottoGame();
    return;
  }
};
const $LottoResultModal = (prizeResult, revenueRate) => {
  const $modalBackGround = createElement("div", {
    className: "modal-background"
  });
  const $modalBox = createElement("div", {
    className: "modal-box"
  });
  $modalBox.appendChild($LottoResultModalHeader());
  $modalBox.appendChild($LottoResultModalBody(prizeResult));
  $modalBox.appendChild($LottoResultModalFooter(revenueRate));
  $modalBackGround.appendChild($modalBox);
  const appContainer = document.getElementById("app");
  if (!appContainer) {
    throw new Error("app이 없습니다.");
  }
  appContainer.appendChild($modalBackGround);
  $modalBackGround.addEventListener("click", handleLottoResultModalClick);
};
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
    const [bonusNumber, ...winningNumbers] = Array.from($lottoGameInputs).reverse().map(($inputEl) => Number($inputEl.value));
    validationWinningNumbers(winningNumbers);
    validationBonusNumber(bonusNumber, winningNumbers);
    const { prizeResult, revenueRate } = getLottoResult(
      lottoNumberSets,
      winningNumbers,
      bonusNumber,
      lottoPrice
    );
    $LottoResultModal(prizeResult, revenueRate);
  } catch (error) {
    alert(error.message);
  }
};
const $LottoGameForm = (lottoPrice, lottoNumberSets) => {
  const $lottoGameForm = createElement("form");
  const $lottoGameGuideText = createElement("p", {
    textContent: "지난 주 당첨번호 6개와 보너스 번호 1개를 입력해 주세요."
  });
  $lottoGameForm.appendChild($lottoGameGuideText);
  $lottoGameForm.appendChild($LottoGameInputContainer());
  $lottoGameForm.appendChild($LottoGameSubmitButton());
  $lottoGameForm.addEventListener("input", handleLottoGameInputsAllFilled);
  $lottoGameForm.addEventListener(
    "submit",
    (event) => handleLottoGameFormSubmit(event, lottoPrice, lottoNumberSets)
  );
  const firstInput = $lottoGameForm.querySelectorAll(".lotto-game-input")[0];
  setTimeout(() => {
    firstInput == null ? void 0 : firstInput.focus();
  }, 0);
  return $lottoGameForm;
};
const validationLottoPrice = (price) => {
  if (!Number.isSafeInteger(price)) {
    throw new CustomError(ERROR_MESSAGE.INVALID_INTEGER);
  }
  if (price < LOTTO_RULE.MIN_PRICE) {
    throw new CustomError(ERROR_MESSAGE.INVALID_MIN_PRICE);
  }
  if (!isMultipleOf(price, LOTTO_RULE.MULTIPLE_PRICE)) {
    throw new CustomError(ERROR_MESSAGE.INVALID_MULTIPLE_OF_THOUSAND);
  }
  if (price > LOTTO_RULE.MAX_PRICE) {
    throw new CustomError(ERROR_MESSAGE.INVALID_OVER_MAX_PRICE);
  }
};
const generateLottoNumbers = () => {
  const numbers = Array.from(
    { length: LOTTO_RULE.MAX_LOTTO_NUMBER },
    (_, i) => i + 1
  );
  const shuffleNumbers = shuffle(numbers);
  const lottoNumbers = shuffleNumbers.slice(0, LOTTO_RULE.LOTTO_LENGTH);
  return lottoNumbers.sort((a, b) => a - b);
};
const generateLottoNumberSets = (price) => {
  const purchaseQuantity = price / LOTTO_RULE.MULTIPLE_PRICE;
  return Array.from({ length: purchaseQuantity }, () => generateLottoNumbers());
};
const handleBuyLottoInputValueRange = (event) => {
  if (event.target.closest(".buy-lotto-input")) {
    const lottoPrice = Number(event.target.value);
    const $buyLottoSubmitButton = document.querySelector(
      ".buy-lotto-submit-button"
    );
    if (isInRange(lottoPrice, LOTTO_RULE.MIN_PRICE, LOTTO_RULE.MAX_PRICE)) {
      $buyLottoSubmitButton.disabled = false;
      return;
    }
    $buyLottoSubmitButton.disabled = true;
  }
};
const handleBuyLottoFormSubmit = (event) => {
  event.preventDefault();
  try {
    const $buyLottoInput = document.querySelector(".buy-lotto-input");
    const lottoPrice = Number($buyLottoInput.value);
    validationLottoPrice(lottoPrice);
    const lottoNumberSets = generateLottoNumberSets(lottoPrice);
    const $lottoGameBox = document.querySelector(".lotto-game-box");
    $lottoGameBox.appendChild($LottoTicket(lottoNumberSets));
    $lottoGameBox.appendChild($LottoGameForm(lottoPrice, lottoNumberSets));
    const $buyLottoSubmitButton = document.querySelector(
      ".buy-lotto-submit-button"
    );
    $buyLottoInput.disabled = true;
    $buyLottoSubmitButton.disabled = true;
  } catch (error) {
    alert(error.message);
  }
};
const $BuyLottoForm = () => {
  const $buyLottoForm = createElement("form", {
    className: "buy-lotto-form"
  });
  $buyLottoForm.appendChild($BuyLottoLabel());
  $buyLottoForm.appendChild($BuyLottoInputBox());
  $buyLottoForm.addEventListener("input", handleBuyLottoInputValueRange);
  $buyLottoForm.addEventListener("submit", handleBuyLottoFormSubmit);
  return $buyLottoForm;
};
const initWebLottoGame = () => {
  const $lottoGameBox = document.querySelector(".lotto-game-box");
  if (!$lottoGameBox) {
    throw new Error("로또 게임 박스가 없습니다.");
  }
  $lottoGameBox.replaceChildren();
  $lottoGameBox.appendChild($LottoGameTitle());
  $lottoGameBox.appendChild($BuyLottoForm());
};
initWebLottoGame();
