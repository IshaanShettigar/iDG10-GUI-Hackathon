import $ from 'jquery';
import _ from 'lodash';
import * as joint from 'jointjs';
import { Canvg } from 'canvg';
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


/** Save as PNG */
function generateLink(fileName, data) {
    var link = document.createElement('a');
    link.download = fileName;
    link.href = data;
    return link;
}

function SVG2PNG(svg, callback) {
    var canvas = document.createElement('canvas'); // Create a Canvas element.
    var ctx = canvas.getContext('2d'); // For Canvas returns 2D graphic.
    var data = svg.outerHTML; // Get SVG element as HTML code.
    Canvg(canvas, data); // Render SVG on Canvas.
    callback(canvas); // Execute callback function.
}

const saveAsPNG = () => { // Bind click event on download button.
    var element = document.getElementById("v-166"); // Get SVG element.
    SVG2PNG(element, function (canvas) {
        // Arguments: SVG element, callback function.
        var base64 = canvas.toDataURL("image/png"); // toDataURL return DataURI as Base64 format.
        generateLink("SVG2PNG-01.png", base64).click(); // Trigger the Link is made by Link Generator and download.
    });
}

/**
 * 
 * @param {SVG} svgEl SVG element 
 * @param {String} name name of the file 
 */
function saveSvg(svgEl, name) {
    /*
    Download the diagram as a SVG file
    */
    // Serialize the SVG HTML data
    let svgData = new XMLSerializer().serializeToString(svgEl)
    // Clean the HTML tootltips out of the SVG data
    svgData = svgData.replace(/data-bs-title=".*?"/gm, '')
    // Build the base64 SVG image data
    const image64 = 'data:image/svg+xml;base64,' + window.btoa(svgData)
    // Create a download URL for the SVG file
    const img = document.createElement('img')
    // Set the source for the image to the base64 image data
    img.src = image64
    // Create a link for the download
    const downloadLink = document.createElement('a')
    // Set the URL for the download link
    downloadLink.href = image64
    // Set the file name
    downloadLink.download = name
    // Add the download link to the document
    document.body.appendChild(downloadLink)
    // Simulate a click on the link
    downloadLink.click()
    // Remove the link from the document
    document.body.removeChild(downloadLink)
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

export { saveGraph, openFile, fixFormat, saveAsPNG, saveImage, saveSvg }