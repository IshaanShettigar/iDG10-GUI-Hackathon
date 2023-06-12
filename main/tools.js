/* This file contains element tool and link tool definitions */

/* ELEMENT TOOLS */

///////////////////////////////////////////////////////////////
//      Rotate Control Tool         //
///////////////////////////////////////////////////////////////
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

const setPositionAll = (view, coordinates, getPos) => {
    const { model } = view;
    const { width, height } = model.size();
    const center = new g.Point(width / 2, height / 2);
    const angle = center.angleBetween(coordinates, getPos(view));
    model.rotate(Math.round(angle));
}

const getPositionIWST = (view) => {
    const { model } = view;
    const { width, height } = model.size()
    return new g.Point(width / 2, -height / 1.2);
}

const RotateToolIWST = joint.elementTools.Control.extend({
    children: rotateChildren,
    getPosition: function (view) {
        return getPositionIWST(view)
    },
    setPosition: function (view, coordinates) {
        setPositionAll(view, coordinates, this.getPosition)
    }
});

const getPositionUTA = (view) => {
    const { model } = view;
    const { width, height } = model.size()
    return new g.Point(width / 2, -height / 1.8);
}

const RotateToolUTA = joint.elementTools.Control.extend({
    children: rotateChildren,
    getPosition: function (view) {
        return getPositionUTA(view)
    },
    setPosition: function (view, coordinates) {
        setPositionAll(view, coordinates, this.getPosition)
    }
});

const getPositionSubseaPump = (view) => {
    const { model } = view;
    const { width, height } = model.size()
    return new g.Point(width / 2, -height / 2);
}

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


export {
    rotateChildren, getPositionIWST, setPositionAll, RotateToolIWST, RotateToolUTA, RotateToolSubseaPump,
    RotateToolPlatform, RotateToolSubseaSeparator, RotateToolManifold,
    ResizeToolBottomLeftST, ResizeToolBottomRightST, ResizeToolTopLeftST, ResizeToolTopRightST
}