const getJSON = (sheetName) => {
    const pipeMaterialJSON = [
        {
            "pCO2 (bara)": { "value": "(,0.11)", "type": "number" },//"<0.1",
            "pH2S (mbara)": { "value": "(-1, 1)", "type": "number" },
            "in-situ pH": { "value": "(5,1000000)", "type": "number" },//">5",
            "NaCL(mg/L)": { "value": "(,53000)", "type": "number" },//"<53000",
            "NaHCO3(mg/L)": { "value": "(,1000)", "type": "number" },//"<1000",
            "Proposed Pipe Material": "Carbon Steel"
        },
        {
            "pCO2 (bara)": { "value": "(,0.11)", "type": "number" },
            "pH2S (mbara)": { "value": "(0,1001)", "type": "number" },
            "in-situ pH": { "value": "(5,1000000)", "type": "number" },
            "NaCL(mg/L)": { "value": "(,53000)", "type": "number" },
            "NaHCO3(mg/L)": { "value": "(,1000)", "type": "number" },
            "Proposed Pipe Material": "Carbon Steel-Sour grade"
        },
        {
            "pCO2 (bara)": { "value": "(,0.51)", "type": "number" },
            "pH2S (mbara)": { "value": "(0,1001)", "type": "number" },
            "in-situ pH": { "value": "(4.45,5.1)", "type": "number" },//">4.5 & <5",
            "NaCL(mg/L)": { "value": "(,53000)", "type": "number" },
            "NaHCO3(mg/L)": { "value": "(,1000)", "type": "number" },
            "Proposed Pipe Material": "Carbon Steel- sour grade with Inhibitor injection"
        },
        {
            "pCO2 (bara)": { "value": "(0.5,40]", "type": "number" },   //">0.5 & <=40",
            "pH2S (mbara)": { "value": "(0,41)", "type": "number" },
            "in-situ pH": { "value": "(3.69,4.51)", "type": "number" },//">3.7 & <4.5",
            "NaCL(mg/L)": { "value": "(,53000)", "type": "number" },
            "NaHCO3(mg/L)": { "value": "(,1000)", "type": "number" },
            "Proposed Pipe Material": "Solid 13%Cr 2.5 Mo"
        },
        {
            "pCO2 (bara)": { "value": "(40,70]", "type": "number" },//">40 & <=70",
            "pH2S (mbara)": { "value": "(,100)", "type": "number" },
            "in-situ pH": { "value": "(3.69,4.51)", "type": "number" },
            "NaCL(mg/L)": { "value": "(,53000)", "type": "number" },
            "NaHCO3(mg/L)": { "value": "(,1000)", "type": "number" },
            "Proposed Pipe Material": "MLP/HRB 316L"
        },
        {
            "pCO2 (bara)": { "value": "(70,180.1]", "type": "number" },//">70 & <=180",
            "pH2S (mbara)": { "value": "(0,101)", "type": "number" },
            "in-situ pH": { "value": "(3.49,4.01)", "type": "number" },
            "NaCL(mg/L)": { "value": "(53000,1000000)", "type": "number" },
            "NaHCO3(mg/L)": { "value": "(1000,1000000)", "type": "number" },//">1000",
            "Proposed Pipe Material": "MLP/HRB 825"
        },
        {
            "pCO2 (bara)": { "value": "(180,325.1]", "type": "number" },//">180 & <=325",
            "pH2S (mbara)": { "value": "(0,101)", "type": "number" },
            "in-situ pH": { "value": "(2.99,3.51)", "type": "number" },
            "NaCL(mg/L)": { "value": "(53000,1000000)", "type": "number" },
            "NaHCO3(mg/L)": { "value": "(1000,1000000)", "type": "number" },
            "Proposed Pipe Material": "Solid 22%Cr"
        },
        {
            "pCO2 (bara)": { "value": "(325,500]", "type": "number" },//">325 & <=500",
            "pH2S (mbara)": { "value": "(100,501)", "type": "number" },
            "in-situ pH": { "value": "(,3.01)", "type": "number" },
            "NaCL(mg/L)": { "value": "(53000,1000000)", "type": "number" },
            "NaHCO3(mg/L)": { "value": "(1000,1000000)", "type": "number" },
            "Proposed Pipe Material": "Solid 25%Cr"
        },
        {
            "pCO2 (bara)": { "value": "(500,1000000)", "type": "number" },
            "pH2S (mbara)": { "value": "(999.9,1000000)", "type": "number" },
            "in-situ pH": { "value": "(,3.01)", "type": "number" },
            "NaCL(mg/L)": { "value": ">53000", "type": "number" },
            "NaHCO3(mg/L)": { "value": "(1000,1000000)", "type": "number" },
            "Proposed Pipe Material": "MLP/HRB 625"
        }
    ]

    const installationJSON = [
        {
            "Pipeline Type": {
                "value": "Carbon Steel(CS),Mechanically Lined Pipeline(MLP),Hot Rolled Bonded (HRB),Pipe-in-Pipe,Polymer Lined Pipeline,Flexible,Umbilical",
                "type": "select"
            },
            "Steel Pipe OD (mm)": { "value": "(0,457.3)", "type": "number" },//<=457.2",
            "Steel Pipe WT (mm)": { "value": "(0,1000000)", "type": "number" }, // > 0
            "OD/Wt": { "value": "(6.9,21.1]", "type": "number" },//">7 and <=21",
            "Water Depth (m)": { "value": "(49.9,1600)", "type": "number" },//">50 and <1600",
            "Proposed Installation Method": "Reel-lay"
        },
        {
            "Pipeline Type": { "value": "Carbon Steel(CS),Mechanically Lined Pipeline(MLP),Hot Rolled Bonded (HRB)", "type": "select" },
            "Steel Pipe OD (mm)": { "value": "(0,457.3)", "type": "number" },
            "Steel Pipe WT (mm)": { "value": "(0,1000000)", "type": "number" },
            "OD/Wt": { "value": "(20.9,45.1)", "type": "number" },//">21 and <45",
            "Water Depth (m)": { "value": "(0,50)", "type": "number" },//"<50",
            "Proposed Installation Method": "S-Lay"
        },
        {
            "Pipeline Type": { "value": "Carbon Steel(CS),Mechanically Lined Pipeline(MLP),Hot Rolled Bonded (HRB)", "type": "select" },
            "Steel Pipe OD (mm)": { "value": "(457.1,1219.3)", "type": "number" },//">457.2 and <1219.2",
            "Steel Pipe WT (mm)": { "value": "(0,1000000)", "type": "number" },
            "OD/Wt": { "value": "(20.9,45.1)", "type": "number" },//">21 and <45",
            "Water Depth (m)": { "value": "(50,600)", "type": "number" },//">50 and <600",
            "Proposed Installation Method": "S-Lay"
        },
        {
            "Pipeline Type": { "value": "Carbon Steel(CS),Mechanically Lined Pipeline(MLP),Hot Rolled Bonded (HRB)", "type": "select" },
            "Steel Pipe OD (mm)": { "value": "(457.3,609.1)", "type": "number" },//">457.2 and <=609",
            "Steel Pipe WT (mm)": { "value": "(0,1000000)", "type": "number" },
            "OD/Wt": { "value": "(6.9,21.1)", "type": "number" },//">7 and <=21",
            "Water Depth (m)": { "value": "(600,100000)", "type": "number" },
            "Proposed Installation Method": "J-Lay"
        }
    ]

    const PTdropJSON = [
        {
            "Production Rate (boe/day)": { "type": "number" },
            "Flow velocity (m/s)": { "type": "number" },
            "Bore Diameter (mm)": { "type": "number" },
            "Pipeline Length (m)": { "type": "number" },
            "Fluid Dynamic Viscosity (Poise)": { "type": "number" },
            "Fluid Density (kg/m^3)": { "type": "number" },
            "Pipe bore roughness (microns)": { "type": "number" },
            "Pressure Loss (bar)": { "type": "number" }
        }
    ]


    if (sheetName === "Pipe Material Selection") {
        return pipeMaterialJSON
    }
    else if (sheetName === "Installation") {
        return installationJSON
    }
    else if (sheetName === "Pipe Bore P&T Drop") {
        return PTdropJSON
    }
    else {
        console.log("getJSON Error, returning NULL, Invalid sheetName");
        return null;
    }
}

