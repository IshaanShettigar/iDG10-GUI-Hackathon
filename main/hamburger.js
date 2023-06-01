import { subseaSeparator, subseaPump, UTA, productionWellST, injectionWellST, manifold, platform } from "./elements.js"


window.onload = () => {

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


    /* Settings Modal  */
    const settingsBtn = document.getElementById("settings-button");
    const settingsModal = document.getElementById("settings-modal");
    const closeModalBtn = document.getElementById("close-modal");
    const modalOverlay = document.getElementById("settings-overlay");

    settingsBtn.addEventListener("click", function () {
        settingsModal.classList.remove("hidden");
        modalOverlay.classList.remove("hidden");

    })

    const closeModal = function () {
        settingsModal.classList.add("hidden");
        modalOverlay.classList.add("hidden");
        subMenuWrap.classList.toggle("open-menu")
    }
    closeModalBtn.addEventListener("click", closeModal)

    /* close the modal if clicked outside the screen */
    modalOverlay.addEventListener("click", closeModal)


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

    const SP = new subseaPump();
    SP.position(40, 130)
    SP.size(60, 60);
    SP.addTo(toolGraph);

    const uta = new UTA()
    uta.position(25, 220)
    uta.size(93, 55)
    uta.addTo(toolGraph)

    const PWST = new productionWellST()
    PWST.position(50, 320)
    PWST.size(50, 50)
    PWST.addTo(toolGraph)

    const PL = new platform()
    PL.position(30, 480);
    PL.size(80, 20)
    PL.addTo(toolGraph)

    const IWST = new injectionWellST();
    IWST.position(50, 585)
    IWST.resize(50, 50)
    IWST.addTo(toolGraph)

    const MANIFOLD = new manifold()
    MANIFOLD.position(38, 695)
    MANIFOLD.resize(70, 35)
    MANIFOLD.addTo(toolGraph)
}

/* Code to highlight active grid color in settings modals */
const color1 = document.getElementById("color1")
const color2 = document.getElementById("color2")
const color3 = document.getElementById("color3")
const color4 = document.getElementById("color4")
const color5 = document.getElementById("color5")


color1.addEventListener("click", function () {
    const activeColor = document.querySelector(".active");
    activeColor.classList.remove("active");
    color1.classList.add("active")
})
color2.addEventListener("click", function () {
    const activeColor = document.querySelector(".active");
    activeColor.classList.remove("active");
    color2.classList.add("active")
})
color3.addEventListener("click", function () {
    const activeColor = document.querySelector(".active");
    activeColor.classList.remove("active");
    color3.classList.add("active")
})
color4.addEventListener("click", function () {
    const activeColor = document.querySelector(".active");
    activeColor.classList.remove("active");
    color4.classList.add("active")
})
