/* This file contains element tool and link tool definitions */

/* ELEMENT TOOLS */

///////////////////////////////////////////////////////////////
//      Rotate Control Tool         //
///////////////////////////////////////////////////////////////

/**
 *  
 * This defines the markup of the Rotate Tool. Basically this control how the tool looks (the symbol used to represent it)
 */
const rotateChildren = [
    {
        tagName: "image",
        selector: "handle",
        attributes: {
            cursor: "pointer",
            x: -10,
            y: -10,
            width: 20,
            height: 20,
            "xlink:href": "https://assets.codepen.io/7589991/rotate.png"
        }
    },
    {
        tagName: "rect",
        selector: "extras",
        attributes: {
            "pointer-events": "none",
            fill: "none",
            stroke: "#33334F",
            "stroke-dasharray": "2,4",
            rx: 5,
            ry: 5
        }
    }
]


/**
 * This function is used for the Rotate Control Tool
 * It is used to change the oritentation of the element it belongs to based on how the user interacts with it.
 * @param {joint.dia.ElementView} view Element View
 * @param {Object} coordinates Coordinates
 * @param {function} getPos function that gets position of the rotate control tool
 */
const setPositionAll = (view, coordinates, getPos) => {
    const { model } = view;
    const { width, height } = model.size();
    // Find the center of the element
    const center = new g.Point(width / 2, height / 2);
    // Find the angle between the current mouse coordinates and position of the rotate control tool, while taking the centre as a reference
    const angle = center.angleBetween(coordinates, getPos(view));
    model.rotate(Math.round(angle));
}


/**
 * getPos function for Injection Well and Subsea Tree element
 * @param {joint.dia.ElementView} view Element View
 * @returns centre of the model
 */
const getPositionIWST = (view) => {
    const { model } = view;
    const { width, height } = model.size()
    return new g.Point(width / 2, -height / 1.2);
}

/**
 * Rotate Control Tool for Injection Well and Subsea Tree Element
 * It uses the setPositionAll function and the getPositionIWST function
 */
const RotateToolIWST = joint.elementTools.Control.extend({
    children: rotateChildren,
    getPosition: function (view) {
        return getPositionIWST(view)
    },
    setPosition: function (view, coordinates) {
        setPositionAll(view, coordinates, this.getPosition)
    }
});

/**
 * getPos function for UTA element
 * @param {joint.dia.ElementView} view Element View
 * @returns centre of the model
 */
const getPositionUTA = (view) => {
    const { model } = view;
    const { width, height } = model.size()
    return new g.Point(width / 2, -height / 1.8);
}

/**
 * Rotate Control Tool for UTA
 * It uses the setPositionAll function and the getPositionUTA function
 */
const RotateToolUTA = joint.elementTools.Control.extend({
    children: rotateChildren,
    getPosition: function (view) {
        return getPositionUTA(view)
    },
    setPosition: function (view, coordinates) {
        setPositionAll(view, coordinates, this.getPosition)
    }
});


/**
 * getPos function for Subsea Pump element
 * @param {joint.dia.ElementView} view Element View
 * @returns center of the element
 */
const getPositionSubseaPump = (view) => {
    const { model } = view;
    const { width, height } = model.size()
    return new g.Point(width / 2, -height / 2);
}

/**
 * Rotate Control Tool for Subsea Pump Element
 * It uses the setPositionAll function and the getPositionSubseaPump function
 */
const RotateToolSubseaPump = joint.elementTools.Control.extend({
    children: rotateChildren,
    getPosition: function (view) {
        return getPositionSubseaPump(view)
    },
    setPosition: function (view, coordinates) {
        setPositionAll(view, coordinates, this.getPosition)
    }
});

const getPositionPlatform = (view) => {
    const { model } = view;
    const { width, height } = model.size()
    return new g.Point(width / 2, -height * 4.5);
}

const RotateToolPlatform = joint.elementTools.Control.extend({
    children: rotateChildren,
    getPosition: function (view) {
        return getPositionPlatform(view)
    },
    setPosition: function (view, coordinates) {
        setPositionAll(view, coordinates, this.getPosition)
    }
});

const getPositionSubSeaSeparator = (view) => {
    const { model } = view;
    const { width, height } = model.size()
    return new g.Point(width / 2, -height / 1.2);
}

const RotateToolSubseaSeparator = joint.elementTools.Control.extend({
    children: rotateChildren,
    getPosition: function (view) {
        return getPositionSubSeaSeparator(view)
    },
    setPosition: function (view, coordinates) {
        setPositionAll(view, coordinates, this.getPosition)
    }
});