const handleRBS = function (filePath, sheetName) {


    const rbsModalDiv = document.getElementById('rbs-modal')
    // code to delete the previous withinmodalDiv
    rbsModalDiv.removeChild(document.getElementById('within-modal'));

    const withinModalDiv = document.createElement('div')
    withinModalDiv.id = 'within-modal'
    withinModalDiv.className = 'within-modal'

    rbsModalDiv.appendChild(withinModalDiv)
    const rbsModalHeading = document.createElement('span')
    rbsModalHeading.textContent = sheetName
    rbsModalHeading.style.fontWeight = "600";
    rbsModalHeading.style.fontSize = "1.5em";
    rbsModalHeading.style.marginBottom = "1em"
    rbsModalHeading.style.textAlign = "center"
    rbsModalHeading.style.display = "block"
    withinModalDiv.appendChild(rbsModalHeading)

    /* We are adding this if condition because we just want to display a simple pop up when the user clicks on the SPIP button 
        The code in the else block contains the normal follow of the RBS system.
    */
    if (sheetName === 'Subsea Pipeline In-Place Design') {
        const miniHeading = document.createElement('h4')
        miniHeading.textContent = "Use the following SPDT modules"
        const textArray = ["Expansion and Global Buckling Assessment", "Thermal Assessment", "On Bottom Analysis", "Free-Span Analysis", "CP Design", "OnBottom Roughness Assessment(FE based)", "Advance Global Buckling Assessment(FE Based)"]
        const ul = document.createElement('ul')
        ul.style = "margin-bottom: 30px"
        textArray.forEach(moduleText => {
            const li = document.createElement('li');
            li.textContent = moduleText;
            li.style = "margin: 10px 0 10px 0;"
            ul.appendChild(li);
        });
        console.log(ul);
        withinModalDiv.appendChild(miniHeading)
        withinModalDiv.appendChild(ul)
    }
    else if (sheetName === "Subsea Pipeline WT Design") {
        const miniHeading = document.createElement('h4')
        miniHeading.textContent = "Use SPDT  DNV-OS-F101 WT design Module"
        withinModalDiv.appendChild(miniHeading)
    }
    else if (sheetName === "Subsea Pipeline Protection") {
        const miniHeading = document.createElement('h4')
        miniHeading.textContent = "Use SPDT Subsea pipeline protection Assessment Module"
        withinModalDiv.appendChild(miniHeading)
    }
    else {
        /* Pull from excel */
        let jsonData = getJSON(sheetName)


        // let us dynamically create the input fields based on the 0th element of jsonData
        let keys = Object.keys(jsonData[0])
        let table = document.createElement('table');

        keys.slice(0, - 1).forEach((key) => {
            let row = document.createElement('tr');

            let headingCell = document.createElement('td');
            let inputCell = document.createElement('td');

            let heading = document.createElement('span')
            heading.textContent = key;
            headingCell.appendChild(heading)


            if (jsonData[0][key]['type'] === 'number') {

                let input = document.createElement('input')
                input.className = 'rbs-input'
                input.id = key
                input.type = 'number';
                input.step = 'any';

                inputCell.appendChild(input)
                row.appendChild(headingCell);
                row.appendChild(inputCell);
                table.appendChild(row);
            }

            else if (jsonData[0][key]["type"] === "select") {
                const select = document.createElement('select');
                select.className = 'rbs-select'
                select.id = key

                let options = jsonData[0][key]["value"].split(',')             //  possible cause for bugs later on
                console.log(options);
                for (let i = 0; i < options.length; i++) {
                    let option = document.createElement('option');
                    option.textContent = options[i];
                    select.appendChild(option)
                }

                inputCell.appendChild(select)
                row.appendChild(headingCell);
                row.appendChild(inputCell);
                table.appendChild(row);
            }

            // let me append another row within which there is an hr
            let hrRow = document.createElement('tr')
            let hrTd = document.createElement('td')
            hrTd.colSpan = '2';
            hrTd.appendChild(document.createElement('hr'))
            hrRow.appendChild(hrTd)
            table.appendChild(hrRow)
        })
        withinModalDiv.appendChild(table)

        const resultDiv = document.createElement('div')
        resultDiv.className = 'rbs-result-div';
        resultDiv.id = 'rbs-result-div';

        const resultSpan = document.createElement('span');
        resultSpan.className = 'rbs-result'
        resultSpan.id = 'rbs-result'

        resultDiv.appendChild(resultSpan)
        withinModalDiv.appendChild(resultDiv)

        const calcButton = document.createElement('button');
        calcButton.className = 'rbs-calculate-btn';
        calcButton.id = 'rbs-calculate-btn';
        calcButton.textContent = "Calculate"
        withinModalDiv.appendChild(calcButton)

        // This section has been added only for pipe bore p&t drop
        // This places the transient temperature button and result on clicking the button below the calcbutton
        if (sheetName === "Pipe Bore P&T Drop") {
            const transTempBtn = document.createElement('button');
            transTempBtn.className = 'rbs-calculate-btn';
            transTempBtn.id = 'rbs-transtemp-btn';
            transTempBtn.textContent = "Pipeline Transient Temperature Profile and Drop"
            withinModalDiv.appendChild(transTempBtn)

            transTempBtn.addEventListener('click', () => {
                const transTempResultSpan = document.createElement('span');
                transTempResultSpan.className = 'rbs-result'
                transTempResultSpan.id = 'rbs-transTemp-result'
                transTempResultSpan.style = "display: table; margin: 0 auto; text-align:center"
                transTempResultSpan.textContent = "Use SPDT Pipeline Transient Temperature Simulator (FE based)"
                withinModalDiv.appendChild(transTempResultSpan)
            })
        }

        if (sheetName === "Pipe Material Selection") {
            // Add event listener so that when button is clicked it displays the correct Pipe Material
            calcButton.addEventListener('click', () => calculatePipeMaterial(jsonData))
        }
        else if (sheetName === "Installation") {
            calcButton.addEventListener('click', () => calcInstallationMethod(jsonData))
        }
        else if (sheetName === "Pipe Bore P&T Drop") {
            calcButton.addEventListener('click', () => calcPTDrop(jsonData))
        }

    }
    rbsModalDiv.classList.remove('hidden')

}

