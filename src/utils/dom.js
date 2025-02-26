export const createElement = (tag, props = {}) => {
  if (!tag || typeof tag !== "string") {
    throw new Error("태그는 문자열이어야 합니다.");
  }
  const element =
    tag === "svg" || tag === "path"
      ? document.createElementNS("http://www.w3.org/2000/svg", tag)
      : document.createElement(tag);

  Object.entries(props).forEach(([key, value]) => {
    if (key === "style" && typeof value === "object") {
      Object.entries(value).forEach(([styleKey, styleValue]) => {
        element.style.setProperty(styleKey, styleValue);
      });
    }

    // class
    if (key === "class") {
      if (Array.isArray(value)) {
        element.classList.add(...value);
        return;
      }

      element.classList.add(value);
      return;
    }

    // attribute
    if (tag === "svg" || tag === "path") {
      element.setAttribute(key, value);
      return;
    }

    element[key] = value;
  });

  return element;
};
