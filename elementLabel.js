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
                    width: model.attributes.size.width / 2 + additionalWidth * 10,
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

        }
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

var addLabelButton = new joint.elementTools.AddLabelButton();
var toolsView = new joint.dia.ToolsView({
    tools: [addLabelButton]
});

var elementView = element.findView(paper);
elementView.addTools(toolsView);








