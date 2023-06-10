import { injectionWellST, manifold, platform } from './elements.js'
import { assignCustomParams } from './element-attrs.js'
import { openFile, saveGraph } from './persist.js';
import { displayHighlight, pasteElement, removeHighlight } from './utils.js'


var namespace = joint.shapes;
var mainGraph = new joint.dia.Graph({}, { cellNamespace: namespace });

var mainPaper = new joint.dia.Paper({
    el: document.getElementById("main"),
    model: mainGraph,
    width: 1000,
    height: 800,
    gridSize: 15,
    drawGrid: { name: "mesh" },
    background: {
        color: "#F3F7F6",
    },
    cellViewNamespace: namespace,
    interactive: {
        linkMove: true,
        labelMove: true,
        arrowheadMove: true,
        vertexMove: true,
        vertexAdd: true,
        vertexRemove: true,
        useLinkTools: true,
    },
    snapLabels: true,
    gridSize: 8,
});

function getInput(evt, linkView, buttonView) {
    // Create a new input element
    // const input = document.createElement('input');
    var newText = prompt("Enter new label text");
    var theLink = linkView.model;
    theLink.appendLabel({
        attrs: {
            text: {
                text: newText,
            },
        },
        position: {
            distance: 0.25,
            offset: -25,
        },
    });
}

// create links for toolbar
var standardLink = new joint.shapes.standard.Link();
standardLink.source({ x: 45, y: 600 });
standardLink.target({ x: 125, y: 550 });
var verticesTool = new joint.linkTools.Vertices();
var segmentsTool = new joint.linkTools.Segments();
var boundaryTool = new joint.linkTools.Boundary();
// var sourceAnchorTool = new joint.linkTools.SourceAnchor();
// var targetAnchorTool = new joint.linkTools.TargetAnchor();
var sourceArrowHeadTool = new joint.linkTools.SourceArrowhead();
var targetArrowHeadTool = new joint.linkTools.TargetArrowhead();
var removeButton = new joint.linkTools.Remove();
joint.linkTools.InfoButton = joint.linkTools.Button.extend({
    name: "info-button",
    options: {
        markup: [
            {
                tagName: "circle",
                selector: "button",
                attributes: {
                    r: 7,
                    fill: "mediumseagreen",
                    cursor: "pointer",
                },
            },
            {
                tagName: "path",
                selector: "icon",
                attributes: {
                    d: "M 0 0 0 0 M 0 5 0 0 M -1 -1 1 -1 M 0 0 0 -4.5 M -4 0 0 0 M 4.5 0 0 0 ",
                    fill: "none",
                    stroke: "#FFFFFF",
                    "stroke-width": 2,
                    "pointer-events": "none",
                },
            },
        ],
        distance: "50%",
        offset: 0,
        action: function (evt, linkView, buttonView) {
            getInput(evt, linkView, buttonView);
        },
    },
});

var infoButton = new joint.linkTools.InfoButton();

var toolsView = new joint.dia.ToolsView({
    tools: [
        verticesTool,
        segmentsTool,
        boundaryTool,
        sourceArrowHeadTool,
        targetArrowHeadTool,
        removeButton,
        infoButton,
    ],
});

var doubleLink = new joint.shapes.standard.DoubleLink();
doubleLink.source({ x: 45, y: 700 });
doubleLink.target({ x: 125, y: 650 });
doubleLink.attr("root/tabindex", 15);
doubleLink.attr("root/title", "joint.shapes.standard.DoubleLink");
doubleLink.attr("line/stroke", "#30d0c6");

var toolGraph = new joint.dia.Graph({}, { cellNamespace: namespace });
var toolPaper = new joint.dia.Paper({
    el: document.getElementById("toolbar"),
    model: toolGraph,
    width: 200,
    height: 800,
    gridSize: 10,
    drawGrid: true,
    background: {
        color: "rgba(255,255,0,0.3)",
    },
    snapLabels: true,
    gridSize: 5,
    interactive: false,
});

standardLink.addTo(toolGraph);
doubleLink.addTo(toolGraph);

