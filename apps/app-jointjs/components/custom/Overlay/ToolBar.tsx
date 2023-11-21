import { LockIcon, Maximize, Redo, Undo, UnlockIcon } from "lucide-react";
import { Button } from "../../ui/button";
import { HTMLAttributes, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Toggle } from "../../ui/toggle";
import { Graph, Paper } from "@/app/page";
import { useZoom } from "@/lib/useInteractions";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { graphState, paperState, undoGraphStackState } from "@/lib/state";

const paperLock = atomWithStorage<boolean>("paperLock", false);

export function ToolBar({
  className,
  ...props
}: {
  className?: string;
  props?: HTMLAttributes<HTMLDivElement>;
}) {
  const [paper, setPaper] = useAtom(paperState);
  const [graph, setGraph] = useAtom(graphState);
  const [graphStack, setGraphStack] = useAtom(undoGraphStackState);

  const [lock, setLock] = useAtom(paperLock);

  const [handleZoomIn, handleZoomOut, handleResetZoom] = useZoom(paper);

  // useEffect(() => {
  //   if (!graph) return;
  //   setGraphStack((prev) => [...prev, graph]);
  // }, [graph, setGraphStack]);

  useEffect(() => {
    paper?.setInteractivity(lock ? false : true);
  }, [lock, paper]);

  const handleUndoRedo = (action: "undo" | "redo") => {
    if (graphStack.length === 0) return;

    const lastGraph = graphStack[graphStack.length - 1];

    if (action === "undo") {
      setGraphStack((prev) => prev.slice(0, prev.length - 1));
      setGraph(lastGraph);
      graph?.fromJSON(lastGraph.toJSON());
    } else {
      setGraphStack((prev) => [...prev, lastGraph]);
      setGraph(graph);
      graph?.fromJSON(graph.toJSON());
    }
  };

  return (
    <div
      className={cn(
        "flex items-center p-1 space-x-1 border rounded-md bg-background w-fit bottom-0 left-0 h-fit",
        className
      )}
      {...props}
    >
      <Toggle
        variant="default"
        aria-label="Toggle italic"
        pressed={lock}
        onPressedChange={(pressed) => setLock(pressed)}
      >
        {lock ? <LockIcon size={20} /> : <UnlockIcon size={20} />}
      </Toggle>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => handleUndoRedo("undo")}
      >
        <Undo size={20} />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => handleUndoRedo("redo")}
      >
        <Redo size={20} />
      </Button>
      {/* <Button variant="ghost" size="icon" onClick={handleZoomIn}>
        <ZoomIn size={20} />
      </Button>
      <Button variant="ghost" size="icon" onClick={(e) => handleZoomOut()}>
        <ZoomOut size={20} />
      </Button> */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => {
          paper?.transformToFitContent({ padding: 250 });
        }}
      >
        <Maximize size={20} />
      </Button>
    </div>
  );
}
