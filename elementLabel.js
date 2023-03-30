var namespace = joint.shapes
var graph = new joint.dia.Graph({}, { cellNamespace: namespace });

var paper = new joint.dia.Paper({
    el: document.getElementById('myholder'),
    model: graph,
    width: 1280,
    height: 720,
    gridSize: 10,
    drawGrid: true,
    background: {
        color: "rgba(50,89,110,0.2)"
    },
    cellViewNamespace: namespace,
    snapLabels: true,
    interactive: true
});