// Below are the three element definitions
// var yellowRect = joint.dia.Element.define(
//     "yellowRect",
//     {
//         attrs: {
//             l1: {
//                 strokeWidth: 3,
//                 stroke: "red",
//                 fill: "none",
//             },
//             l2: {
//                 strokeWidth: 3,
//                 stroke: "blue",
//                 fill: "none",
//             },
//             l3: {
//                 strokeWidth: 3,
//                 stroke: "green",
//                 fill: "none",
//             },
//             l4: {
//                 strokeWidth: 3,
//                 stroke: "red",
//                 fill: "none",
//             },
//             l5: {
//                 strokeWidth: 3,
//                 stroke: "blue",
//                 fill: "none",
//             },
//             outline: {
//                 x: 0,
//                 y: 0,
//                 width: "calc(w)",
//                 height: "calc(h)",
//                 strokeWidth: 1,
//                 stroke: "#000000",
//                 fill: "#fac905",
//             },
//         },
//     },
//     {
//         markup: [
//             {
//                 tagName: "line",
//                 selector: "l1",
//             },
//             {
//                 tagName: "line",
//                 selector: "l2",
//             },
//             {
//                 tagName: "line",
//                 selector: "l3",
//             },
//             {
//                 tagName: "line",
//                 selector: "l4",
//             },
//             {
//                 tagName: "line",
//                 selector: "l5",
//             },
//             {
//                 tagName: "rect",
//                 selector: "outline",
//             },
//         ],
//     }
// );

var myElement1 = new injectionWellST();
myElement1.position(65, 50);
myElement1.resize(60, 60);
myElement1.addTo(toolGraph);

var myElement2 = new manifold();
myElement2.position(50, 200);
myElement2.resize(100, 50);
myElement2.addTo(toolGraph);

// var blueRect = joint.dia.Element.define(
//     "blueRect",
//     {
//         attrs: {
//             l1: {
//                 strokeWidth: 3,
//                 stroke: "black",
//                 fill: "rgba(0,255,0,0.3)",
//             },
//             l2: {
//                 strokeWidth: 3,
//                 stroke: "black",
//                 fill: "rgba(0,255,0,0.3)",
//             },
//             l3: {
//                 strokeWidth: 3,
//                 stroke: "black",
//                 fill: "rgba(0,255,0,0.3)",
//             },
//             l4: {
//                 strokeWidth: 3,
//                 stroke: "black",
//                 fill: "rgba(0,255,0,0.3)",
//             },
//             outline: {
//                 x: 0,
//                 y: 0,
//                 width: "calc(w)",
//                 height: "calc(h)",
//                 strokeWidth: 1,
//                 stroke: "#000000",
//                 fill: "#035afc",
//             },
//         },
//     },
//     {
//         markup: [
//             {
//                 tagName: "line",
//                 selector: "l1",
//             },
//             {
//                 tagName: "line",
//                 selector: "l2",
//             },
//             {
//                 tagName: "line",
//                 selector: "l3",
//             },
//             {
//                 tagName: "line",
//                 selector: "l4",
//             },
//             {
//                 tagName: "rect",
//                 selector: "outline",
//             },
//         ],
//     }
// );

var myElement3 = new platform();
myElement3.position(40, 400);
myElement3.resize(125, 30);
myElement3.addTo(toolGraph);

assignCustomParams(myElement1)
assignCustomParams(myElement2)
assignCustomParams(myElement3)


const ResizeTool = joint.elementTools.Control.extend({
    children: [
        {
            tagName: "image",
            selector: "handle",
            attributes: {
                cursor: "pointer",
                width: 20,
                height: 20,
                "xlink:href":
                    "https://assets.codepen.io/7589991/8725981_image_resize_square_icon.svg",
            },
        },
        {
            tagName: "rect",
            selector: "extras",
            attributes: {
                fill: "none",
                stroke: "#33334F",
                "stroke-dasharray": "2,4",
                rx: 5,
                ry: 5,
            },
        },
    ],
    getPosition: function (view) {
        const model = view.model;
        const { width, height } = model.size();
        return { x: width, y: height };
    },
    setPosition: function (view, coordinates) {
        const model = view.model;
        model.resize(
            Math.max(coordinates.x - 10, 1),
            Math.max(coordinates.y - 10, 1)
        );
    },
});

