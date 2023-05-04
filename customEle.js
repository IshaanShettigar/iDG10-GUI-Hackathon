
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


var myElement1 = new blueRect();
myElement1.attr({
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

myElement1.position(200, 200);
myElement1.resize(60, 60);
myElement1.addTo(graph);

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
        l6: {
            strokeWidth: 3,
            stroke: 'green',
            fill: 'none'
        },
        l7: {
            strokeWidth: 3,
            stroke: 'black',
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
            tagName: 'line',
            selector: 'l6'
        },
        {
            tagName: 'line',
            selector: 'l7'
        },
        {
            tagName: 'rect',
            selector: 'outline'
        }
    ]
});

var myElement2 = new yellowRect();
myElement2.position(400, 200);
myElement2.resize(100, 50)
myElement2.addTo(graph)
myElement2.attr({
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
    },
    l6: {
        x1: 'calc(0.5*w)',
        y1: '0',
        x2: 'calc(0.5*w)',
        y2: 'calc(-0.35*h)'

    },
    l7: {
        x1: 'calc(0.7*w)',
        y1: '0',
        x2: 'calc(0.7*w)',
        y2: 'calc(1.35*h)'
    }

})

var oilRig = joint.dia.Element.define('oilRig', {
    attrs: {
        red_line: {
            strokeWidth: 3,
            stroke: 'red'
        },
        blue_line: {
            strokeWidth: 3,
            stroke: 'blue'
        },
        green_line: {
            strokeWidth: 3,
            stroke: 'green'
        },
        vertical_black_line: {
            strokeWidth: 2,
            stroke: '#000000'
        },
        no_fill_polygon: {
            strokeWidth: 1,
            stroke: '#000000',
            fill: 'none'
        },
        yellow_polygon: {
            strokeWidth: 1,
            stroke: 'black',
            fill: '#fac905'
        },
        bottom_r1: {
            strokeWidth: 1,
            stroke: 'black',
            fill: 'none'
        },
        bottom_r2: {
            strokeWidth: 1,
            stroke: 'black',
            fill: 'none'
        },
        sub_rect: {
            strokeWidth: 1,
            stroke: 'black',
            fill: '#fac905'
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
            selector: 'red_line'
        },
        {
            tagName: 'line',
            selector: 'blue_line'
        },
        {
            tagName: 'line',
            selector: 'green_line'
        },
        {
            tagName: 'line',
            selector: 'vertical_black_line'
        },
        {
            tagName: 'polygon',
            selector: 'no_fill_polygon'
        },
        {
            tagName: 'polygon',
            selector: 'yellow_polygon'
        },
        {
            tagName: 'rect',
            selector: 'sub_rect'
        },
        {
            tagName: 'rect',
            selector: 'bottom_r1'
        },
        {
            tagName: 'rect',
            selector: 'bottom_r2'
        },
        {
            tagName: 'rect',
            selector: 'outline'
        }
    ]
});

