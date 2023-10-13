import { Graph } from "@/app/page";
import { toast } from "@/components/ui/use-toast";
import { util } from "jointjs";

export function downloadJSON(graph: Graph | null) {
  if (!graph) {
    toast({ title: "No graph", variant: "destructive" });
    return;
  }
  const json = JSON.stringify(graph.toJSON());
  const blob = new Blob([json], { type: "application/json" });
  util.downloadBlob(blob, "graph.json");
  toast({
    title: "Downloaded",
    variant: "default",
    duration: 2000,
    className: "bg-green-500 text-white",
  });
}
