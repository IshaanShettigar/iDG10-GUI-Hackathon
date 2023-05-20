/*
Injection Well and Subsea Tree = InjectionWellST
Production Well and Subsea Tree = ProductionWellST
*/


const manifold = joint.dia.Element.define(
    "manifold",
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
            l6: {
                strokeWidth: 3,
                stroke: 'green',
                fill: 'none',
                x1: 'calc(0.5*w)',
                y1: '0',
                x2: 'calc(0.5*w)',
                y2: 'calc(-0.35*h)'

            },
            l7: {
                strokeWidth: 3,
                stroke: 'black',
                fill: 'none',
                x1: 'calc(0.7*w)',
                y1: '0',
                x2: 'calc(0.7*w)',
                y2: 'calc(1.35*h)'
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


const injectionWellST = joint.dia.Element.define(
    "injectionWellST",
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


const productionWellST = joint.dia.Element.define(
    "productionWellST",
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
                fill: "#02a31d",
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


const platform = joint.dia.Element.define(
    "platform",
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

/* Might not work since we aint exporting borderRadiusUTA */
const borderRadiusUTA = 5;
const UTA = joint.dia.Element.define("UTA",
    {
        attrs: {
            innerRect: {
                d: `Mcalc(0.8*w),calc(0.78*h) hcalc(-0.6*w) 
                a${borderRadiusUTA},${borderRadiusUTA} 0 0 1 -${borderRadiusUTA},-${borderRadiusUTA} vcalc(-0.45*h) 
                a${borderRadiusUTA},${borderRadiusUTA} 0 0 1 ${borderRadiusUTA},-${borderRadiusUTA} hcalc(0.6*w)
                a${borderRadiusUTA},${borderRadiusUTA} 0 0 1 ${borderRadiusUTA},${borderRadiusUTA} vcalc(0.45*h)
                a${borderRadiusUTA},${borderRadiusUTA} 0 0 1 -${borderRadiusUTA},${borderRadiusUTA}`,
                stroke: '#4d71ab',
                strokeWidth: 2,
                fill: '#608bd1',
            },
            rightLine: {
                x1: 'calc(0.82*w)',
                y1: 'calc(0.5*h)',
                x2: 'calc(1.1*w)',
                y2: 'calc(0.5*h)',
                stroke: 'black',
                strokeWidth: 2,
                fill: 'none',
            },
            leftDashLine: {
                x1: 'calc(0.15*w)',
                y1: 'calc(0.5*h)',
                x2: 'calc(-0.15*w)',
                y2: 'calc(0.5*h)',
                stroke: 'black',
                strokeWidth: 2,
                strokeDasharray: '8 5',
                fill: 'none',
            },
            outline: {
                x: 0,
                y: 0,
                height: 'calc(h)',
                width: 'calc(w)',
                stroke: 'black',
                strokeWidth: 2,
                fill: 'none',
            },

        }
    },
    {
        markup: [
            {
                tagName: 'rect',
                selector: 'outline'
            },
            {
                tagName: 'path',
                selector: 'innerRect'
            },
            {
                tagName: 'line',
                selector: 'rightLine'
            },
            {
                tagName: 'line',
                selector: 'leftDashLine'
            }
        ]
    }
);


const subseaPump = joint.dia.Element.define('subseaPump', {
    attrs: {
        outline: {
            height: 'calc(h)',
            widght: 'calc(w)',
            stroke: 'black',
            strokeWidth: 1,
            fill: 'none'
        },
        leftLine: {
            stroke: '#02a31d',
            strokeWidth: 3,
            x1: 0,
            y1: 'calc(0.5*h)',
            x2: 'calc(-0.5*w)',
            y2: 'calc(0.5*h)',

        },
        rightLine: {
            stroke: '#02a31d',
            strokeWidth: 3,
            x1: 'calc(w)',
            y1: 'calc(0.5*h)',
            x2: 'calc(1.5*w)',
            y2: 'calc(0.5*h)',
        },
        pump: {
            d: `Mcalc(w),calc(0.5*h) 
            Acalc(0.5*w),calc(0.5*h) 0 0 1 0,calc(0.5*h)
            Acalc(0.5*w),calc(0.5*h) 0 0 1 calc(0.5*w),0
            Hcalc(w) Vcalc(0.15*h) Hcalc(0.8*w)
            Acalc(0.5*w),calc(0.5*h) 0 0 1 calc(w),calc(0.5*h)`,
            stroke: '#8c7103',
            strokeWidth: 2,
            fill: '#fac905',
        }
    }
},
    {
        markup: [
            {
                tagName: 'rect',
                selector: 'outline'
            },
            {
                tagName: 'path',
                selector: 'pump'
            },
            {
                tagName: 'line',
                selector: 'leftLine'
            },
            {
                tagName: 'line',
                selector: 'rightLine'
            }
        ]
    }
)

const borderRadiusSS = 7;
const subseaSeparator = joint.dia.Element.define("subseaSeparator",
    {
        attrs: {
            innerRect: {
                d: `Mcalc(0.87*w),calc(0.865*h) hcalc(-0.75*w) 
                a${borderRadiusUTA},${borderRadiusUTA} 0 0 1 -${borderRadiusUTA},-${borderRadiusUTA} vcalc(-0.65*h) 
                a${borderRadiusUTA},${borderRadiusUTA} 0 0 1 ${borderRadiusUTA},-${borderRadiusUTA} hcalc(0.75*w)
                a${borderRadiusUTA},${borderRadiusUTA} 0 0 1 ${borderRadiusUTA},${borderRadiusUTA} vcalc(0.65*h)
                a${borderRadiusUTA},${borderRadiusUTA} 0 0 1 -${borderRadiusUTA},${borderRadiusUTA}`,
                stroke: '#4d71ab',
                strokeWidth: 2,
                fill: '#02a31d',
            },
            rightLine: {
                x1: 'calc(0.9*w)',
                y1: 'calc(0.5*h)',
                x2: 'calc(1.1*w)',
                y2: 'calc(0.5*h)',
                stroke: 'black',
                strokeWidth: 2,
                fill: 'none',
            },
            leftDashLine: {
                x1: 'calc(0.10*w)',
                y1: 'calc(0.5*h)',
                x2: 'calc(-0.15*w)',
                y2: 'calc(0.5*h)',
                stroke: 'black',
                strokeWidth: 2,
                strokeDasharray: '8 5',
                fill: 'none',
            },
            outline: {
                x: 0,
                y: 0,
                height: 'calc(h)',
                width: 'calc(w)',
                stroke: 'none',
                fill: 'none',
            },
            outerRect: {
                strokeWidth: 2,
                stroke: 'black',
                d: `Mcalc(0.97*w),calc(1.03*h) hcalc(-0.95*w) 
                a${borderRadiusSS},${borderRadiusSS} 0 0 1 -${borderRadiusSS},-${borderRadiusSS} vcalc(-0.95*h) 
                a${borderRadiusSS},${borderRadiusSS} 0 0 1 ${borderRadiusSS},-${borderRadiusSS} hcalc(0.95*w)
                a${borderRadiusSS},${borderRadiusSS} 0 0 1 ${borderRadiusSS},${borderRadiusSS} vcalc(0.95*h)
                a${borderRadiusSS},${borderRadiusSS} 0 0 1 -${borderRadiusSS},${borderRadiusSS}`,
                fill: 'none'
            }

        }
    },
    {
        markup: [
            {
                tagName: 'rect',
                selector: 'outline'
            },
            {
                tagName: 'path',
                selector: 'innerRect'
            },
            {
                tagName: 'line',
                selector: 'rightLine'
            },
            {
                tagName: 'line',
                selector: 'leftDashLine'
            },
            {
                tagName: 'path',
                selector: 'outerRect'
            }
        ]
    }
)

export { subseaSeparator, subseaPump, UTA, productionWellST, injectionWellST, manifold, platform }