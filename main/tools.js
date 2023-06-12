/* This file contains element tool and link tool definitions */

/* ELEMENT TOOLS */
// Rotate Control Tool
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


export {
    rotateChildren, getPositionIWST, setPositionAll, RotateToolIWST, RotateToolUTA, RotateToolSubseaPump,
    RotateToolPlatform, RotateToolSubseaSeparator, RotateToolManifold
}