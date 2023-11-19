import $ from 'jquery';
import _ from 'lodash';
import * as joint from 'jointjs';
/*
This file contains all the logic necessary to 
1. Save and Load diagrams
2. Store the settings etc
*/

// This function downloads the object with the specified extension of .idg
// used in saveGraph method
/**
 * This function downloads the JSON object. It attaches a .idg extension to the file.
 * It dynamically creates an anchor tag attaches the exportObj to the href part of the anchor tag.
 * Programatically clicks the anchor tag, which triggers the download.
 * Removes the anchor tag.
 * @param {JSON} exportObj comes from the fixFormat function
 * @param {String} exportName name of the file it should create 
 */
function downloadObjectAsJson(exportObj, exportName = "diagram") {
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
/**
 * This function is responsible for fixing some of the formatting errors that were given by the default 
 * mainGraph.toJSON() function
 * @param {JSON} graphjson Represents the contents of the diagram in a JSON format
 * @returns {JSON} returns the fixed JSON object
 */
const fixFormat = function (graphjson) {
    const cellArray = graphjson['cells']
    for (let i = 0; i < cellArray.length; i += 1) {
        let cellAttrs = cellArray[i]['attrs']
        // console.log("CELL ATTRS", cellAttrs, cellAttrs.length); //fix this length is undefined
        // console.log(`${i} ${JSON.stringify(cellAttrs)}`);
        let keys = Object.keys(cellAttrs)
        keys.forEach((key) => {
            // console.log(key);
            if (!cellAttrs[key]) {
                graphjson['cells'][i]['attrs'][key] = null;
            }
            else if (key != 'line') {
                // console.log(cellAttrs[`parameter${paraNo}`])
                var valueObj = cellAttrs[key];
                var value = Object.values(valueObj).join('');
                cellAttrs[key] = value;
                graphjson['cells'][i]['attrs'][key] = cellAttrs[key];
            }
        })
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
    // console.log(`Fixed formatting`)
    return graphjson
}

/**
 * This function is used to save the current state of the diagram in JSON format.
 * It makes a call to fixFormat. The output of the fixFormat function is finally downloaded.
 * @param {joint.dia.Graph} mainGraph 
 */
const saveGraph = function (mainGraph) {

    /**
     * @type {JSON}
     */
    var graphjson = mainGraph.toJSON();
    // console.log(
    //     `Saving the following JSON \n\n${JSON.stringify(graphjson)}`
    // );
    /**
     * @type {JSON}
     */
    var fixedGraphJson = fixFormat(graphjson)

    // mainGraph.fromJSON(sampleJSON)

    const name = "diagram"  //prompt("Enter filename");
    if (name != null) {
        downloadObjectAsJson(fixedGraphJson, name);
        console.log("Saved it");
    } else {
        console.log("Cancelled saving");
    }
}

/**
 * This function waits for the mainGraph.fromJSON() function to resolve before completing its execution and
 * passing off control.
 * @async
 * @param {Event} event event object that holds the target file being uploaded
 * @param {joint.dia.Graph} mainGraph 
 * @return {Promise}
 */
const openFile = async function (event, mainGraph) {
    return new Promise((resolve) => {
        var file = event.target.files[0];
        // Create a new FileReader object
        var reader = new FileReader();
        // Add an event listener to the FileReader object
        reader.addEventListener("load", async function () {
            // Parse the file contents as JSON
            var fileContents = JSON.parse(reader.result);
            // Log the parsed JSON to the console
            // console.log(fileContents);
            mainGraph.fromJSON(fileContents);
            resolve()
        });
        // Read the selected file as text
        reader.readAsText(file);
    })
    // need to iterate over all elements and links and add the linkTools and elementtools
}


function saveImage(svgEl, name, format = "png", backgroundColor = null) {
    // Get the SVG element's width and height
    const width = svgEl.clientWidth;
    const height = svgEl.clientHeight;

    // Create a canvas element with the same dimensions as the SVG
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    // Get the canvas rendering context
    const context = canvas.getContext("2d");

    // Fill the canvas with a transparent or custom background color
    if (backgroundColor) {
        context.fillStyle = backgroundColor;
        context.fillRect(0, 0, width, height);
    }

    // Create a new Image object
    const image = new Image();

    // Create a data URL from the SVG element
    const svgData = new XMLSerializer().serializeToString(svgEl);
    const svgUrl = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svgData);

    // Set the image source to the SVG data URL
    image.src = svgUrl;

    // Wait for the image to load
    image.onload = () => {
        // Draw the image onto the canvas
        context.drawImage(image, 0, 0);
        // Convert the canvas to a data URL based on the chosen format
        let imageUrl;
        let fileExtension;
        if (format === "png") {
            imageUrl = canvas.toDataURL("image/png");
            fileExtension = "png";
        } else if (format === "jpeg" || format === "jpg") {
            imageUrl = canvas.toDataURL("image/jpeg");
            fileExtension = "jpeg";
        } else if (format === "svg") {
            imageUrl = svgUrl;
            fileExtension = "svg";
        } else {
            console.error("Invalid format. Supported formats: png, jpeg, jpg, svg");
            return;
        }

        // Create a download link for the image file
        const downloadLink = document.createElement("a");
        downloadLink.href = imageUrl;
        downloadLink.download = name + "." + fileExtension;

        // Add the download link to the document
        document.body.appendChild(downloadLink);

        // Simulate a click on the download link
        downloadLink.click();

        // Remove the download link from the document
        document.body.removeChild(downloadLink);
    };
}


// function saveImage(svgEl, name, format, backgroundColor = null) {
//     // Get the SVG element's width and height
//     const width = svgEl.clientWidth;
//     const height = svgEl.clientHeight;

//     // Create a canvas element with the same dimensions as the SVG
//     const canvas = document.createElement("canvas");
//     canvas.width = width;
//     canvas.height = height;

//     // Get the canvas rendering context
//     const context = canvas.getContext("2d");

//     // Fill the canvas with a transparent or custom background color
//     if (backgroundColor) {
//         context.fillStyle = backgroundColor;
//         context.fillRect(0, 0, width, height);
//     }

//     // Create a new Image object
//     const image = new Image();

//     // Create a data URL from the SVG element
//     const svgData = new XMLSerializer().serializeToString(svgEl);
//     const svgUrl = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svgData);

//     // Set the image source to the SVG data URL
//     image.src = svgUrl;

//     // Wait for the image to load
//     image.onload = () => {
//         // Draw the image onto the canvas
//         context.drawImage(image, 0, 0);

//         // Get the SVG's embedded images
//         const svgImages = svgEl.querySelectorAll("image");

//         // Load each embedded image and draw it onto the canvas
//         const loadImagePromises = Array.from(svgImages).map((svgImage) => {
//             return new Promise((resolve) => {
//                 const embeddedImage = new Image();
//                 embeddedImage.src = svgImage.href.baseVal;

//                 embeddedImage.onload = () => {
//                     // Get the position and size of the embedded image in the SVG
//                     const x = svgImage.x.baseVal.value;
//                     const y = svgImage.y.baseVal.value;
//                     const imgWidth = svgImage.width.baseVal.value;
//                     const imgHeight = svgImage.height.baseVal.value;

//                     // Draw the embedded image onto the canvas
//                     context.drawImage(embeddedImage, x, y, imgWidth, imgHeight);

//                     resolve();
//                 };
//             });
//         });

//         // Wait for all embedded images to load and draw onto the canvas
//         Promise.all(loadImagePromises).then(() => {
//             // Convert the canvas to a data URL based on the chosen format
//             let imageUrl;
//             let fileExtension;
//             if (format === "png") {
//                 imageUrl = canvas.toDataURL("image/png");
//                 fileExtension = "png";
//             } else if (format === "jpeg" || format === "jpg") {
//                 imageUrl = canvas.toDataURL("image/jpeg");
//                 fileExtension = "jpeg";
//             } else if (format === "svg") {
//                 imageUrl = svgUrl;
//                 fileExtension = "svg";
//             } else {
//                 console.error("Invalid format. Supported formats: png, jpeg, jpg, svg");
//                 return;
//             }

//             // Create a download link for the image file
//             const downloadLink = document.createElement("a");
//             downloadLink.href = imageUrl;
//             downloadLink.download = name + "." + fileExtension;

//             // Add the download link to the document
//             document.body.appendChild(downloadLink);

//             // Simulate a click on the download link
//             downloadLink.click();

//             // Remove the download link from the document
//             document.body.removeChild(downloadLink);
//         });
//     };
// }

export { saveGraph, openFile, fixFormat, saveImage }