import { shapes } from "jointjs";

export function createInitalNodes() {
  var rect = new shapes.standard.Rectangle();
  rect.position(500, 300);
  rect.resize(100, 40);
  rect.attr({
    body: {
      fill: "blue",
    },
    label: {
      text: "Hello",
      fill: "white",
    },
  });

  var rect2 = rect.clone();
  rect2.translate(300, 0);
  rect2.attr("label/text", "World!");

  var link = new shapes.standard.Link();
  link.source(rect);
  link.target(rect2);
  return [rect, rect2, link];
}
