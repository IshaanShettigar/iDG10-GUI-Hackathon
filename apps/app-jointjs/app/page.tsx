"use client";

import { dia, shapes } from "jointjs";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import data from "./data.json";
import DynamicSidebar from "../components/custom/Sidebar";
import { MenuBar } from "@/components/custom/MenuBar";

export default function Home() {
  const canvas = useRef(null);

  type Graph = typeof dia.Graph<dia.Graph.Attributes, dia.ModelSetOptions>;
  useEffect(() => {
    const graph = new dia.Graph({}, { cellNamespace: shapes });
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

    // Create a new instance of a graph, add cells, and add the graph to the paper.
    const intialNodes = createInitalNodes();

    graph.addCells(intialNodes);
    paper.unfreeze();
  }, []);

  function createInitalNodes() {
    var rect = new shapes.standard.Rectangle();
    rect.position(100, 30);
    rect.resize(100, 40);
    rect.attr({
      body: {
        fill: "blue",
      },
      label: {
        text: "Hello",
        fill: "white",
      },
    });

    var rect2 = rect.clone();
    rect2.translate(300, 0);
    rect2.attr("label/text", "World!");

    var link = new shapes.standard.Link();
    link.source(rect);
    link.target(rect2);
    return [rect, rect2, link];
  }

  return (
    <div className="relative 100vh 100vw">
      <div className="absolute top-0 left-0 z-20 grid gap-4 m-6">
        <MenuBar />
        {/* @ts-ignore */}
        <DynamicSidebar data={data} className="" />
      </div>
      <div style={{ height: "100vh" }} ref={canvas}></div>
    </div>
  );
}
