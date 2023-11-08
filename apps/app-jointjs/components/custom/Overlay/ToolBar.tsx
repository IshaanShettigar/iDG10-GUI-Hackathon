import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  AppWindow,
  Fullscreen,
  LockIcon,
  Maximize,
  Redo,
  Undo,
  UnlockIcon,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { Button } from "../../ui/button";
import { HTMLAttributes, useState } from "react";
import { cn } from "@/lib/utils";
import { Toggle } from "../../ui/toggle";
import { Graph, Paper } from "@/app/page";

export function ToolBar({
  className,
  graph,
  paper,
  ...props
}: {
  className?: string;
  graph: Graph | null;
  paper: Paper | null;
  props?: HTMLAttributes<HTMLDivElement>;
}) {
  const [lock, setLock] = useState(false);
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
        onPressedChange={setLock}
      >
        {lock ? <LockIcon size={20} /> : <UnlockIcon size={20} />}
      </Toggle>
      <Button variant="ghost" size="icon">
        <Undo size={20} />
      </Button>
      <Button variant="ghost" size="icon">
        <Redo size={20} />
      </Button>
      <Button variant="ghost" size="icon">
        <ZoomIn size={20} />
      </Button>
      <Button variant="ghost" size="icon">
        <ZoomOut size={20} />
      </Button>
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
