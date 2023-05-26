var namespace = joint.shapes;
var graph = new joint.dia.Graph({}, { cellNamespace: namespace });

var paper = new joint.dia.Paper({
    el: document.getElementById('paper-div'),
    model: graph,
    width: 2000,
    height: 2000,
    gridSize: 20,
    drawGrid: { name: "mesh" },
    background: {
        color: "rgba(0,0,0,0.1)"
    },
    cellViewNamespace: namespace,
});

var rect = new joint.shapes.standard.Rectangle();
rect.position(100, 100);
rect.resize(100, 40);
rect.attr({
    body: {
        fill: 'blue'
    },
    label: {
        text: 'Hello',
        fill: 'white'
    }
});
rect.addTo(graph);

var rect2 = new joint.shapes.standard.Rectangle();
rect2.position(200, 500);
rect2.resize(100, 40);
rect2.attr({
    body: {
        fill: 'blue'
    },
    label: {
        text: 'Hello',
        fill: 'white'
    }
});
rect2.addTo(graph);

var rect3 = new joint.shapes.standard.Rectangle();
rect3.position(500, 100);
rect3.resize(100, 40);
rect3.attr({
    body: {
        fill: 'blue'
    },
    label: {
        text: 'Hello',
        fill: 'white'
    }
});
rect3.addTo(graph);

//---------------------------------

//Initial Parameters
var gridsize = 1;
var currentScale = 1;

const paperDiv = document.getElementById('paper-div')
console.log(paperDiv.childNodes[2])

paperPanAndZoom = svgPanZoom("#paper-div svg", {
    fit: false,
    center: false,
    zoomScaleSensitivity: 0.03,
    panEnabled: false,
    controlIconsEnabled: true
})

// paper.fitToContent()
// console.log(paper.getFitToContentArea())
paper.on('blank:pointerdown', function (evt, x, y) {
    paperPanAndZoom.enablePan();
});
paper.on('cell:pointerup blank:pointerup', function (cellView, event) {
    paperPanAndZoom.disablePan();
})
graph.on('change:position', function (cell) {
    console.log(paper.getContentBBox())
})

// const resetButton = document.getElementById('reset-pan')
// resetButton.addEventListener('click', function () {

// })