const getPositionManifold = (view) => {
    const { model } = view;
    const { width, height } = model.size()
    return new g.Point(width / 2, -height * 1.2);
}

const RotateToolManifold = joint.elementTools.Control.extend({
    children: rotateChildren,
    getPosition: function (view) {
        return getPositionManifold(view)
    },
    setPosition: function (view, coordinates) {
        setPositionAll(view, coordinates, this.getPosition)
    }
});


const getPositionFPSO = (view) => {
    const { model } = view;
    const { width, height } = model.size()
    return new g.Point(width / 2, -height * 2.5);
}

const RotateToolFPSO = joint.elementTools.Control.extend({
    children: rotateChildren,
    getPosition: function (view) {
        return getPositionFPSO(view)
    },
    setPosition: function (view, coordinates) {
        setPositionAll(view, coordinates, this.getPosition)
    }
});


const getPositionPLET = (view) => {
    const { model } = view;
    const { width, height } = model.size()
    return new g.Point(width / 2, -height * 0.5);
}

const RotateToolPLET = joint.elementTools.Control.extend({
    children: rotateChildren,
    getPosition: function (view) {
        return getPositionPLET(view)
    },
    setPosition: function (view, coordinates) {
        setPositionAll(view, coordinates, this.getPosition)
    }
});

//////////////////////////////////////////////////////////////////////////////
//        Resize Tool       //
//////////////////////////////////////////////////////////////////////////////
const ResizeToolBottomRightST = joint.elementTools.Control.extend({
    getPosition: function (view) {
        // console.log("view", view);
        const model = view.model;
        const { width, height } = model.size()
        return { x: width + 0.25 * width + 10, y: height + 0.25 * height + 10 };

    },
    setPosition: function (view, coordinates) {
        const model = view.model;
        const { width, height } = model.size()
        model.resize(
            Math.max(coordinates.x - 0.25 * width - 10, 1),
            Math.max(coordinates.y - 0.25 * height - 10, 1)
        );
    },
});

const ResizeToolBottomLeftST = joint.elementTools.Control.extend({
    getPosition: function (view) {
        const model = view.model;
        const { width, height } = model.size();
        return { x: 0 - 0.25 * width - 10, y: height + 0.25 * height + 10 };
    },
    setPosition: function (view, coordinates) {
        const model = view.model;
        const { width, height } = model.size();
        model.resize(
            Math.max(width - coordinates.x - 0.25 * width - 10, 1),
            Math.max(coordinates.y - 0.25 * height - 10, 1),
            { direction: "bottom-left" }
        );
    }
});

const ResizeToolTopLeftST = joint.elementTools.Control.extend({
    getPosition: function (view) {
        const model = view.model;
        const { width, height } = model.size();
        return { x: 0 - 0.25 * width - 10, y: 0 - 0.25 * height - 10 };
    },
    setPosition: function (view, coordinates) {
        const model = view.model;
        const { width, height } = model.size();
        model.resize(
            Math.max(width - coordinates.x - 0.25 * width - 10, 1),
            Math.max(height - coordinates.y - 0.25 * height - 10, 1),
            { direction: "top-left" }
        );
    }
});

const ResizeToolTopRightST = joint.elementTools.Control.extend({
    getPosition: function (view) {
        const model = view.model;
        const { width, height } = model.size();
        return { x: width + 0.25 * width + 10, y: 0 - 0.25 * height - 10 };
    },
    setPosition: function (view, coordinates) {
        const model = view.model;
        const { width, height } = model.size();
        model.resize(
            Math.max(coordinates.x - 0.25 * width - 10, 1),
            Math.max(height - coordinates.y - 0.25 * height - 10, 1),
            { direction: "top-right" }
        );
    }
});

// UTA
const ResizeToolBottomRightUTA = joint.elementTools.Control.extend({
    getPosition: function (view) {
        // console.log("view", view);
        const model = view.model;
        const { width, height } = model.size()
        return { x: width + 0.1 * width + 10, y: height + 10 };

    },
    setPosition: function (view, coordinates) {
        const model = view.model;
        const { width, height } = model.size()
        model.resize(
            Math.max(coordinates.x - 0.1 * width - 10, 1),
            Math.max(coordinates.y - 10, 1)
        );
    },
});

const ResizeToolBottomLeftUTA = joint.elementTools.Control.extend({
    getPosition: function (view) {
        const model = view.model;
        const { width, height } = model.size();
        return { x: 0 - 0.15 * width - 10, y: height + 10 };
    },
    setPosition: function (view, coordinates) {
        const model = view.model;
        const { width, height } = model.size();
        model.resize(
            Math.max(width - coordinates.x - 0.15 * width - 10, 1),
            Math.max(coordinates.y - 10, 1),
            { direction: "bottom-left" }
        );
    }
});

