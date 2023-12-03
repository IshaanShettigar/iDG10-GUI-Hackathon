import $ from 'jquery';
import _ from 'lodash';
import * as joint from 'jointjs';
import * as XLSX from 'xlsx';
import { subseaSeparator, subseaPump, UTA, productionWellST, injectionWellST, manifold, platform, UTH, PLET, FPSO, PLEM } from "./elements.js"
import { addElementEventListener2, assignCustomParams, createParameterHTML, resetParameterHTML } from "./element-attrs.js"
import { saveGraph, openFile, fixFormat, saveImage } from "./persist.js"
import { displayHighlight, removeHighlight, pasteElement, addToolsOnFileLoad, elementToolsMapping, addElementTools, addlinkTools } from "./utils.js"
import { showLinkSettings } from "./showLinkSettings.js"
import { selectedLinkView, setSelectedLinkView } from './selectedLinkView.js';
import JSONData from './element_and_link_details.json' assert { type: 'json' };

/** Defining fsm global variable for element undo redo */
let STATE = 0;

/**
 * Restores progress from the previous session by making use of browser local storage
 */
window.onload = () => {
  const localStorageGraph = localStorage.getItem('recentGraph')
  if (localStorageGraph) {
    // console.log(localStorageGraph);
    mainGraph.fromJSON(JSON.parse(localStorageGraph));
    /* Need to load all the tools */
    addToolsOnFileLoad(mainPaper, mainGraph, connectorSettingsWrapper)
  }
}

/* Left Hamburger Menu */
let subMenuWrap = document.getElementById("sub-menu-wrap")
let menuButton = document.getElementById("burger-button")

menuButton.addEventListener("click", () => {
  subMenuWrap.classList.toggle("open-menu")
})

/* Right hand side element toolbar menu */
let elementButton = document.getElementById('element-button')
let elementMenuWrap = document.getElementById('element-menu-wrap')
// Got rid of pinning functionality
// let pinButton = document.getElementById('pin-button');

// var isPinned = false;
// pinButton.addEventListener("click", () => {
//   if (isPinned == false) {
//     pinButton.classList.add("is-active");
//     isPinned = true;
//   }
//   else {
//     pinButton.classList.remove("is-active");
//     isPinned = false;
//   }
// })

elementButton.addEventListener("click", () => {
  elementMenuWrap.classList.toggle("is-active");
  elementButton.classList.toggle("is-active");

})

const saveDiagramButton = document.getElementById('save-file')
// save diagram
saveDiagramButton.addEventListener('click', () => { saveGraph(mainGraph) });

const saveAsPNGButton = document.getElementById('save-as-png')
saveAsPNGButton.addEventListener('click', () => {
  saveImage(mainPaper.svg, 'Diagram', "png", "#ffffff")
}) // not working as of 18th June

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
  if (selectBox.value == "None") {
    mainPaper.clearGrid()
  }
  else {
    if (selectBox.value == 'doubleMesh') {
      mainPaper.setGrid(selectBox.value).drawGrid([{ color: '#c4c4c4' }, {
        color: '#9e9e9e'
      }]);
    }
    else {
      mainPaper.setGrid(selectBox.value).drawGrid();
    }
  }
})

/* GRID SIZE IS defined below grid */

const clearCanvas = document.getElementById("clear-paper");
const clearCanvasModal = document.getElementById("clear-background-modal")
const closeClearCanvasModalBtn = document.getElementById("close-modal-bg")
const confirmClearBG = document.getElementById("confirm-clear-bg")
const cancelClearBG = document.getElementById("cancel-clear-bg")

