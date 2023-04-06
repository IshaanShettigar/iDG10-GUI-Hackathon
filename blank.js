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
        color: "rgba(140,59,110,0.3)"
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



var rect = new joint.shapes.standard.Rectangle();
rect.position(100, 30);
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
rect2.position(500, 500);
rect2.resize(100, 40);
rect2.attr({
    body: {
        fill: 'pink'
    },
    label: {
        text: 'Target',
        fill: 'black'
    }
});
rect2.addTo(graph)

var removeButton = new joint.elementTools.Remove();
var boundaryTool = new joint.elementTools.Boundary();

var eleToolsView = new joint.dia.ToolsView({
    tools: [removeButton, boundaryTool]
});

var rectView = rect.findView(paper);
rectView.addTools(eleToolsView)
rectView.hideTools()

paper.on('element:mouseenter', function (elementView) {
    elementView.showTools();
})
paper.on('element:mouseleave', function (elementView) {
    elementView.hideTools();
})

var link = new joint.shapes.standard.Link();
link.source(rect);
link.target(rect2);
link.addTo(graph);


function getInput(evt, linkView, buttonView) {
    // Create a new input element
    // const input = document.createElement('input');
    var newText = prompt("Enter new label text")


    // Set the type of the input to text
    // input.type = 'text';
    // input.id = "input-text"
    // // Add the input element to the body of the document
    // document.body.appendChild(input);

    // // Focus on the input element
    // input.focus();
    var theLink = linkView.model
    theLink.appendLabel({
        attrs: {
            text: {
                text: newText
            }
        },
        position: {
            distance: 0.25,
            offset: -20

        },
    });
    // Add an event listener to the input element to capture the input value
    /* input.addEventListener('keydown', function (event) {
         // Check if the key pressed is the "Enter" key
         if (event.key === 'Enter') {
             const inputValue = input.value;
             alert(inputValue);
             console.log(linkView.model)
             input.value = '';
             var theLink = linkView.model
             theLink.appendLabel({
                 attrs: {
                     text: {
                         text: inputValue
                     }
                 },
                 position: {
                     distance: 0.25,
                     offset: -20
 
                 },
             });
             document.getElementById("input-text").remove();
 
         }
     });*/
}

joint.linkTools.InfoButton = joint.linkTools.Button.extend({
    name: 'info-button',
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
                'd': 'M -2 4 2 4 M 0 3 0 0 M -2 -1 1 -1 M -1 -4 1 -4',
                'fill': 'none',
                'stroke': '#FFFFFF',
                'stroke-width': 2,
                'pointer-events': 'none'
            }
        }],
        distance: "40%",
        offset: 0,
        action: function (evt, linkView, buttonView) {
            getInput(evt, linkView, buttonView);
        }
    }
});

var infoButton = new joint.linkTools.InfoButton();
var toolsView = new joint.dia.ToolsView({
    tools: [infoButton]
});

var linkView = link.findView(paper);
linkView.addTools(toolsView);



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
                "pointer-events": "none",
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

var resizeToolView = new joint.dia.ToolsView({
    tools: [
        new ResizeTool({
            selector: 'body'
        })
    ]
})

rectView.addTools(resizeToolView)


var mask = joint.highlighters.mask;
/*
// mask.add(
//     rect.findView(paper),
//     { selector: 'body' },
//     'example-id',
//     {
//         layer: 'back',
//         attrs: {
//             'stroke': '#4666E5',
//             'stroke-width': 3,
//             'stroke-linejoin': 'round'
//         }
//     });

// mask.add(
//     rect2.findView(paper),
//     { selector: 'body' },
//     'example-id',
//     {
//         layer: 'back',
//         attrs: {
//             'stroke': '#4666E5',
//             'stroke-width': 3,
//             'stroke-linejoin': 'round'
//         }
//     });*/


var selectedCellView = null;
paper.on('element:pointerclick', function (cellView) {
    // remove highlights for all other elements
    graph.getCells().forEach(function (cell) {
        mask.remove(cell.findView(paper));
    });
    selectedCellView = cellView;

    //add highlight for this element
    mask.remove(cellView);
    console.log(selectedCellView)
    mask.add(cellView, 'root', 'element-highlight', {
        deep: true,
        attrs: {
            'stroke': '#FF4365',
            'stroke-width': 3
        }
    });
})

var createCopy = null;
var copiedCoordinates = null;

// copy
document.addEventListener('keydown', function (event) {
    if (event.keyCode === 67 && event.ctrlKey) {

        if (selectedCellView != null) {
            // Ctrl+C was pressed
            console.log('Ctrl+C was pressed');
            console.log(`Cellview to be copied is ${JSON.stringify(selectedCellView.model)
                }`)
            // selectedElementView
            createCopy = selectedCellView.model.clone();
            copiedCoordinates = selectedCellView.getBBox()
            console.log(`Coordinates where copy occurred is ${copiedCoordinates}`);
        }
        else {
            alert("You have not selected an element to copy");
        }
    }
});

// paste
document.addEventListener('keydown', function (event) {
    if (event.keyCode === 86 && event.ctrlKey) {
        if (createCopy != null) {
            createCopy.position(copiedCoordinates.x + 20, copiedCoordinates.y + 20)
            createCopy.addTo(graph);
            console.log("pasted element to graph")
        }
        else {
            alert("There is nothing to paste, clipboard empty!")
        }
    }
})

// delete
document.addEventListener('keydown', function (event) {
    if (event.keyCode === 46 && event.key === 'Delete') {
        if (selectedCellView != null) {
            var theModel = selectedCellView.model
            theModel.remove()
            // this removes the attached links as well
        }
        else {
            alert("You have not selected an element, Nothing to delete")
        }
    }
})


paper.on('blank:pointerclick', function () {
    // Remove all Highlighters from all cells
    graph.getCells().forEach(function (cell) {
        mask.remove(cell.findView(paper));
    });
    selectedCellView = null;
});

