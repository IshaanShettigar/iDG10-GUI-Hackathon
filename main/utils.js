import { ResizeToolBottomLeftST, ResizeToolBottomRightST, ResizeToolTopLeftST, ResizeToolTopRightST, RotateToolIWST, RotateToolManifold, RotateToolPlatform, RotateToolSubseaPump, RotateToolSubseaSeparator, RotateToolUTA, getPositionIWST, rotateChildren, setPositionAll } from "./tools.js"

/* mainGraph.getCells() gets all the links as well as elements on the mainGraph */
const removeHighlight = (mainGraph, mask, mainPaper) => {
    mainGraph.getCells().forEach(function (cell) {
        // Additional functionality to hideTools on each cell
        let cellView = cell.findView(mainPaper)
        mask.remove(cellView);
        cellView.hideTools()
    });
}

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
// Ctrl + C
// Function not needed, will remove
// const copyElement = (copiedCoordinates, selectedCellView) => {
//     if (selectedCellView != null) {
//         // Ctrl+C was pressed
//         console.log("Ctrl+C was pressed");
//         console.log(
//             `Cellview to be copied is ${JSON.stringify(
//                 selectedCellView.model
//             )}`
//         );
//         // selectedElementView


//         copiedCoordinates = selectedCellView.getBBox();
//         console.log(
//             `Coordinates where copy occurred is ${copiedCoordinates}`
//         );
//         return { copiedCoordinates }
//     } else {
//         alert("You have not selected an element to copy");
//     }

// }

const pasteElement = (copiedCellView, copiedCoordinates, mainGraph, mainPaper) => {
    if (copiedCellView != null) {
        let createCopy = copiedCellView.model.clone();
        let coordinates = mainPaper.clientToLocalPoint(copiedCoordinates.x, copiedCoordinates.y);
        createCopy.position(
            coordinates.x,
            coordinates.y
        );

        // var addLabelButton = new joint.elementTools.AddLabelButton();
        // var removeButton = new joint.elementTools.Remove();
        // var EletoolsView = new joint.dia.ToolsView({
        //     tools: [
        //         removeButton,
        //         new ResizeTool({ selector: "outline" }),
        //         addLabelButton,
        //     ],
        // });

        createCopy.addTo(mainGraph);
        console.log("pasted element to mainGraph");
        // var copyView = createCopy.findView(mainPaper);
        // copyView.addTools(EletoolsView);
        // console.log("Added elementTools to the new element");
        // copyView.hideTools();
        // createCopy = null;
        // copiedCoordinates = null;
        // console.log("copy == null");
    } else {
        alert("There is nothing to paste, clipboard empty!");
    }
}

const elementToolsMapping = {
    "subseaSeparator": [RotateToolSubseaSeparator, ResizeToolBottomLeftST, ResizeToolBottomRightST, ResizeToolTopLeftST, ResizeToolTopRightST],
    "subseaPump": [RotateToolSubseaPump, ResizeToolBottomLeftST, ResizeToolBottomRightST, ResizeToolTopLeftST, ResizeToolTopRightST],
    "UTA": [RotateToolUTA, ResizeToolBottomLeftST, ResizeToolBottomRightST, ResizeToolTopLeftST, ResizeToolTopRightST],
    "productionWellST": [RotateToolIWST, ResizeToolBottomLeftST, ResizeToolBottomRightST, ResizeToolTopLeftST, ResizeToolTopRightST],
    "injectionWellST": [RotateToolIWST, ResizeToolBottomLeftST, ResizeToolBottomRightST, ResizeToolTopLeftST, ResizeToolTopRightST],
    "manifold": [RotateToolManifold, ResizeToolBottomLeftST, ResizeToolBottomRightST, ResizeToolTopLeftST, ResizeToolTopRightST],
    "platform": [RotateToolPlatform, ResizeToolBottomLeftST, ResizeToolBottomRightST, ResizeToolTopLeftST, ResizeToolTopRightST],
    "UTH": [RotateToolSubseaSeparator, ResizeToolBottomLeftST, ResizeToolBottomRightST, ResizeToolTopLeftST, ResizeToolTopRightST],
    "PLET": [RotateToolSubseaSeparator, ResizeToolBottomLeftST, ResizeToolBottomRightST, ResizeToolTopLeftST, ResizeToolTopRightST]
}

const addToolsOnFileLoad = (mainPaper, mainGraph) => {
    console.log("in addTools");

    var verticesTool = new joint.linkTools.Vertices();
    var removeTool = new joint.linkTools.Remove({
        action: function (evt, linkView, toolView) {
            linkView.model.remove({ ui: true, tool: toolView.cid });
            connectorSettingsWrapper.classList.remove('is-active') // if the connector settings is shown then after deleting hide it again
        }
    })
    // var segmentsTool = new joint.linkTools.Segments();
    var showConnectorSettings = new joint.linkTools.showLinkSettings();
    // var boundaryTool = new joint.linkTools.Boundary();
    var linkToolsView = new joint.dia.ToolsView({
        tools: [verticesTool, removeTool, showConnectorSettings]
    });
    console.log("Cells ", mainGraph.getCells())
    mainGraph.getCells().forEach(function (cell) {
        console.log("HI");
        // IF The Cell is a Link
        if (cell.isLink()) {
            // load link tools
            var verticesTool = new joint.linkTools.Vertices();
            var removeTool = new joint.linkTools.Remove({
                action: function (evt, linkView, toolView) {
                    linkView.model.remove({ ui: true, tool: toolView.cid });
                    connectorSettingsWrapper.classList.remove('is-active') // if the connector settings is shown then after deleting hide it again
                }
            })
            var showConnectorSettings = new joint.linkTools.showLinkSettings();
            var linkToolsView = new joint.dia.ToolsView({
                tools: [verticesTool, removeTool, showConnectorSettings]
            });
            var linkView = cell.findView(mainPaper)
            linkView.addTools(linkToolsView)
            console.log(cell);
        }
        // If the cell is an element
        else if (cell.isElement()) {
            // load element tools
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
    });
}
export { displayHighlight, displayLinkHighlight, removeHighlight, pasteElement, addToolsOnFileLoad }