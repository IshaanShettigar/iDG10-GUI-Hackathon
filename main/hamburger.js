import { subseaSeparator, subseaPump, UTA, productionWellST, injectionWellST, manifold, platform } from "./elements.js"
import { assignCustomParams } from "./element-attrs.js"
import { saveGraph, openFile } from "./persist.js"
import { displayHighlight, removeHighlight, pasteElement } from "./utils.js"
import { ResizeToolBottomLeftST, ResizeToolBottomRightST, ResizeToolTopLeftST, ResizeToolTopRightST, RotateToolIWST, RotateToolManifold, RotateToolPlatform, RotateToolSubseaPump, RotateToolSubseaSeparator, RotateToolUTA, getPositionIWST, rotateChildren, setPositionAll } from "./tools.js"

// window.onload = () => {

/* Left Hamburger Menu */
let subMenuWrap = document.getElementById("sub-menu-wrap")
let menuButton = document.getElementById("burger-button")

menuButton.addEventListener("click", () => {
    subMenuWrap.classList.toggle("open-menu")
})

/* Right hand side element toolbar menu */
let elementButton = document.getElementById('element-button')
let elementMenuWrap = document.getElementById('element-menu-wrap')
let pinButton = document.getElementById('pin-button');

var isPinned = false;
pinButton.addEventListener("click", () => {
    if (isPinned == false) {
        pinButton.classList.add("is-active");
        isPinned = true;
    }
    else {
        pinButton.classList.remove("is-active");
        isPinned = false;
    }
})

elementButton.addEventListener("click", () => {
    if (isPinned == false) {
        elementMenuWrap.classList.toggle("is-active");
        elementButton.classList.toggle("is-active");
    }
})


const openFileButton = document.getElementById('open-file')
const saveDiagramButton = document.getElementById('save-file')

// file open
openFileButton.addEventListener('click', (event) => {
    // dynamically create 
    var inputElement = document.createElement('input');
    inputElement.type = 'file';
    inputElement.addEventListener('change', function (event) {
        // Call the openFile function with the selected file and the mainGraph argument
        openFile(event, mainGraph);
        // Remove the input element after the file has been selected
        inputElement.remove();
    });
    // Simulate a click event on the input element
    inputElement.click();
});
// save diagram
saveDiagramButton.addEventListener('click', () => { saveGraph(mainGraph) });


/* Settings Modal  */
const settingsBtn = document.getElementById("settings-button");
const settingsModal = document.getElementById("settings-modal");
const closeModalBtn = document.getElementById("close-modal");
const modalOverlay = document.getElementById("settings-overlay");
const customColorPopUp = document.getElementById("custom-bg-color-modal")

settingsBtn.addEventListener("click", function () {
    settingsModal.classList.remove("hidden");
    modalOverlay.classList.remove("hidden");

})

const closeCustomColorPopUp = function () {
    if (!customColorPopUp.classList.contains("hidden")) {
        customColorPopUp.classList.add("hidden");
    }
}


// Handling change of the select box for grid-type
const selectBox = document.getElementById("grid-type");
selectBox.addEventListener("change", function () {
    console.log("Change grid type to ", selectBox.value)
    mainPaper.setGrid(selectBox.value).drawGrid();
})


const clearCanvas = document.getElementById("clear-paper");
const clearCanvasModal = document.getElementById("clear-background-modal")
const closeClearCanvasModalBtn = document.getElementById("close-modal-bg")
const confirmClearBG = document.getElementById("confirm-clear-bg")
const cancelClearBG = document.getElementById("cancel-clear-bg")

clearCanvas.addEventListener("click", function () {
    clearCanvasModal.classList.remove("hidden");
    modalOverlay.classList.remove("hidden");

});


const closeModal = function () {
    settingsModal.classList.add("hidden");
    modalOverlay.classList.add("hidden");
    subMenuWrap.classList.toggle("open-menu")
    closeCustomColorPopUp();
    clearCanvasModal.classList.add("hidden");
}
closeModalBtn.addEventListener("click", closeModal)

/* close the modal if clicked outside the screen */
modalOverlay.addEventListener("click", closeModal)

/* close modal if the x is clicked on clear background modal */
closeClearCanvasModalBtn.addEventListener("click", closeModal)
cancelClearBG.addEventListener("click", closeModal)