/**
 * 
 * @param {[]:Number} numbersArr 
 * @param {Float} value 
 * @returns 
 */
const checkConditionNumber = function (numbersArr, value) {
    if (numbersArr[0] && numbersArr[1]) {
        if (!(value > numbersArr[0] && value < numbersArr[1])) return false
    }
    else if (numbersArr[0]) { if (!(value > numbersArr[0])) return false }

    else if (numbersArr[1]) { if (!(value < numbersArr[1])) return false }

    return true;
}

const checkConditionSelect = function (optionsArr, value) {
    return optionsArr.includes(value)
}


const calculatePipeMaterial = function (jsonData) {
    const pCO2 = document.getElementById('pCO2 (bara)')
    const pH2S = document.getElementById('pH2S (mbara)')
    const pH = document.getElementById('in-situ pH')
    const NaCL = document.getElementById('NaCL(mg/L)')
    const NaHCO3 = document.getElementById('NaHCO3(mg/L)')

    console.log(`pCO2 ${pCO2.value}\npH2S ${pH2S.value}\npH ${pH.value}\nNaCL ${NaCL.value}\nNaHCO3 ${NaHCO3.value}`)
    let foundRes = false;
    jsonData.forEach((data) => {
        let pCO2Numbers = data["pCO2 (bara)"]["value"].slice(1, -1).split(',')
        let pH2SNumbers = data["pH2S (mbara)"]["value"].slice(1, -1).split(',')
        let pHNumbers = data["in-situ pH"]["value"].slice(1, -1).split(',')
        let NaCLNumbers = data["NaCL(mg/L)"]["value"].slice(1, -1).split(',')
        let NaHCO3Numbers = data["NaHCO3(mg/L)"]["value"].slice(1, -1).split(',')
        pCO2Numbers = pCO2Numbers.map(Number)
        pH2SNumbers = pH2SNumbers.map(Number)
        pHNumbers = pHNumbers.map(Number)
        NaCLNumbers = NaCLNumbers.map(Number)
        NaHCO3Numbers = NaHCO3Numbers.map(Number)
        console.log(pH2SNumbers);

        const res1 = checkConditionNumber(pCO2Numbers, parseFloat(pCO2.value))
        const res2 = checkConditionNumber(pH2SNumbers, parseFloat(pH2S.value))
        const res3 = checkConditionNumber(pHNumbers, parseFloat(pH.value))
        const res4 = checkConditionNumber(NaCLNumbers, parseFloat(NaCL.value))
        const res5 = checkConditionNumber(NaHCO3Numbers, parseFloat(NaHCO3.value))

        if (res1 && res2 && res3 && res4 && res5 && !foundRes) {
            document.getElementById('rbs-result').textContent = `Proposed Pipe Material: 1. \n${data["Proposed Pipe Material"]}`;
            foundRes = true;
        }
        else if (res1 && res2 && res3 && res4 && res5 && foundRes) {
            document.getElementById('rbs-result').textContent += `\n2. ${data["Proposed Pipe Material"]}`;

        }
    })
    if (foundRes === false) {
        document.getElementById('rbs-result').textContent = `Could not match input with rules`;
    }
}