var myElement3 = new oilRig();
myElement3.position(500, 500)
myElement3.resize(125, 30)
myElement3.addTo(graph)
myElement3.attr({
    red_line: {
        x1: 'calc(0.79*w)',
        y1: 'calc(1*h)',
        x2: 'calc(0.79*w)',
        y2: 'calc(2.5*h)'
    },
    blue_line: {
        x1: 'calc(0.72*w)',
        y1: 'calc(1*h)',
        x2: 'calc(0.72*w)',
        y2: 'calc(2.5*h)'
    },
    green_line: {
        x1: 'calc(0.245*w)',
        y1: 'calc(1*h)',
        x2: 'calc(0.245*w)',
        y2: 'calc(2.5*h)'
    },

    vertical_black_line: {
        x1: 'calc(0.9*w)',
        y1: '-calc(2.1*h)',
        x2: 'calc(0.9*w)',
        y2: '-calc(0.9*h)'
    },
    no_fill_polygon: {
        points: 'calc(0.44*w) -calc(0.8*h) calc(0.9*w) -calc(2.27*h) calc(0.95*w) -calc(2*h) calc(0.49*w) -calc(0.5*h)'
    },
    yellow_polygon: {
        points: 'calc(0.2*w) -calc(0.8*h) calc(0.23*w) -calc(2.9*h) calc(0.30*w) -calc(2.9*h) calc(0.33*w) -calc(0.8*h)  '
    },
    bottom_r1: {
        x: 'calc(0.65*w)',
        y: 'calc(h)',
        width: 'calc(0.8*h)', //both w & h are as we need a square, using h as ref here
        height: 'calc(0.8*h)'
    },
    bottom_r2: {
        x: 'calc(0.15*w)',
        y: 'calc(h)',
        width: 'calc(0.8*h)', //both w & h are as we need a square, using h as ref here
        height: 'calc(0.8*h)'
    },
    sub_rect: {
        x: 'calc(0.1*w)',
        y: '-calc(0.8*h)',
        width: 'calc(0.40*w)',
        height: 'calc(0.8*h)'
    }
})

const productionWellST = joint.dia.Element.define(
    "productionWellST",
    {
        attrs: {
            l1: {
                x1: "calc(w)",
                y1: "calc(h)",
                x2: "calc(1.25*w)",
                y2: "calc(1.25*h)",
                strokeWidth: 3,
                stroke: "black",
                fill: "rgba(0,255,0,0.3)",
            },
            l2: {
                x1: "0",
                y1: "0",
                x2: "calc(-0.25*w)",
                y2: "calc(-0.25*h)",
                strokeWidth: 3,
                stroke: "black",
                fill: "rgba(0,255,0,0.3)",
            },
            l3: {
                x1: "calc(w)",
                y1: "0",
                x2: "calc(1.25*w)",
                y2: "calc(-0.25*h)",
                strokeWidth: 3,
                stroke: "black",
                fill: "rgba(0,255,0,0.3)",
            },
            l4: {
                x1: "0",
                y1: "calc(h)",
                x2: "calc(-0.25*w)",
                y2: "calc(1.25*h)",
                strokeWidth: 3,
                stroke: "black",
                fill: "rgba(0,255,0,0.3)",
            },
            outline: {
                x: 0,
                y: 0,
                width: "calc(w)",
                height: "calc(h)",
                strokeWidth: 1,
                stroke: "#000000",
                fill: "#02a31d",
            },
        },
    },
    {
        markup: [
            {
                tagName: "line",
                selector: "l1",
            },
            {
                tagName: "line",
                selector: "l2",
            },
            {
                tagName: "line",
                selector: "l3",
            },
            {
                tagName: "line",
                selector: "l4",
            },
            {
                tagName: "rect",
                selector: "outline",
            },
        ],
    }
);

const element4 = new productionWellST();
element4.position(250, 500)
element4.resize(50, 50)
element4.addTo(graph);

