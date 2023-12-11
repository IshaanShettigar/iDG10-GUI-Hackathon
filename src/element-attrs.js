import _ from 'lodash';
import * as joint from 'jointjs';
import data from './element_and_link_details.json' assert { type: 'json' };
import { installVesselCallback, onConnectorChange, subseaInterventionCallback } from './main';


/* To create the 18 parameters and assign them to an element */
/**
 * Initializes the 18 custom parameters as null.
 * @param {joint.dia.Element} element Element to which to assign the 18 parameters
 */
function assignCustomParams(element) {

    let componentParameters = {}
    for (let item of data) {
        if (item['sub-type'] == element.attributes.type) {
            for (let field of item.fields) {
                // console.log(field);
                componentParameters[`${field["label"]}`] = null
            }
        }
    }
    element.attr(componentParameters)

}

/**
 * 
 * This is going to be inserted in the div with id "element-settings"
 * 
 */
const createParameterHTML = (element) => {
    if (element.isElement()) {
        let eleAttrs = element.attributes.attrs;
        let eleName = element.attributes.type;

        let elementSettings = document.getElementById('element-settings');
        /*  Let us add the element name  */
        // Create the parent div
        const div = document.createElement('div');
        div.className = 'parameter element-name';

        const span = document.createElement('span');
        span.id = 'elementName';
        div.appendChild(span);
        elementSettings.appendChild(div)
        for (let item of data) {
            if (item['sub-type'] == eleName) {
                span.textContent = item['name'];
                for (let i = 0; i < item.fields.length; i++) {
                    let field = item.fields[i];

                    if (field.type === "number") {
                        let inputBox = createInputBox(i, field["label"], element)
                        elementSettings.appendChild(inputBox)
                    }
                    else if (field.type === "string") {
                        let selectBox = createSelectBox(i, field["label"], field["values"], element)
                        elementSettings.appendChild(selectBox)
                    }
                    else {
                        // alert("FATAL ERROR IN JSON field.type is not number nor string,", field)
                    }
                }
            }
        }
    }
    else if (element.isLink()) {
        console.log("IS LINK=true", element.attributes.attrs.connector)
        // let linkName = element.attributes.type;

        let linkSettings = document.getElementById('connector-settings');
        /*  Let us add the element name  */
        // Create the parent div
        const div = document.createElement('div');
        div.className = 'parameter element-name';

        const span = document.createElement('span');
        span.id = 'elementName';
        div.appendChild(span);
        linkSettings.appendChild(div)

        /*  */

        const subseaInterventionDiv = createSubseaInterventionDiv(element);
        const installVesselDiv = createInstallVesselDiv(element);
        const connectorChoiceDiv = createConnectorChoiceDiv(); // Div responsible for allowing Eg) Flexible-Pipeline-PR to Umbillical 
        linkSettings.appendChild(connectorChoiceDiv)
        linkSettings.appendChild(subseaInterventionDiv)
        linkSettings.appendChild(installVesselDiv)


        for (let item of data) {
            console.log(element.attributes.attrs.connector);
            if (item['sub-type'] == element.attributes.attrs.connector) {
                span.textContent = item['name'];
                for (let i = 0; i < item.fields.length; i++) {
                    let field = item.fields[i];

                    if (field.type === "number") {
                        let inputBox = createInputBox(i, field["label"], element)
                        linkSettings.appendChild(inputBox)
                    }
                    else if (field.type === "string") {
                        // console.log(field)
                        let selectBox = createSelectBox(i, field["label"], field["values"], element)
                        linkSettings.appendChild(selectBox)
                    }
                    else {
                        alert(`FATAL ${JSON.stringify(field)} ERROR IN JSON field.type is not number nor string.`)
                    }
                }
            }
        }
        // console.log(linkSettings)
    }
}

/**
 * Method to reset the modal used to display the parameters for "Subsea Intervention" and "Installation & Construction Vessel"
 */