const ResizeToolTopLeftUTA = joint.elementTools.Control.extend({
    getPosition: function (view) {
        const model = view.model;
        const { width, height } = model.size();
        return { x: 0 - 0.15 * width - 10, y: 0 - 10 };
    },
    setPosition: function (view, coordinates) {
        const model = view.model;
        const { width, height } = model.size();
        model.resize(
            Math.max(width - coordinates.x - 0.15 * width - 10, 1),
            Math.max(height - coordinates.y - 10, 1),
            { direction: "top-left" }
        );
    }
});

const ResizeToolTopRightUTA = joint.elementTools.Control.extend({
    getPosition: function (view) {
        const model = view.model;
        const { width, height } = model.size();
        return { x: width + 0.1 * width + 10, y: 0 - 10 };
    },
    setPosition: function (view, coordinates) {
        const model = view.model;
        const { width, height } = model.size();
        model.resize(
            Math.max(coordinates.x - 0.1 * width - 10, 1),
            Math.max(height - coordinates.y - 10, 1),
            { direction: "top-right" }
        );
    }
});


// SUBSEA SEPARATOR (small bug with top right and top left (ignore))
const ResizeToolBottomRightSS = joint.elementTools.Control.extend({
    getPosition: function (view) {
        // console.log("view", view);
        const model = view.model;
        const { width, height } = model.size()
        return { x: width + 0.1 * width + 10, y: height + 0.03 * height + 10 };

    },
    setPosition: function (view, coordinates) {
        const model = view.model;
        const { width, height } = model.size()
        model.resize(
            Math.max(coordinates.x - 0.1 * width - 10, 1),
            Math.max(coordinates.y - 10 + 0.03 * height, 1)
        );
    },
});

const ResizeToolBottomLeftSS = joint.elementTools.Control.extend({
    getPosition: function (view) {
        const model = view.model;
        const { width, height } = model.size();
        return { x: 0 - 0.15 * width - 10, y: height + 0.03 * height + 10 };
    },
    setPosition: function (view, coordinates) {
        const model = view.model;
        const { width, height } = model.size();
        model.resize(
            Math.max(width - coordinates.x - 0.15 * width - 10, 1),
            Math.max(coordinates.y - 0.03 * height - 10, 1),
            { direction: "bottom-left" }
        );
    }
});

const ResizeToolTopLeftSS = joint.elementTools.Control.extend({
    getPosition: function (view) {
        const model = view.model;
        const { width, height } = model.size();
        return { x: 0 - 0.15 * width - 10, y: 0 - 0.09 * height - 10 };
    },
    setPosition: function (view, coordinates) {
        const model = view.model;
        const { width, height } = model.size();
        model.resize(
            Math.max(width - coordinates.x - 0.15 * width - 10, 1),
            Math.max(height - coordinates.y - 0.09 * height - 10, 1),
            { direction: "top-left" }
        );
    }
});

const ResizeToolTopRightSS = joint.elementTools.Control.extend({
    getPosition: function (view) {
        const model = view.model;
        const { width, height } = model.size();
        return { x: width + 0.1 * width + 10, y: 0 - 0.09 * height - 10 };
    },
    setPosition: function (view, coordinates) {
        const model = view.model;
        const { width, height } = model.size();
        model.resize(
            Math.max(coordinates.x - 0.1 * width - 10, 1),
            Math.max(height - coordinates.y - 0.09 * height - 10, 1),
            { direction: "top-right" }
        );
    }
});

// PLATFORM
const ResizeToolBottomRightPLATFORM = joint.elementTools.Control.extend({
    getPosition: function (view) {
        // console.log("view", view);
        const model = view.model;
        const { width, height } = model.size()
        return { x: width + 0.1 * width + 10, y: height + 10 };

    },
    setPosition: function (view, coordinates) {
        const model = view.model;
        const { width, height } = model.size()
        model.resize(
            Math.max(coordinates.x - 0.1 * width - 10, 1),
            Math.max(coordinates.y - 10, 1)
        );
    },
});

const ResizeToolBottomLeftPLATFORM = joint.elementTools.Control.extend({
    getPosition: function (view) {
        const model = view.model;
        const { width, height } = model.size();
        return { x: 0 - 0.15 * width - 10, y: height + 10 };
    },
    setPosition: function (view, coordinates) {
        const model = view.model;
        const { width, height } = model.size();
        model.resize(
            Math.max(width - coordinates.x - 0.15 * width - 10, 1),
            Math.max(coordinates.y - 10, 1),
            { direction: "bottom-left" }
        );
    }
});