const calcInstallationMethod = function (jsonData) {
    const pipelineType = document.getElementById('Pipeline Type');
    const SPOD = document.getElementById('Steel Pipe OD (mm)')
    const SPWT = document.getElementById('Steel Pipe WT (mm)')
    const OD = document.getElementById('OD/Wt')
    const waterDepth = document.getElementById('Water Depth (m)')

    console.log(`pipeline type: ${pipelineType.value}\nSPOD: ${SPOD.value}\nSPWT: ${SPWT.value}\nOD: ${OD.value}\n water depth: ${waterDepth.value}`)
    let foundRes = false;

    jsonData.forEach((data) => {
        let SPODNumbers = data["Steel Pipe OD (mm)"]["value"].slice(1, -1).split(',').map(Number)
        let SPWTNumbers = data["Steel Pipe WT (mm)"]["value"].slice(1, -1).split(',').map(Number)
        let ODNumbers = data["OD/Wt"]["value"].slice(1, -1).split(',').map(Number)
        let WDNumbers = data["Water Depth (m)"]["value"].slice(1, -1).split(',').map(Number)
        let pipelineTypeValues = data["Pipeline Type"]["value"].split(',') // this is the select box 

        console.log(SPODNumbers, SPWTNumbers, ODNumbers, WDNumbers, pipelineTypeValues);


        OD.value = SPOD.value / SPWT.value

        const res1 = checkConditionSelect(pipelineTypeValues, pipelineType.value)
        const res2 = checkConditionNumber(SPODNumbers, SPOD.value)
        // const res3 = checkConditionNumber(SPWTNumbers, SPWT.value)
        const res4 = checkConditionNumber(ODNumbers, OD.value)
        const res5 = checkConditionNumber(WDNumbers, waterDepth.value)

        console.log(res1, res2, res4, res5);
        if (res1 && res2 && res4 && res5) {
            document.getElementById('rbs-result').textContent = `Proposed Installation Method: \n${data["Proposed Installation Method"]}`;
            foundRes = true;
            console.log("truetruetrue")
        }
    })
    if (foundRes === false) {
        document.getElementById('rbs-result').textContent = `Could not match input with rules`;
    }
}

