import { subseaSeparator, subseaPump, UTA, productionWellST, injectionWellST, manifold, platform } from "../main/elements.js"


var namespace = joint.shapes;
var graph = new joint.dia.Graph({}, { cellNamespace: namespace });

const GRID_SIZE = 20;
const GRID_NAME = "mesh";
var paper = new joint.dia.Paper({
    el: document.getElementById('paper-div'),
    model: graph,
    width: window.innerWidth,
    height: window.innerHeight,
    gridSize: GRID_SIZE,
    drawGrid: { name: GRID_NAME },
    background: {
        color: "rgba(0,0,0,0.1)"
    },
    cellViewNamespace: namespace,
});


var toolGraph = new joint.dia.Graph({}, { cellNamespace: namespace });

var toolPaper = new joint.dia.Paper({
    el: document.getElementById('tool-paper-div'),
    model: toolGraph,
    width: 140,
    height: 1000,
    background: {
        color: "rgba(255,255,255,0.75)"
    },
    cellViewNamespace: namespace,
    interactive: false
});

const SS = new subseaSeparator()
SS.position(30, 50)
SS.size(85, 50)
SS.addTo(toolGraph);

const SP = new subseaPump();
SP.position(40, 130)
SP.size(60, 60);
SP.addTo(toolGraph);

const uta = new UTA()
uta.position(25, 220)
uta.size(93, 55)
uta.addTo(toolGraph)

const PWST = new productionWellST()
PWST.position(50, 320)
PWST.size(50, 50)
PWST.addTo(toolGraph)

const PL = new platform()
PL.position(30, 480);
PL.size(80, 20)
PL.addTo(toolGraph)

const IWST = new injectionWellST();
IWST.position(50, 585)
IWST.resize(50, 50)
IWST.addTo(toolGraph)

const MANIFOLD = new manifold()
MANIFOLD.position(38, 695)
MANIFOLD.resize(70, 35)
MANIFOLD.addTo(toolGraph)


toolPaper.on('cell:pointerdown', function (cellView, e, x, y) {
    // console.log(cellView.model.getBBox("deep"))
    $('body').append('<div id="flyPaper" style="position:fixed;z-index:101;opacity:.7;pointer-event:none;"></div>')
    var flyGraph = new joint.dia.Graph,
        flyPaper = new joint.dia.Paper({
            el: $('#flyPaper'),
            model: flyGraph,
            height: 200,
            width: 150,
            interactive: false,
            background: {
                color: "rgba(0,0,0,0)"
            },

        }),
        flyShape = cellView.model.clone(),
        pos = cellView.model.position(),
        offset = {
            x: x - pos.x,
            y: y - pos.y
        };

    flyShape.position(35, 40);
    flyGraph.addCell(flyShape);
    $("#flyPaper").offset({
        left: e.pageX - offset.x,
        top: e.pageY - offset.y
    });
    $('body').on('mousemove.fly', function (e) {
        $("#flyPaper").offset({
            left: e.pageX - offset.x,
            top: e.pageY - offset.y
        });
    });
    $('body').on('mouseup.fly', function (e) {
        var x = e.pageX,
            y = e.pageY,
            target = paper.$el.offset();

        // Dropped over paper ?
        if (x > target.left && x < target.left + paper.$el.width() && y > target.top && y < target.top + paper.$el.height()) {
            var s = flyShape.clone();
            s.position(x - target.left - offset.x, y - target.top - offset.y);
            graph.addCell(s);
        }
        $('body').off('mousemove.fly').off('mouseup.fly');
        flyShape.remove();
        $('#flyPaper').remove();
    });
});


const paperDiv = document.getElementById('paper-div')
// console.log(paperDiv.childNodes[2])

// var paperPanAndZoom = svgPanZoom("#paper-div svg", {
//     viewport: document.getElementById('paper-div').childNodes[2].childNodes[1],
//     fit: false,
//     center: false,
//     zoomScaleSensitivity: 0.1,
//     panEnabled: false,
//     controlIconsEnabled: true,
//     onZoom: (newZoom) => {
//         console.log(newZoom)
//         paper.setGridSize(paper.options.gridSize + newZoom)
//         // paper.drawGrid()
//     },

// })

// // paper.fitToContent()
// // console.log(paper.getFitToContentArea())
// paper.on('blank:pointerdown', function (evt, x, y) {
//     paperPanAndZoom.enablePan();
//     document.getElementById('paper-div').style.cursor = "move";
// });
// paper.on('cell:pointerup blank:pointerup', function (cellView, event) {
//     paperPanAndZoom.disablePan();
//     document.getElementById('paper-div').style.cursor = "auto";
// })


// graph.on('change:position', function (cell) {
//     console.log(paper.getContentBBox())
// })

