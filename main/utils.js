import { ResizeToolBottomLeftFPSO, ResizeToolBottomLeftPLATFORM, ResizeToolBottomLeftPLEM, ResizeToolBottomLeftSS, ResizeToolBottomLeftST, ResizeToolBottomLeftUTA, ResizeToolBottomLeftUTH, ResizeToolBottomRightFPSO, ResizeToolBottomRightPLATFORM, ResizeToolBottomRightPLEM, ResizeToolBottomRightSS, ResizeToolBottomRightST, ResizeToolBottomRightUTA, ResizeToolBottomRightUTH, ResizeToolTopLeftFPSO, ResizeToolTopLeftPLATFORM, ResizeToolTopLeftPLEM, ResizeToolTopLeftSS, ResizeToolTopLeftST, ResizeToolTopLeftUTA, ResizeToolTopLeftUTH, ResizeToolTopRightFPSO, ResizeToolTopRightPLATFORM, ResizeToolTopRightPLEM, ResizeToolTopRightSS, ResizeToolTopRightST, ResizeToolTopRightUTA, ResizeToolTopRightUTH, RotateToolFPSO, RotateToolIWST, RotateToolManifold, RotateToolPLET, RotateToolPlatform, RotateToolSubseaPump, RotateToolSubseaSeparator, RotateToolUTA, getPositionIWST, rotateChildren, setPositionAll } from "./tools.js"

/**
 * This is a mapping that exists to map each element with their corresponding tools.
 * The tools are the same, but the position of the tools varies for every element therefore we made separate tool objects for every element
 */
const elementToolsMapping = {
    "subseaSeparator": [RotateToolSubseaSeparator, ResizeToolBottomLeftSS, ResizeToolBottomRightSS, ResizeToolTopLeftSS, ResizeToolTopRightSS],
    "subseaPump": [RotateToolSubseaPump, ResizeToolBottomLeftST, ResizeToolBottomRightST, ResizeToolTopLeftST, ResizeToolTopRightST],
    "UTA": [RotateToolUTA, ResizeToolBottomLeftUTA, ResizeToolBottomRightUTA, ResizeToolTopLeftUTA, ResizeToolTopRightUTA],
    "productionWellST": [RotateToolIWST, ResizeToolBottomLeftST, ResizeToolBottomRightST, ResizeToolTopLeftST, ResizeToolTopRightST],
    "injectionWellST": [RotateToolIWST, ResizeToolBottomLeftST, ResizeToolBottomRightST, ResizeToolTopLeftST, ResizeToolTopRightST],
    "manifold": [RotateToolManifold, ResizeToolBottomLeftST, ResizeToolBottomRightST, ResizeToolTopLeftST, ResizeToolTopRightST],
    "platform": [RotateToolPlatform, ResizeToolBottomLeftPLATFORM, ResizeToolBottomRightPLATFORM, ResizeToolTopLeftPLATFORM, ResizeToolTopRightPLATFORM],
    "UTH": [RotateToolSubseaSeparator, ResizeToolBottomLeftUTH, ResizeToolBottomRightUTH, ResizeToolTopLeftUTH, ResizeToolTopRightUTH],
    "PLET": [RotateToolPLET, ResizeToolBottomLeftUTH, ResizeToolBottomRightUTH, ResizeToolTopLeftUTH, ResizeToolTopRightUTH],
    "FPSO": [RotateToolFPSO, ResizeToolBottomLeftFPSO, ResizeToolBottomRightFPSO, ResizeToolTopLeftFPSO, ResizeToolTopRightFPSO],
    "PLEM": [RotateToolSubseaSeparator, ResizeToolBottomLeftPLEM, ResizeToolBottomRightPLEM, ResizeToolTopLeftPLEM, ResizeToolTopRightPLEM]
}

/* mainGraph.getCells() gets all the links as well as elements on the mainGraph */
/**
 * This function removes the highlights from all elements and links.
 * @param {joint.dia.Graph} mainGraph main graph object on which all elements and links reside
 * @param {joint.highlighters} mask responsible for a stroke around an arbitrary cell view's SVG node.
 * @param {joint.dia.Paper} mainPaper main paper object on which the main graph is rendered
 */
