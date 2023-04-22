const yellowRect = joint.dia.Element.define(
    "yellowRect",
    {
        attrs: {
            l1: {
                x1: "0",
                y1: "calc(0.25*h)",
                x2: "calc(-0.35*w)", // modify this to control to length of the line
                y2: "calc(0.25*h)",
                strokeWidth: 3,
                stroke: "red",
                fill: "none",
            },
            l2: {
                x1: "0",
                y1: "calc(0.5*h)",
                x2: "calc(-0.35*w)",
                y2: "calc(0.5*h)",
                strokeWidth: 3,
                stroke: "blue",
                fill: "none",
            },
            l3: {
                x1: "0",
                y1: "calc(0.75*h)",
                x2: "calc(-0.35*w)",
                y2: "calc(0.75*h)",
                strokeWidth: 3,
                stroke: "green",
                fill: "none",
            },
            l4: {
                x1: "calc(w)",
                y1: "calc(0.33*h)",
                x2: "calc(1.35*w)", // controls the length
                y2: "calc(0.33*h)",
                strokeWidth: 3,
                stroke: "red",
                fill: "none",
            },
            l5: {
                x1: "calc(w)",
                y1: "calc(0.67*h)",
                x2: "calc(1.35*w)", // controls the length
                y2: "calc(0.67*h)",
                strokeWidth: 3,
                stroke: "blue",
                fill: "none",
            },
            outline: {
                x: 0,
                y: 0,
                width: "calc(w)",
                height: "calc(h)",
                strokeWidth: 1,
                stroke: "#000000",
                fill: "#fac905",
            },
        },
    },
    {
        markup: [
            {
                tagName: "line",
                selector: "l1",
            },
            {
                tagName: "line",
                selector: "l2",
            },
            {
                tagName: "line",
                selector: "l3",
            },
            {
                tagName: "line",
                selector: "l4",
            },
            {
                tagName: "line",
                selector: "l5",
            },
            {
                tagName: "rect",
                selector: "outline",
            },
        ],
    }
);


const blueRect = joint.dia.Element.define(
    "blueRect",
    {
        attrs: {
            l1: {
                x1: "calc(w)",
                y1: "calc(h)",
                x2: "calc(1.25*w)",
                y2: "calc(1.25*h)",
                strokeWidth: 3,
                stroke: "black",
                fill: "rgba(0,255,0,0.3)",
            },
            l2: {
                x1: "0",
                y1: "0",
                x2: "calc(-0.25*w)",
                y2: "calc(-0.25*h)",
                strokeWidth: 3,
                stroke: "black",
                fill: "rgba(0,255,0,0.3)",
            },
            l3: {
                x1: "calc(w)",
                y1: "0",
                x2: "calc(1.25*w)",
                y2: "calc(-0.25*h)",
                strokeWidth: 3,
                stroke: "black",
                fill: "rgba(0,255,0,0.3)",
            },
            l4: {
                x1: "0",
                y1: "calc(h)",
                x2: "calc(-0.25*w)",
                y2: "calc(1.25*h)",
                strokeWidth: 3,
                stroke: "black",
                fill: "rgba(0,255,0,0.3)",
            },
            outline: {
                x: 0,
                y: 0,
                width: "calc(w)",
                height: "calc(h)",
                strokeWidth: 1,
                stroke: "#000000",
                fill: "#035afc",
            },
        },
    },
    {
        markup: [
            {
                tagName: "line",
                selector: "l1",
            },
            {
                tagName: "line",
                selector: "l2",
            },
            {
                tagName: "line",
                selector: "l3",
            },
            {
                tagName: "line",
                selector: "l4",
            },
            {
                tagName: "rect",
                selector: "outline",
            },
        ],
    }
);


const oilRig = joint.dia.Element.define(
    "oilRig",
    {
        attrs: {
            red_line: {
                x1: "calc(0.79*w)",
                y1: "calc(1*h)",
                x2: "calc(0.79*w)",
                y2: "calc(2.5*h)",
                strokeWidth: 3,
                stroke: "red",
            },
            blue_line: {
                x1: "calc(0.72*w)",
                y1: "calc(1*h)",
                x2: "calc(0.72*w)",
                y2: "calc(2.5*h)",
                strokeWidth: 3,
                stroke: "blue",
            },
            green_line: {
                x1: "calc(0.245*w)",
                y1: "calc(1*h)",
                x2: "calc(0.245*w)",
                y2: "calc(2.5*h)",
                strokeWidth: 3,
                stroke: "green",
            },
            vertical_black_line: {
                x1: "calc(0.9*w)",
                y1: "-calc(2.1*h)",
                x2: "calc(0.9*w)",
                y2: "-calc(0.9*h)",
                strokeWidth: 2,
                stroke: "#000000",
            },
            no_fill_polygon: {
                points:
                    "calc(0.44*w) -calc(0.8*h) calc(0.9*w) -calc(2.27*h) calc(0.95*w) -calc(2*h) calc(0.49*w) -calc(0.5*h)",
                strokeWidth: 1,
                stroke: "#000000",
                fill: "none",
            },
            yellow_polygon: {
                points:
                    "calc(0.2*w) -calc(0.8*h) calc(0.23*w) -calc(2.9*h) calc(0.30*w) -calc(2.9*h) calc(0.33*w) -calc(0.8*h)  ",
                strokeWidth: 1,
                stroke: "black",
                fill: "#fac905",
            },
            bottom_r1: {
                x: "calc(0.65*w)",
                y: "calc(h)",
                width: "calc(0.8*h)", //both w & h are as we need a square, using h as ref here
                height: "calc(0.8*h)",
                strokeWidth: 1,
                stroke: "black",
                fill: "none",
            },
            bottom_r2: {
                x: "calc(0.15*w)",
                y: "calc(h)",
                width: "calc(0.8*h)", //both w & h are as we need a square, using h as ref here
                height: "calc(0.8*h)",
                strokeWidth: 1,
                stroke: "black",
                fill: "none",
            },
            sub_rect: {
                x: "calc(0.1*w)",
                y: "-calc(0.8*h)",
                width: "calc(0.40*w)",
                height: "calc(0.8*h)",
                strokeWidth: 1,
                stroke: "black",
                fill: "#fac905",
            },

            outline: {
                x: 0,
                y: 0,
                width: "calc(w)",
                height: "calc(h)",
                strokeWidth: 1,
                stroke: "#000000",
                fill: "#035afc",
            },
        },
    },
    {
        markup: [
            {
                tagName: "line",
                selector: "red_line",
            },
            {
                tagName: "line",
                selector: "blue_line",
            },
            {
                tagName: "line",
                selector: "green_line",
            },
            {
                tagName: "line",
                selector: "vertical_black_line",
            },
            {
                tagName: "polygon",
                selector: "no_fill_polygon",
            },
            {
                tagName: "polygon",
                selector: "yellow_polygon",
            },
            {
                tagName: "rect",
                selector: "sub_rect",
            },
            {
                tagName: "rect",
                selector: "bottom_r1",
            },
            {
                tagName: "rect",
                selector: "bottom_r2",
            },
            {
                tagName: "rect",
                selector: "outline",
            },
        ],
    }
);


export { yellowRect, blueRect, oilRig }