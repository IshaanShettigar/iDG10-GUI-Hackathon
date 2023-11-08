import { shapes } from "jointjs";
import { customNamespace } from "./customNamespace";

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

  var SS = new customNamespace.subseaSeparator()
    .resize(85, 50)
    .position(100, 100);

  var SP = new customNamespace.subseaPump().resize(60, 60).position(100, 200);

  var uta = new customNamespace.UTA().resize(93, 55).position(100, 300);

  var PWST = new customNamespace.productionWellST()
    .resize(50, 50)
    .position(100, 400);

  var PL = new customNamespace.platform().resize(100, 25).position(100, 500);

  var IWST = new customNamespace.injectionWellST()
    .resize(50, 50)
    .position(100, 600);

  var MANIFOLD = new customNamespace.manifold()
    .resize(70, 35)
    .position(100, 700);

  var uth = new customNamespace.UTH().resize(140, 82).position(100, 800);

  var plet = new customNamespace.PLET().resize(140, 82).position(100, 900);

  var fpso = new customNamespace.FPSO().resize(100, 35).position(100, 1000);

  var plem = new customNamespace.PLEM().resize(65, 65).position(100, 1100);

  const nodes = [
    rect,
    rect2,
    link,
    SS,
    SP,
    uta,
    PWST,
    PL,
    IWST,
    MANIFOLD,
    uth,
    plet,
    fpso,
    plem,
  ];

  return nodes;
}