const ResizeToolTopLeftPLATFORM = joint.elementTools.Control.extend({
    getPosition: function (view) {
        const model = view.model;
        const { width, height } = model.size();
        return { x: 0 - 0.15 * width - 10, y: 0 - 10 };
    },
    setPosition: function (view, coordinates) {
        const model = view.model;
        const { width, height } = model.size();
        model.resize(
            Math.max(width - coordinates.x - 0.15 * width - 10, 1),
            Math.max(height - coordinates.y - 10, 1),
            { direction: "top-left" }
        );
    }
});

const ResizeToolTopRightPLATFORM = joint.elementTools.Control.extend({
    getPosition: function (view) {
        const model = view.model;
        const { width, height } = model.size();
        return { x: width + 0.1 * width + 10, y: 0 - 3 * height - 10 };
    },
    setPosition: function (view, coordinates) {
        const model = view.model;
        const { width, height } = model.size();
        model.resize(
            Math.max(coordinates.x - 0.1 * width - 10, 1),
            Math.max(height - coordinates.y - 10 - 3 * height, 1),
            { direction: "top-right" }
        );
    }
});


// UTH and PLET
const ResizeToolBottomRightUTH = joint.elementTools.Control.extend({
    getPosition: function (view) {
        // console.log("view", view);
        const model = view.model;
        const { width, height } = model.size()
        return { x: width + 10, y: height + 10 };

    },
    setPosition: function (view, coordinates) {
        const model = view.model;
        const { width, height } = model.size()
        model.resize(
            Math.max(coordinates.x - 10, 1),
            Math.max(coordinates.y - 10, 1)
        );
    },
});

const ResizeToolBottomLeftUTH = joint.elementTools.Control.extend({
    getPosition: function (view) {
        const model = view.model;
        const { width, height } = model.size();
        return { x: 0 - 10, y: height + 10 };
    },
    setPosition: function (view, coordinates) {
        const model = view.model;
        const { width, height } = model.size();
        model.resize(
            Math.max(width - coordinates.x - 10, 1),
            Math.max(coordinates.y - 10, 1),
            { direction: "bottom-left" }
        );
    }
});

const ResizeToolTopLeftUTH = joint.elementTools.Control.extend({
    getPosition: function (view) {
        const model = view.model;
        const { width, height } = model.size();
        return { x: 0 - 10, y: 0 - 10 };
    },
    setPosition: function (view, coordinates) {
        const model = view.model;
        const { width, height } = model.size();
        model.resize(
            Math.max(width - coordinates.x - 10, 1),
            Math.max(height - coordinates.y - 10, 1),
            { direction: "top-left" }
        );
    }
});

const ResizeToolTopRightUTH = joint.elementTools.Control.extend({
    getPosition: function (view) {
        const model = view.model;
        const { width, height } = model.size();
        return { x: width + 10, y: 0 - 10 };
    },
    setPosition: function (view, coordinates) {
        const model = view.model;
        const { width, height } = model.size();
        model.resize(
            Math.max(coordinates.x - 10, 1),
            Math.max(height - coordinates.y - 10, 1),
            { direction: "top-right" }
        );
    }
});

// PLEM
const ResizeToolBottomRightPLEM = joint.elementTools.Control.extend({
    getPosition: function (view) {
        // console.log("view", view);
        const model = view.model;
        const { width, height } = model.size()
        return { x: width + 0 * width + 10, y: height + 10 };

    },
    setPosition: function (view, coordinates) {
        const model = view.model;
        const { width, height } = model.size()
        model.resize(
            Math.max(coordinates.x - 0 * width - 10, 1),
            Math.max(coordinates.y - 10, 1)
        );
    },
});

const ResizeToolBottomLeftPLEM = joint.elementTools.Control.extend({
    getPosition: function (view) {
        const model = view.model;
        const { width, height } = model.size();
        return { x: 0 - 0.3 * width - 10, y: height + 10 };
    },
    setPosition: function (view, coordinates) {
        const model = view.model;
        const { width, height } = model.size();
        model.resize(
            Math.max(width - coordinates.x - 0.3 * width - 10, 1),
            Math.max(coordinates.y - 10, 1),
            { direction: "bottom-left" }
        );
    }
});