const borderRadiusUTA = 5;
const UTA = joint.dia.Element.define("UTA",
    {
        attrs: {
            innerRect: {
                d: `Mcalc(0.8*w),calc(0.78*h) hcalc(-0.6*w) 
                a${borderRadiusUTA},${borderRadiusUTA} 0 0 1 -${borderRadiusUTA},-${borderRadiusUTA} vcalc(-0.45*h) 
                a${borderRadiusUTA},${borderRadiusUTA} 0 0 1 ${borderRadiusUTA},-${borderRadiusUTA} hcalc(0.6*w)
                a${borderRadiusUTA},${borderRadiusUTA} 0 0 1 ${borderRadiusUTA},${borderRadiusUTA} vcalc(0.45*h)
                a${borderRadiusUTA},${borderRadiusUTA} 0 0 1 -${borderRadiusUTA},${borderRadiusUTA}`,
                stroke: '#4d71ab',
                strokeWidth: 2,
                fill: '#608bd1',
            },
            rightLine: {
                x1: 'calc(0.82*w)',
                y1: 'calc(0.5*h)',
                x2: 'calc(1.1*w)',
                y2: 'calc(0.5*h)',
                stroke: 'black',
                strokeWidth: 2,
                fill: 'none',
            },
            leftDashLine: {
                x1: 'calc(0.15*w)',
                y1: 'calc(0.5*h)',
                x2: 'calc(-0.15*w)',
                y2: 'calc(0.5*h)',
                stroke: 'black',
                strokeWidth: 2,
                strokeDasharray: '8 5',
                fill: 'none',
            },
            outline: {
                x: 0,
                y: 0,
                height: 'calc(h)',
                width: 'calc(w)',
                stroke: 'black',
                strokeWidth: 2,
                fill: 'none',
            },

        }
    },
    {
        markup: [
            {
                tagName: 'rect',
                selector: 'outline'
            },
            {
                tagName: 'path',
                selector: 'innerRect'
            },
            {
                tagName: 'line',
                selector: 'rightLine'
            },
            {
                tagName: 'line',
                selector: 'leftDashLine'
            }
        ]
    }
)

const ele5 = new UTA()
ele5.position(600, 200)
ele5.resize(140, 82)
ele5.addTo(graph)


const subseaPump = joint.dia.Element.define('subseaPump', {
    attrs: {
        outline: {
            height: 'calc(h)',
            widght: 'calc(w)',
            stroke: 'black',
            strokeWidth: 1,
            fill: 'none'
        },
        leftLine: {
            stroke: '#02a31d',
            strokeWidth: 3,
            x1: 0,
            y1: 'calc(0.5*h)',
            x2: 'calc(-0.5*w)',
            y2: 'calc(0.5*h)',

        },
        rightLine: {
            stroke: '#02a31d',
            strokeWidth: 3,
            x1: 'calc(w)',
            y1: 'calc(0.5*h)',
            x2: 'calc(1.5*w)',
            y2: 'calc(0.5*h)',
        },
        pump: {
            d: `Mcalc(w),calc(0.5*h) 
            Acalc(0.5*w),calc(0.5*h) 0 0 1 0,calc(0.5*h)
            Acalc(0.5*w),calc(0.5*h) 0 0 1 calc(0.5*w),0
            Hcalc(w) Vcalc(0.15*h) Hcalc(0.8*w)
            Acalc(0.5*w),calc(0.5*h) 0 0 1 calc(w),calc(0.5*h)`,
            stroke: '#8c7103',
            strokeWidth: 2,
            fill: '#fac905',
        }
    }
},
    {
        markup: [
            {
                tagName: 'rect',
                selector: 'outline'
            },
            {
                tagName: 'path',
                selector: 'pump'
            },
            {
                tagName: 'line',
                selector: 'leftLine'
            },
            {
                tagName: 'line',
                selector: 'rightLine'
            }
        ]
    }
)

const ele6 = new subseaPump();
ele6.position(900, 500);
ele6.size(70, 70);
ele6.addTo(graph)

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
var removeButton = new joint.elementTools.Remove();
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
        x: '50%',
        y: '50%',
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

var addLabelButton = new joint.elementTools.AddLabelButton();




var EletoolsView = new joint.dia.ToolsView({
    tools: [new ResizeTool({ selector: 'outline' }), removeButton, addLabelButton]
});

var element1View = myElement1.findView(paper);
element1View.addTools(EletoolsView);

// var element2View = myElement2.findView(paper);
// element2View.addTools(EletoolsView);
// // note the stroke width is not relative

const element5View = ele5.findView(paper);
element5View.addTools(EletoolsView);

paper.on('element:mouseenter', function (elementView) {
    element5View.showTools();
})
paper.on('element:mouseleave', function (elementView) {
    element5View.hideTools();
})