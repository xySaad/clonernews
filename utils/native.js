const asyncAppend = async function (elm, ...children) {
  Element.prototype.append.call(elm, ...await Promise.all(children));
};

export const q = (selector) => {
  const element = document.querySelector(selector);

  element.append = function (...children) {
    asyncAppend(this, ...children);
    return this;
  };
  return element;
};

export const ce = (tagName, className, textContent) => {
  const element = document.createElement(tagName);
  if (className) {
    element.className = className;
  }
  if (textContent) {
    element.textContent = textContent;
  }

  element.append = function (...children) {
    asyncAppend(this, ...children);
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

const importSvg = (svgName) => (svgName ? "/svg/" + svgName + ".svg" : "");

export const img = (src, alt, className, id) => {
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

export const p = (className, textContent)=>{
  const pElement = ce("p")
  p.className = className
  pElement.innerHTML = textContent
  return pElement
}