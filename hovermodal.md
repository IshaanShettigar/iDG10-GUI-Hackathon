### HTML

```
    <div class="tooltip-container hidden" id="tooltip-container-id">
      <span style="font-weight:600; margin-bottom:5px" id="cname">Component Name</span><br>
      <span id="p1">Parameter1:</span><span id="v1">Value11212121</span><br>
      <span id="p2">Parameter2:</span><span id="v2">Value1</span><br>
      <span id="p3">Parameter3:</span><span id="v3">Value1</span><br>
      <span id="p4">Parameter4:</span><span id="v4">Value1</span><br>
      <span id="p5">Parameter5:</span><span id="v5">Value1</span><br>
    </div>
```

### CSS
```
/* on hover behaviour */
.tooltip-container {
  position: fixed;
  /* width: 200px; */
  z-index: 2;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 6px 24px 0px;
  background: #ffffff;
  padding: 10px 10px;
  /* height: 140px; */
}

.tooltip-container span {
  display: inline-block;
  padding: 3px 5px;
}
```

### Javascript

*main.js*

```
/* on hover modal/tooltip */
let hoverContainer = document.getElementById('tooltip-container-id')

let modalCompName = document.getElementById('cname');

let hoverP1 = document.getElementById('p1')
let hoverP2 = document.getElementById('p2')
let hoverP3 = document.getElementById('p3')
let hoverP4 = document.getElementById('p4')
let hoverP5 = document.getElementById('p5')

let hoverV1 = document.getElementById('v1')
let hoverV2 = document.getElementById('v2')
let hoverV3 = document.getElementById('v3')
let hoverV4 = document.getElementById('v4')
let hoverV5 = document.getElementById('v5')


let isHovering = false;
mainPaper.on("element:mouseenter", (cellView, evt) => {
  if (isHovering != true && isHighlighted == false) {
    isHovering = true;
  }
  setTimeout(() => {
    if (isHovering == true) {
      let modelAttrs = cellView.model.attributes.attrs /* There are multiple declarations of modelAttrs will that affect? maybe based on the diff between let and var maybe some problem in the future */
      hoverV1.textContent = modelAttrs["parameter1"]
      hoverV2.textContent = modelAttrs["parameter2"]
      hoverV3.textContent = modelAttrs["parameter3"]
      hoverV4.textContent = modelAttrs["parameter4"]
      hoverV5.textContent = modelAttrs["parameter5"]

      modalCompName.textContent = cellView.model.attributes.type;

      hoverContainer.classList.remove('hidden')

      let hoverX = evt["originalEvent"].clientX + 20;
      let hoverY = evt["originalEvent"].clientY + 20;
      console.log(`HoverX ${hoverX} HoverY ${hoverY} Window Height ${window.innerHeight} Width ${window.innerWidth}`);
      let modelSize = cellView.model.attributes.size;
      // The below if conditions handle the edges of having to display the modal when on the edges of the screen so that the modal is still visible
      if (hoverY + 160 > window.innerHeight) {
        hoverContainer.style.top = `${hoverY - 4 * modelSize.height}px`
        hoverContainer.style.left = `${hoverX}px`
        console.log("on hover hieght exceeded");
      }
      else if (hoverX + 160 > window.innerWidth) {
        hoverContainer.style.top = `${hoverY}px`
        hoverContainer.style.left = `${hoverX - 2.2 * modelSize.width}px`
      }
      else {
        hoverContainer.style.top = `${hoverY}px`
        hoverContainer.style.left = `${hoverX}px`
      }
    }
  }, 500)
  // displayOnHover(cellView, evt)
})

mainPaper.on("element:mouseout", (cellView, evt) => {
  isHovering = false;
  hoverContainer.classList.add('hidden')
})

mainPaper.on("element:pointerdblclick", (cellView, evt) => {
  /* To deal with the on hover MODAL */
  hoverContainer.classList.add('hidden')
  isHovering = false;
  /* -------------------------------- */
})

```

### Code additions
* Controls when to remove the modal
```
/* To deal with the on hover MODAL */
  hoverContainer.classList.add('hidden')
  isHovering = false;
  /* -------------------------------- */
```

This was added in the following places:
1. `element:pointerdown` is fired on the `mainPaper`
2. `blank:pointerclick` is fired on the `mainPaper`
3. `element:pointerclick` is fired on the `mainPaper`

* Added a Global Variable `isHighlighted`
This is to prevent the modal from popping up when the user has the left hand side detailed menu displayed. 

```
let isHighlighted = false;
``` 
It is used in the following places
1. When the `element:pointerclick` event is fired on the `mainPaper`. Code: `isHighlighted = true;`
2. `blank:pointerclick` is fired on the `mainPaper`. Code: `isHighlighted = false;`
