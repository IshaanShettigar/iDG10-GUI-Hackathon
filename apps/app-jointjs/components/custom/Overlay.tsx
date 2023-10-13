"use client";
import data from "../../app/data.json";
import DynamicSidebar from "@/components/custom/Sidebar";
import { MenuBar } from "./MenuBar";
import { ToolBar } from "@/components/custom/ToolBar";
import { Card, CardHeader } from "@/components/ui/card";
import { Menu, MenuSquare, X } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Graph } from "@/app/page";
import { dia } from "jointjs";

export function Overlay({
  graph,
  paper,
}: {
  graph: Graph | null;
  paper: dia.Paper | null;
}) {
  const [openLibrary, setOpenLibrary] = useState(false);
  return (
    <>
      <div className="absolute top-0 left-0 z-20 grid h-full max-h-screen gap-4 p-6">
        <MenuBar graph={graph} paper={paper} />
        {/* @ts-ignore */}
        <DynamicSidebar data={data} className="" />
        <ToolBar className="self-end " />
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
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
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
          </Card>
        </div>
      )}
    </>
  );
}