const ResizeToolTopLeftPLEM = joint.elementTools.Control.extend({
    getPosition: function (view) {
        const model = view.model;
        const { width, height } = model.size();
        return { x: 0 - 0.3 * width - 10, y: 0 - 0.3 * height - 10 };
    },
    setPosition: function (view, coordinates) {
        const model = view.model;
        const { width, height } = model.size();
        model.resize(
            Math.max(width - coordinates.x - 0.3 * width - 10, 1),
            Math.max(height - coordinates.y - 0.3 * height - 10, 1),
            { direction: "top-left" }
        );
    }
});

const ResizeToolTopRightPLEM = joint.elementTools.Control.extend({
    getPosition: function (view) {
        const model = view.model;
        const { width, height } = model.size();
        return { x: width + 10, y: 0 - 0.3 * height - 10 };
    },
    setPosition: function (view, coordinates) {
        const model = view.model;
        const { width, height } = model.size();
        model.resize(
            Math.max(coordinates.x - 10, 1),
            Math.max(height - coordinates.y - 0.3 * height - 10, 1),
            { direction: "top-right" }
        );
    }
});

// FPSO
const ResizeToolBottomRightFPSO = joint.elementTools.Control.extend({
    getPosition: function (view) {
        // console.log("view", view);
        const model = view.model;
        const { width, height } = model.size()
        return { x: width + 0.2 * width + 10, y: 1.05 * height + 10 };

    },
    setPosition: function (view, coordinates) {
        const model = view.model;
        const { width, height } = model.size()
        model.resize(
            Math.max(coordinates.x - 0.2 * width - 10, 1),
            Math.max(coordinates.y - 0.05 * height - 10, 1)
        );
    },
});

const ResizeToolBottomLeftFPSO = joint.elementTools.Control.extend({
    getPosition: function (view) {
        const model = view.model;
        const { width, height } = model.size();
        return { x: 0 - 0.2 * width - 10, y: 1.05 * height + 10 };
    },
    setPosition: function (view, coordinates) {
        const model = view.model;
        const { width, height } = model.size();
        model.resize(
            Math.max(width - coordinates.x - 0.2 * width - 10, 1),
            Math.max(coordinates.y - 10 - 0.05 * height, 1),
            { direction: "bottom-left" }
        );
    }
});

const ResizeToolTopLeftFPSO = joint.elementTools.Control.extend({
    getPosition: function (view) {
        const model = view.model;
        const { width, height } = model.size();
        return { x: 0 - 0.2 * width - 10, y: 0 - 10 };
    },
    setPosition: function (view, coordinates) {
        const model = view.model;
        const { width, height } = model.size();
        model.resize(
            Math.max(width - coordinates.x - 0.2 * width - 10, 1),
            height - coordinates.y - 10,
            { direction: "top-left" }
        );
    }
});

const ResizeToolTopRightFPSO = joint.elementTools.Control.extend({
    getPosition: function (view) {
        const model = view.model;
        const { width, height } = model.size();
        return { x: width + 0.2 * width + 10, y: 0 - 10 };
    },
    setPosition: function (view, coordinates) {
        const model = view.model;
        const { width, height } = model.size();
        model.resize(
            Math.max(coordinates.x - 0.2 * width - 10, 1),
            Math.max(height - coordinates.y - 10, 1),
            { direction: "top-right" }
        );
    }
});
export {
    rotateChildren, getPositionIWST, setPositionAll, RotateToolIWST, RotateToolUTA, RotateToolSubseaPump,
    RotateToolPlatform, RotateToolSubseaSeparator, RotateToolManifold, RotateToolFPSO, RotateToolPLET,
    ResizeToolBottomLeftST, ResizeToolBottomRightST, ResizeToolTopLeftST, ResizeToolTopRightST,
    ResizeToolBottomRightUTA, ResizeToolBottomLeftUTA, ResizeToolTopLeftUTA, ResizeToolTopRightUTA,
    ResizeToolBottomRightSS, ResizeToolBottomLeftSS, ResizeToolTopLeftSS, ResizeToolTopRightSS,
    ResizeToolBottomRightPLATFORM, ResizeToolBottomLeftPLATFORM, ResizeToolTopLeftPLATFORM, ResizeToolTopRightPLATFORM,
    ResizeToolBottomLeftUTH, ResizeToolBottomRightUTH, ResizeToolTopLeftUTH, ResizeToolTopRightUTH,
    ResizeToolBottomLeftPLEM, ResizeToolBottomRightPLEM, ResizeToolTopLeftPLEM, ResizeToolTopRightPLEM,
    ResizeToolBottomLeftFPSO, ResizeToolBottomRightFPSO, ResizeToolTopLeftFPSO, ResizeToolTopRightFPSO
}