var linkBlackList = [];
joint.elementTools.AddLabelButton = joint.elementTools.Button.extend({
    name: "add-label-button",
    options: {
        markup: [
            {
                tagName: "circle",
                selector: "button",
                attributes: {
                    r: 7,
                    fill: "mediumseagreen",
                    cursor: "pointer",
                },
            },
            {
                tagName: "path",
                selector: "icon",
                attributes: {
                    d: "M 0 0 0 0 M 0 5 0 0 M -1 -1 1 -1 M 0 0 0 -4.5 M -4 0 0 0 M 4.5 0 0 0 ",
                    fill: "none",
                    stroke: "#FFFFFF",
                    "stroke-width": 2,
                    "pointer-events": "none",
                },
            },
        ],
        x: "50%",
        y: "50%",
        offset: {
            x: 0,
            y: 0,
        },
        rotate: true,
        action: function (evt, elementView, buttonView) {
            // alert('View id: ' + this.id + '\n' + 'Model id: ' + this.model.id);
            var model = elementView.model;
            console.log(model.attributes.size);

            const newText = prompt("Enter Label Text");
            var GAP = 40;
            var additionalWidth = newText.length;
            var label = new joint.shapes.standard.Rectangle({
                label: true,
                size: {
                    width: model.attributes.size.width / 2 + additionalWidth * 5.5,
                    height: 25,
                },
                position: {
                    x: model.attributes.position.x,
                    y: model.attributes.position.y - GAP,
                },
                attrs: {
                    label: {
                        text: newText,
                        pointerEvents: "all",
                    },
                    body: {
                        strokeWidth: 1,
                        pointerEvents: "none",
                        opacity: 1,
                        fill: "#e6e6e6",
                        rx: 10,
                        ry: 10,
                    },
                },
            });

            var elementModel = elementView.model;
            elementModel.embed(label);
            label.addTo(mainGraph);
            // Let us try to create a simple dash lined link to connect between
            var dashLink = new joint.shapes.standard.Link();
            dashLink.source(model);
            dashLink.target(label);
            dashLink.addTo(mainGraph);
            dashLink.attr({
                line: {
                    stroke: "black",
                    strokeWidth: 1,
                    strokeDasharray: "4 2",
                    targetMarker: {
                        opacity: 0,
                    },
                },
            });

            // Add this dashlink to the blacklist so that the user doesnt see the linkTools
            linkBlackList.push(dashLink);
        },
    },
});

// now let us add some event listeners
toolPaper.on("element:pointerdblclick", function (elementView) {
    var currentEle = elementView.model;
    var newEle = currentEle.clone();

    newEle.position(200, 200);
    newEle.addTo(mainGraph);
    // var eleBbox = currentEle.getBBox()
    // var removeButton = new joint.elementTools.Remove({
    //     useModelGeometry: true,
    //     // offset: { x: eleBbox.width * 0.5, y: eleBbox.height }
    // });

    var removeButton = new joint.elementTools.Remove();
    var addLabelButton = new joint.elementTools.AddLabelButton();
    var EletoolsView = new joint.dia.ToolsView({
        tools: [
            removeButton,
            new ResizeTool({ selector: "outline" }),
            addLabelButton,
        ],
    });

    var newEleView = newEle.findView(mainPaper);
    newEleView.addTools(EletoolsView);
    newEleView.hideTools();
});

toolPaper.on("link:pointerdblclick", function (linkView) {
    var currentLink = linkView.model;
    var newLink = currentLink.clone();


    newLink.source({ x: 500, y: 500 });
    newLink.target({ x: 580, y: 450 });
    newLink.addTo(mainGraph);

    var newLinkView = newLink.findView(mainPaper);
    newLinkView.addTools(toolsView)
    newLinkView.hideTools();
});

var mask = joint.highlighters.mask;

var selectedCellView = null;
mainPaper.on("element:pointerclick", function (cellView) {

    selectedCellView = displayHighlight(cellView, mainGraph, mask, mainPaper)
    // Checking if the attributes are displayed
    console.log(cellView.model.attributes.attrs)

});

// var createCopy = null;
var copiedCoordinates = null;

// copy
document.addEventListener("keydown", function (event) {
    if (event.keyCode === 67 && event.ctrlKey) {
        if (selectedCellView != null) {
            copiedCoordinates = selectedCellView.getBBox();
        }
        else {
            alert("Nothing selected to be copied")
        }
    }
});

// paste
document.addEventListener("keydown", function (event) {
    if (event.keyCode === 86 && event.ctrlKey) {
        pasteElement(selectedCellView, copiedCoordinates, mainGraph, mainPaper)
        // copiedCoordinates = null;
        // createCopy = null;
    }
});

