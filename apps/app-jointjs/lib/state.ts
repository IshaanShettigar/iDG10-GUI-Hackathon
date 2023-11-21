import { Graph, Paper } from "@/app/page";
import { dia } from "jointjs";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const graphState = atomWithStorage<Graph | null>("graph", null);

// Create an undo/redo stack for the graph
export const undoGraphStackState = atomWithStorage<Graph[]>("undoStack", []);

// export const paperState = atomWithStorage<Paper | null>("paper", null);
export const paperState = atom<Paper | null>(null);

export const selectedCellState = atom<dia.CellView | null>(null);
