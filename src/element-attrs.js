import _ from 'lodash';
import * as joint from 'jointjs';
import data from './element_and_link_details.json' assert { type: 'json' };


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
    console.log(element.attributes);
    element.attr(componentParameters)
    // element.attr({
    //     parameter1: null,
    //     parameter2: null,
    //     parameter3: null,
    //     parameter4: null,
    //     parameter5: null,
    //     parameter6: null,
    //     parameter7: null,
    //     parameter8: null,
    //     parameter9: null,
    //     parameter10: null,
    //     parameter11: null,
    //     parameter12: null,
    //     parameter13: null,
    //     parameter14: null,
    //     parameter15: null,
    //     parameter16: null,
    //     parameter17: null,
    //     parameter18: null,
    // })
}

/**
 * 
 * This is going to be inserted in the div with id "element-settings"
 * 
 */
const createParameterHTML = (element) => {
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
                    alert("FATAL ERROR IN JSON field.type is not number nor string")
                }
            }
        }
    }
}

const resetParameterHTML = (element) => {
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
    console.log("Reset Parameter JSON");
}


const addElementEventListener = (DOMElement, event, element) => {
    // event can be ='input' or 'change' 
    // 'input' is for number modification. 'change' is for select box change
    DOMElement.addEventListener(event, () => {
        // change the attributes of the selected cellview

        const parameterLabel = DOMElement.id
        console.log(parameterLabel);
        element.attributes.attrs[parameterLabel] = DOMElement.value;
        console.log(`Changed ${parameterLabel} for ${element.attributes.type}`);

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
    // Create the first div with select element
    const div1 = document.createElement('div');
    div1.id = `para${i}`;
    div1.className = 'parameter string';

    const span1 = document.createElement('span');
    span1.textContent = title;

    const select1 = document.createElement('select');
    select1.id = title;

    for (let i = 0; i < options.length; i++) {
        let option = document.createElement('option');
        option.textContent = options[i];
        select1.appendChild(option)
    }

    // add the necessary event listener to this selectbox
    addElementEventListener(select1, "change", element)

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
    addElementEventListener(input2, "change", element)


    div2.appendChild(span2);
    div2.appendChild(input2);

    return div2;
}


export { assignCustomParams, createParameterHTML, resetParameterHTML }