const resetSiIcvModal = () => {
    const siicvModal = document.getElementById('si-icv-modal')
    const oldWithinModalDiv = document.getElementById('within-si-icv-modal')

    if (oldWithinModalDiv) { siicvModal.removeChild(oldWithinModalDiv) }

    const withinModalDiv = document.createElement('div')
    withinModalDiv.classList = "within-modal"
    withinModalDiv.id = "within-si-icv-modal"

    siicvModal.appendChild(withinModalDiv)
}
/**
 * 
 * @param {String} selectBoxId  Either id of subsea intervention select box or installation and construction vessel select box
 */
const onClickSiIcv = (selectBoxId, element) => {

    resetSiIcvModal()
    // add the modal overlay to blur & darken the background
    document.getElementById("settings-overlay").classList.remove("hidden");

    const siicvModal = document.getElementById('si-icv-modal')
    siicvModal.classList.remove('hidden');

    const withinModalDiv = document.getElementById('within-si-icv-modal')
    /* dynamically display the contents of the modal    */

    // get the value present in the select box
    const selectBox = document.getElementById(selectBoxId)
    console.log(selectBox.value)

    const heading = document.createElement('span');
    heading.classList = "heading"
    heading.textContent = selectBox.value

    for (let item of data) {
        if (item['sub-type'] === selectBox.value) {

            for (let i = 0; i < item.fields.length; i++) {
                let field = item.fields[i];

                if (field.type === "number") {
                    let inputBox = createInputBox(i, field["label"], element)
                    // This line populates the element with the correct value that it gets from the object of the link (seen here as element)
                    inputBox.getElementsByClassName('input-number')[0].value = element.attributes.attrs[`${field["label"]}`];
                    withinModalDiv.appendChild(inputBox)
                }
                else if (field.type === "string") {
                    let selectBox = createSelectBox(i, field["label"], field["values"], element)
                    selectBox.getElementsByClassName('input-select')[0].value = element.attributes.attrs[`${field["label"]}`];
                    withinModalDiv.appendChild(selectBox)
                }
                else {
                    alert("FATAL ERROR IN JSON field.type is not number nor string,", field)
                }
            }
        }
    }
}

const createSubseaInterventionDiv = function (element) {
    const parentDiv = document.createElement('div')
    parentDiv.classList = "parent-div-install-vessel"
    // Create a div element
    var subseaInterventionDiv = document.createElement("div");
    subseaInterventionDiv.className = "parameter subsea-intervention";

    // Create a span element
    var subseaInterventionSpan = document.createElement("span");
    subseaInterventionSpan.textContent = "Subsea Intervention";

    // Create a select element
    var subseaInterventionSelect = document.createElement("select");
    subseaInterventionSelect.style.width = '138px'
    // subseaInterventionSelect.id = "subsea-intervention";
    subseaInterventionSelect.id = "subseaIntervention";

    const editParameterBtn = document.createElement('button')
    editParameterBtn.id = "subsea-intervention-details"
    const editIcon = document.createElement('img')
    editIcon.src = "/icons/edit-property-50.png"
    editParameterBtn.appendChild(editIcon)

    editParameterBtn.addEventListener('click', () => onClickSiIcv("subseaIntervention", element))

    // Define an array of option values
    var subseaInterventionOptions = [
        "Rock-Dumping",
        "Concrete-mattress",
        "Trenching-back filling",
        "Sleepers",
        "Rock-removal",
        "GRP-covers"
    ];

    // Create option elements and append them to the select element
    subseaInterventionOptions.forEach(function (value) {
        var optionElement = document.createElement("option");
        optionElement.value = value;
        optionElement.textContent = value;
        subseaInterventionSelect.appendChild(optionElement);
    });

    subseaInterventionSelect.addEventListener('change', () => { subseaInterventionCallback(subseaInterventionSelect) })


    parentDiv.appendChild(subseaInterventionSelect)
    parentDiv.appendChild(editParameterBtn)
    // Append the span and select elements to the div element
    subseaInterventionDiv.appendChild(subseaInterventionSpan);
    subseaInterventionDiv.appendChild(parentDiv);

    return subseaInterventionDiv;
}

