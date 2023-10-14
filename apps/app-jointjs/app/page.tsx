"use client";

import { dia, shapes, util } from "jointjs";
import { useEffect, useRef, useState } from "react";
import { createInitalNodes } from "@/lib/jointjs/createInitialNodes";
import { Overlay } from "../components/custom/Overlay";
import { toast } from "@/components/ui/use-toast";
import { usePaperPanning, useZoom } from "@/lib/usePaperPanning";

type Graph = dia.Graph<dia.Graph.Attributes, dia.ModelSetOptions>;
type Paper = dia.Paper;

export default function Home() {
  const canvas = useRef(null);
  const [graph, setGraph] = useState<Graph | null>(null);
  const [paper, setPaper] = useState<Paper | null>(null);
  const paperRef = useRef<Paper | null>(null);

  useEffect(() => {
    const graph = new dia.Graph({}, { cellNamespace: shapes });
    setGraph(graph);
    const paper = new dia.Paper({
      el: canvas.current,
      model: graph,
      width: "100vw", // '100%'
      height: "100vh", // '100%
      gridSize: 20,
      drawGrid: true,
      async: true,
      snapLinks: { radius: 70 },
      cellViewNamespace: shapes,
    });
    setPaper(paper);

    paperRef.current = paper;

    // Create a new instance of a graph, add cells, and add the graph to the paper.
    const intialNodes = createInitalNodes();

    graph.addCells(intialNodes);
    paper.unfreeze();
  }, []);

  // Inside the GraphEditor component, add the following code to handle panning and zooming.
  usePaperPanning(paperRef);
  useZoom(paperRef);

  // paper?.transformToFitContent({ padding: 250 });

  return (
    <div className="relative 100vh 100vw">
      <Overlay graph={graph} paper={paper} />
      <div style={{ height: "100vh" }} ref={canvas}></div>
    </div>
  );
}

export type { Graph, Paper };