const removeHighlight = (mainGraph, mask, mainPaper) => {
    mainGraph.getCells().forEach(function (cell) {
        // Additional functionality to hideTools on each cell
        let cellView = cell.findView(mainPaper)
        mask.remove(cellView);
        cellView.hideTools()
    });
}


/**
 * This functions takes as input a cell view and then adds a highlight to it.
 * @param {joint.dia.CellView} cellView the cell view on which to render the highlight (element)
 * @param {joint.dia.Graph} mainGraph main graph object on which all elements and links reside
 * @param {joint.highlighters} mask responsible for a stroke around an arbitrary cell view's SVG node.
 * @param {joint.dia.Paper} mainPaper main paper object on which the main graph is rendered
 * @returns {joint.dia.CellView} The Highlighted cell view (element)
 */
const displayHighlight = (cellView, mainGraph, mask, mainPaper) => {
    // remove highlights for all other elements
    removeHighlight(mainGraph, mask, mainPaper)

    let selectedCellView = cellView;

    mask.remove(cellView);
    // console.log(selectedCellView);
    //add highlight for this element
    mask.add(cellView, "root", "element-highlight", {
        deep: false,
        padding: 10,
        attrs: {
            "stroke": "#FF4365",
            "stroke-width": 2,
            // "stroke-dasharray": "2",
            "stroke-linecap": "square"
        },
    });
    // cellView.showTools() UNCOMMENT LATER
    return selectedCellView
}

/**
 * This functions takes as input a link view and then adds a highlight to it.
 * @param {joint.dia.CellView} linkView the link view on which to render the highlight.
 * @param {joint.dia.Graph} mainGraph main graph object on which all elements and links reside
 * @param {joint.highlighters} mask responsible for a stroke around an arbitrary cell view's SVG node.
 * @param {joint.dia.Paper} mainPaper main paper object on which the main graph is rendered
 * @returns {joint.dia.CellView} The Highlighted link view
 */
const displayLinkHighlight = (linkView, mainGraph, mask, mainPaper) => {
    removeHighlight(mainGraph, mask, mainPaper)
    mask.remove(linkView);
    //add highlight for this link
    mask.add(linkView, "line", "link-highlight", {
        deep: true,
        padding: 2,
        attrs: {
            "stroke": "#FF4365",
            "stroke-width": 2,
            'stroke-linejoin': 'round',
            'stroke-linecap': 'round'
        },
    });
}


/**
 * This function is responsible for pasting the copied element wherever your mouse hovers over the paper.
 * If no element has been copied then it gives an error via an alert message
 * @param {joint.dia.CellView} copiedCellView this is the cellView of the copied element. It will be cloned and pasted wherever the mouse hovers over the paper.
 * @param {Object} copiedCoordinates the mouse hover position.
 * @param {joint.dia.Graph} mainGraph main graph object on which all elements and links reside
 * @param {joint.dia.Paper} mainPaper main paper object on which the main graph is rendered
 */
const pasteElement = (copiedCellView, copiedCoordinates, mainGraph, mainPaper) => {
    if (copiedCellView != null) {
        let createCopy = copiedCellView.model.clone();
        let coordinates = mainPaper.clientToLocalPoint(copiedCoordinates.x, copiedCoordinates.y);
        createCopy.position(
            coordinates.x,
            coordinates.y
        );

        var RotateTool = elementToolsMapping[createCopy.attributes.type][0]
        var ResizeToolBottomLeft = elementToolsMapping[createCopy.attributes.type][1]
        var ResizeToolBottomRight = elementToolsMapping[createCopy.attributes.type][2]
        var ResizeToolTopLeft = elementToolsMapping[createCopy.attributes.type][3]
        var ResizeToolTopRight = elementToolsMapping[createCopy.attributes.type][4]

        var EletoolsView = new joint.dia.ToolsView({
            tools: [

                new RotateTool({ selector: "root" }),
                new ResizeToolBottomLeft({ selector: 'outline' }),
                new ResizeToolBottomRight({ selector: 'outline' }),
                new ResizeToolTopLeft({ selector: 'outline' }),
                new ResizeToolTopRight({ selector: 'outline' }),

            ],
        });

        createCopy.addTo(mainGraph);
        // pasted element to mainGraph
        var pastedEleView = createCopy.findView(mainPaper);
        pastedEleView.addTools(EletoolsView);
        pastedEleView.hideTools();
        // Element Tools loaded for the pasted element
    } else {
        alert("There is nothing to paste, clipboard empty!");
    }
}