const createInstallVesselDiv = function (element) {

    const parentDiv = document.createElement('div')
    parentDiv.classList = "parent-div-install-vessel"
    // Create a div element
    var installVesselDiv = document.createElement("div");
    installVesselDiv.className = "parameter install-vessel";
    // Create a span element
    var installVesselSpan = document.createElement("span");
    installVesselSpan.textContent = "Installation & Construction Vessel";

    // Create a select element
    var installVesselSelect = document.createElement("select");
    // installVesselSelect.id = "install-vessel"
    installVesselSelect.id = "installationAndConstructionVessel";
    installVesselSelect.style.width = "138px"

    const editParameterBtn = document.createElement('button')
    editParameterBtn.id = "install-vessel-details"
    const editIcon = document.createElement('img')
    editIcon.src = "/icons/edit-property-50.png"
    editParameterBtn.appendChild(editIcon)

    editParameterBtn.addEventListener('click', () => onClickSiIcv("installationAndConstructionVessel", element))


    // Define an array of option values
    var installVesselOptions = [
        "S-Lay",
        "J-Lay",
        "Reel-Lay",
        "Rock-Lay Vessel",
        "Survey Vessel",
        "Flex-Umb-Lay Vessel",
        "Construction Vessel"
    ];

    // Create option elements and append them to the select element
    installVesselOptions.forEach(function (value) {
        var optionElement = document.createElement("option");
        optionElement.value = value;
        optionElement.textContent = value;
        installVesselSelect.appendChild(optionElement);
    });

    installVesselSelect.addEventListener('change', () => { installVesselCallback(installVesselSelect) })

    parentDiv.appendChild(installVesselSelect)
    parentDiv.appendChild(editParameterBtn)

    // Append the span and select elements to the div element
    installVesselDiv.appendChild(installVesselSpan);
    installVesselDiv.appendChild(parentDiv);

    return installVesselDiv;
}

/**
 *  This function creates (and returns) the Div that is responsible for giving the user the option to change the connector type
 * Eg) Flexible-Pipeline-PR to Umbillical 
 */
const createConnectorChoiceDiv = function () {
    // Create a div element
    var divElement = document.createElement("div");
    divElement.id = "link-type";
    divElement.className = "parameter link-type";

    // Create a span element
    var spanElement = document.createElement("span");
    spanElement.textContent = "Connector";

    // Create a select element
    var selectElement = document.createElement("select");
    selectElement.id = "connector";

    // Define an array of option values
    var optionValues = [
        "Umbillical", "Rigid-Pipeline-PR", "Rigid-Pipeline-WI", "Rigid-Pipeline-GL/GI", "Flexible-Pipeline-PR", "Flexible-Pipeline-WI",
        "Flexible-Pipeline-GL/GI", "Hydr-Flying Lead", "Rigid-Pipeline-PiP PR", "Rigid-Spool-PR", "Rigid-Spool-WI", "Rigid-Spool-GL/GI",
        "Flexible-Jumper-PR", "Flexible-Jumper-WI", "Flexible-Jumper-GL/GI", "Rigid-PT-Riser-PR", "Rigid-PT-Riser-WI", "Rigid-PT-Riser-GL/GI",
        "Flexible-PT-Riser-PR", "Flexible-PT-Riser-WI", "Flexible-PT-Riser-GL/GI", "Rigid-SCR-PR", "Rigid-SCR-WI", "Rigid-SCR-GL/GI",
        "Flexible-Riser-PR", "Flexible-Riser-WI", "Flexible-Riser-GL/GI", "Elect-Flying-Lead"
    ];

    // Create option elements and append them to the select element
    optionValues.forEach(function (value) {
        var optionElement = document.createElement("option");
        optionElement.value = value;
        optionElement.textContent = value;
        selectElement.appendChild(optionElement);
    });

    selectElement.addEventListener('change', () => { onConnectorChange(selectElement, document.getElementById('install-vessel'), document.getElementById('subsea-intervention')) })

    // Append the span and select elements to the div element
    divElement.appendChild(spanElement);
    divElement.appendChild(selectElement);

    return divElement;
}

