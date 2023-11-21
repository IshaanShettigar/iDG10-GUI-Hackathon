import { useAtom } from "jotai";
import { graphState, paperState } from "./state";
import { useEffect } from "react";
import { dia } from "jointjs";
import { Paper } from "@/app/page";

export const useInteractions = () => {
  const [graph] = useAtom(graphState);
  const [paper] = useAtom(paperState);

  /**
   * @description
   * This is the event that is triggered when a cell is double clicked.
   **/
  paper?.on("cell:pointerdblclick", (cellView, evt, x, y) => {
    cellView.highlight();
  });

  usePaperPanning(paper);
  useZoom(paper, true);
};

export function usePaperPanning(paper: Paper | null): void {
  if (!paper) return;

  paper.on("paper:pan", (evt, deltaX, deltaY) => {
    evt.preventDefault();
    paper.translate(
      paper.translate().tx - deltaX,
      paper.translate().ty - deltaY
    );
  });
  // useEffect(() => {
  //   if (!paper) return;

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

  // return () => {
  //   // Cleanup event listeners when the component unmounts
  //   paper.on("blank:pointerdown", panStart);
  //   paper.on("cell:pointerup blank:pointerup", panStop);
  //   paper.svg.removeEventListener("mousemove", pan);
  // };
  // }, [paper]);
}

export function useZoom(
  paper: Paper | null,
  auto: boolean = false
): [() => void, () => void, () => void] {
  if (!paper) return [() => {}, () => {}, () => {}];

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
    paper.transformToFitContent({
      padding: 250,
    });
  };

  if (auto) {
    paper.on("paper:pinch", (evt, x, y, scale) => {
      evt.preventDefault();
      const oldScale = paper.scale().sx;
      const newScale = oldScale * scale;
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

    // paper.on("blank:mousewheel", (evt, x, y, delta) => {
    //   evt.preventDefault();
    //   const oldScale = paper.scale().sx;
    //   const newScale = oldScale - delta * 0.01;
    //   if (newScale > 0.2 && newScale < 5) {
    //     currentScale = newScale;
    //     paper.scale(newScale, newScale, 0, 0);
    //     paper.translate(
    //       // @ts-ignore
    //       -x * newScale + evt.offsetX,
    //       // @ts-ignore
    //       -y * newScale + evt.offsetY
    //     );
    //   }
    // });
  }

  return [handleZoomIn, handleZoomOut, handleResetZoom];
}
