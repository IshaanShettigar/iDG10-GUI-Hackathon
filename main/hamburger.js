import { subseaSeparator, subseaPump, UTA, productionWellST, injectionWellST, manifold, platform } from "./elements.js"
import { assignCustomParams } from "./element-attrs.js"
import { saveGraph, openFile } from "./persist.js"
import { displayHighlight, removeHighlight, pasteElement } from "./utils.js"
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

////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
/* Render the toolPaper and toolGraph  */
var namespace = joint.shapes;
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
    linkPinning: false,
    defaultLink: () => { return new joint.shapes.standard.Link() },
    cellViewNamespace: namespace,
});


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
        }

        // Cleanup and remove temporary elements
        $('body').off('mousemove.fly').off('mouseup.fly');
        flyShape.remove();
        $('#flyPaper').remove();
    });
});

var selectedCellView = null;
// Adding element highlighting
var mask = joint.highlighters.mask;
mainPaper.on("element:pointerclick", function (cellView) {

    selectedCellView = displayHighlight(cellView, mainGraph, mask, mainPaper)
    // Checking if the attributes are displayed
    console.log(cellView.model.attributes.attrs)

});

// Remove element highlighting
mainPaper.on("blank:pointerclick", function () {
    // Remove all Highlighters from all cells
    console.log("remove highlight");
    removeHighlight(mainGraph, mask, mainPaper)
    selectedCellView = null;
});

//////////////// copy paste /////////////////
var copiedCoordinates = null;
// copy
document.addEventListener("keydown", function (event) {
    if (event.keyCode === 67 && event.ctrlKey) {
        // console.log("copy");
        // let ele = copyElement(copiedCoordinates, selectedCellView)
        // if (ele) {
        //     copiedCoordinates = ele.copiedCoordinates;
        // }

        if (selectedCellView != null) {
            copiedCoordinates = selectedCellView.getBBox();
        }
        else {
            alert("Nothing selected to be copied")
        }

    }
});

// paste
document.addEventListener("keydown", function (event) {
    if (event.keyCode === 86 && event.ctrlKey) {
        pasteElement(selectedCellView, copiedCoordinates, mainGraph, mainPaper)
        // copiedCoordinates = null;
        // createCopy = null;
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



