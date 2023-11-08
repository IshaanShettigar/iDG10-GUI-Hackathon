"use client";
import data from "../../../app/data.json";
import { DynamicSidebar, MenuBar, ToolBar } from "@/components/custom/Overlay";
import { Menu, MenuSquare } from "lucide-react";
import { useState } from "react";
import { Button } from "../../ui/button";
import { Graph, Paper } from "@/app/page";
import { dia } from "jointjs";
import { LibraryMenu } from "./LibraryMenu";

export function Overlay({
  graph,
  paper,
}: {
  graph: Graph | null;
  paper: Paper | null;
}) {
  const [openLibrary, setOpenLibrary] = useState(false);
  return (
    <>
      <div className="absolute top-0 left-0 z-20 flex flex-col justify-between h-full max-h-screen gap-4 p-6">
        <MenuBar graph={graph} paper={paper} />
        {/* @ts-ignore */}
        <DynamicSidebar data={data} className="flex-grow overflow-y-auto" />
        <ToolBar className="self-start " graph={graph} paper={paper} />
      </div>
      {!openLibrary ? (
        <Button
          variant="outline"
          size="icon"
          className="absolute top-0 right-0 z-20 m-6"
          onClick={() => setOpenLibrary(!openLibrary)}
        >
          <Menu size={20} />
        </Button>
      ) : (
        <div className="absolute right-0 z-20 w-1/4 h-full p-6">
          <LibraryMenu
            setOpenLibrary={setOpenLibrary}
            openLibrary={openLibrary}
          />
        </div>
      )}
    </>
  );
}