const calcPTDrop = function (jsonData) {
    const productionRate = document.getElementById('Production Rate (boe/day)')
    const flowVelocity = document.getElementById('Flow velocity (m/s)')
    const boreDiameter = document.getElementById('Bore Diameter (mm)')
    const pipelineLength = document.getElementById('Pipeline Length (m)')
    const fluidDensity = document.getElementById('Fluid Density (kg/m^3)')
    const fluidDynamicViscosity = document.getElementById('Fluid Dynamic Viscosity (Poise)')
    const pipeBoreRoughness = document.getElementById("Pipe bore roughness (microns)")

    console.log(`INPUTS:\n productionRate: ${productionRate.value}\n flowVelocity: ${flowVelocity.value}\n pipelineLength: ${pipelineLength.value}\n
                fluidDensity: ${fluidDensity.value}\n fluidDynamicViscosity: ${fluidDynamicViscosity.value}\n pipeBoreRoughness: ${pipeBoreRoughness.value}`);

    // productionRate in m^3/day
    const y = (0.158987 * productionRate.value) / (24 * 60 * 60);
    // bore diameter (mm)
    let d = 0;
    if (boreDiameter.value == '') {
        d = 1000 * Math.sqrt(((y / flowVelocity.value) / (Math.PI / 4)))
        boreDiameter.value = d;
    }
    else {
        d = boreDiameter.value;
    }

    const reynoldsNo = (fluidDensity.value * flowVelocity.value * d * 0.001) / (fluidDynamicViscosity.value)

    const relativeRoughness = (pipeBoreRoughness.value) / (d * 0.001)
    const frictionFactor = (0.0055) * (1 + Math.cbrt((20000 * relativeRoughness + (Math.pow(10, 6) / reynoldsNo))))
    const pressureLoss = (0.01 * fluidDensity.value * frictionFactor * pipelineLength.value * (flowVelocity.value * flowVelocity.value)) / (2 * d)
    console.log(`COMPUTATION: Y:${y}\n d: ${d}\n reynoldsNo: ${reynoldsNo}\n relativeRoughness: ${relativeRoughness}\n frictionFactor: ${frictionFactor}`);
    console.log(`\n\nOUTPUT: Pressure Loss: ${pressureLoss}`)
    document.getElementById('rbs-result').textContent = `Pressure Loss: \n${pressureLoss}`;
}

export { handleRBS, calculatePipeMaterial }