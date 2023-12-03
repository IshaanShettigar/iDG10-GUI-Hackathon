import data from "../element_and_link_details.json"

// Configuration data
const configData = data;

// Render the accordion dynamically
const appContainer = document.getElementById("app");

// Create containers for components and connectors
const componentsContainer = document.createElement("div");
componentsContainer.classList.add("accordion-container");
const connectorsContainer = document.createElement("div");
connectorsContainer.classList.add("accordion-container");

// Loop through the configuration data and create accordion items
configData.forEach((configItem) => {
    const accordionItem = document.createElement("div");
    accordionItem.classList.add("accordion-item");

    const accordionHeader = document.createElement("div");
    accordionHeader.classList.add("accordion-header");

    accordionHeader.innerHTML = `
                <h3>${configItem.name}</h3>
                <span>🔧</span>
                `;
    accordionHeader.addEventListener("click", () =>
        toggleAccordion(accordionContent)
    );

    const accordionContent = document.createElement("div");
    accordionContent.classList.add("accordion-content");

    // Group related fields within a fieldset
    const fieldset = document.createElement("fieldset");
    fieldset.innerHTML = `
                <legend>${configItem.name}</legend>
                ${configItem.fields
            .map(
                (field) => `
                <details>
                    <summary>${field.name}</summary>
                    <div class="fields-container">
                    <label for="${field.name}_name">Name:</label>
                <input type="text" id="${field.name}_name" value="${field.name
                    }" />
                <label for="${field.name}">Label:</label>
                <input type="${field.type}" id="${field.name}_label" value="${field.label
                    }" />
                <label for="${field.name}_description">Description:</label>
                <input type="text" id="${field.name}_description" value="${field.description
                    }" />
                    <label label for= "${field.name}_type" >Type:</label>
                <select id="${field.name}_type">
                    <option value="" disabled ${field.type ? "" : "selected"
                    }>-- Select Type --</option>
                    <option value="number" ${field.type === "number" ? "selected" : ""
                    }>Number</option>
                    <option value="string" ${field.type === "string" ? "selected" : ""
                    }>String</option>
                </select>
                <label for="${field.name}_default">Default Value:</label>
                <input type="${field.type}" id="${field.name}_default" value="${field["default-value"]
                    }" />
<label label for= "${field.name}_min" > Min:</label >
                <input type="number" id="${field.name}_min" value="${field.min
                    }" />
                <label for="${field.name}_max">Max:</label>
                <input type="number" id="${field.name}_max" value="${field.max
                    }" />
                <label for="${field.name}_step">Step:</label>
                <input type="number" id="${field.name}_step" value="${field.step
                    }" />
                <label for="${field.name}_required">Required:</label>
                <input type="checkbox" id="${field.name}_required" ${field.required ? "checked" : ""
                    } />
                
                ${field.type === "string"
                        ? `
                    <div class="values-container">
                        <label>Values:</label>
                        <div id="${field.name}_value_container">
                            ${field.values
                            .map(
                                (value, index) => `
                                <div class="value-container">
                                    <input type="text" id="${field.name}_value_${index}" value="${value}" />
                                    <button onclick="removeValue('${field.name}', ${index})">Remove</button>
                                </div>
                            `
                            )
                            .join("")}
                        </div>
                        <div class="add-remove-value-container">
                            <button onclick="addValue('${field.name
                        }')">Add Value</button>
                            <span class="error-message" id="${field.name
                        }_error"></span>
                        </div>
                    </div>
                `
                        : ""
                    }
                
                    </div >
                </details >
    `
            )
            .join("")}
                `;

    accordionContent.appendChild(fieldset);

    accordionItem.appendChild(accordionHeader);
    accordionItem.appendChild(accordionContent);
    appContainer.appendChild(accordionItem);

    // if (configItem["main-type"] === 'component') {
    //     console.log("component");
    //     componentsContainer.appendChild(accordionItem);
    // }

    // Append accordion items to the corresponding container based on sub-type
    // if (configItem["main-type"] === 'component') {
    //     componentsContainer.appendChild(accordionItem);
    // } else if (configItem["main-type"] === 'connector') {
    //     connectorsContainer.appendChild(accordionItem);
    // }
});

// Append containers to the main app container with a divider
appContainer.appendChild(componentsContainer);
appContainer.appendChild(document.createElement("hr")); // Divider
appContainer.appendChild(connectorsContainer);

// Toggle accordion content
function toggleAccordion(accordionContent) {
    accordionContent.style.display =
        accordionContent.style.display === "block" ? "none" : "block";
}

// Function to add a new value for a string field
function addValue(fieldName) {
    const valuesContainer = document.querySelector(
        `#${fieldName}_value_container`
    );
    const newInput = document.createElement("div");
    const newIndex = valuesContainer.childElementCount;

    newInput.innerHTML = `
                <div class="value-container">
                    <input type="text" id="${fieldName}_value_${newIndex}" value="" />
                    <button onclick="removeValue('${fieldName}', ${newIndex})">Remove</button>
                </div>
                `;

    valuesContainer.appendChild(newInput);

    // Clear error message on successful addition
    const errorElement = document.getElementById(`${fieldName}_error`);
    errorElement.textContent = "";
}

// Function to remove a value for a string field
function removeValue(fieldName, index) {
    const valuesContainer = document.querySelector(
        `#${fieldName}_value_container`
    );
    const inputToRemove = document.getElementById(
        `${fieldName}_value_${index}`
    );
    valuesContainer.removeChild(inputToRemove);

    // Clear error message on successful removal
    const errorElement = document.getElementById(`${fieldName}_error`);
    errorElement.textContent = "";
}

// Function to save the configuration
function saveConfiguration() {
    const inputs = document.querySelectorAll("input, select");
    const values = {};

    inputs.forEach((input) => {
        const idTokens = input.id.split("_");
        const fieldName = idTokens[0];
        const property = idTokens[1];

        if (!values[fieldName]) {
            values[fieldName] = {};
        }

        if (property === "required") {
            values[fieldName][property] = input.checked;
        } else if (property === "value") {
            // Handle values for string type
            if (!values[fieldName][property]) {
                values[fieldName][property] = [];
            }
            values[fieldName][property].push(input.value);
        } else {
            values[fieldName][property] =
                input.type === "number" ? parseFloat(input.value) : input.value;
        }
    });

    // Validate values for string type
    for (const fieldName in values) {
        const valueContainer = document.getElementById(
            `${fieldName}_value_container`
        );
        const valuesInputs = valueContainer
            ? valueContainer.querySelectorAll("input")
            : [];

        values[fieldName]["values"] = Array.from(valuesInputs).map(
            (input) => input.value
        );

        if (values[fieldName]["type"] === "string") {
            const errorElement = document.getElementById(`${fieldName}_error`);
            const duplicateValues = hasDuplicates(values[fieldName]["values"]);
            if (duplicateValues) {
                errorElement.textContent = "Values must be unique.";
                return;
            }
        }
    }

    console.log("Saved configuration:", values);
    // You can send the values to the server or perform other actions here
}

// Helper function to check for duplicate values in an array
function hasDuplicates(array) {
    return new Set(array).size !== array.length;
}