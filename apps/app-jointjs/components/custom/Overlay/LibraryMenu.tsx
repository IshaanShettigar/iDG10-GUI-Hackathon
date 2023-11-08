"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { X } from "lucide-react";
import { Dispatch, SetStateAction, use, useEffect, useRef } from "react";
import { Button } from "../../ui/button";
import { Separator } from "../../ui/separator";
import { dia } from "jointjs";
import { customNamespace } from "@/lib/jointjs/customNamespace";
import {
  FPSO,
  PLEM,
  PLET,
  UTA,
  UTH,
  injectionWellST,
  manifold,
  platform,
  productionWellST,
  subseaPump,
  subseaSeparator,
} from "@/lib/jointjs/elements";

export function LibraryMenu({
  openLibrary,
  setOpenLibrary,
}: {
  openLibrary: boolean;
  setOpenLibrary: Dispatch<SetStateAction<boolean>>;
}) {
  const toolGraphRef = useRef(null);

  useEffect(() => {
    const toolGraph = new dia.Graph({}, { cellNamespace: customNamespace });
    const toolPaper = new dia.Paper({
      el: toolGraphRef.current,
      model: toolGraph,
      width: "auto",
      height: "100vh",
      background: {
        color: "rgba(255,255,255,0.75)",
      },
      cellViewNamespace: customNamespace,
      interactive: false,
    });
    setElements(toolGraph);
  }, []);

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between p-4 space-y-0">
        <h2 className="text-xl font-semibold">Library</h2>{" "}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setOpenLibrary(!openLibrary)}
        >
          <X size={20} />
        </Button>
      </CardHeader>
      <Separator orientation="horizontal" />
      <CardContent className="flex flex-col flex-grow gap-4 p-4 max-h-full overflow-y-auto">
        <div
          className=""
          style={{
            width: "auto",
            height: "100vh",
          }}
          ref={toolGraphRef}
          id="tool-paper-div"
        />
      </CardContent>
    </Card>
  );
}

function setElements(toolGraph: dia.Graph) {
  const SS = new subseaSeparator().resize(85, 50);

  const SP = new subseaPump().resize(60, 60);

  const uta = new UTA().resize(93, 55);

  const PWST = new productionWellST().resize(50, 50);

  const PL = new platform().resize(100, 25);

  const IWST = new injectionWellST().resize(50, 50);

  const MANIFOLD = new manifold().resize(70, 35);

  const uth = new UTH().resize(140, 82);

  const plet = new PLET().resize(140, 82);

  const fpso = new FPSO().resize(100, 35);

  const plem = new PLEM().resize(65, 65);

  const nodes = [SS, SP, uta, PWST, PL, IWST, MANIFOLD, uth, plet, fpso, plem];

  nodes.forEach((node, index) => {
    node.position(70, 100 + index * 100);
    // node.scale(0.5, 0.5);
    toolGraph.addCells([node]);
  });
}