/**
 * Function is responsible for adding element tools defined within the function to the element passed in as a parameter
 * @param {joint.dia.Cell} cell element to which tools will be added
 * @param {joint.dia.Paper} mainPaper main paper
 */
function addElementTools(cell, mainPaper) {
    var RotateTool = elementToolsMapping[cell.attributes.type][0]
    var ResizeToolBottomLeft = elementToolsMapping[cell.attributes.type][1]
    var ResizeToolBottomRight = elementToolsMapping[cell.attributes.type][2]
    var ResizeToolTopLeft = elementToolsMapping[cell.attributes.type][3]
    var ResizeToolTopRight = elementToolsMapping[cell.attributes.type][4]

    var EletoolsView = new joint.dia.ToolsView({
        tools: [

            new RotateTool({ selector: "root" }),
            new ResizeToolBottomLeft({ selector: 'outline' }),
            new ResizeToolBottomRight({ selector: 'outline' }),
            new ResizeToolTopLeft({ selector: 'outline' }),
            new ResizeToolTopRight({ selector: 'outline' }),

        ],
    });

    var elementView = cell.findView(mainPaper)
    elementView.addTools(EletoolsView)
    elementView.hideTools()
}

/**
 * function responsible for adding link tools to the link passed in as a cell
 * @param {joint.dia.Cell} cell link
 * @param {joint.dia.Paper} mainPaper main paper 
 * @param {DOM} connectorSettingsWrapper dom element, used in removeTool
 */
function addLinkTools(cell, mainPaper, connectorSettingsWrapper) {
    // load link tools
    var verticesTool = new joint.linkTools.Vertices();
    var targetArrowheadTool = new joint.linkTools.TargetArrowhead({ scale: 0.8 });
    var removeTool = new joint.linkTools.Remove({
        action: function (evt, linkView, toolView) {
            linkView.model.remove({ ui: true, tool: toolView.cid });
            connectorSettingsWrapper.classList.remove('is-active') // if the connector settings is shown then after deleting hide it again
        }
    })
    var showConnectorSettings = new joint.linkTools.showLinkSettings();
    var linkToolsView = new joint.dia.ToolsView({
        tools: [verticesTool, removeTool, showConnectorSettings, targetArrowheadTool]
    });
    var linkView = cell.findView(mainPaper)
    linkView.addTools(linkToolsView)
    linkView.hideTools()
}
/**
 * This function loads the element tools and link tools when a user just uploads the file
 * or when a autosaved file is retrieved from browser local storage.
 * @param {joint.dia.Paper} mainPaper main paper object on which the main graph is rendered
 * @param {joint.dia.Graph} mainGraph main graph object on which all elements and links reside
 */
const addToolsOnFileLoad = (mainPaper, mainGraph, connectorSettingsWrapper) => {
    mainGraph.getCells().forEach(function (cell) {
        // IF The Cell is a Link
        if (cell.isLink()) {
            addLinkTools(cell, mainPaper, connectorSettingsWrapper)
        }
        // If the cell is an element
        else if (cell.isElement()) {
            addElementTools(cell, mainPaper)
        }
    });
}
export { displayHighlight, displayLinkHighlight, removeHighlight, pasteElement, addToolsOnFileLoad, addElementTools, addLinkTools, elementToolsMapping }