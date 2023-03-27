
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

var CustomElement = joint.dia.Element.define('examples.CustomElement', {
    attrs: {
        e: {
            strokeWidth: 1,
            stroke: '#000000',
            fill: 'rgba(255,0,0,0.3)'
        },
        r: {
            strokeWidth: 1,
            stroke: '#000000',
            fill: 'rgba(0,255,0,0.3)'
        },
        c: {
            strokeWidth: 1,
            stroke: '#000000',
            fill: 'rgba(0,0,255,0.3)'
        },
        outline: {
            x: 0,
            y: 0,
            width: 'calc(w)',
            height: 'calc(h)',
            strokeWidth: 1,
            stroke: '#000000',
            strokeDasharray: '5 5',
            strokeDashoffset: 2.5,
            fill: 'none'
        }
    }
}, {
    markup: [{
        tagName: 'ellipse',
        selector: 'e'
    }, {
        tagName: 'rect',
        selector: 'r'
    }, {
        tagName: 'circle',
        selector: 'c'
    }, {
        tagName: 'rect',
        selector: 'outline'
    }]
});


var element = new CustomElement();
element.attr({
    e: {
        rx: 'calc(0.5*w)',
        ry: 'calc(0.25*h)',
        cx: 0,
        cy: 'calc(0.25*h)'
    },
    r: {
        // additional x offset
        x: 'calc(w-10)',
        // additional y offset
        y: 'calc(h-10)',
        width: 'calc(0.5*w)',
        height: 'calc(0.5*h)'
    },
    c: {
        r: 'calc(0.5*d)',
        cx: 'calc(0.5*w)',
        cy: 'calc(0.5*h)'
    }
});

element.position(280, 130);
element.resize(40, 40);
element.addTo(graph);

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

var elementView = element.findView(paper);
elementView.addTools(EletoolsView);
        // elementView.showTools()