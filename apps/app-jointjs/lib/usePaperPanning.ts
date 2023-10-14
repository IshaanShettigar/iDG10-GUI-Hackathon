import { useEffect, RefObject } from "react";
import { dia } from "jointjs";

type Paper = dia.Paper | null;

export function usePaperPanning(paperRef: RefObject<Paper>): void {
  useEffect(() => {
    const paper = paperRef.current;

    if (!paper) return;

    let dragStartPosition: { x: number; y: number } | null = null;

    const panStart = (evt: dia.Event, x: number, y: number) => {
      const scale = paper.scale();
      dragStartPosition = { x: x * scale.sx, y: y * scale.sy };
      paper.svg.style.cursor = "grabbing"; // Use a custom cursor icon
    };

    const panStop = () => {
      dragStartPosition = null;
      paper.svg.style.cursor = "auto";
    };

    const pan = (event: MouseEvent) => {
      if (dragStartPosition !== null) {
        paper.translate(
          event.offsetX - dragStartPosition.x,
          event.offsetY - dragStartPosition.y
        );
      }
    };

    paper.on("blank:pointerdown", panStart);
    paper.on("cell:pointerup blank:pointerup", panStop);
    paper.svg.addEventListener("mousemove", pan);

    return () => {
      // Cleanup event listeners when the component unmounts
      paper.on("blank:pointerdown", panStart);
      paper.on("cell:pointerup blank:pointerup", panStop);
      paper.svg.removeEventListener("mousemove", pan);
    };
  }, [paperRef]);
}

export function useZoom(paperRef: React.RefObject<dia.Paper | null>): void {
  useEffect(() => {
    const paper = paperRef.current;
    if (!paper) return;

    let currentScale = 1;
    const scaleIncrement = 0.1;

    const handleZoomIn = () => {
      currentScale += scaleIncrement;
      paper.scale(currentScale, currentScale);
    };

    const handleZoomOut = () => {
      currentScale -= scaleIncrement;
      paper.scale(currentScale, currentScale);
    };

    const handleResetZoom = () => {
      currentScale = 1;
      paper.scale(1, 1);
      paper.scaleContentToFit({
        padding: {
          top: 100,
          left: 200,
          right: 200,
          bottom: 200,
        },
      });
    };

    paper.on("blank:mousewheel", (evt, x, y, delta) => {
      evt.preventDefault();
      const oldScale = paper.scale().sx;
      const newScale = oldScale + 0.05 * delta * oldScale;

      if (newScale > 0.2 && newScale < 5) {
        currentScale = newScale;
        paper.scale(newScale, newScale, 0, 0);
        paper.translate(
          // @ts-ignore
          -x * newScale + evt.offsetX,
          // @ts-ignore
          -y * newScale + evt.offsetY
        );
      }
    });

    // Add event listeners for zoom controls
    document.getElementById("zoom-in")?.addEventListener("click", handleZoomIn);
    document
      .getElementById("zoom-out")
      ?.addEventListener("click", handleZoomOut);
    document
      .getElementById("reset-zoom")
      ?.addEventListener("click", handleResetZoom);

    return () => {
      // Cleanup event listeners when the component unmounts
      document
        .getElementById("zoom-in")
        ?.removeEventListener("click", handleZoomIn);
      document
        .getElementById("zoom-out")
        ?.removeEventListener("click", handleZoomOut);
      document
        .getElementById("reset-zoom")
        ?.removeEventListener("click", handleResetZoom);
    };
  }, [paperRef]);
}