// Confirmation modal shown that ask users whether they would like to clear the bg or not
confirmClearBG.addEventListener("click", function () {
    mainGraph.clear()
    closeModal()
})

/* Code to highlight active grid color in settings modals */
const color1 = document.getElementById("color1")
const color2 = document.getElementById("color2")
const color3 = document.getElementById("color3")
const color4 = document.getElementById("color4")
const color5 = document.getElementById("color5")
const customColor = document.getElementById("color-custom")

color1.addEventListener("click", function () {
    const activeColor = document.querySelector(".active");
    activeColor.classList.remove("active");
    color1.classList.add("active")
    mainPaper.drawBackground({ color: '#ffffff' });
    customColor.style.background = '#ffffff'
    closeCustomColorPopUp()
})
color2.addEventListener("click", function () {
    const activeColor = document.querySelector(".active");
    activeColor.classList.remove("active");
    color2.classList.add("active")
    mainPaper.drawBackground({ color: '#f5faff' });
    customColor.style.background = '#f5faff'
    closeCustomColorPopUp()

})
color3.addEventListener("click", function () {
    const activeColor = document.querySelector(".active");
    activeColor.classList.remove("active");
    color3.classList.add("active")
    mainPaper.drawBackground({ color: '#fcfbed' });
    customColor.style.background = '#fcfbed'
    closeCustomColorPopUp()
})
color4.addEventListener("click", function () {
    const activeColor = document.querySelector(".active");
    activeColor.classList.remove("active");
    color4.classList.add("active")
    mainPaper.drawBackground({ color: '#fcf5f2' })
    customColor.style.background = '#fcf5f2'
    closeCustomColorPopUp()
})
customColor.addEventListener("click", function () {
    // To open the customColorPopUp for user input
    if (customColorPopUp.classList.contains("hidden")) {
        customColorPopUp.classList.remove("hidden")
    }
})

// For the custom user defined paper background color 
const customColorInput = document.getElementById("custom-color-input")
customColorInput.addEventListener("input", function () {
    const currentHEXValue = customColorInput.value;
    // Checks if the current value is a valid hexcode as per regex
    if (/^#[0-9A-F]{6}$/i.test(currentHEXValue)) {
        // Valid hex code, change the background color of the button
        customColor.style.backgroundColor = currentHEXValue;
        mainPaper.drawBackground({ color: currentHEXValue })
    } else {
        // Invalid hex code, handle the error condition (e.g., display an error message)
        console.log('Invalid hex code:', currentHEXValue);
        // You can perform any necessary error handling here
    }
})

/* Element Settings */
const elementP1 = document.getElementById('ele-p1')
const elementP2 = document.getElementById('ele-p2')
const elementP3 = document.getElementById('ele-p3')
const elementP4 = document.getElementById('ele-p4')
const elementP5 = document.getElementById('ele-p5')
const elementP6 = document.getElementById('ele-p6')
const elementP7 = document.getElementById('ele-p7')
const elementP8 = document.getElementById('ele-p8')
const elementP9 = document.getElementById('ele-p9')
const elementP10 = document.getElementById('ele-p10')
const elementP11 = document.getElementById('ele-p11')
const elementP12 = document.getElementById('ele-p12')
const elementP13 = document.getElementById('ele-p13')
const elementP14 = document.getElementById('ele-p14')
const elementP15 = document.getElementById('ele-p15')
const elementP16 = document.getElementById('ele-p16')
const elementP17 = document.getElementById('ele-p17')
const elementP18 = document.getElementById('ele-p18')

const connectorP1 = document.getElementById('conn-p1')
const connectorP2 = document.getElementById('conn-p2')
const connectorP3 = document.getElementById('conn-p3')
const connectorP4 = document.getElementById('conn-p4')
const connectorP5 = document.getElementById('conn-p5')
const connectorP6 = document.getElementById('conn-p6')
const connectorP7 = document.getElementById('conn-p7')
const connectorP8 = document.getElementById('conn-p8')
const connectorP9 = document.getElementById('conn-p9')
const connectorP10 = document.getElementById('conn-p10')
const connectorP11 = document.getElementById('conn-p11')
const connectorP12 = document.getElementById('conn-p12')
const connectorP13 = document.getElementById('conn-p13')
const connectorP14 = document.getElementById('conn-p14')
const connectorP15 = document.getElementById('conn-p15')
const connectorP16 = document.getElementById('conn-p16')
const connectorP17 = document.getElementById('conn-p17')
const connectorP18 = document.getElementById('conn-p18')
const connector = document.getElementById('connector')
const installationAndConstructionVessel = document.getElementById('install-vessel')
const subseaIntervention = document.getElementById('subsea-intervention')


