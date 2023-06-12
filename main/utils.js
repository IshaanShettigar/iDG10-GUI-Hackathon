
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

export { displayHighlight, removeHighlight, pasteElement }