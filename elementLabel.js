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

// create new "addLabel" button

joint.elementTools.AddLabelButton = joint.elementTools.Button.extend({
    name: 'add-label-button',
    options: {
        markup: [{
            tagName: 'circle',
            selector: 'button',
            attributes: {
                'r': 7,
                'fill': 'mediumseagreen',
                'cursor': 'pointer'
            }
        }, {
            tagName: 'path',
            selector: 'icon',
            attributes: {
                'd': 'M 0 0 0 0 M 0 5 0 0 M -1 -1 1 -1 M 0 0 0 -4.5 M -4 0 0 0 M 4.5 0 0 0 ',
                'fill': 'none',
                'stroke': '#FFFFFF',
                'stroke-width': 2,
                'pointer-events': 'none'
            }
        }],
        x: '100%',
        y: '0%',
        offset: {
            x: 0,
            y: 0
        },
        rotate: true,
        action: function (evt, elementView, buttonView) {
            // alert('View id: ' + this.id + '\n' + 'Model id: ' + this.model.id);
            var model = elementView.model;
            console.log(model.attributes.size)

            const newText = prompt("Enter Label Text");
            var GAP = 40
            var additionalWidth = newText.length;
            var label = new joint.shapes.standard.Rectangle({
                label: true,
                size: {
                    width: model.attributes.size.width / 2 + additionalWidth * 5.5,
                    height: 25
                },
                position: {
                    x: model.attributes.position.x,
                    y: model.attributes.position.y - GAP
                },
                attrs: {
                    label: {
                        text: newText,
                        pointerEvents: 'all'
                    },
                    body: {
                        strokeWidth: 1,
                        pointerEvents: 'none',
                        opacity: 1,
                        fill: "#e6e6e6",
                        rx: 10,
                        ry: 10

                    }
                }
            });

            var elementModel = elementView.model
            elementModel.embed(label)
            label.addTo(graph)
            // Let us try to create a simple dash lined link to connect between 
            var dashLink = new joint.shapes.standard.Link();
            dashLink.source(model);
            dashLink.target(label);
            dashLink.addTo(graph);
            dashLink.attr({
                line: {
                    stroke: 'black',
                    strokeWidth: 1,
                    strokeDasharray: '4 2',
                    targetMarker: {
                        'opacity': 0
                    }
                }
            });

        }
    }
});
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



var element = new joint.shapes.standard.Rectangle();
element.resize(100, 100);
element.position(500, 200);
element.attr({
    body: {
        fill: 'white',
        stroke: 'black',
        strokeWidth: 2
    },
    label: {
        text: 'ELEMENT',
        fill: 'black',

    }
})
element.addTo(graph);

// Create an instance of the button and add it to a toolsView
var addLabelButton = new joint.elementTools.AddLabelButton();
var resizeTool = new ResizeTool({ selector: 'body' })
var toolsView = new joint.dia.ToolsView({
    tools: [addLabelButton, resizeTool]
});


// Add the toolsView to the elementView
var elementView = element.findView(paper);
elementView.addTools(toolsView);

// Initialize the default label to show the dynamic nature of labels

var defaultSizeLabel = new joint.shapes.standard.Rectangle({
    label: true,
    size: {
        width: 50,
        height: 40
    },
    position: {
        x: element.attributes.position.x - 40,
        y: element.attributes.position.y - 100
    },
    attrs: {
        label: {
            text: `ht: ${100}\nwt: ${100}`,
            pointerEvents: 'all'
        },
        body: {
            strokeWidth: 1,
            pointerEvents: 'none',
            opacity: 1,
            fill: "#e6e6e6",
            rx: 10,
            ry: 10

        }
    }
});

defaultSizeLabel.addTo(graph)

var defaultLink = new joint.shapes.standard.Link();
defaultLink.source(element);
defaultLink.target(defaultSizeLabel);
defaultLink.addTo(graph);
defaultLink.attr({
    line: {
        stroke: 'black',
        strokeWidth: 1,
        strokeDasharray: '4 2',
        targetMarker: {
            'opacity': 0
        }
    }
});





// graph.on('change:position', function (cellView) {
//     console.log(`Changed position to ${JSON.stringify(cellView.changed["position"])}`);
// })



graph.on('change:size', function (cellView) {
    var eleWidth = cellView.changed['size']['width']
    var eleHeight = cellView.changed['size']['height']
    var eleSize = cellView.changed['size']
    // console.log(`Changed size to ${JSON.stringify(eleSize)}`);

    defaultSizeLabel.attr({
        label: {
            text: `ht: ${eleSize['height']}\nwt: ${eleSize['width']}`,
            fill: 'black'
        }
    })
})