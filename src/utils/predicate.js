export const isMultipleOf = (number, multiple) => {
  if (isNaN(number) || isNaN(multiple)) {
    throw new Error("인자가 숫자가 아닙니다.");
  }

  return number % multiple === 0;
};

export const isInRange = (number, min, max) => {
  if (isNaN(number) || isNaN(min) || isNaN(max)) {
    throw new Error("인자가 숫자가 아닙니다.");
  }

  return number >= min && number <= max;
};

export const isDuplicate = (array) => {
  if (!Array.isArray(array)) {
    throw new Error("인자가 배열이 아닙니다.");
  }

  return new Set(array).size !== array.length;
};

export const hasNotInteger = (array) => {
  if (!Array.isArray(array)) {
    throw new Error("인자가 배열이 아닙니다.");
  }

  return array.some((number) => !Number.isSafeInteger(number));
};