// possible export to utils?
let mapping = {
    'parameter1': [elementP1, connectorP1],
    'parameter2': [elementP2, connectorP2],
    'parameter3': [elementP3, connectorP3],
    'parameter4': [elementP4, connectorP4],
    'parameter5': [elementP5, connectorP5],
    'parameter6': [elementP6, connectorP6],
    'parameter7': [elementP7, connectorP7],
    'parameter8': [elementP8, connectorP8],
    'parameter9': [elementP9, connectorP9],
    'parameter10': [elementP10, connectorP10],
    'parameter11': [elementP11, connectorP11],
    'parameter12': [elementP12, connectorP12],
    'parameter13': [elementP13, connectorP13],
    'parameter14': [elementP14, connectorP14],
    'parameter15': [elementP15, connectorP15],
    'parameter16': [elementP16, connectorP16],
    'parameter17': [elementP17, connectorP17],
    'parameter18': [elementP18, connectorP18]
}

/* function is called when element is clicked on so that the element
 settings pops up and gets populated with the right values */
const populateElementSettings = (model) => {
    console.log(`Populating ${model.attributes.type}`)
    let modelAttrs = model.attributes.attrs
    for (let i = 1; i <= 18; i++) {
        // if (modelAttrs[`parameter${i}`] != null) {
        // copy to elementsettings
        mapping[`parameter${i}`][0].value = modelAttrs[`parameter${i}`]
        // }
    }
}


/* Connector Settings */

const populateConnectorSettings = (model) => {
    // console.log(`Populating ${model.attributes.}`)
    let modelAttrs = model.attributes.attrs
    for (let i = 1; i <= 18; i++) {
        // if (modelAttrs[`parameter${i}`] != null) {
        // copy to elementsettings
        mapping[`parameter${i}`][1].value = modelAttrs[`parameter${i}`]
        // }
    }
    connector.value = modelAttrs['connector']
    installationAndConstructionVessel.value = modelAttrs['installationAndConstructionVessel']
    subseaIntervention.value = modelAttrs['subseaIntervention']
}


