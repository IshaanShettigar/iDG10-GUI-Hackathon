
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
        color: "rgba(1,89,110,0.3)"
    },
    cellViewNamespace: namespace,

    snapLabels: true,
    interactive: {
        linkMove: false,
        labelMove: true,
        arrowheadMove: false,
        vertexMove: false,
        vertexAdd: false,
        vertexRemove: false,
        useLinkTools: false
    }
});

var blueRect = joint.dia.Element.define('blueRect', {
    attrs: {
        l1: {
            strokeWidth: 3,
            stroke: 'black',
            fill: 'rgba(0,255,0,0.3)'
        },
        l2: {
            strokeWidth: 3,
            stroke: 'black',
            fill: 'rgba(0,255,0,0.3)'
        },
        l3: {
            strokeWidth: 3,
            stroke: 'black',
            fill: 'rgba(0,255,0,0.3)'
        },
        l4: {
            strokeWidth: 3,
            stroke: 'black',
            fill: 'rgba(0,255,0,0.3)'
        },
        outline: {
            x: 0,
            y: 0,
            width: 'calc(w)',
            height: 'calc(h)',
            strokeWidth: 1,
            stroke: '#000000',
            fill: '#035afc'
        }
    }
}, {
    markup: [
        {
            tagName: 'line',
            selector: 'l1'
        },
        {
            tagName: 'line',
            selector: 'l2'
        },
        {
            tagName: 'line',
            selector: 'l3'
        },
        {
            tagName: 'line',
            selector: 'l4'
        },
        {
            tagName: 'rect',
            selector: 'outline'
        }]
});


var element1 = new blueRect();
element1.attr({
    l1: {
        x1: 'calc(w)',
        y1: 'calc(h)',
        x2: 'calc(1.25*w)',
        y2: 'calc(1.25*h)'
    },
    l2: {
        x1: '0',
        y1: '0',
        x2: 'calc(-0.25*w)',
        y2: 'calc(-0.25*h)'

    },
    l3: {
        x1: 'calc(w)',
        y1: '0',
        x2: 'calc(1.25*w)',
        y2: 'calc(-0.25*h)'
    },
    l4: {
        x1: '0',
        y1: 'calc(h)',
        x2: 'calc(-0.25*w)',
        y2: 'calc(1.25*h)'
    },

});

element1.position(200, 200);
element1.resize(60, 60);
element1.addTo(graph);

var yellowRect = joint.dia.Element.define('yellowRect', {
    attrs: {
        l1: {
            strokeWidth: 3,
            stroke: 'red',
            fill: 'none'
        },
        l2: {
            strokeWidth: 3,
            stroke: 'blue',
            fill: 'none'
        },
        l3: {
            strokeWidth: 3,
            stroke: 'green',
            fill: 'none'
        },
        l4: {
            strokeWidth: 3,
            stroke: 'red',
            fill: 'none'
        },
        l5: {
            strokeWidth: 3,
            stroke: 'blue',
            fill: 'none'
        },
        outline: {
            x: 0,
            y: 0,
            width: 'calc(w)',
            height: 'calc(h)',
            strokeWidth: 1,
            stroke: '#000000',
            fill: '#fac905'
        }
    }
}, {
    markup: [
        {
            tagName: 'line',
            selector: 'l1'
        },
        {
            tagName: 'line',
            selector: 'l2'
        },
        {
            tagName: 'line',
            selector: 'l3'
        },
        {
            tagName: 'line',
            selector: 'l4'
        },
        {
            tagName: 'line',
            selector: 'l5'
        },
        {
            tagName: 'rect',
            selector: 'outline'
        }
    ]
});

var element2 = new yellowRect();
element2.position(400, 200);
element2.resize(100, 50)
element2.addTo(graph)
element2.attr({
    l1: {
        x1: '0',
        y1: 'calc(0.25*h)',
        x2: 'calc(-0.35*w)',  // modify this to control to length of the line 
        y2: 'calc(0.25*h)'
    },
    l2: {
        x1: '0',
        y1: 'calc(0.5*h)',
        x2: 'calc(-0.35*w)',
        y2: 'calc(0.5*h)'
    },
    l3: {
        x1: '0',
        y1: 'calc(0.75*h)',
        x2: 'calc(-0.35*w)',
        y2: 'calc(0.75*h)'
    },
    l4: {
        x1: 'calc(w)',
        y1: 'calc(0.33*h)',
        x2: 'calc(1.35*w)', // controls the length
        y2: 'calc(0.33*h)'
    },
    l5: {
        x1: 'calc(w)',
        y1: 'calc(0.67*h)',
        x2: 'calc(1.35*w)', // controls the length
        y2: 'calc(0.67*h)'
    }

})



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
                    "https://assets.codepen.io/7589991/8725981_image_resize_square_icon.svg"
            }
        },
        {
            tagName: "rect",
            selector: "extras",
            attributes: {

                fill: "none",
                stroke: "#33334F",
                "stroke-dasharray": "2,4",
                rx: 5,
                ry: 5
            }
        }
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
    }
});




var EletoolsView = new joint.dia.ToolsView({
    tools: [new ResizeTool({ selector: 'outline' })]
});

var elementView = element1.findView(paper);
elementView.addTools(EletoolsView);