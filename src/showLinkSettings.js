import * as joint from 'jointjs';
import { displayLinkHighlight, removeHighlight } from "./utils.js";
import { connectorSettingsWrapper, populateConnectorSettings, elementSettingsWrapper, selectedLinkView, mainGraph, mask, mainPaper } from './main.js';

/**
 * @constant {joint.dia.linkTools} showLinkSettings
 * Defines the button that will trigger the connector settings popup on the left hand side when clicked
 */
export var showLinkSettings = joint.linkTools.Button.extend({
    name: "show-link-settings",
    options: {
        markup: [
            {
                tagName: "circle",
                selector: "outer",
                attributes: {
                    r: 9,
                    fill: "#ffffff",
                    cursor: "pointer",
                },
            },
            {
                tagName: "circle",
                selector: "button",
                attributes: {
                    r: 7,
                    fill: "#000000",
                    cursor: "pointer",
                },
            },
            {
                tagName: "path",
                selector: "icon",
                attributes: {
                    d: "M -2 4 2 4 M 0 3 0 0 M -2 -1 1 -1 M -1 -4 1 -4",
                    fill: "none",
                    stroke: "#FFFFFF",
                    "stroke-width": 2,
                    "pointer-events": "none",
                },
            },
        ],
        distance: "50%",
        offset: 0,
        action: function (evt, linkView, buttonView) {
            // console.log(linkView.model.attributes.attrs)
            connectorSettingsWrapper.classList.add('is-active');
            populateConnectorSettings(linkView.model);
            elementSettingsWrapper.classList.remove('is-active');
            selectedLinkView = linkView;
            removeHighlight(mainGraph, mask, mainPaper);
            // highlight the link
            displayLinkHighlight(linkView, mainGraph, mask, mainPaper);
        },
    },
});