/* Creating the custom rigid pipelinepip - pr link  */
const RigidPipelinePiP_PR = joint.dia.Link.define('RigidPipelinePiP_PR', {
    attrs: {
        line: {
            connection: true,
            stroke: 'white',
            strokeWidth: 11,
            strokeLinejoin: 'round',

        },
        outline: {
            connection: true,
            stroke: 'black',
            strokeWidth: 15,
            strokeLinejoin: 'round'
        },
        central: {
            connection: true,
            stroke: 'green',
            strokeWidth: 4,
            strokeLinejoin: 'round'
        },
        connector: "Rigid-Pipeline-PiP PR",
        installationAndConstructionVessel: null,
        subseaIntervention: null,
        parameter1: null,
        parameter1: null,
        parameter2: null,
        parameter3: null,
        parameter4: null,
        parameter5: null,
        parameter6: null,
        parameter7: null,
        parameter8: null,
        parameter9: null,
        parameter10: null,
        parameter11: null,
        parameter12: null,
        parameter13: null,
        parameter14: null,
        parameter15: null,
        parameter16: null,
        parameter17: null,
        parameter18: null,
    }
}, {
    markup: [{
        tagName: 'path',
        selector: 'outline',
        attributes: {
            'fill': 'none'
        }
    }, {
        tagName: 'path',
        selector: 'line',
        attributes: {
            'fill': 'none'
        }
    }, {
        tagName: 'path',
        selector: 'central',
        attributes: {
            'fill': 'none'
        }
    }]
});
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
/* Render the toolPaper and toolGraph  */
var namespace = { ...joint.shapes, RigidPipelinePiP_PR };
var toolGraph = new joint.dia.Graph({}, { cellNamespace: namespace });
var toolPaper = new joint.dia.Paper({
    el: document.getElementById('tool-paper-div'),
    model: toolGraph,
    width: 158,
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
assignCustomParams(SS)

const SP = new subseaPump();
SP.position(40, 130)
SP.size(60, 60);
SP.addTo(toolGraph);
assignCustomParams(SP)

const uta = new UTA()
uta.position(25, 220)
uta.size(93, 55)
uta.addTo(toolGraph)
assignCustomParams(uta)

const PWST = new productionWellST()
PWST.position(50, 320)
PWST.size(50, 50)
PWST.addTo(toolGraph)
assignCustomParams(PWST)

const PL = new platform()
PL.position(30, 480);
PL.size(80, 20)
PL.addTo(toolGraph)
assignCustomParams(PL)

const IWST = new injectionWellST();
IWST.position(50, 585)
IWST.resize(50, 50)
IWST.addTo(toolGraph)
assignCustomParams(IWST)

const MANIFOLD = new manifold()
MANIFOLD.position(38, 695)
MANIFOLD.resize(70, 35)
MANIFOLD.addTo(toolGraph)
assignCustomParams(MANIFOLD)



/* Create the main paper and graph */
const GRID_SIZE = 5;
const GRID_NAME = "fixedDot";
var mainGraph = new joint.dia.Graph({}, { cellNamespace: namespace });
var mainPaper = new joint.dia.Paper({
    el: document.getElementById('main-paper-div'),
    model: mainGraph,
    width: window.innerWidth,
    height: window.innerHeight,
    gridSize: GRID_SIZE,
    drawGrid: { name: GRID_NAME },
    background: {
        color: "rgba(255,255,255,1)"
    },
    interactive: {
        linkMove: true,
        labelMove: true,
        arrowheadMove: true,
        vertexMove: true,
        vertexAdd: true,
        vertexRemove: true,
        useLinkTools: true,
    },
    linkPinning: false,
    defaultLink: () => {
        var stdLink = new joint.shapes.standard.Link({
            router: { name: 'normal' },
            connector: { name: 'rounded' },
            attrs: {
                line: {
                    stroke: "#cc0202",
                    strokeDasharray: "9",
                    strokeWidth: 3
                },
                connector: "Umbillical",
                installationAndConstructionVessel: null,
                subseaIntervention: null,
                parameter1: null,
                parameter1: null,
                parameter2: null,
                parameter3: null,
                parameter4: null,
                parameter5: null,
                parameter6: null,
                parameter7: null,
                parameter8: null,
                parameter9: null,
                parameter10: null,
                parameter11: null,
                parameter12: null,
                parameter13: null,
                parameter14: null,
                parameter15: null,
                parameter16: null,
                parameter17: null,
                parameter18: null,
            }
        })

        // to access parameters use model.attributes.attrs[`parameter{Number}`]

        // adding link tools, cant add here
        // var verticesTool = new joint.linkTools.Vertices();
        // var segmentsTool = new joint.linkTools.Segments();
        // var toolsView = new joint.dia.ToolsView({
        //     tools: [
        //         verticesTool,
        //         segmentsTool
        //     ]
        // });
        // var stdLinkView = stdLink.findView(mainPaper);
        // stdLinkView.addTools(toolsView)
        // newLinkView.hideTools();
        return stdLink
    },
    // options: {
    //     defaultRouter: {
    //         name: 'manhattan',
    //         args: {
    //             padding: 10
    //         }
    //     },
    //     defaultConnector: {
    //         name: 'curve',
    //         args: {
    //             cornerType: 'circle',
    //             cornerRadius: 20
    //         }
    //     }
    // },
    cellViewNamespace: namespace,
});

/*
0: RotateControlTool
1-4: ResizeTool
*/
const elementToolsMapping = {
    "subseaSeparator": [RotateToolSubseaSeparator, ResizeToolBottomLeftST, ResizeToolBottomRightST, ResizeToolTopLeftST, ResizeToolTopRightST],
    "subseaPump": [RotateToolSubseaPump, ResizeToolBottomLeftST, ResizeToolBottomRightST, ResizeToolTopLeftST, ResizeToolTopRightST],
    "UTA": [RotateToolUTA, ResizeToolBottomLeftST, ResizeToolBottomRightST, ResizeToolTopLeftST, ResizeToolTopRightST],
    "productionWellST": [RotateToolIWST, ResizeToolBottomLeftST, ResizeToolBottomRightST, ResizeToolTopLeftST, ResizeToolTopRightST],
    "injectionWellST": [RotateToolIWST, ResizeToolBottomLeftST, ResizeToolBottomRightST, ResizeToolTopLeftST, ResizeToolTopRightST],
    "manifold": [RotateToolManifold, ResizeToolBottomLeftST, ResizeToolBottomRightST, ResizeToolTopLeftST, ResizeToolTopRightST],
    "platform": [RotateToolPlatform, ResizeToolBottomLeftST, ResizeToolBottomRightST, ResizeToolTopLeftST, ResizeToolTopRightST]
}

/* POSSIBLE BUG: What is currently happening is, when the user tries to drop the element onto the mainPaper,
no matter which place on the element the user starts the drag, the drop on the mainPaper happens in such a way that
The centre of the element is dropped where your mouse is, even if you started the mouse drag on the edge of the element */
/* Drag and Drop */
toolPaper.on('cell:pointerdown', function (cellView, e, x, y) {
    // console.log(cellView.model.getBBox("deep"))
    $('body').append('<div id="flyPaper" style="position:fixed;z-index:101;opacity:.5;pointer-event:none;"></div>')
    var flyGraph = new joint.dia.Graph
    var flyPaper = new joint.dia.Paper({
        el: $('#flyPaper'),
        model: flyGraph,
        height: 200,
        width: 150,
        interactive: false,
        background: {
            color: "rgba(0,0,0,0)"
        },

    })
    var flyShape = cellView.model.clone()
    var pos = cellView.model.position()
    var offset = {
        x: x - pos.x,
        y: y - pos.y
    };

    flyShape.position(35, 40);
    flyGraph.addCell(flyShape);
    $("#flyPaper").offset({
        left: e.pageX - offset.x - 35,
        top: e.pageY - offset.y - 35
    });
    $('body').on('mousemove.fly', function (e) {
        $("#flyPaper").offset({
            left: e.pageX - offset.x - 35,
            top: e.pageY - offset.y - 35
        });
    });
    /* This was the previously working solution doesnt work for pan or zoom */
    // $('body').on('mouseup.fly', function (e) {
    //     var x = e.pageX;
    //     var y = e.pageY;
    //     var target = mainPaper.$el.offset();

    //     // Check if dropped over the paper
    //     if (
    //         x > target.left &&
    //         x < target.left + mainPaper.$el.width() &&
    //         y > target.top &&
    //         y < target.top + mainPaper.$el.height()
    //     ) {
    //         var droppedElement = flyShape.clone();
    //         droppedElement.position(
    //             x - target.left - offset.x,
    //             y - target.top - offset.y
    //         );
    //         mainGraph.addCell(droppedElement);
    //     }
    //     $('body').off('mousemove.fly').off('mouseup.fly');
    //     flyShape.remove();
    //     $('#flyPaper').remove();
    // });

    /* This works for pan */
    /* ISSUE: Need to figure out how to make the drag and drop work for zoom also */
    $('body').on('mouseup.fly', function (e) {
        var x = e.pageX;
        var y = e.pageY;
        var target = mainPaper.$el.offset();
        var dropPosition = mainPaper.clientToLocalPoint(x - target.left - 35, y - target.top - 20);
        var scale = mainPaper.scale()
        console.log("scale", scale)
        console.log("Height bounding box", 0 - (mainPaper.translate().ty * scale.sy), mainPaper.$el.height() - (mainPaper.translate().ty * scale.sy), "DropPosition:y:", dropPosition.y)
        console.log("Width bounding box", 0 - (mainPaper.translate().tx * scale.sx), mainPaper.$el.width() - (mainPaper.translate().tx * scale.sx), "DropPosition:x:", dropPosition.x)
        //  mainPaper.$el.width() Represents the papers width 
        //  mainPaper.$el.height() Represents the papers height
        if (
            dropPosition.x > 0 - (mainPaper.translate().tx * scale.sx) &&
            dropPosition.x < (mainPaper.$el.width() - mainPaper.translate().tx * scale.sx) &&
            dropPosition.y > 0 - (mainPaper.translate().ty * scale.sy) &&
            dropPosition.y < mainPaper.$el.height() - (mainPaper.translate().ty * scale.sy)
        ) {
            var droppedElement = flyShape.clone();
            droppedElement.position(dropPosition.x, dropPosition.y);
            mainGraph.addCell(droppedElement);
            // Need to find the view of the element and add its corresponding tools
            //find the correct tools
            console.log("HELLO", droppedElement.attributes.type);
            var RotateTool = elementToolsMapping[droppedElement.attributes.type][0]
            var ResizeToolBottomLeft = elementToolsMapping[droppedElement.attributes.type][1]
            var ResizeToolBottomRight = elementToolsMapping[droppedElement.attributes.type][2]
            var ResizeToolTopLeft = elementToolsMapping[droppedElement.attributes.type][3]
            var ResizeToolTopRight = elementToolsMapping[droppedElement.attributes.type][4]

            var EletoolsView = new joint.dia.ToolsView({
                tools: [

                    new RotateTool({ selector: "root" }),
                    new ResizeToolBottomLeft({ selector: 'outline' }),
                    new ResizeToolBottomRight({ selector: 'outline' }),
                    new ResizeToolTopLeft({ selector: 'outline' }),
                    new ResizeToolTopRight({ selector: 'outline' }),

                ],
            });

            var droppedEleView = droppedElement.findView(mainPaper);
            droppedEleView.addTools(EletoolsView);
            droppedEleView.hideTools();
        }

        // Cleanup and remove temporary elements
        $('body').off('mousemove.fly').off('mouseup.fly');
        flyShape.remove();
        $('#flyPaper').remove();
    });
});


const elementSettingsName = document.getElementById('elementName')
const elementSettingsWrapper = document.getElementById('element-settings-wrapper')
// Element selection & highlighting
var selectedCellView = null;
// Adding element highlighting
var mask = joint.highlighters.mask;
mainPaper.on("element:pointerclick", function (cellView) {

    selectedCellView = displayHighlight(cellView, mainGraph, mask, mainPaper)
    populateElementSettings(cellView.model)
    elementSettingsName.innerHTML = `<strong>${selectedCellView.model.attributes.type}</strong>`
    elementSettingsWrapper.classList.add('is-active')
    connectorSettingsWrapper.classList.remove('is-active')

    /* Show element tools */
    cellView.showTools()
});

// Remove element highlighting
mainPaper.on("blank:pointerclick", function () {
    // Remove all Highlighters from all cells
    console.log("remove highlight");
    removeHighlight(mainGraph, mask, mainPaper)
    if (selectedCellView != null) {
        selectedCellView.hideTools()
    }
    selectedCellView = null;
    selectedLinkView = null;
    elementSettingsWrapper.classList.remove('is-active')
    connectorSettingsWrapper.classList.remove('is-active')

});

// mainGraph.on('change:source change:target', function (link) {
//     console.log(link);
// })
// creating a custom button
var selectedLinkView = null;
const connectorSettingsWrapper = document.getElementById('connector-settings-wrapper')
joint.linkTools.showLinkSettings = joint.linkTools.Button.extend({
    name: "show-link-settings",
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
            console.log(linkView.model.attributes.attrs)

            connectorSettingsWrapper.classList.add('is-active')
            populateConnectorSettings(linkView.model)
            elementSettingsWrapper.classList.remove('is-active')
            selectedLinkView = linkView;
            removeHighlight(mainGraph, mask, mainPaper)
        },
    },
});

