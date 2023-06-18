/*
Injection Well and Subsea Tree = InjectionWellST
Production Well and Subsea Tree = ProductionWellST
*/


/*
This file contains only element definitions
*/

// Port definitions
/**
 * 
 * This controls how the port looks.
 */
const portDetails = {
    magnet: true, r: 4, fill: 'rgba(255,255,255,1)'
}


/**
 * Element definition of the Manifold component
 */
const manifold = joint.dia.Element.define(
    "manifold",
    {
        attrs: {
            root: {
                magnet: false // Adding this prevents the ports from linking to the root
            },
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
        // adding ports
        ports: {
            groups: {
                main: {
                    position: 'absolute',
                    attrs: {
                        circle: portDetails
                    }
                },
            },
            items: [{
                id: 'p1',
                group: 'main',
                args: {
                    x: 'calc(w / 2)',
                    y: 0,

                },
            }, {
                id: 'p2',
                group: 'main',
                args: {
                    x: 'calc(w)',
                    y: 'calc(h/ 3)'
                },
            }, {
                id: 'p3',
                group: 'main',
                args: {
                    x: 'calc(w)',
                    y: 'calc(2*h/3)'
                }
            }, {
                id: 'p4',
                group: 'main',
                args: {
                    x: 'calc(0.7*w)',
                    y: 'calc(h)'
                }
            },
            {
                id: 'p5',
                group: 'main',
                args: {
                    x: 0,
                    y: 'calc(h/4)'
                }
            },
            {
                id: 'p6',
                group: 'main',
                args: {
                    x: 0,
                    y: 'calc(h/2)'
                }
            }, {
                id: 'p7',
                group: 'main',
                args: {
                    x: 0,
                    y: 'calc(3*h/4)'
                }
            }]
        }
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
                tagName: 'line',
                selector: 'l6'
            },
            {
                tagName: 'line',
                selector: 'l7'
            },
            {
                tagName: "rect",
                selector: "outline",
            },
        ],
    }
);

/**
 * Element definition of the Injection Well and Subsea Tree component
 */