/**
 * This function just resets the right hand side element/link parameter pop up.
 * @param {*} element 
 */
const resetParameterHTML = (element) => {
    // For element settings

    let elementSettingsDiv = document.getElementById('element-settings');
    let elementSettingsWrapperDiv = document.getElementById('element-settings-wrapper')

    // delete old div
    if (elementSettingsDiv) {
        elementSettingsWrapperDiv.removeChild(elementSettingsDiv);
    }

    // create the div again and re-attach
    const newElementSettingsDiv = document.createElement('div');
    newElementSettingsDiv.id = "element-settings"
    newElementSettingsDiv.className = "element-settings"

    elementSettingsWrapperDiv.appendChild(newElementSettingsDiv)
    console.log("Reset Element Parameter JSON");


    // For connector settings remove old div but we need to add SubseaIntervention, Installation & Construction Vessel and Connector (So they can change the type actually)
    let linkSettingsDiv = document.getElementById('connector-settings');
    let linkSettingsWrapperDiv = document.getElementById('connector-settings-wrapper')

    // delete old div
    if (linkSettingsDiv) {
        linkSettingsWrapperDiv.removeChild(linkSettingsDiv);
    }

    // create the div again and re-attach
    const newLinkSettingsDiv = document.createElement('div');
    newLinkSettingsDiv.id = "connector-settings"
    newLinkSettingsDiv.className = "connector-settings"



    linkSettingsWrapperDiv.appendChild(newLinkSettingsDiv)
    console.log("Reset Link Parameter JSON");
}




const addElementEventListener2 = (DOMElement, event, element) => {
    // event can be ='input' or 'change' 
    // 'input' is for number modification. 'change' is for select box change
    DOMElement.addEventListener(event, () => {
        // change the attributes of the selected cellview

        const parameterLabel = DOMElement.id
        element.attributes.attrs[parameterLabel] = DOMElement.value;
        console.log(`Changed ${parameterLabel} for ${element.attributes.type} to ${DOMElement.value}`);

    })
}

/**
 * 
 * @param {*} i Parameter Number
 * @param {*} title Name of the parameter 
 * @param {*} options Array denoting the options available for the select box
 * @returns 
 */
const createSelectBox = (i, title, options, element) => {
    console.log(title, options, element);
    // Create the first div with select element
    const div1 = document.createElement('div');
    div1.id = `para${i}`;
    div1.className = 'parameter string';

    const span1 = document.createElement('span');
    span1.textContent = title;

    const select1 = document.createElement('select');
    select1.id = title;
    select1.className = "input-select"

    for (let i = 0; i < options.length; i++) {
        let option = document.createElement('option');
        option.textContent = options[i];
        select1.appendChild(option)
    }

    // add the necessary event listener to this selectbox

    addElementEventListener2(select1, "change", element)

    div1.appendChild(span1);
    div1.appendChild(select1);
    return div1;
}

const createInputBox = (i, title, element) => {
    // Create the second div with input element
    const div2 = document.createElement('div');
    div2.id = `para${i}`;
    div2.className = 'parameter double';

    const span2 = document.createElement('span');
    span2.textContent = title;

    const input2 = document.createElement('input');
    input2.type = 'number';
    input2.step = 'any';
    input2.className = 'input-number';
    input2.id = title;

    // Add the necessary event listener to this input box
    addElementEventListener2(input2, "change", element)


    div2.appendChild(span2);
    div2.appendChild(input2);

    return div2;
}


export { assignCustomParams, createParameterHTML, resetParameterHTML, addElementEventListener2 }