mainPaper.on('link:mouseenter', (linkView) => {
    if (!linkView.hasTools()) {
        var verticesTool = new joint.linkTools.Vertices();
        // var segmentsTool = new joint.linkTools.Segments();
        var showConnectorSettings = new joint.linkTools.showLinkSettings();

        // var boundaryTool = new joint.linkTools.Boundary();
        console.log((linkView));
        var toolsView = new joint.dia.ToolsView({
            tools: [verticesTool, showConnectorSettings]
        });
        linkView.addTools(toolsView)
    }
    linkView.showTools()
})

mainPaper.on('link:mouseleave', (linkView) => {
    linkView.hideTools()
})

/* Adding logic to popup the element settings table and listen to input changes */
const addElementEventListener = (DOMElement, event) => {
    // event can be ='input' or 'change' 
    // 'input' is for number modification. 'change' is for select box change
    DOMElement.addEventListener(event, () => {
        // change the attributes of the selected cellview
        if (selectedCellView != null) {
            const parameterNumber = DOMElement.id.match(/\d+/g).map(Number)[0];
            selectedCellView.model.attributes.attrs[`parameter${parameterNumber}`] = DOMElement.value;
            console.log(`Changed P${parameterNumber} for ${selectedCellView.model.attributes.type}`);
        }
        else {
            alert("No selected element")
            if (event == 'change') { DOMElement.value = None }
            else {
                DOMElement.value = null
            }
        }
    })
}

