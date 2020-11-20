

export const prepareSvgForPdf = () => {
  let svgElements = document.body.querySelectorAll('svg');
  svgElements.forEach(function(item: any) {
    item.setAttribute("width", item.getBoundingClientRect().width);
    item.setAttribute("height", item.getBoundingClientRect().height);
    item.style.width = null;
    item.style.height= null;
  });
};