/*
This file contains all the logic necessary to 
1. Save and Load diagrams
2. Store the settings etc
*/

// This function downloads the object with the specified extension of .idg
// used in saveGraph method
function downloadObjectAsJson(exportObj, exportName) {
    var dataStr =
        "data:text/json;charset=utf-8," +
        encodeURIComponent(JSON.stringify(exportObj));
    var downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", exportName + ".idg");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

/*  function to modify the JSON while saving it.
    the .toJSON() saved the parameters in the wrong format. This function corrects it
*/
const fixFormat = function (graphjson) {
    const cellArray = graphjson['cells']
    for (let i = 0; i < cellArray.length; i += 1) {
        let cellAttrs = cellArray[i]['attrs']
        // console.log(`${i} ${JSON.stringify(cellAttrs)}`);
        for (let paraNo = 1; paraNo <= 18; paraNo += 1) {
            if (!cellAttrs[`parameter${paraNo}`]) {
                graphjson['cells'][i]['attrs'][`parameter${paraNo}`] = null;
            }
            else {
                // console.log(cellAttrs[`parameter${paraNo}`])
                var valueObj = cellAttrs[`parameter${paraNo}`];
                var value = Object.values(valueObj).join('');
                cellAttrs[`parameter${paraNo}`] = value;
                graphjson['cells'][i]['attrs'][`parameter${paraNo}`] = cellAttrs[`parameter${paraNo}`];
            }
        }
        if (cellAttrs.hasOwnProperty("connector")) {
            var valueObj2 = cellAttrs["connector"];
            var value2 = Object.values(valueObj2).join('');
            cellAttrs["connector"] = value2;
        }
        if (cellAttrs.hasOwnProperty("subseaIntervention")) {
            var valueObj3 = cellAttrs["subseaIntervention"];
            var value3 = Object.values(valueObj3).join('');
            cellAttrs["subseaIntervention"] = value3;
        }
        if (cellAttrs.hasOwnProperty("installationAndConstructionVessel")) {
            var valueObj4 = cellAttrs["installationAndConstructionVessel"];
            var value4 = Object.values(valueObj4).join('');
            cellAttrs["installationAndConstructionVessel"] = value4;
        }
    }
    console.log(`Fixed formatting`)
    return graphjson
}
const saveGraph = function (mainGraph) {
    var graphjson = mainGraph.toJSON();
    // console.log(
    //     `Saving the following JSON \n\n${JSON.stringify(graphjson)}`
    // );
    var fixedGraphJson = fixFormat(graphjson)

    // mainGraph.fromJSON(sampleJSON)

    const name = prompt("Enter filename");
    if (name != null) {
        downloadObjectAsJson(fixedGraphJson, name);
        console.log("Saved it");
    } else {
        console.log("Cancelled saving");
    }
}

const openFile = function (event, mainGraph) {
    var file = event.target.files[0];
    // console.log(`file ${file}`);
    // Create a new FileReader object
    var reader = new FileReader();
    // Add an event listener to the FileReader object
    reader.addEventListener("load", function () {
        // Parse the file contents as JSON
        var fileContents = JSON.parse(reader.result);
        // Log the parsed JSON to the console
        // console.log(fileContents);
        mainGraph.fromJSON(fileContents);
    });
    // Read the selected file as text
    reader.readAsText(file);

    // need to iterate over all elements and links and add the linktools and elementtools
}

export { saveGraph, openFile }