addElementEventListener(elementP1, 'input')
addElementEventListener(elementP3, 'input')
addElementEventListener(elementP4, 'input')
addElementEventListener(elementP7, 'input')
addElementEventListener(elementP8, 'input')
addElementEventListener(elementP10, 'input')
addElementEventListener(elementP11, 'input')
addElementEventListener(elementP12, 'input')
addElementEventListener(elementP13, 'input')
addElementEventListener(elementP14, 'input')

addElementEventListener(elementP2, 'change')
addElementEventListener(elementP5, 'change')
addElementEventListener(elementP6, 'change')
addElementEventListener(elementP9, 'change')
addElementEventListener(elementP15, 'change')
addElementEventListener(elementP16, 'change')
addElementEventListener(elementP17, 'change')
addElementEventListener(elementP18, 'change')


const addLinkEventListener = (DOMElement, event) => {
    // event can be ='input' or 'change' 
    // 'input' is for number modification. 'change' is for select box change
    DOMElement.addEventListener(event, () => {
        // change the attributes of the selected cellview
        if (selectedLinkView != null) {
            const parameterNumber = DOMElement.id.match(/\d+/g).map(Number)[0];
            console.log(parameterNumber);
            selectedLinkView.model.attributes.attrs[`parameter${parameterNumber}`] = DOMElement.value;
        }
        else {
            alert("No selected link")
            if (event == 'change') { DOMElement.value = None }
            else {
                DOMElement.value = null
            }
        }
    })
}