clearCanvas.addEventListener("click", function () {
  clearCanvasModal.classList.remove("hidden");
  modalOverlay.classList.remove("hidden");
  localStorage.removeItem('recentGraph')
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
  connectorSettingsWrapper.classList.remove('is-active')
  elementSettingsWrapper.classList.remove('is-active')
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

// /* Help */
// const helpButton = document.getElementById('help')
// /**
//  * Function to open up the documentation generated by jsdocs in a new tab.
//  * It is triggered when the user clicks on help in the hamburger menu
//  */
// function redirectToDocumentation() {
//   const newA = document.createElement('a')
//   newA.href = "/docs";
//   newA.target = '_blank';
//   newA.click()
//   newA.remove()
// }
// helpButton.addEventListener('click', redirectToDocumentation)

/////////// Bill Of Material //////////////////
function openBOMModal() {
  const BOMModal = document.getElementById('bom-modal');
  BOMModal.style.display = 'block';
  createTable();
}

function closeBOMModal() {
  const BOMModal = document.getElementById('bom-modal');
  BOMModal.style.display = 'none';
}
document.getElementById('X').addEventListener('click', closeBOMModal)


/**
 * Function called when user tries to print bill of material of components as CSV
 */
function downloadComponentCSV() {
  const componentTable = document.getElementById('component-bom-table');

  const tables = [
    { table: componentTable, filename: 'componentTable.csv', headers: ['Type', 'Parameter1', 'Parameter2', 'Parameter3', 'Parameter4', 'Parameter5', 'Parameter6', 'Parameter7', 'Parameter8', 'Parameter9', 'Parameter10', 'Parameter11', 'Parameter12', 'Parameter13', 'Parameter14', 'Parameter15', 'Parameter16', 'Parameter17', 'Parameter18'] },
  ];

  for (const { table, filename, headers } of tables) {
    console.log(({ table, filename, headers }));
    const typeRows = table.getElementsByClassName('typeRow');
    let csvContent = '';

    // Add the headers to the CSV content
    csvContent += headers.join(',') + '\n';

    // Iterate over the type rows and extract the data
    for (let i = 0; i < typeRows.length; i++) {
      const cells = typeRows[i].getElementsByTagName('td');
      const type = cells[0].textContent.trim(); // Get the 'Type' from the first td
      const nestedTable = cells[1].getElementsByTagName('table')[0]; // Get the nested table from the second td
      const nestedRows = nestedTable.getElementsByTagName('tr');
      let row = type + ','; // Start the row with the 'Type'

      // Iterate over the nested rows and cells to extract the data
      for (let j = 0; j < nestedRows.length; j++) {
        const nestedCells = nestedRows[j].getElementsByTagName('td');
        const data = nestedCells[1].textContent.trim(); // Get the data from the second td
        row += data + ','; // Add the data to the row
      }

      // Remove the trailing comma from the row
      row = row.slice(0, -1);

      // Add the row to the CSV content
      csvContent += row + '\n';
    }


    // Create a Blob with the CSV content
    const blob = new Blob([csvContent], { type: 'text/csv' });

    // Create a temporary link element and trigger the download
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  }
}


/**
 * Function called when user tries to print bill of material of connectors as CSV
 */
function downloadConnectorCSV() {
  const connectorTable = document.getElementById('connector-bom-table');

  const tables = [
    { table: connectorTable, filename: 'connectorTable.csv', headers: ['Type', 'Parameter1', 'Parameter2', 'Parameter3', 'Parameter4', 'Parameter5', 'Parameter6', 'Parameter7', 'Parameter8', 'Parameter9', 'Parameter10', 'Parameter11', 'Parameter12', 'Parameter13', 'Parameter14', 'Parameter15', 'Parameter16', 'Parameter17', 'Parameter18', 'Subsea Intervention', 'Installation & Construction Vessel'] }
  ];

  for (const { table, filename, headers } of tables) {
    console.log(({ table, filename, headers }));
    const typeRows = table.getElementsByClassName('typeRow');
    let csvContent = '';

    // Add the headers to the CSV content
    csvContent += headers.join(',') + '\n';

    // Iterate over the type rows and extract the data
    for (let i = 0; i < typeRows.length; i++) {
      const cells = typeRows[i].getElementsByTagName('td');
      const type = cells[0].textContent.trim(); // Get the 'Type' from the first td
      const nestedTable = cells[1].getElementsByTagName('table')[0]; // Get the nested table from the second td
      const nestedRows = nestedTable.getElementsByTagName('tr');
      let row = type + ','; // Start the row with the 'Type'

      // Iterate over the nested rows and cells to extract the data
      for (let j = 0; j < nestedRows.length; j++) {
        const nestedCells = nestedRows[j].getElementsByTagName('td');
        const data = nestedCells[1].textContent.trim(); // Get the data from the second td
        row += data + ','; // Add the data to the row
      }

      // Remove the trailing comma from the row
      row = row.slice(0, -1);

      // Add the row to the CSV content
      csvContent += row + '\n';
    }


    // Create a Blob with the CSV content
    const blob = new Blob([csvContent], { type: 'text/csv' });

    // Create a temporary link element and trigger the download
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  }
}

/**
 * Function called when user tries to print bill of material of components as XLSX
 */
function generateExcelForComponents() {
  // Group cells by 'sub-type'
  const groupedCells = mainGraph.getCells().reduce((groups, cell) => {
    if (cell.isLink()) return groups;
    const subType = cell.attributes.type;
    groups[subType] = groups[subType] || [];
    groups[subType].push(cell);
    return groups;
  }, {});

  // Create a workbook
  const wb = XLSX.utils.book_new();


  // Process each group and generate Excel file
  for (const subType in groupedCells) {
    // Use JSONData for the headers and use the cell attributes for the values
    const updatedFields = [];
    JSONData.forEach((data) => {
      if (data['sub-type'] === subType) {
        data['fields'].forEach((field) => {
          updatedFields.push(field['label'])
        })
      }
    })

    const groupData = groupedCells[subType].map(cell => ({
      'sub-type': subType,
      'fields': updatedFields.reduce((fields, field) => {
        fields[field] = cell.attributes.attrs[field];
        return fields;
      }, {})
    }));

    const wsData = [];

    // Add headers for the 'fields' properties
    const fieldHeaders = Object.keys(groupData[0].fields);
    wsData.push(fieldHeaders);

    // Add values for each row
    groupData.forEach(data => {
      const fieldValues = Object.values(data.fields);
      wsData.push(fieldValues);
    });

    // Create worksheet
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    XLSX.utils.book_append_sheet(wb, ws, subType);
  }

  // Save the workbook
  XLSX.writeFile(wb, `Component-BOM.xlsx`);
}

/**
 * Function called when user tries to print bill of material of connectors as XLSX
 */
function generateExcelForConnectors() {
  // Group cells by 'sub-type'
  const groupedCells = mainGraph.getCells().reduce((groups, cell) => {
    if (!cell.isLink()) return groups;
    const subType = cell.attributes.type;
    groups[subType] = groups[subType] || [];
    groups[subType].push(cell);
    return groups;
  }, {});

  // Create a workbook
  const wb = XLSX.utils.book_new();


  // Process each group and generate Excel file
  for (const subType in groupedCells) {
    // Use JSONData for the headers and use the cell attributes for the values
    const updatedFields = [];
    JSONData.forEach((data) => {
      if (data['sub-type'] === subType) {
        data['fields'].forEach((field) => {
          updatedFields.push(field['label'])
        })
      }
    })

    console.log(updatedFields)

    const groupData = groupedCells[subType].map(cell => ({
      'sub-type': subType,
      'fields': updatedFields.reduce((fields, field) => {
        fields[field] = cell.attributes.attrs[field];
        return fields;
      }, {})
    }));

    console.log(groupData)

    const wsData = [];

    // Add headers for the 'fields' properties
    const fieldHeaders = Object.keys(groupData[0].fields);
    wsData.push(fieldHeaders);

    // Add values for each row
    groupData.forEach(data => {
      const fieldValues = Object.values(data.fields);
      wsData.push(fieldValues);
    });

    // Create worksheet
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    XLSX.utils.book_append_sheet(wb, ws, subType);
  }

  // Save the workbook
  XLSX.writeFile(wb, `Connector-BOM.xlsx`);
}

/**
 * Function called when user clicks on print bill of material
 */
function printTable() {
  const componentTable = document.getElementById('component-bom-table').outerHTML;
  const connectorTable = document.getElementById('connector-bom-table').outerHTML;
  // const bomModalContentDIV = document.getElementById('bom-modal-content')
  // Create a new window for the printable content
  const printWindow = window.open('', '_blank');
  printWindow.document.open();

  // Generate the printable HTML content
  const htmlContent = `
<html>
<head>
  <title>Printable Table</title>
  <style>
  #component-bom-table,
  #connector-bom-table {
      width: 100%;
      border-collapse: collapse;
      font-family: Arial;
      border: 4px solid black;
      /* margin: 5px 5px 5px 0px; */
  }
  
  th,
  td {
      padding: 3px;
      text-align: left;
      border-bottom: 1px solid #ddd;
  }
  
  th {
      font-weight: bold;
  }
  
  .typeRow {
      border: 4px solid #000000;
  }
  
  .inner-table {
      width: 97.5%;
      margin: 10px;
      border: 2px solid black;
  }
  
  .type-td {
      font-size: 25px;
      text-align: center;
      font-weight: 600;
  }
  </style>
</head>
<body>
<h3>Component - Bill of Material</h3>
${componentTable}
<h3>Connector - Bill of Material</h3>
${connectorTable}
</body>
</html>
`;

  // Write the HTML content to the print window and close it
  printWindow.document.write(htmlContent);
  printWindow.document.close();

  // Print the window
  printWindow.print();
}

/**
 * Function to create the bill of material table based on the contents of the mainGraph
 */
function createTable() {
  const componentTable = document.getElementById('component-bom-table');
  const connectorTable = document.getElementById('connector-bom-table')

  // Clear the table
  componentTable.innerHTML = '';
  connectorTable.innerHTML = '';

  // Create table header row
  const headerRow = document.createElement('tr');
  const headerRow2 = document.createElement('tr')
  headerRow.setAttribute('id', 'header-row')
  headerRow2.setAttribute('id', 'header-row')
  const headerFields = ['Type', 'Attributes'];

  headerFields.forEach(field => {
    const th = document.createElement('th');
    th.textContent = field;
    headerRow.appendChild(th);
    headerRow2.appendChild(th)
  });

  // Append the header row to the table
  componentTable.appendChild(headerRow2);
  connectorTable.appendChild(headerRow)

  /* Now lets work with the body of the table */
  mainGraph.getCells().forEach(function (cell) {
    const row = document.createElement('tr');
    row.classList.add('typeRow')
    if (cell.isLink()) {
      const typeCell = document.createElement('td');
      typeCell.classList.add('type-td')
      // console.log("Connector Type:", cell.attributes.attrs.connector);
      typeCell.textContent = cell.attributes.attrs.connector
      row.appendChild(typeCell);
      const tdSubTable = document.createElement('td')
      const subTable = document.createElement('table')
      subTable.classList.add('inner-table')
      for (let i = 1; i <= 18; i += 1) {
        const subRow = document.createElement('tr')
        const parameterName = document.createElement('td')
        const parameterValue = document.createElement('td');
        parameterName.textContent = `Parameter${i}`
        parameterValue.textContent = cell.attributes.attrs[`parameter${i}`]
        subRow.appendChild(parameterName)
        subRow.appendChild(parameterValue)
        subTable.appendChild(subRow)
        // console.log(`parameter${i}: ${cell.attributes.attrs[`parameter${i}`]}`);
      }
      // Adding subsea internvetion
      const si = document.createElement('tr')
      const siKey = document.createElement('td')
      siKey.textContent = 'Subsea Intervention'
      const siValue = document.createElement('td')
      siValue.textContent = cell.attributes.attrs['subseaIntervention']
      si.appendChild(siKey)
      si.appendChild(siValue)
      subTable.appendChild(si)

      // adding installation and construction vessel
      const icv = document.createElement('tr')
      const icvKey = document.createElement('td')
      icvKey.textContent = 'Installation & Construction Vessel'
      const icvValue = document.createElement('td')
      icvValue.textContent = cell.attributes.attrs['installationAndConstructionVessel']
      icv.appendChild(icvKey)
      icv.appendChild(icvValue)
      subTable.appendChild(icv)
      tdSubTable.appendChild(subTable)
      row.appendChild(tdSubTable)
      connectorTable.appendChild(row);
      // console.log("Subsea Intervention: ", cell.attributes.attrs['subseaIntervention']);
      // console.log("Installation & Contruction Vessel: ", cell.attributes.attrs['installationAndConstructionVessel']);
    }
    else {
      const typeCell = document.createElement('td');
      typeCell.classList.add('type-td')
      // console.log("Component Type:", cell.attributes.type);
      typeCell.textContent = cell.attributes.type
      row.appendChild(typeCell);
      const tdSubTable = document.createElement('td')
      const subTable = document.createElement('table')
      subTable.classList.add('inner-table')

      // New Parameter Info (Phase3.1 code)
      /* Get the cell type, match it with the element_and_link_details.json Get all the parameters 
      from there and match to the element object, then print accordingly */

      JSONData.forEach((data) => {
        if (data['sub-type'] === cell.attributes.type) {

          data['fields'].forEach((field) => {
            const subRow = document.createElement('tr')
            const parameterName = document.createElement('td')
            const parameterValue = document.createElement('td');

            parameterName.textContent = field['label']
            parameterValue.textContent = cell.attributes.attrs[field['label']]

            subRow.appendChild(parameterName)
            subRow.appendChild(parameterValue)
            subTable.appendChild(subRow)
          })

        }
      })

      // PHASE 2 CODE
      // for (let i = 1; i <= 18; i += 1) {
      //   const subRow = document.createElement('tr')
      //   const parameterName = document.createElement('td')
      //   const parameterValue = document.createElement('td');
      //   parameterName.textContent = `Parameter${i}`
      //   parameterValue.textContent = cell.attributes.attrs[`parameter${i}`]
      //   subRow.appendChild(parameterName)
      //   subRow.appendChild(parameterValue)
      //   subTable.appendChild(subRow)
      //   // console.log(`parameter${i}: ${cell.attributes.attrs[`parameter${i}`]}`);
      // }
      tdSubTable.appendChild(subTable)
      row.appendChild(tdSubTable)
      componentTable.appendChild(row);
    }
  })
}

const generateBOMButton = document.getElementById('generate-bom')
const downloadComponentCSVButton = document.getElementById('download-component-csv')
const downloadConnectorCSVButton = document.getElementById('download-connector-csv')
const printBOMButton = document.getElementById('print-bom')

generateBOMButton.addEventListener('click', openBOMModal)
downloadComponentCSVButton.addEventListener('click', generateExcelForComponents)
downloadConnectorCSVButton.addEventListener('click', generateExcelForConnectors)
printBOMButton.addEventListener('click', printTable)



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
const connectionShape = document.getElementById('connection-shape')
const connectorRouter = document.getElementById('connector-router')

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
export { mapping }

const getDOMInputNodes = (choice) => {
  if (choice == "element") {
    var childrenArr = document.getElementById('element-settings').childNodes
  }
  else {
    var childrenArr = document.getElementById('connector-settings').childNodes
  }
  // This array will hold all the input elements that I need to populate (i.e the inputs and select)
  let inputArray = []
  console.log(childrenArr)
  for (let i = 0; i < childrenArr.length; i++) {
    if (childrenArr[i].querySelector('input')) {
      inputArray.push(childrenArr[i].querySelector('input'))
    }

    if (childrenArr[i].querySelector('select')) {
      inputArray.push(childrenArr[i].querySelector('select'))
    }

  }
  return inputArray;
}


/**
 * function is called when element is clicked on so that the pop up that appears on the left hand side of the screen displays the
 * correct values for its parameters. It fetches the parameters from the model object and displays it on the menu on the left hand side
 * of the screen
 * @param {joint.dia.Element} model 
 */
export const populateElementSettings = (model) => {

  console.log(`Populating ${model.attributes.type}`)
  let modelAttrs = model.attributes.attrs

  if (model.isElement()) { var inputArray = getDOMInputNodes("element"); }

  if (model.isLink()) { var inputArray = getDOMInputNodes("link") }


  // Now that we have the required DOMElements in the inputArray let us traverse the array and attach event listeners.
  inputArray.forEach((DOMinput) => {
    DOMinput.value = modelAttrs[DOMinput.id]
  })
  console.log(inputArray);
  // for (let i = 1; i <= 18; i++) {
  //   // if (modelAttrs[`parameter${i}`] != null) {
  //   // copy to elementsettings
  //   mapping[`parameter${i}`][0].value = modelAttrs[`parameter${i}`]
  //   // }
  // }

}




/* Connector Settings */
/**
 * Analogous to the populateElementSettings function, except it populates all link parameters
 * @param {joint.dia.Link} model 
 */
export const populateConnectorSettings = (model) => {
  // console.log(model)
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
  connectionShape.value = model.attributes.connector["name"]
  connectorRouter.value = model.attributes.router["name"]
}


/* Creating the custom rigid pipelinepip - pr link  */
/* Didnt have to do this for the other links as their properties are simpler */
/**
 * Link definition for RigidPipeline PiP PR
 */
const RigidPipelinePiP_PR = joint.dia.Link.define('RigidPipelinePiP_PR', {
  router: { name: 'normal' },
  connector: { name: 'curve' },
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

// Link definition for Elect Flying Lead
const electFlyingLead = joint.dia.Link.define('electFlyingLead', {
  router: { name: 'normal' },
  connector: { name: 'rounded' },
  attrs: {
    line: {
      connection: true,
      stroke: 'white',
      strokeWidth: 8,
      strokeLinejoin: 'round',

    },
    outline: {
      connection: true,
      stroke: 'black',
      strokeWidth: 12,
      strokeLinejoin: 'round',
      strokeDasharray: 8
    },
    central2: {
      connection: true,
      stroke: 'green',
      strokeWidth: 4,
      strokeLinejoin: 'round',
      strokeDasharray: '6 5'
    },
    central: {
      connection: true,
      stroke: 'red',
      strokeWidth: 3,
      strokeLinejoin: 'round',
      strokeDasharray: '10 1'
    },
    connector: "Elect-Flying-Lead",
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
  },

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
  },
  {
    tagName: 'path',
    selector: 'central2',
    attributes: {
      'fill': 'none'
    }
  },]
});

////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
/* Render the toolPaper and toolGraph  */
var namespace = {
  ...joint.shapes, RigidPipelinePiP_PR, electFlyingLead, subseaSeparator, subseaPump, UTA, productionWellST, injectionWellST, manifold, platform, UTH, PLET, FPSO, PLEM
}
/**
 * Graph object for the element tool bar on the right hand side
 */
var toolGraph = new joint.dia.Graph({}, { cellNamespace: namespace });
/**
 * Paper object for the element tool bar on the right hand side
 */
var toolPaper = new joint.dia.Paper({
  el: document.getElementById('tool-paper-div'),
  model: toolGraph,
  width: 158,
  height: 1300,
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
// console.log(SS);

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
PL.size(100, 25)
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

const uth = new UTH();
uth.position(15, 765);
uth.resize(140, 82)
uth.addTo(toolGraph)
assignCustomParams(uth)

const plet = new PLET();
plet.position(10, 850);
plet.resize(140, 82)
plet.addTo(toolGraph)
assignCustomParams(plet)

const fpso = new FPSO()
fpso.position(32, 1000)
fpso.resize(100, 35)
fpso.addTo(toolGraph)
assignCustomParams(fpso)

const plem = new PLEM()
plem.position(50, 1100)
plem.resize(65, 65)
plem.addTo(toolGraph)
assignCustomParams(plem)

/**
 * Function that defines the standard link and its associated properties
 * @returns {joint.dia.Link} Standard Link 
 */
const standardLink = () => {
  var stdLink = new joint.shapes.standard.Link({
    router: { name: 'normal' },
    connector: { name: 'rounded' },
    attrs: {
      line: {
        stroke: "#000000",
        strokeWidth: 3
      },
      connector: "Umbillical",
      installationAndConstructionVessel: 'S-Lay',
      subseaIntervention: 'GRP-covers',
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
  return stdLink
}
/* Create the main paper and graph */
const GRID_SIZE = 5;
const GRID_NAME = "fixedDot";

/**
 * renders the main graph object for the main infinite diagramming space.
 */
export var mainGraph = new joint.dia.Graph({}, { cellNamespace: namespace });

/**
 * renders the main paper object for the main infinite diagramming space.
 */
export var mainPaper = new joint.dia.Paper({
  el: document.getElementById('main-paper-div'),
  model: mainGraph,
  width: window.innerWidth,
  height: window.innerHeight,
  gridSize: GRID_SIZE,
  drawGrid: { name: GRID_NAME },
  background: {
    color: "rgba(255,255,255,1)"
  },
  snapLabels: true,
  interactive: {
    linkMove: true,
    labelMove: true,
    arrowheadMove: true,
    vertexMove: true,
    vertexAdd: true,
    vertexRemove: true,
    uselinkTools: true,
  },
  linkPinning: true,
  defaultLink: () => {
    return standardLink()
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
  validateConnection: function (cellViewS, magnetS, cellViewT, magnetT, end, linkView) {
    if (cellViewS === cellViewT) return false;

    if (magnetS === magnetT) return false;

    return true;
  },
});
mainPaper.options.connectionStrategy = joint.connectionStrategies.pinAbsolute;

// changing grid size in the settings modal
const gridSizeInput = document.getElementById('grid-size')
gridSizeInput.value = GRID_SIZE
gridSizeInput.addEventListener("change", function () {
  mainPaper.setGridSize(gridSizeInput.value)
  mainPaper.drawGrid() // maybe this line is not needed
})


/*
0: RotateControlTool
1-4: ResizeTool
*/
// const elementToolsMapping = {
//     "subseaSeparator": [RotateToolSubseaSeparator, ResizeToolBottomLeftST, ResizeToolBottomRightST, ResizeToolTopLeftST, ResizeToolTopRightST],
//     "subseaPump": [RotateToolSubseaPump, ResizeToolBottomLeftST, ResizeToolBottomRightST, ResizeToolTopLeftST, ResizeToolTopRightST],
//     "UTA": [RotateToolUTA, ResizeToolBottomLeftST, ResizeToolBottomRightST, ResizeToolTopLeftST, ResizeToolTopRightST],
//     "productionWellST": [RotateToolIWST, ResizeToolBottomLeftST, ResizeToolBottomRightST, ResizeToolTopLeftST, ResizeToolTopRightST],
//     "injectionWellST": [RotateToolIWST, ResizeToolBottomLeftST, ResizeToolBottomRightST, ResizeToolTopLeftST, ResizeToolTopRightST],
//     "manifold": [RotateToolManifold, ResizeToolBottomLeftST, ResizeToolBottomRightST, ResizeToolTopLeftST, ResizeToolTopRightST],
//     "platform": [RotateToolPlatform, ResizeToolBottomLeftST, ResizeToolBottomRightST, ResizeToolTopLeftST, ResizeToolTopRightST],
//     "UTH": [RotateToolSubseaSeparator, ResizeToolBottomLeftST, ResizeToolBottomRightST, ResizeToolTopLeftST, ResizeToolTopRightST],
//     "PLET": [RotateToolSubseaSeparator, ResizeToolBottomLeftST, ResizeToolBottomRightST, ResizeToolTopLeftST, ResizeToolTopRightST],
//     "FPSO": [RotateToolSubseaSeparator, ResizeToolBottomLeftST, ResizeToolBottomRightST, ResizeToolTopLeftST, ResizeToolTopRightST],
//     "PLEM": [RotateToolSubseaSeparator, ResizeToolBottomLeftST, ResizeToolBottomRightST, ResizeToolTopLeftST, ResizeToolTopRightST]
// }

/* POSSIBLE BUG: What is currently happening is, when the user tries to drop the element onto the mainPaper,
no matter which place on the element the user starts the drag, the drop on the mainPaper happens in such a way that
The centre of the element is dropped where your mouse is, even if you started the mouse drag on the edge of the element */

/* Drag and Drop */
/**
 * Event listener for element drag and drop from the tool paper onto the main paper
 */
toolPaper.on('cell:pointerdown', function (cellView, e, x, y) {
  // console.log(cellView.model.getBBox("deep"))
  $('body').append('<div id="flyPaper" style="position:fixed;z-index:101;opacity:.5;pointer-event:none;"></div>')
  var flyGraph = new joint.dia.Graph
  /**
   * Create a flyPaper, this represents the paper that the element will reside in while it is being dragged
   */
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
    // if (
    //     dropPosition.x > 0 - (mainPaper.translate().tx * scale.sx) &&
    //     dropPosition.x < (mainPaper.$el.width() - mainPaper.translate().tx * scale.sx) &&
    //     dropPosition.y > 0 - (mainPaper.translate().ty * scale.sy) &&
    //     dropPosition.y < mainPaper.$el.height() - (mainPaper.translate().ty * scale.sy)
    // ) {
    var droppedElement = flyShape.clone(); console.log(droppedElement)
    droppedElement.position(dropPosition.x, dropPosition.y);
    mainGraph.addCell(droppedElement);
    // Need to find the view of the element and add its corresponding tools
    //find the correct tools
    // console.log("HELLO", droppedElement.attributes.type);
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
    // }

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

let isHighlighted = false;

mainPaper.on("element:pointerclick", function (cellView) {
  console.log(cellView.model)
  isHighlighted = true;
  /* To deal with the on hover MODAL */
  hoverContainer.classList.add('hidden')
  isHovering = false;
  /* -------------------------------- */
  resetParameterHTML()
  selectedCellView = displayHighlight(cellView, mainGraph, mask, mainPaper)
  createParameterHTML(cellView.model)
  populateElementSettings(cellView.model)
  // elementSettingsName.innerHTML = `<strong>${selectedCellView.model.attributes.type}</strong>`
  elementSettingsWrapper.classList.add('is-active')
  connectorSettingsWrapper.classList.remove('is-active')

  /* Show element tools */
  cellView.showTools()
});

// Remove element highlighting
mainPaper.on("blank:pointerclick", function () {
  /* To deal with the on hover MODAL */
  hoverContainer.classList.add('hidden')
  isHovering = false;
  /* -------------------------------- */

  isHighlighted = false;
  // Reset the Element Parameter Settings
  resetParameterHTML()
  // Remove all Highlighters from all cells
  console.log("remove highlight");
  removeHighlight(mainGraph, mask, mainPaper)
  if (selectedCellView != null) {
    selectedCellView.hideTools()
  }
  selectedCellView = null;
  setSelectedLinkView(null)
  elementSettingsWrapper.classList.remove('is-active')
  connectorSettingsWrapper.classList.remove('is-active')
  subMenuWrap.classList.remove('open-menu')
});

const connectorSettingsWrapper = document.getElementById('connector-settings-wrapper')

/**
 * @constant {joint.dia.linkTools} showLinkSettings
 * Defines the button that will trigger the connector settings popup on the left hand side when clicked
 */
// var showLinkSettings = joint.linkTools.Button.extend({
//   name: "show-link-settings",
//   options: {
//     markup: [
//       {
//         tagName: "circle",
//         selector: "outer",
//         attributes: {
//           r: 9,
//           fill: "#ffffff",
//           cursor: "pointer",
//         },
//       },
//       {
//         tagName: "circle",
//         selector: "button",
//         attributes: {
//           r: 7,
//           fill: "#000000",
//           cursor: "pointer",
//         },
//       },
//       {
//         tagName: "path",
//         selector: "icon",
//         attributes: {
//           d: "M -2 4 2 4 M 0 3 0 0 M -2 -1 1 -1 M -1 -4 1 -4",
//           fill: "none",
//           stroke: "#FFFFFF",
//           "stroke-width": 2,
//           "pointer-events": "none",
//         },
//       },
//     ],
//     distance: "50%",
//     offset: 0,
//     action: function (evt, linkView, buttonView) {
//       // console.log(linkView.model.attributes.attrs)
//       connectorSettingsWrapper.classList.add('is-active')
//       populateConnectorSettings(linkView.model)
//       elementSettingsWrapper.classList.remove('is-active')
//       selectedLinkView = linkView;
//       removeHighlight(mainGraph, mask, mainPaper)
//       // highlight the link
//       displayLinkHighlight(linkView, mainGraph, mask, mainPaper)
//     },
//   },
// });

const appendDefaultLabels = function (linkView) {
  const linkModel = linkView.model
  if (linkView.model.labels().length == 0) {
    linkModel.appendLabel({
      markup: [
        {
          tagName: 'image',
          selector: 'label'
        },
        {
          tagName: 'rect',
          selector: 'body'
        },
      ],
      // no `size` object provided = calc() operations need `ref` property
      attrs: {
        label: {
          yAlignment: 'middle',
          pointerEvents: 'none',
          width: '5%',
          height: '5%',
          "href": "./icons/S-Lay.png",
        },
        body: {
          // calc() is responsive to size of 'label':
          // ref: 'label',
          fill: 'rgba(0,0,0,0)',
          stroke: 'none',
          height: '25px',
          width: '70px',
          y: '-11px'
        }
      },
      position: {
        distance: 0.50,
        offset: -25,
        args: {
          keepGradient: true,
          ensureLegibility: true
        }
      }
    });

    // subsea intervention
    linkModel.appendLabel({
      markup: [
        {
          tagName: 'image',
          selector: 'label'
        },
        {
          tagName: 'rect',
          selector: 'body'
        },
      ],
      // no `size` object provided = calc() operations need `ref` property
      attrs: {
        label: {
          yAlignment: 'middle',
          pointerEvents: 'none',
          height: '6%',
          width: '6%',
          "href": "./icons/GRP-covers.png"
        },
        body: {
          // calc() is responsive to size of 'label':
          // ref: 'label',
          fill: 'rgba(0,0,0,0)',
          stroke: 'none',
          height: '25px',
          width: '70px',
          y: '-11px'
        }
      },
      position: {
        distance: 0.65,
        offset: 25,
        args: {
          keepGradient: true,
          ensureLegibility: true
        }
      }
    });
  }
}

// Function created in phase 3.1
const addLinkToolsNew = function (linkView) {
  linkView.removeTools() // remove tools first, since tools change if connected to an element or a link this is needed.

  var verticesTool = new joint.linkTools.Vertices();
  var targetArrowheadTool = new joint.linkTools.TargetArrowhead({ scale: 0.8 });
  var targetAnchorTool = new joint.linkTools.TargetAnchor();


  var removeTool = new joint.linkTools.Remove({
    action: function (evt, linkView, toolView) {
      linkView.model.remove({ ui: true, tool: toolView.cid });
      connectorSettingsWrapper.classList.remove('is-active') // if the connector settings is shown then after deleting hide it again
    }
  })
  // var segmentsTool = new joint.linkTools.Segments();
  var showConnectorSettings = new showLinkSettings();
  // var boundary Tool = new joint.linkTools.Boundary();

  // PHase3.1 If connected to another link then display the targetAnchorTool as well
  // const sourceType = linkView.sourceView.model.attributes.type
  // const targetType = linkView.targetView.model.attributes.type
  if (linkView.targetView != null && (linkView.targetView.model.attributes.type === "standard.Link" || linkView.targetView.model.attributes.type === "RigidPipelinePiP_PR")) {
    var linkToolsView = new joint.dia.ToolsView({
      tools: [verticesTool, removeTool, showConnectorSettings, targetArrowheadTool, targetAnchorTool]
    });
  }
  else {
    var linkToolsView = new joint.dia.ToolsView({
      tools: [verticesTool, removeTool, showConnectorSettings, targetArrowheadTool]
    });
  }
  linkView.addTools(linkToolsView)
  appendDefaultLabels(linkView)
}
mainPaper.on('link:connect', (linkView, evt, elementViewConnected, magnet) => {

  /**
   *  The code below is used to add link tools, but this has since been moved to the mainGraph.on('add') event
   * 
   */
  addLinkToolsNew(linkView)
  // linkView.removeTools() // remove tools first, since tools change if connected to an element or a link this is needed.

  // var verticesTool = new joint.linkTools.Vertices();
  // var targetArrowheadTool = new joint.linkTools.TargetArrowhead({ scale: 0.8 });
  // var targetAnchorTool = new joint.linkTools.TargetAnchor();


  // var removeTool = new joint.linkTools.Remove({
  //   action: function (evt, linkView, toolView) {
  //     linkView.model.remove({ ui: true, tool: toolView.cid });
  //     connectorSettingsWrapper.classList.remove('is-active') // if the connector settings is shown then after deleting hide it again
  //   }
  // })
  // // var segmentsTool = new joint.linkTools.Segments();
  // var showConnectorSettings = new showLinkSettings();
  // // var boundaryTool = new joint.linkTools.Boundary();

  // // PHase3.1 If connected to another link then display the targetAnchorTool as well
  // const sourceType = linkView.sourceView.model.attributes.type
  // const targetType = linkView.targetView.model.attributes.type
  // console.log(sourceType, targetType);
  // if (targetType === "standard.Link" || targetType === "RigidPipelinePiP_PR") {
  //   var linkToolsView = new joint.dia.ToolsView({
  //     tools: [verticesTool, removeTool, showConnectorSettings, targetArrowheadTool, targetAnchorTool]
  //   });
  // }
  // else {
  //   var linkToolsView = new joint.dia.ToolsView({
  //     tools: [verticesTool, removeTool, showConnectorSettings, targetArrowheadTool]
  //   });
  // }
  // linkView.addTools(linkToolsView)
  // appendDefaultLabels(linkView)

})

mainPaper.on('link:mouseenter', (linkView) => {
  linkView.showTools()
})

mainPaper.on('link:mouseleave', (linkView) => {
  linkView.hideTools()
})

mainPaper.on('link:pointerup', (linkView, evt, x, y) => {
  addLinkToolsNew(linkView)
})

/* Adding logic to popup the element settings table and listen to input changes */
/**
 * Adds event listeners to all the inputs on the element pop-up on the left hand side of the screen
 * event can either be an 'input' (for the numbered parameters) or 'change' (for the select box parameters)
 * @param {DOM} DOMElement 
 * @param {String} event 
 */
// const addElementEventListener = (DOMElement, event) => {
//   // event can be ='input' or 'change' 
//   // 'input' is for number modification. 'change' is for select box change
//   DOMElement.addEventListener(event, () => {
//     // change the attributes of the selected cellview
//     if (selectedCellView != null) {
//       const parameterNumber = DOMElement.id.match(/\d+/g).map(Number)[0];
//       selectedCellView.model.attributes.attrs[`parameter${parameterNumber}`] = DOMElement.value;
//       console.log(`Changed P${parameterNumber} for ${selectedCellView.model.attributes.type}`);
//     }
//     else {
//       // alert("No selected element")
//       if (event == 'change') { DOMElement.value = "None" }
//       else {
//         DOMElement.value = null
//       }
//     }
//   })
// }

// addElementEventListener(elementP1, 'input')
// addElementEventListener(elementP3, 'input')
// addElementEventListener(elementP4, 'input')
// addElementEventListener(elementP7, 'input')
// addElementEventListener(elementP8, 'input')
// addElementEventListener(elementP10, 'input')
// addElementEventListener(elementP11, 'input')
// addElementEventListener(elementP12, 'input')
// addElementEventListener(elementP13, 'input')
// addElementEventListener(elementP14, 'input')

// addElementEventListener(elementP2, 'change')
// addElementEventListener(elementP5, 'change')
// addElementEventListener(elementP6, 'change')
// addElementEventListener(elementP9, 'change')
// addElementEventListener(elementP15, 'change')
// addElementEventListener(elementP16, 'change')
// addElementEventListener(elementP17, 'change')
// addElementEventListener(elementP18, 'change')


/**
 * Adds event listeners to all the inputs on the Link pop-up on the left hand side of the screen
 * event can either be an 'input' (for the numbered parameters) or 'change' (for the select box parameters)
 * @param {DOM} DOMElement 
 * @param {String} event 
 */
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
      // alert("No selected link 1")
      if (event == 'change') { DOMElement.value = "None" }
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

/**
 * Specifies the attributes for each connector. 
 * Example: Rigid-Pipeline-PR is a green line with a strokeWidth of 3
 */
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
  "Flexible-Pipeline-PR": {
    stroke: '#02a31d',
    strokeDasharray: "9",
    strokeWidth: 3
  },
  "Flexible-Pipeline-WI": {
    stroke: '#0247c7',
    strokeDasharray: "9",
    strokeWidth: 3
  },
  "Flexible-Pipeline-GL/GI": {
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
    strokeWidth: 3,
    router: 'manhattan'
  },
  "Rigid-Spool-WI": {
    stroke: '#0247c7',
    strokeWidth: 3,
    router: 'manhattan'
  },
  "Rigid-Spool-GL/GI": {
    stroke: "#cc0202",
    strokeWidth: 3,
    router: 'manhattan'
  },
  "Flexible-Jumper-PR": {
    stroke: '#02a31d',
    strokeDasharray: "9",
    strokeWidth: 3,
    router: 'manhattan'
  },
  "Flexible-Jumper-WI": {
    stroke: '#0247c7',
    strokeDasharray: "9",
    strokeWidth: 3,
    router: 'manhattan'
  },
  "Flexible-Jumper-GL/GI": {
    stroke: "#cc0202",
    strokeDasharray: "9",
    strokeWidth: 3,
    router: 'manhattan'
  },
  "Rigid-PT-Riser-PR": {
    stroke: '#02a31d',
    strokeWidth: 3
  },
  "Rigid-PT-Riser-WI": {
    stroke: '#0247c7',
    strokeWidth: 3
  },
  "Rigid-PT-Riser-GL/GI": {
    stroke: "red",
    strokeWidth: 3
  },
  "Flexible-PT-Riser-PR": {
    stroke: '#02a31d',
    strokeDasharray: "9",
    strokeWidth: 3
  },
  "Flexible-PT-Riser-WI": {
    stroke: '#0247c7',
    strokeDasharray: "9",
    strokeWidth: 3
  },
  "Flexible-PT-Riser-GL/GI": {
    stroke: "#cc0202",
    strokeDasharray: "9",
    strokeWidth: 3
  },
  "Rigid-SCR-PR": {
    stroke: '#02a31d',
    strokeWidth: 3,
    connectorShape: 'curve'
  },
  "Rigid-SCR-WI": {
    stroke: '#0247c7',
    strokeWidth: 3,
    connectorShape: 'curve'
  },
  "Rigid-SCR-GL/GI": {
    stroke: "#cc0202",
    strokeWidth: 3,
    connectorShape: 'curve'
  },
  "Flexible-Riser-PR": {
    stroke: '#02a31d',
    strokeDasharray: "9",
    strokeWidth: 3,
    connectorShape: 'curve'
  },
  "Flexible-Riser-WI": {
    stroke: '#0247c7',
    strokeDasharray: "9",
    strokeWidth: 3,
    connectorShape: 'curve'
  },
  "Flexible-Riser-GL/GI": {
    stroke: '#cc0202',
    strokeDasharray: "9",
    strokeWidth: 3,
    connectorShape: 'curve'
  }
}

/**
 * It uses the global variable selectedLinkView and CONNECTOR_ATTRS as well as the RigidPipeline Pip PR if it is required. 
 * It handles all the logic necessary to change the link attributes based on the value specified by the user
 */
export function onConnectorChange(connector, installationAndConstructionVessel, subseaIntervention) {
  if (selectedLinkView != null) {
    selectedLinkView.model.attributes.attrs['connector'] = connector.value;
    /* Insert logic to change connector attributes based on type chosen */
    let model = selectedLinkView.model
    console.log("LINK MODEL", model);
    if (model.attributes.type == "RigidPipelinePiP_PR") { // changing from rigidpipeline pip to normal std.link or elect-flying-lead
      // create new instacne of std link and remove the old link
      console.log(`Changing from RigidPipelinePiP_PR to ${connector.value}`);
      if (connector.value === "Elect-Flying-Lead") {
        //changing from rigidpipelinepip-pr to electflyinglead
        console.log("WORK IN PROGRESS, CHANGING FROM PIP PR TO ELECT FLYING LEAD")
      }
      else {
        const newLink = standardLink();
        newLink.source(model.attributes.source)
        newLink.target(model.attributes.target)
        newLink.attributes.vertices = model.attributes.vertices
        newLink.addTo(mainGraph)
        for (let i = 1; i <= 18; i += 1) {
          newLink.attributes.attrs[`parameter${i}`] = model.attributes.attrs[`parameter${i}`]
        }
        newLink.attributes.attrs['subseaIntervention'] = model.attributes.attrs['subseaIntervention']
        newLink.attributes.attrs['installationAndConstructionVessel'] = model.attributes.attrs['installationAndConstructionVessel']
        newLink.attributes.connector["name"] = model.attributes.connector["name"]
        newLink.attributes.router["name"] = model.attributes.router["name"]

        model.remove()
        setSelectedLinkView(newLink.findView(mainPaper))

        /* Add the default labels to the link */
        appendDefaultLabels(selectedLinkView)
        /* To add the same labels as before */
        selectedLinkView.model.label(0, {
          attrs: {
            label: {
              height: '5%',
              width: '5%',
              "href": `./icons/${installationAndConstructionVessel.value}.png`
            },
          }
        })
        selectedLinkView.model.label(1, {
          attrs: {
            label: {
              height: '5%',
              width: '5%',
              "href": `./icons/${subseaIntervention.value}.png`
            },
          }
        })
        model = selectedLinkView.model
        /* Add the Tools to the new link */
        var verticesTool = new joint.linkTools.Vertices();
        var removeTool = new joint.linkTools.Remove({
          action: function (evt, linkView, toolView) {
            linkView.model.remove({ ui: true, tool: toolView.cid });
            connectorSettingsWrapper.classList.remove('is-active') // if the connector settings is shown then after deleting hide it again
          }
        })
        var targetArrowheadTool = new joint.linkTools.TargetArrowhead({ scale: 0.8 });
        var targetAnchorTool = new joint.linkTools.TargetAnchor();
        // var segmentsTool = new joint.linkTools.Segments();
        var showConnectorSettings = new showLinkSettings();
        // var boundaryTool = new joint.linkTools.Boundary();
        var linkToolsView = new joint.dia.ToolsView({
          tools: [verticesTool, removeTool, showConnectorSettings, targetArrowheadTool, targetAnchorTool]
        });
        selectedLinkView.addTools(linkToolsView)
      }
    }
    if (model.attributes.type == "electFlyingLead") {
      console.log("Changing from Elect Flying lead to normal link");
      const newLink = standardLink();
      newLink.source(model.attributes.source)
      newLink.target(model.attributes.target)
      newLink.attributes.vertices = model.attributes.vertices
      newLink.addTo(mainGraph)
      for (let i = 1; i <= 18; i += 1) {
        newLink.attributes.attrs[`parameter${i}`] = model.attributes.attrs[`parameter${i}`]
      }
      newLink.attributes.attrs['subseaIntervention'] = model.attributes.attrs['subseaIntervention']
      newLink.attributes.attrs['installationAndConstructionVessel'] = model.attributes.attrs['installationAndConstructionVessel']
      newLink.attributes.connector["name"] = model.attributes.connector["name"]
      newLink.attributes.router["name"] = model.attributes.router["name"]

      model.remove()
      setSelectedLinkView(newLink.findView(mainPaper))

      /* Add the default labels to the link */
      appendDefaultLabels(selectedLinkView)
      /* To add the same labels as before */
      selectedLinkView.model.label(0, {
        attrs: {
          label: {
            height: '5%',
            width: '5%',
            "href": `./icons/${installationAndConstructionVessel.value}.png`
          },
        }
      })
      selectedLinkView.model.label(1, {
        attrs: {
          label: {
            height: '5%',
            width: '5%',
            "href": `./icons/${subseaIntervention.value}.png`
          },
        }
      })
      model = selectedLinkView.model
      /* Add the Tools to the new link */
      var verticesTool = new joint.linkTools.Vertices();
      var removeTool = new joint.linkTools.Remove({
        action: function (evt, linkView, toolView) {
          linkView.model.remove({ ui: true, tool: toolView.cid });
          connectorSettingsWrapper.classList.remove('is-active') // if the connector settings is shown then after deleting hide it again
        }
      })
      var targetArrowheadTool = new joint.linkTools.TargetArrowhead({ scale: 0.8 });
      var targetAnchorTool = new joint.linkTools.TargetAnchor();
      // var segmentsTool = new joint.linkTools.Segments();
      var showConnectorSettings = new showLinkSettings();
      // var boundaryTool = new joint.linkTools.Boundary();
      var linkToolsView = new joint.dia.ToolsView({
        tools: [verticesTool, removeTool, showConnectorSettings, targetArrowheadTool, targetAnchorTool]
      });
      selectedLinkView.addTools(linkToolsView)
    }
    if (connector.value != 'Rigid-Pipeline-PiP PR' && connector.value != 'Elect-Flying-Lead') {
      console.log("HELLO", model.attributes.attrs.line, CONNECTOR_ATTRS[connector.value], connector.value);
      model.attributes.attrs.line["stroke"] = CONNECTOR_ATTRS[connector.value]["stroke"]
      model.attributes.attrs.line["strokeWidth"] = CONNECTOR_ATTRS[connector.value]["strokeWidth"]
      model.attributes.attrs.line["strokeLineJoin"] = null
      // displayLinkHighlight(selectedLinkView, mainGraph, mask, mainPaper)

      if (CONNECTOR_ATTRS[connector.value]["strokeDasharray"]) {
        model.attributes.attrs.line["strokeDasharray"] = CONNECTOR_ATTRS[connector.value]["strokeDasharray"]
      }
      else {
        model.attributes.attrs.line["strokeDasharray"] = null;
      }

      if (CONNECTOR_ATTRS[connector.value]["router"]) {
        model.router(CONNECTOR_ATTRS[connector.value]["router"])
        // populateConnectorSettings(model)
        populateElementSettings(model) //test, its the same function
      }
      else {
        model.router("normal")
        // populateConnectorSettings(model)
        populateElementSettings(model)
      }

      if (CONNECTOR_ATTRS[connector.value]["connectorShape"]) {
        model.connector(CONNECTOR_ATTRS[connector.value]["connectorShape"])
      }
      else {
        model.connector("rounded")
      }
    }
    else if (connector.value === 'Rigid-Pipeline-PiP PR') {
      const newLink = new RigidPipelinePiP_PR();
      newLink.source(model.attributes.source)
      newLink.target(model.attributes.target)

      newLink.attributes.vertices = model.attributes.vertices

      newLink.addTo(mainGraph)
      // copy the selectedLinkView.models attributes to the new rigid Pips link

      for (let i = 1; i <= 18; i += 1) {
        newLink.attributes.attrs[`parameter${i}`] = model.attributes.attrs[`parameter${i}`]
      }

      newLink.attributes.attrs['subseaIntervention'] = model.attributes.attrs['subseaIntervention']
      newLink.attributes.attrs['installationAndConstructionVessel'] = model.attributes.attrs['installationAndConstructionVessel']
      newLink.attributes.connector["name"] = model.attributes.connector["name"]
      newLink.attributes.router["name"] = model.attributes.router["name"]
      console.log(newLink);
      console.log(model);
      model.remove()

      setSelectedLinkView(newLink.findView(mainPaper))

      appendDefaultLabels(selectedLinkView)
      /* To add the same labels as before */
      selectedLinkView.model.label(0, {
        attrs: {
          label: {
            height: '5%',
            width: '5%',
            "href": `./icons/${installationAndConstructionVessel.value}.png`
          },
        }
      })
      selectedLinkView.model.label(1, {
        attrs: {
          label: {
            height: '5%',
            width: '5%',
            "href": `./icons/${subseaIntervention.value}.png`
          },
        }
      })
      /* Add the Tools to the new link */
      var verticesTool = new joint.linkTools.Vertices();
      var removeTool = new joint.linkTools.Remove({
        action: function (evt, linkView, toolView) {
          linkView.model.remove({ ui: true, tool: toolView.cid });
          connectorSettingsWrapper.classList.remove('is-active') // if the connector settings is shown then after deleting hide it again
        }
      })
      // var segmentsTool = new joint.linkTools.Segments();
      var showConnectorSettings = new showLinkSettings();
      var targetArrowheadTool = new joint.linkTools.TargetArrowhead({ scale: 0.8 });
      var targetAnchorTool = new joint.linkTools.TargetAnchor();
      // var boundaryTool = new joint.linkTools.Boundary();
      var linkToolsView = new joint.dia.ToolsView({
        tools: [verticesTool, removeTool, showConnectorSettings, targetArrowheadTool]
      });
      selectedLinkView.addTools(linkToolsView)
    }
    else if (connector.value === 'Elect-Flying-Lead') {
      const newLink = new electFlyingLead();
      newLink.source(model.attributes.source)
      newLink.target(model.attributes.target)
      newLink.attributes.vertices = model.attributes.vertices
      newLink.addTo(mainGraph)
      // copy the selectedLinkView.models attributes to the new elect flying lead

      for (let i = 1; i <= 18; i += 1) {
        newLink.attributes.attrs[`parameter${i}`] = model.attributes.attrs[`parameter${i}`]
      }
      newLink.attributes.attrs['subseaIntervention'] = model.attributes.attrs['subseaIntervention']
      newLink.attributes.attrs['installationAndConstructionVessel'] = model.attributes.attrs['installationAndConstructionVessel']
      newLink.attributes.connector["name"] = model.attributes.connector["name"]
      newLink.attributes.router["name"] = model.attributes.router["name"]

      console.log(newLink);
      console.log(model);
      model.remove()
      setSelectedLinkView(newLink.findView(mainPaper))

      appendDefaultLabels(selectedLinkView)
      /* To add the same labels as before */
      selectedLinkView.model.label(0, {
        attrs: {
          label: {
            height: '5%',
            width: '5%',
            "href": `./icons/${installationAndConstructionVessel.value}.png`
          },
        }
      })
      selectedLinkView.model.label(1, {
        attrs: {
          label: {
            height: '5%',
            width: '5%',
            "href": `./icons/${subseaIntervention.value}.png`
          },
        }
      })
      /* Add the Tools to the new link */
      var verticesTool = new joint.linkTools.Vertices();
      var removeTool = new joint.linkTools.Remove({
        action: function (evt, linkView, toolView) {
          linkView.model.remove({ ui: true, tool: toolView.cid });
          connectorSettingsWrapper.classList.remove('is-active') // if the connector settings is shown then after deleting hide it again
        }
      })
      var targetArrowheadTool = new joint.linkTools.TargetArrowhead({ scale: 0.8 });
      var targetAnchorTool = new joint.linkTools.TargetAnchor();
      // var segmentsTool = new joint.linkTools.Segments();
      var showConnectorSettings = new showLinkSettings();
      // var boundaryTool = new joint.linkTools.Boundary();
      var linkToolsView = new joint.dia.ToolsView({
        tools: [verticesTool, removeTool, showConnectorSettings, targetAnchorTool, targetArrowheadTool]
      });
      selectedLinkView.addTools(linkToolsView)
    }
    selectedLinkView.render()
  }
  else {
    alert("No selected link 2")
  }
}

// Adds an event listener to the connector input on the link parameters pop-up on the left hand side of the screen
// connector.addEventListener('change', onConnectorChange)

export const subseaInterventionCallback = (subseaIntervention) => {
  if (selectedLinkView != null) {
    selectedLinkView.model.attributes.attrs['subseaIntervention'] = subseaIntervention.value;
    selectedLinkView.model.label(1, {
      attrs: {
        label: {
          height: '5%',
          width: '5%',
          "href": `./icons/${subseaIntervention.value}.png`
        },
      }
    })
  }
  else {
    alert("No selected link 3")
  }
}

export const installVesselCallback = (installationAndConstructionVessel) => {
  if (selectedLinkView != null) {
    selectedLinkView.model.attributes.attrs['installationAndConstructionVessel'] = installationAndConstructionVessel.value;
    selectedLinkView.model.label(0, {
      attrs: {
        label: {
          height: '5%',
          width: '5%',
          "href": `./icons/${installationAndConstructionVessel.value}.png`
        },
      }
    })
  }
  else {
    alert("No selected link 4")
  }
}


connectionShape.addEventListener('change', function () {
  if (selectedLinkView != null) {
    selectedLinkView.model.attributes.connector["name"] = connectionShape.value
    selectedLinkView.render()
  }
  else {
    alert("No selected link 5")
  }
})

connectorRouter.addEventListener('change', function () {
  if (selectedLinkView != null) {
    selectedLinkView.model.attributes.router["name"] = connectorRouter.value
    selectedLinkView.render()
  }
  else {
    alert("No selected link 6")
  }
})

// mainPaper.on('link:connect', (linkView, evt, elementViewConnected, magnet) => {
//     let srcPoint = linkView.model.getSourcePoint();
//     let targetPoint = linkView.model.getTargetPoint();
//     let sx = srcPoint.x
//     let sy = srcPoint.y
//     let tx = targetPoint.x
//     let ty = targetPoint.y
// })


// open file //
const openFileButton = document.getElementById('open-file')

// file open
openFileButton.addEventListener('click', (event) => {
  // dynamically create 
  var inputElement = document.createElement('input');
  inputElement.type = 'file';
  inputElement.addEventListener('change', async function (event) {
    // Call the openFile function with the selected file and the mainGraph argument
    await openFile(event, mainGraph);
    // Remove the input element after the file has been selected
    inputElement.remove();
    // Add the tools to all the elements and links
    addToolsOnFileLoad(mainPaper, mainGraph, connectorSettingsWrapper)
    console.log("populated tools");
  });
  // Simulate a click event on the input element
  inputElement.click();
});

/**
 * Saves the diagram to browser local storage in case the user doesnt want to lose progress
 * after accidentally closing the tab etc.
 */
function saveToBrowserLocalStorage() {
  var graphjson = mainGraph.toJSON();
  // console.log(graphjson);
  var fixedGraphJson = fixFormat(graphjson)
  localStorage.setItem('recentGraph', JSON.stringify(fixedGraphJson))
}

mainGraph.on('change', (cell) => {
  saveToBrowserLocalStorage()
  // console.log("Saved to local storage", fixedGraphJson);
})

mainGraph.on('add', (cell) => {
  saveToBrowserLocalStorage()

  // WILL DELETE
  // undo record 
  // undoJSON = {
  //     "type": "cell:add",
  //     "cell": cell
  // }
  // undoStack.push(Object.assign({}, undoJSON))


  // Code to add link tools to a cell if it is a link (DEPRECATED)
  // if (cell.isLink()) {
  //   var linkView = cell.findView(mainPaper)
  //   // console.log(linkView);

  //   // addLinkToolsNew(linkView)
  // }
})

mainGraph.on('remove', (cell) => {
  // adding some logic for undo redo
  saveToBrowserLocalStorage()
  undoJSON = {
    "type": "cell:remove",
    "cell": cell
  }
  undoStack.push(Object.assign({}, undoJSON))
  console.log("Pushed onto stack ", undoJSON["type"]);
  console.log("The Stack", undoStack)
})

var undoStack = []
var undoJSON = {
  type: "",
}
/**
 *  let us define custom JSON to deal w undoredo
 *  {   
 *      type: "element:move",
 *      oldPosition : ------,
 *      newPosition : ------,
 *  }
    {   
 *      type: "element:add",
 *      element : ------,
 *  }
 */

mainPaper.on('element:pointerdown', (cellView) => {
  /* To deal with the on hover MODAL */
  hoverContainer.classList.add('hidden')
  isHovering = false;
  /* -------------------------------- */
  if (STATE == 0) {
    STATE = 1;
    undoJSON["oldPosition"] = cellView.model.position()
  }
})

mainGraph.on('change:position', (element, newPos) => {
  if (STATE == 1) {
    STATE = 2;
  }
})

mainPaper.on('element:pointerup', (cellView, evt, x, y) => {
  if (STATE == 2) {
    STATE = 3; // not needed but lets keep it for FSM clarity.
    // add it to the undo stack
    undoJSON["type"] = 'element:move'
    undoJSON["newPosition"] = cellView.model.position()
    undoJSON["element"] = cellView.model;

    // creating a copy so we push the copy and not a pointer
    undoStack.push(Object.assign({}, undoJSON))
    console.log("Pushed onto stack ", undoJSON["type"]);
    console.log("The Stack", undoStack)
    STATE = 0
  }
  else {
    STATE = 0;
  }
})

function undo() {
  if (undoStack.length > 0) {
    let tempJSON = undoStack.pop()
    console.log("tempJSON used to UNDO", tempJSON);
    // check type of event 
    // undoing an element move
    if (tempJSON["type"] == "element:move") {
      let tempModel = tempJSON["element"]
      tempModel.position(tempJSON["oldPosition"].x, tempJSON["oldPosition"].y)
    }
    // undoing a remove element or remove link
    else if (tempJSON["type"] == "cell:remove") {
      let tempModel = tempJSON["cell"]
      tempModel.addTo(mainGraph)
      if (tempModel.isElement()) {
        addElementTools(tempModel, mainPaper)
      }
      else if (tempModel.isLink()) {
        addlinkTools(tempModel, mainPaper, connectorSettingsWrapper)
      }
    }
    // undoing an add element
    else if (tempJSON["type"] == "element:add") {
      let tempModel = tempJSON["element"]
      tempModel.remove()
    }
  }
  else {
    alert("Undo Stack Empty")
  }
}
// UNDO HANDLER
document.addEventListener('keydown', function (event) {
  // Check if Control key (ctrlKey) and 'Z' key (keyCode 90) are pressed simultaneously
  if (event.ctrlKey && event.keyCode === 90) {
    // Control + Z combination detected
    undo()
  }
});
//////////////// copy paste delete /////////////////


// var copiedCoordinates = null;
var copiedCellView = null;
// copy
document.addEventListener("keydown", function (event) {
  if (event.keyCode === 67 && event.ctrlKey) {
    if (selectedCellView != null) {
      // copiedCoordinates = selectedCellView.getBBox();
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
    const pastedElement = pasteElement(copiedCellView, { x: currentX, y: currentY }, mainGraph, mainPaper)

    // support to undo paste
    undoJSON = {
      "type": "element:add",
      "element": pastedElement
    }
    undoStack.push(Object.assign({}, undoJSON))
  }
});

// delete
/**
 * Function to delete the element that is in the selectedCellView variable.
 * Function is triggered when the user presses the del button on the keyboard.
 * @param {event} event keydown event
 */
function deleteElement(event) {
  if (event.keyCode === 46 && event.key === "Delete") {
    if (selectedCellView != null) {
      var theModel = selectedCellView.model;
      theModel.remove();
      elementSettingsWrapper.classList.remove('is-active')
      // this removes the attached links as well
    } else {
      alert("You have not selected an element, Nothing to delete");
    }
  }
}
document.addEventListener("keydown", deleteElement);


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
$('#reset-zoom').click(function () {
  currentScale = 1
  mainPaper.scale(1, 1)
  mainPaper.scaleContentToFit({
    "padding": {
      "top": 100,
      "left": 200,
      "right": 200,
      "bottom": 200
    }
  })
})

/* Zoom in Zoom out using mousewheel scroll */
mainPaper.on('blank:mousewheel', function (evt, x, y, delta) {
  evt.preventDefault();
  const oldscale = mainPaper.scale().sx;
  const newscale = oldscale + 0.05 * delta * oldscale

  if (newscale > 0.2 && newscale < 5) {
    currentScale = newscale
    mainPaper.scale(newscale, newscale, 0, 0);
    mainPaper.translate(-x * newscale + evt.offsetX, -y * newscale + evt.offsetY);
  }
});

/* Paper Panning */
/**
 * Variable used to store the paper panning initial position. 
 */
var dragStartPosition = null;

/**
 * Function to start the paper panning. It records the dragStartPosition.
 * Executed when the event "blank:pointerdown" event is fired on the mainPaper
 * @param {event} evt 
 * @param {Number} x 
 * @param {Number} y 
 */
function panStart(evt, x, y) {
  var scale = mainPaper.scale()
  dragStartPosition = { x: x * scale.sx, y: y * scale.sy };
  document.getElementById('main-paper-div').style.cursor = "move"
}

/**
 * Paper to stop the panning and set the dragStartPosition to NULL.
 * Executed when the event "blank:pointerup"or "cell:pointerup" is fired on the mainPaper
 * @param {joint.dia.CellView} cellView 
 * @param {Number} x 
 * @param {Number} y 
 */
function panStop(cellView, x, y) {
  dragStartPosition = null;
  document.getElementById('main-paper-div').style.cursor = "auto"
  // console.log(mainPaper.translate())
}

/**
 * Function to execute the paper panning while the mouse is being moved throughout the screen.
 * @param {event} event event returned on mousemove
 */
function pan(event) {
  if (dragStartPosition != null) {
    mainPaper.translate(
      event.offsetX - dragStartPosition.x,
      event.offsetY - dragStartPosition.y);
  }
}

mainPaper.on("blank:pointerdown", panStart)
mainPaper.on("cell:pointerup blank:pointerup", panStop)
$("#main-paper-div").mousemove(pan);


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





      hoverV1.textContent = modelAttrs["Water Depth"]
      hoverV2.textContent = modelAttrs["Design Life"]
      // hoverV3.textContent =
      //   hoverV4.textContent =
      //   hoverV5.textContent =

      modalCompName.textContent = cellView.model.attributes.type;

      hoverContainer.classList.remove('hidden')

      let hoverX = evt["originalEvent"].clientX + 20;
      let hoverY = evt["originalEvent"].clientY + 20;
      console.log(`HoverX ${hoverX} HoverY ${hoverY} Window Height ${window.innerHeight} Width ${window.innerWidth}`);
      let modelSize = cellView.model.attributes.size;
      // The below if conditions handle the edges of having to display the modal when on the edges of the screen so that the modal is still visible
      if (hoverY + 160 > window.innerHeight) {
        hoverContainer.style.top = `${hoverY - 3.5 * modelSize.height}px`
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


/* New Feature: When the user drags an element out of bounds then translate the paper in that direction */
mainPaper.on("element:pointermove", (cellView, evt, x, y) => {
  let pageX = evt["originalEvent"]["pageX"]
  let pageY = evt["originalEvent"]["pageY"]
  console.log(pageX, pageY, mainPaper.translate());

  // out of bounds on left side

  let previousCenter = mainPaper.translate()
  let tx = previousCenter['tx']
  let ty = previousCenter['ty']
  if (pageX < 50) {
    mainPaper.translate(tx + 10, ty)
  }
  else if (pageY < 10) {
    mainPaper.translate(tx, ty + 10)
  }
  else if (pageX > 1500) {
    mainPaper.translate(tx - 10, ty)
  } else if (pageY > 740) {
    mainPaper.translate(tx, ty - 10)
  }
})