// delete
document.addEventListener("keydown", function (event) {
    if (event.keyCode === 46 && event.key === "Delete") {
        if (selectedCellView != null) {
            var theModel = selectedCellView.model;
            theModel.remove();
            // this removes the attached links as well
        } else {
            alert("You have not selected an element, Nothing to delete");
        }
    }
});

mainPaper.on("blank:pointerclick", function () {
    // Remove all Highlighters from all cells
    removeHighlight(mainGraph, mask, mainPaper)
    selectedCellView = null;
});

mainPaper.on("link:mouseenter", function (linkView) {
    var flag = false;
    for (let i = 0; i < linkBlackList.length; i++) {
        if (linkView.model === linkBlackList[i]) {
            flag = true;
        }
    }
    if (!flag) {
        linkView.showTools(toolsView);
    }
});

mainPaper.on("link:mouseleave", function (linkView) {
    linkView.hideTools(toolsView);
});

// mainPaper.on("element:mouseenter", function (eleView) {
//     eleView.showTools();
// });

// mainPaper.on("element:mouseleave", function (eleView) {
//     eleView.hideTools();
// });

// var sampleJSON = {"cells":[{"type":"standard.Rectangle","position":{"x":432,"y":200},"size":{"width":132,"height":31},"angle":0,"id":"1c23e9de-eca0-4216-8790-f8614d64921a","z":1,"attrs":{"body":{"stroke":"black","fill":"white"},"label":{"fill":"black","text":"Rect1"}}},{"type":"standard.Circle","position":{"x":616,"y":408},"size":{"width":100,"height":100},"angle":0,"id":"ea1fac67-323f-4820-aae5-6e4443535a14","z":2,"attrs":{"body":{"fill":"white"},"label":{"fill":"black","text":"Circle1"}}},{"type":"standard.Circle","position":{"x":272,"y":344},"size":{"width":100,"height":100},"angle":0,"id":"aba7eca8-6a01-4336-b23c-7eb4477c9c70","z":2,"attrs":{"body":{"fill":"white"},"label":{"fill":"black","text":"Circle1"}}},{"type":"standard.Cylinder","position":{"x":704,"y":176},"size":{"width":100,"height":100},"angle":0,"id":"9d808706-17f0-457f-b7e3-26ead7af5e3f","z":3,"attrs":{"body":{"fill":"white","stroke":"black"},"label":{"fill":"black","text":"Cylinder1"}}},{"type":"standard.Link","source":{"id":"aba7eca8-6a01-4336-b23c-7eb4477c9c70"},"target":{"id":"9d808706-17f0-457f-b7e3-26ead7af5e3f"},"id":"a861d443-e17b-4732-84d2-42d5a44b1539","z":4,"attrs":{}},{"type":"standard.Link","source":{"id":"aba7eca8-6a01-4336-b23c-7eb4477c9c70"},"target":{"id":"ea1fac67-323f-4820-aae5-6e4443535a14"},"id":"5aef323f-d763-4dd6-9ca4-b5a4b672e059","z":4,"attrs":{}},{"type":"standard.Link","source":{"id":"9d808706-17f0-457f-b7e3-26ead7af5e3f"},"target":{"id":"ea1fac67-323f-4820-aae5-6e4443535a14"},"id":"e3f13c28-6430-479e-b2e5-36b64ca4d468","z":4,"vertices":[{"x":536,"y":128},{"x":240,"y":128},{"x":240,"y":552},{"x":666,"y":552}],"attrs":{}},{"type":"standard.DoubleLink","source":{"id":"1c23e9de-eca0-4216-8790-f8614d64921a"},"target":{"id":"9d808706-17f0-457f-b7e3-26ead7af5e3f"},"id":"6ae31f60-ec60-46cb-85a7-fe514eccbf5d","z":5,"attrs":{"line":{"stroke":"#30d0c6"},"root":{"tabindex":15,"title":"joint.shapes.standard.DoubleLink"}}}]}
// listen for the save button being clicked

// save
var saveButton = document.getElementById("save");
saveButton.addEventListener("click", () => { saveGraph(mainGraph) });

// open file
var fileInput = document.getElementById("open");

fileInput.addEventListener("change", (event) => { openFile(event, mainGraph) });