addLinkEventListener(connectorP1, 'input')
addLinkEventListener(connectorP3, 'input')
addLinkEventListener(connectorP4, 'input')
addLinkEventListener(connectorP7, 'input')
addLinkEventListener(connectorP8, 'input')
addLinkEventListener(connectorP10, 'input')
addLinkEventListener(connectorP11, 'input')
addLinkEventListener(connectorP12, 'input')
addLinkEventListener(connectorP13, 'input')
addLinkEventListener(connectorP14, 'input')
addLinkEventListener(connectorP2, 'change')
addLinkEventListener(connectorP5, 'change')
addLinkEventListener(connectorP6, 'change')
addLinkEventListener(connectorP9, 'change')
addLinkEventListener(connectorP15, 'change')
addLinkEventListener(connectorP16, 'change')
addLinkEventListener(connectorP17, 'change')
addLinkEventListener(connectorP18, 'change')

var CONNECTOR_ATTRS = {
    "Rigid-Pipeline-PR": {
        stroke: '#02a31d',
        strokeWidth: 3
    },
    "Rigid-Pipeline-WI": {
        stroke: '#0247c7',
        strokeWidth: 3
    },
    "Rigid-Pipeline-GL/GI": {
        stroke: "red",
        strokeWidth: 3
    },
    "Flexible Pipeline-PR": {
        stroke: '#02a31d',
        strokeDasharray: "9",
        strokeWidth: 3
    },
    "Flexible Pipeline-WI": {
        stroke: '#0247c7',
        strokeDasharray: "9",
        strokeWidth: 3
    },
    "Flexible Pipeline-GL/GI": {
        stroke: "#cc0202",
        strokeDasharray: "9",
        strokeWidth: 3
    },
    "Umbillical": {
        stroke: "#000000",
        strokeWidth: 3
    },
    "Hydr-Flying Lead": {
        stroke: "#000000",
        strokeDasharray: "9",
        strokeWidth: 3
    },
    "Rigid-Spool-PR": {
        stroke: '#02a31d',
        strokeWidth: 3
    },
    "Rigid-Spool-WI": {
        stroke: '#0247c7',
        strokeWidth: 3
    },
    "Rigid-Spool-GL/GI": {
        stroke: "#cc0202",
        strokeWidth: 3
    },
    "Flexible-Jumper-PR": {
        stroke: '#02a31d',
        strokeDasharray: "9",
        strokeWidth: 3
    },
    "Flexible-Jumper-WI": {
        stroke: '#0247c7',
        strokeDasharray: "9",
        strokeWidth: 3
    },
    "Flexible-Jumper-GL/GI": {
        stroke: "#cc0202",
        strokeDasharray: "9",
        strokeWidth: 3
    }
}
connector.addEventListener('change', () => {
    if (selectedLinkView != null) {
        selectedLinkView.model.attributes.attrs['connector'] = connector.value;
        /* Insert logic to change connector attributes based on type chosen */
        let model = selectedLinkView.model
        console.log(selectedLinkView.model);
        if (connector.value != 'Rigid-Pipeline-PiP PR') {
            model.attributes.attrs.line["stroke"] = CONNECTOR_ATTRS[connector.value]["stroke"]
            model.attributes.attrs.line["strokeWidth"] = CONNECTOR_ATTRS[connector.value]["strokeWidth"]
            model.attributes.attrs.line["strokeLineJoin"] = null

            if (CONNECTOR_ATTRS[connector.value]["strokeDasharray"]) {
                model.attributes.attrs.line["strokeDasharray"] = CONNECTOR_ATTRS[connector.value]["strokeDasharray"]
            }
            else {
                model.attributes.attrs.line["strokeDasharray"] = null;
            }
        }
        else {
            console.log("Add functionality to change link to rigidpipeline pip pr");
            // const newLink = new RigidPipelinePiP_PR();
            // model.attributes.attrs['central'] = newLink.attributes.attrs['central']
            // model.attributes.attrs['line'] = newLink.attributes.attrs['line']
            // model.attributes.attrs['outline'] = newLink.attributes.attrs['outline']
            // selectedLinkView.model = newLink;
        }
        selectedLinkView.render()
    }
    else {
        alert("No selected link")
    }
})