const injectionWellST = joint.dia.Element.define(
    "injectionWellST",
    {
        attrs: {
            root: {
                magnet: false // Adding this prevents the ports from linking to the root
            },
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
        // adding ports
        ports: {
            groups: {
                main: {
                    position: 'absolute',
                    attrs: {
                        circle: portDetails
                    }
                },
            },
            items: [{
                id: 'p1',
                group: 'main',
                args: {
                    x: 'calc(w / 2)',
                    y: 0,

                },
            }, {
                id: 'p2',
                group: 'main',
                args: {
                    x: 'calc(w)',
                    y: 'calc(h/ 2)'
                },
            }, {
                id: 'p3',
                group: 'main',
                args: {
                    x: 'calc(w /2)',
                    y: 'calc(h)'
                }
            }, {
                id: 'p4',
                group: 'main',
                args: {
                    x: 0,
                    y: 'calc(h / 2)'
                }
            }]
        }
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

/**
 * Element definition of the Production Well and Subsea Tree component
 */
const productionWellST = joint.dia.Element.define(
    "productionWellST",
    {
        attrs: {
            root: {
                magnet: false // Adding this prevents the ports from linking to the root
            },
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
        // adding ports
        ports: {
            groups: {
                main: {
                    position: 'absolute',
                    attrs: {
                        circle: portDetails
                    }
                },
            },
            items: [{
                id: 'p1',
                group: 'main',
                args: {
                    x: 'calc(w / 2)',
                    y: 0,

                },
            }, {
                id: 'p2',
                group: 'main',
                args: {
                    x: 'calc(w)',
                    y: 'calc(h/ 2)'
                },
            }, {
                id: 'p3',
                group: 'main',
                args: {
                    x: 'calc(w /2)',
                    y: 'calc(h)'
                }
            }, {
                id: 'p4',
                group: 'main',
                args: {
                    x: 0,
                    y: 'calc(h / 2)'
                }
            }]
        }
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

/**
 * Element definition of the Platform component
 */
const platform = joint.dia.Element.define(
    "platform",
    {
        attrs: {
            root: {
                magnet: false // Adding this prevents the ports from linking to the root
            },
            red_line: {
                x1: "calc(0.8*w)",
                y1: "calc(1*h)",
                x2: "calc(0.8*w)",
                y2: "calc(2*h)",
                strokeWidth: 3,
                stroke: "red",
            },
            blue_line: {
                x1: "calc(0.7*w)",
                y1: "calc(1*h)",
                x2: "calc(0.7*w)",
                y2: "calc(2*h)",
                strokeWidth: 3,
                stroke: "blue",
            },
            green_line: {
                x1: "calc(0.245*w)",
                y1: "calc(1*h)",
                x2: "calc(0.245*w)",
                y2: "calc(2*h)",
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
                width: "calc(0.2*w)", //both w & h are as we need a square, using h as ref here
                height: "calc(0.8*h)",
                strokeWidth: 1,
                stroke: "black",
                fill: "none",
            },
            bottom_r2: {
                x: "calc(0.15*w)",
                y: "calc(h)",
                width: "calc(0.2*w)", //both w & h are as we need a square, using h as ref here
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
        ports: {
            groups: {
                main: {
                    position: 'absolute',
                    attrs: {
                        circle: portDetails
                    }
                },
            },
            items: [{
                id: 'p1',
                group: 'main',
                args: {
                    x: 'calc(0.245*w)',
                    y: 'calc(h)',

                },
            }, {
                id: 'p2',
                group: 'main',
                args: {
                    x: 'calc(0.7*w)',
                    y: 'calc(h)'
                },
            }, {
                id: 'p3',
                group: 'main',
                args: {
                    x: 'calc(0.8*w)',
                    y: 'calc(h)'
                }
            }]
        }
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

const borderRadiusUTA = 5;
/**
 * Element definition of the UTA component
 */
const UTA = joint.dia.Element.define("UTA",
    {
        attrs: {
            root: {
                magnet: false // Adding this prevents the ports from linking to the root
            },
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
            label: {
                text: "UTA",
                fontSize: 20,
                fontFamily: "Arial",
                x: "calc(0.27*w)",
                y: "calc(0.6*h)",
                fill: "#ffffff",
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

        },
        ports: {
            groups: {
                main: {
                    position: 'absolute',
                    attrs: {
                        circle: {
                            magnet: true, r: 4, fill: 'rgba(255,255,255,1)'
                        }
                    }
                },
            },
            items: [{
                id: 'p1',
                group: 'main',
                args: {
                    x: 0,
                    y: 'calc(h/2)',

                },
            }, {
                id: 'p2',
                group: 'main',
                args: {
                    x: 'calc(w)',
                    y: 'calc(h/ 2)'
                },
            }]
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
                tagName: 'text',
                selector: 'label'
            },
            {
                tagName: 'line',
                selector: 'leftDashLine'
            }
        ]
    }
);

/**
 * Element definition of the Subsea Pump component
 */
const subseaPump = joint.dia.Element.define('subseaPump', {
    attrs: {
        root: {
            magnet: false // Adding this prevents the ports from linking to the root
        },
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
    },
    // adding ports
    ports: {
        groups: {
            main: {
                position: 'absolute',
                attrs: {
                    circle: {
                        magnet: true, r: 4, fill: 'rgba(255,255,255,1)'
                    }
                }
            },
        },
        items: [{
            id: 'p1',
            group: 'main',
            args: {
                x: 0,
                y: 'calc(h/2)',

            },
        }, {
            id: 'p2',
            group: 'main',
            args: {
                x: 'calc(w)',
                y: 'calc(h/ 2)'
            },
        }]
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

/* We arent exporting borderRadiusSS */
const borderRadiusSS = 7;
/**
 * Element definition of the Subsea Separator component
 */
const subseaSeparator = joint.dia.Element.define("subseaSeparator",
    {
        attrs: {
            root: {
                magnet: false // Adding this prevents the ports from linking to the root
            },
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

        },
        ports: {
            groups: {
                main: {
                    position: 'absolute',
                    attrs: {
                        circle: {
                            magnet: true, r: 4, fill: 'rgba(255,255,255,1)'
                        }
                    }
                },
            },
            items: [{
                id: 'p1',
                group: 'main',
                args: {
                    x: 'calc(-0.07*w)',
                    y: 'calc(h/2)',

                },
            }, {
                id: 'p2',
                group: 'main',
                args: {
                    x: 'calc(1.07*w)',
                    y: 'calc(h/ 2)'
                },
            }]
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

/**
 * Element definition of the PLET component
 */
const PLET = joint.dia.Element.define("PLET",
    {
        attrs: {
            root: {
                magnet: false // Adding this prevents the ports from linking to the root
            },
            innerRect: {
                d: `Mcalc(0.8*w),calc(0.78*h) hcalc(-0.6*w) 
                a${borderRadiusUTA},${borderRadiusUTA} 0 0 1 -${borderRadiusUTA},-${borderRadiusUTA} vcalc(-0.45*h) 
                a${borderRadiusUTA},${borderRadiusUTA} 0 0 1 ${borderRadiusUTA},-${borderRadiusUTA} hcalc(0.6*w)
                a${borderRadiusUTA},${borderRadiusUTA} 0 0 1 ${borderRadiusUTA},${borderRadiusUTA} vcalc(0.45*h)
                a${borderRadiusUTA},${borderRadiusUTA} 0 0 1 -${borderRadiusUTA},${borderRadiusUTA}`,
                stroke: '#4d71ab',
                strokeWidth: 2,
                fill: '#fac905',
            },
            rightLine: {
                x1: 'calc(0.82*w)',
                y1: 'calc(0.5*h)',
                x2: 'calc(0.9*w)',
                y2: 'calc(0.5*h)',
                stroke: 'black',
                strokeWidth: 2,
                fill: 'none',
            },
            I: {
                d: `Mcalc(0.91*w),calc(0.4*h) Vcalc(0.6*h)
                    Mcalc(0.94*w),calc(0.4*h) Vcalc(0.6*h)
                    Mcalc(0.98*w),calc(0.4*h) Hcalc(0.87*w)
                    Mcalc(0.98*w),calc(0.6*h) Hcalc(0.87*w)
                    Mcalc(0.98*w),calc(0.6*h) Vcalc(0.56*h)
                    Mcalc(0.98*w),calc(0.4*h) Vcalc(0.44*h)
                    Mcalc(0.87*w),calc(0.4*h) Vcalc(0.44*h)
                    Mcalc(0.87*w),calc(0.6*h) Vcalc(0.56*h)
                    `,
                stroke: "#000000",
                strokeWidth: 1,
            },
            outline: {
                x: 0,
                y: 0,
                height: 'calc(h)',
                width: 'calc(w)',
                stroke: 'black',
                strokeWidth: 0,
                fill: 'none',
            },
        },
        ports: {
            groups: {
                main: {
                    position: 'absolute',
                    attrs: {
                        circle: {
                            magnet: true, r: 4, fill: 'rgba(255,255,255,1)'
                        }
                    }
                },
            },
            items: [{
                id: 'p1',
                group: 'main',
                args: {
                    x: 'calc(0.16*w)',
                    y: 'calc(h/2)',

                },
            }, {
                id: 'p2',
                group: 'main',
                args: {
                    x: 'calc(0.87*w)',
                    y: 'calc(h/ 2)'
                },
            }]
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
                tagName: 'path',
                selector: 'I'
            }
        ]
    }
)


/**
 * Element definition of the UTH component
 */
const UTH = joint.dia.Element.define("UTH",
    {
        attrs: {
            root: {
                magnet: false // Adding this prevents the ports from linking to the root
            },
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
            leftDashLine: {
                x1: 'calc(0.15*w)',
                y1: 'calc(0.5*h)',
                x2: 'calc(0.1*w)',
                y2: 'calc(0.5*h)',
                stroke: 'black',
                strokeWidth: 2,
                strokeDasharray: '8 5',
                fill: 'none',
            },
            I: {
                d: `Mcalc(0.1*w),calc(0.4*h) Vcalc(0.6*h)
                    Mcalc(0.07*w),calc(0.4*h) Vcalc(0.6*h)
                    Mcalc(0.03*w),calc(0.4*h) Hcalc(0.14*w)
                    Mcalc(0.03*w),calc(0.6*h) Hcalc(0.14*w)
                    Mcalc(0.03*w),calc(0.6*h) Vcalc(0.56*h)
                    Mcalc(0.03*w),calc(0.4*h) Vcalc(0.44*h)
                    Mcalc(0.14*w),calc(0.4*h) Vcalc(0.44*h)
                    Mcalc(0.14*w),calc(0.6*h) Vcalc(0.56*h)
                    `,
                stroke: "#000000",
                strokeWidth: 1,
            },
            label: {
                text: "UTH",
                fontSize: 25,
                fontFamily: "Arial",
                x: "calc(0.3*w)",
                y: "calc(0.6*h)",
                fill: "#ffffff",
            },
            outline: {
                x: 0,
                y: 0,
                height: 'calc(h)',
                width: 'calc(w)',
                stroke: 'black',
                strokeWidth: 0,
                fill: 'none',
            },

        },
        ports: {
            groups: {
                main: {
                    position: 'absolute',
                    attrs: {
                        circle: {
                            magnet: true, r: 4, fill: 'rgba(255,255,255,1)'
                        }
                    }
                },
            },
            items: [{
                id: 'p1',
                group: 'main',
                args: {
                    x: 'calc(0.13*w)',
                    y: 'calc(h/2)',

                },
            }, {
                id: 'p2',
                group: 'main',
                args: {
                    x: 'calc(0.84*w)',
                    y: 'calc(h/ 2)'
                },
            }]
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
                selector: 'leftDashLine'
            },
            {
                tagName: 'path',
                selector: 'I'
            },
            {
                tagName: 'text',
                selector: 'label'
            }
        ]
    }
)


/**
 * Element definition of the FPSO component
 */
const FPSO = joint.dia.Element.define(
    "FPSO",
    {
        attrs: {
            root: {
                magnet: false // Adding this prevents the ports from linking to the root
            },
            left_triangle: {
                points: "0 0 -calc(0.2*w) 0 0 calc(h) ",
                stroke: "#000000",
                fill: "#035afc",
            },
            right_triangle: {
                points: "calc(w) 0 calc(1.2*w) 0 calc(w) calc(h) ",
                stroke: "#000000",
                fill: "#035afc",
            },
            yellow_projection: {
                points: "-calc(0.06*w) 0  -calc(0.03*w) -calc(h) calc(0.03*w) -calc(h)   calc(0.06*w) 0",
                stroke: "#000000",
                fill: "#fac905",

            },
            yellow_big_rect: {
                points: "calc(0.1*w) 0 calc(0.1*w) -calc(0.55*h) calc(0.75*w) -calc(0.55*h) calc(0.75*w) 0",
                stroke: "#000000",
                fill: "#fac905",
            },
            no_fill_polygon: {
                points: "calc(0.61*w) -calc(0.8*h) calc(0.85*w) -calc(1.70*h) calc(0.9*w) -calc(1.55*h) calc(0.67*w) -calc(0.65*h)",
                stroke: "#000000",
                fill: "none"
            },
            yellow_small_rect: {
                points: "calc(0.4*w) -calc(0.55*h) calc(0.4*w) -calc(0.8*h) calc(0.67*w) -calc(0.8*h) calc(0.67*w) -calc(0.55*h)",
                stroke: "#000000",
                fill: "#fac905",
            },
            vertical_black_line: {
                stroke: "#000000",
                x1: "calc(0.86*w)",
                y1: "-calc(1.55*h)",
                x2: "calc(0.86*w)",
                y2: "-calc(0.8*h)",
                strokeWidth: 2
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
        ports: {
            groups: {
                main: {
                    position: 'absolute',
                    attrs: {
                        circle: portDetails
                    }
                },
            },
            items: [{
                id: 'p1',
                group: 'main',
                args: {
                    x: 'calc(0.2*w)',
                    y: 'calc(h)',

                },
            }, {
                id: 'p2',
                group: 'main',
                args: {
                    x: 'calc(0.7*w)',
                    y: 'calc(h)'
                },
            }, {
                id: 'p3',
                group: 'main',
                args: {
                    x: 'calc(0.85*w)',
                    y: 'calc(h)'
                }
            }]
        }
    },
    {
        markup: [
            {
                tagName: "rect",
                selector: "outline",
            },
            {
                tagName: "polygon",
                selector: "left_triangle"
            },
            {
                tagName: "polygon",
                selector: "right_triangle"
            },
            {
                tagName: "polygon",
                selector: "yellow_projection"
            },
            {
                tagName: "polygon",
                selector: "yellow_big_rect"
            },
            {
                tagName: "polygon",
                selector: "no_fill_polygon"
            },
            {
                tagName: "polygon",
                selector: "yellow_small_rect"
            },
            {
                tagName: "line",
                selector: "vertical_black_line",
            },

        ],
    }
);

/**
 * Element definition of the PLEM component
 */
const PLEM = joint.dia.Element.define("PLEM",
    {
        attrs: {
            root: {
                magnet: false
            },
            horizontal_line: {
                x1: '-calc(0.15*w)',
                y1: 'calc(0.7*h)',
                x2: 'calc(w)',
                y2: 'calc(0.7*h)',
                stroke: 'green',
                strokeWidth: 3,
            },
            vertical_line: {
                x1: 'calc(0.6*w)',
                y1: '-calc(0.15*h)',
                x2: 'calc(0.6*w)',
                y2: 'calc(0.7*h)',
                stroke: "green",
                strokeWidth: 3,
            },
            I1: {
                d: `Mcalc(0.45*w),-calc(0.15*h) Hcalc(0.75*w) 
                    Mcalc(0.45*w),-calc(0.21*h) Hcalc(0.75*w)
                    Mcalc(0.75*w),-calc(0.3*h) V-calc(0.06*h)
                    Mcalc(0.45*w),-calc(0.3*h) V-calc(0.06*h)
                    Mcalc(0.75*w),-calc(0.3*h) Hcalc(0.69*w)
                    Mcalc(0.75*w),-calc(0.06*h) Hcalc(0.69*w)
                    Mcalc(0.45*w),-calc(0.06*h) Hcalc(0.51*w)
                    Mcalc(0.45*w),-calc(0.3*h) Hcalc(0.51*w)`,
                stroke: 'black',
                strokeWidth: 1
            },
            I2: {
                d: `M-calc(0.15*w),calc(0.55*h) Vcalc(0.85*h)
                    M-calc(0.21*w),calc(0.55*h) Vcalc(0.85*h)
                    M-calc(0.06*w),calc(0.55*h) H-calc(0.3*w)
                    M-calc(0.06*w),calc(0.85*h) H-calc(0.3*w)
                    M-calc(0.3*w),calc(0.85*h) Vcalc(0.79*h)
                    M-calc(0.06*w),calc(0.85*h) Vcalc(0.79*h)
                    M-calc(0.3*w),calc(0.55*h) Vcalc(0.61*h)
                    M-calc(0.06*w),calc(0.55*h) Vcalc(0.61*h)

                    `,
                stroke: 'black',
                strokeWidth: 1
            },
            outline: {
                height: 'calc(h)',
                width: 'calc(w)',
                stroke: 'black',
                strokeWidth: 1,
                fill: "#fac905"
            },
        },
        ports: {
            groups: {
                main: {
                    position: 'absolute',
                    attrs: {
                        circle: portDetails
                    }
                },
            },
            items: [{
                id: 'p1',
                group: 'main',
                args: {
                    x: 0,
                    y: 'calc(0.7*h)',

                },
            }, {
                id: 'p2',
                group: 'main',
                args: {
                    x: 'calc(0.6*w)',
                    y: 0
                },
            }]
        }
    },
    {
        markup: [
            {
                tagName: 'rect',
                selector: 'outline'
            },
            {
                tagName: 'line',
                selector: 'horizontal_line'
            },
            {
                tagName: 'path',
                selector: 'I1'
            },
            {
                tagName: 'path',
                selector: 'I2'
            },
            {
                tagName: 'line',
                selector: 'vertical_line'
            }
        ]
    }
)


export { subseaSeparator, subseaPump, UTA, productionWellST, injectionWellST, manifold, platform, UTH, PLET, FPSO, PLEM }