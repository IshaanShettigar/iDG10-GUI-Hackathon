const getJSON = (sheetName) => {
    const pipeMaterialJSON = [
        {
            "pCO2 (bara)": "(,0.1)",//"<0.1",
            "pH2S (mbara)": "(-1,1)",
            "in-situ pH": "(5,1000000)",//">5",
            "NaCL(mg/L)": "(,53000)",//"<53000",
            "NaHCO3(mg/L)": "(,1000)",//"<1000",
            "Proposed Pipe Material": "Carbon Steel"
        },
        {
            "pCO2 (bara)": "(,0.1)",
            "pH2S (mbara)": "(0,1001)",
            "in-situ pH": "(5,1000000)",
            "NaCL(mg/L)": "(,53000)",
            "NaHCO3(mg/L)": "(,1000)",
            "Proposed Pipe Material": "Carbon Steel-Sour grade"
        },
        {
            "pCO2 (bara)": "(,0.5)",
            "pH2S (mbara)": "(0,1001)",
            "in-situ pH": "(4.45,5.1)",//">4.5 & <5",
            "NaCL(mg/L)": "(,53000)",
            "NaHCO3(mg/L)": "(,1000)",
            "Proposed Pipe Material": "Carbon Steel- sour grade with Inhibitor injection"
        },
        {
            "pCO2 (bara)": "(0.5,40]",   //">0.5 & <=40",
            "pH2S (mbara)": "(0,41)",
            "in-situ pH": "(3.69,4.51)",     //">3.7 & <4.5",
            "NaCL(mg/L)": "(,53000)",
            "NaHCO3(mg/L)": "(,1000)",
            "Proposed Pipe Material": "Solid 13%Cr 2.5 Mo"
        },
        {
            "pCO2 (bara)": "(40,70]",//">40 & <=70",
            "pH2S (mbara)": "(,100)",
            "in-situ pH": "(3.69,4.51)",
            "NaCL(mg/L)": "(,53000)",
            "NaHCO3(mg/L)": "(,1000)",
            "Proposed Pipe Material": "MLP/HRB 316L"
        },
        {
            "pCO2 (bara)": "(70,180]",//">70 & <=180",
            "pH2S (mbara)": "(0,1001)",
            "in-situ pH": "(,4.01)",
            "NaCL(mg/L)": "(53000,1000000)",
            "NaHCO3(mg/L)": "(1000,1000000)",//">1000",
            "Proposed Pipe Material": "MLP/HRB 825"
        },
        {
            "pCO2 (bara)": "(180,325]",//">180 & <=325",
            "pH2S (mbara)": "(0,101)",
            "in-situ pH": "(,3.51)",
            "NaCL(mg/L)": "(53000,1000000)",
            "NaHCO3(mg/L)": "(1000,1000000)",
            "Proposed Pipe Material": "Solid 22%Cr"
        },
        {
            "pCO2 (bara)": "(325,500]",//">325 & <=500",
            "pH2S (mbara)": "(0,501)",
            "in-situ pH": "(,3.01)",
            "NaCL(mg/L)": "(53000,1000000)",
            "NaHCO3(mg/L)": "(1000,1000000)",
            "Proposed Pipe Material": "Solid 25%Cr"
        },
        {
            "pCO2 (bara)": "(500,1000000)",
            "pH2S (mbara)": "(1001,1000000)",
            "in-situ pH": "(,3.01)",
            "NaCL(mg/L)": ">53000",
            "NaHCO3(mg/L)": "(1000,1000000)",
            "Proposed Pipe Material": "MLP/HRB 625"
        }
    ]


    if (sheetName === "Pipe Material Selection") {
        return pipeMaterialJSON
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
    /* Pull from excel, sheet=Pipe Material Selection */
    let jsonData = getJSON(sheetName)
    // let us dynamically create the input fields based on the 0th element of jsonData
    let keys = Object.keys(jsonData[0])
    let table = document.createElement('table');

    keys.slice(0, - 1).forEach((key) => {
        let row = document.createElement('tr');

        // Create heading cell
        let headingCell = document.createElement('td');
        // Create input cell
        let inputCell = document.createElement('td');
        // let div = document.createElement('div')

        let heading = document.createElement('span')
        heading.textContent = key;

        let input = document.createElement('input')
        input.className = 'rbs-input'
        input.id = key
        input.type = 'number';
        input.step = 'any';

        // create a horizontal line


        headingCell.appendChild(heading)
        inputCell.appendChild(input)
        row.appendChild(headingCell);
        row.appendChild(inputCell);
        table.appendChild(row);

        // let me append another row within which there is an hr
        table.appendChild(document.createElement('hr'))
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

    if (sheetName === "Pipe Material Selection") {
        const calcButton = document.createElement('button');
        calcButton.className = 'rbs-calculate-btn';
        calcButton.id = 'rbs-calculate-btn';
        calcButton.textContent = "Calculate"
        withinModalDiv.appendChild(calcButton)

        // Add event listener so that when button is clicked it displays the correct Pipe Material
        calcButton.addEventListener('click', () => calculatePipeMaterial(jsonData))
    }

    rbsModalDiv.classList.remove('hidden')
}

/**
 * 
 * @param {[]:Number} numbersArr 
 * @param {Float} value 
 * @returns 
 */
const checkCondition = function (numbersArr, value) {
    if (numbersArr[0] && numbersArr[1]) {
        if (!(value > numbersArr[0] && value < numbersArr[1])) return false
    }
    else if (numbersArr[0]) { if (!(value > numbersArr[0])) return false }

    else if (numbersArr[1]) { if (!(value < numbersArr[1])) return false }

    return true;
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
        let pCO2Numbers = data["pCO2 (bara)"].slice(1, -1).split(',')
        let pH2SNumbers = data["pH2S (mbara)"].slice(1, -1).split(',')
        let pHNumbers = data["in-situ pH"].slice(1, -1).split(',')
        let NaCLNumbers = data["NaCL(mg/L)"].slice(1, -1).split(',')
        let NaHCO3Numbers = data["NaHCO3(mg/L)"].slice(1, -1).split(',')
        pCO2Numbers = pCO2Numbers.map(Number)
        pH2SNumbers = pH2SNumbers.map(Number)
        pHNumbers = pHNumbers.map(Number)
        NaCLNumbers = NaCLNumbers.map(Number)
        NaHCO3Numbers = NaHCO3Numbers.map(Number)
        console.log(pH2SNumbers);

        const res1 = checkCondition(pCO2Numbers, parseFloat(pCO2.value))
        const res2 = checkCondition(pH2SNumbers, parseFloat(pH2S.value))
        const res3 = checkCondition(pHNumbers, parseFloat(pH.value))
        const res4 = checkCondition(NaCLNumbers, parseFloat(NaCL.value))
        const res5 = checkCondition(NaHCO3Numbers, parseFloat(NaHCO3.value))

        if (res1 && res2 && res3 && res4 && res5) {
            document.getElementById('rbs-result').textContent = `Proposed Pipe Material: \n${data["Proposed Pipe Material"]}`;
            foundRes = true;
        }
    })
    if (foundRes === false) {
        document.getElementById('rbs-result').textContent = `Could not match input with rules`;
    }

}

export { handleRBS, calculatePipeMaterial }