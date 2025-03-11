export const ce = (tagName, className, textContent) => {
  const element = document.createElement(tagName);
  if (className) {
    element.className = className;
  }
  if (textContent) {
    element.textContent = textContent;
  }
  element.append = function (...childs) {
    Element.prototype.append.call(this, ...childs);
    return this;
  };
  element.Id = function (id) {
    this.id = id;
    return this;
  };
  return element;
};

export const div = (className, textContent) =>
  ce("div", className, textContent);

export const p = (className, textContent) => ce("p", className, textContent);

const importSvg = (svgName) => (svgName ? "/svg/" + svgName + ".svg" : "");

const img = (src, alt, className, id) => {
  const imgElement = document.createElement("img");
  imgElement.src = src ?? "";
  imgElement.alt = alt ?? "";
  imgElement.className = className ?? "";
  imgElement.id = id ?? "";

  imgElement.onerror = () => {
    imgElement.onerror = null;
    imgElement.src = importSvg(alt) ?? imgElement.remove();
  };
  return imgElement;
};
export default img;
