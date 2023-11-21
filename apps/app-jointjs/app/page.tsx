"use client";

import { dia, shapes, util } from "jointjs";
import { useEffect, useRef, useState } from "react";
import { createInitalNodes } from "@/lib/jointjs/createInitialNodes";
import { Overlay } from "@/components/custom/Overlay";
import { toast } from "@/components/ui/use-toast";
import { customNamespace } from "@/lib/jointjs/customNamespace";
import { useAtom } from "jotai";
import {
  graphState,
  paperState,
  selectedCellState,
  undoGraphStackState,
} from "@/lib/state";
import { useInteractions } from "@/lib/useInteractions";

type Graph = dia.Graph<dia.Graph.Attributes, dia.ModelSetOptions>;
type Paper = dia.Paper;

export default function Home() {
  const canvas = useRef(null);
  const [graph, setGraph] = useAtom(graphState);
  const [graphStack, setGraphStack] = useAtom(undoGraphStackState);
  const [paper, setPaper] = useAtom(paperState);
  const paperRef = useRef<Paper | null>(null);
  const [selectedCell, setSelectedCell] = useAtom(selectedCellState);

  useEffect(() => {
    const newGraph = new dia.Graph({}, { cellNamespace: customNamespace });

    const newPaper = new dia.Paper({
      el: canvas.current,
      model: newGraph,
      width: "100vw", // '100%'
      height: "100vh", // '100%
      gridSize: 20,
      drawGrid: true,
      async: true,
      snapLinks: { radius: 70 },
      cellViewNamespace: customNamespace,
      interactive: true,
    });
    if (typeof window !== "undefined") {
      // Check if we're running in the browser.
      // ✅ Only runs once per app load
      console.log("window defined");

      if (localStorage.getItem("graph") === null) {
        newGraph.getCells().length === 0 && setupGraph(newGraph, newPaper);
      } else {
        setGraph(
          newGraph.fromJSON(JSON.parse(localStorage.getItem("graph") || ""))
        );
      }
      setPaper(newPaper);
    }
    return () => {};
  }, []);

  paperRef.current = paper;

  function setupGraph(graph: Graph, paper: Paper) {
    const intialNodes = createInitalNodes();
    graph.addCells(intialNodes);
    paper.unfreeze();
    setGraph(graph);
    toast({
      title: "Graph Loaded",
      description: "The graph has been loaded successfully",
      className: "bg-green-500 text-white",
    });
  }

  useInteractions();

  paper?.on("cell:pointerdblclick", (cellView, evt, x, y) => {
    cellView.highlight();
  });

  // Select cell on click
  paper?.on("cell:pointerclick", (cellView, evt, x, y) => {
    setSelectedCell(cellView);
    cellView.highlight();
  });

  const debounce = (func: any, wait: number, immediate: boolean) => {
    let timeout: any;
    return function (this: any) {
      let context = this,
        args = arguments;
      let later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      let callNow = immediate && !timeout;
      // @ts-ignore
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };

  // const debouncedGraphChangeHandler = useRef(
  //   debounce(
  //     () => {
  //       setGraphStack((prev) => [...prev, graph]);
  //     },
  //     1000,
  //     false
  //   )
  // ).current;

  // const updateGraph = (graph: Graph) => {
  //   setGraphStack((prev) => [...prev, graph]);
  // };

  // const debouncedGraphChangeHandler = useRef(
  //   debounce(updateGraph, 1000, false)
  // ).current;

  // @ts-ignore
  graph?.on("change", function () {
    setGraph(graph);
    // debounce setGraphStack to prevent too many calls
    // debouncedGraphChangeHandler();
  });

  return (
    <div className="relative 100vh 100vw">
      <Overlay graph={graph} paper={paper} />
      <div style={{ height: "100vh" }} ref={canvas}></div>
    </div>
  );
}

export type { Graph, Paper };
