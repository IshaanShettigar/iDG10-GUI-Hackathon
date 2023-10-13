"use client";

import { useState, useCallback } from "react";
import ReactFlow, {
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Edge,
  Node,
  OnConnect,
  OnEdgesChange,
  OnNodesChange,
} from "reactflow";
import "reactflow/dist/style.css";

const initialNodes: Node[] = [
  { id: "1", data: { label: "Hello" }, position: { x: 5, y: 25 } },
  { id: "2", data: { label: "World" }, position: { x: 100, y: 100 } },
];

const initialEdges: Edge[] = [];

export default function Home() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  return (
    <div className="flow" style={{ height: "100vh", width: "100vw" }}>
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