subseaIntervention.addEventListener('change', () => {
    if (selectedLinkView != null) {
        selectedLinkView.model.attributes.attrs['subseaIntervention'] = subseaIntervention.value;
    }
    else {
        alert("No selected link")
    }
})
installationAndConstructionVessel.addEventListener('change', () => {
    if (selectedLinkView != null) {
        selectedLinkView.model.attributes.attrs['installationAndConstructionVessel'] = installationAndConstructionVessel.value;
    }
    else {
        alert("No selected link")
    }
})



//////////////// copy paste delete /////////////////
var copiedCoordinates = null;
var copiedCellView = null;
// copy
document.addEventListener("keydown", function (event) {
    if (event.keyCode === 67 && event.ctrlKey) {
        if (selectedCellView != null) {
            copiedCoordinates = selectedCellView.getBBox();
            copiedCellView = selectedCellView
        }
        else {
            alert("Nothing selected to be copied")
        }
    }
});

var currentX = null;
var currentY = null;
document.addEventListener('mousemove', (event) => {
    currentX = event.clientX;
    currentY = event.clientY;
})

// paste
document.addEventListener("keydown", function (event) {

    if (event.keyCode === 86 && event.ctrlKey) {
        console.log(event);
        pasteElement(copiedCellView, { x: currentX, y: currentY }, mainGraph, mainPaper)
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


/* Zoom in zoom out */
var currentScale = 1; // Initial scale level
var scaleIncrement = 0.1; // Amount to increment/decrement the scale
$('#zoom-in').click(function () {
    currentScale += scaleIncrement
    mainPaper.scale(currentScale, currentScale)
})

$('#zoom-out').click(function () {
    currentScale -= scaleIncrement
    mainPaper.scale(currentScale, currentScale)
})


/* Paper Panning */
var dragStartPosition = null;
mainPaper.on("blank:pointerdown", function (evt, x, y) {
    var scale = mainPaper.scale()
    dragStartPosition = { x: x * scale.sx, y: y * scale.sy };
})

mainPaper.on("cell:pointerup blank:pointerup", function (cellView, x, y) {
    dragStartPosition = null;
    // console.log(mainPaper.translate())
})

$("#main-paper-div").mousemove(function (event) {
    if (dragStartPosition != null) {
        mainPaper.translate(
            event.offsetX - dragStartPosition.x,
            event.offsetY - dragStartPosition.y);
    }
});
