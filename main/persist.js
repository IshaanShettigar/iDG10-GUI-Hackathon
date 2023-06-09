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


const saveGraph = function (mainGraph) {
    var graphjson = mainGraph.toJSON();
    console.log(
        `Saving the following JSON \n\n${JSON.stringify(graphjson)}`
    );
    // mainGraph.fromJSON(sampleJSON)

    const name = prompt("Enter filename");
    if (name != null) {
        downloadObjectAsJson(graphjson, name);
        console.log("Saved it");
    } else {
        console.log("Cancelled saving");
    }
}

const openFile = function (event, mainGraph) {
    var file = event.target.files[0];
    console.log(`file ${file}`);
    // Create a new FileReader object
    var reader = new FileReader();
    // Add an event listener to the FileReader object
    reader.addEventListener("load", function () {
        // Parse the file contents as JSON
        var fileContents = JSON.parse(reader.result);
        // Log the parsed JSON to the console
        console.log(fileContents);
        mainGraph.fromJSON(fileContents);
    });
    // Read the selected file as text
    reader.readAsText(file);

    // need to iterate over all elements and links and add the linktools and elementtools
}

export { saveGraph, openFile }