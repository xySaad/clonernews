export const ce = (tagName) => {
  const element = document.createElement(tagName);
  element.append = function (...childs) {
    Element.prototype.append.call(this, ...childs);
    return this;
  };
  element.Id = function (id) {
    this.id = id
    return this;
  };
  return element;
};

export const div = (className, textContent) => {
  const divElement = ce("div");
  divElement.className = className;
  divElement.textContent = textContent;
  return divElement;
};
