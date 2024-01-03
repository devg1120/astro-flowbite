import type { Dayjs } from "dayjs";
import { For } from "solid-js";
import Day from "./Day";

import {
  DragDropProvider,
  DragDropSensors,
  useDragDropContext,
  //createDraggable,
  //createDroppable,
} from "@thisbeyond/solid-dnd";


interface MonthProps {
  month: () => Dayjs[][];
}

function Month(props: MonthProps) {
  return (
    <DragDropProvider>
      <DragDropSensors>
         <div class="flex-1 grid grid-cols-7 grid-rows-5">
           <For each={props.month()}>
             {(row, index) => {
               return (
                 <For each={row}>
                   {(day) => {
                     return <Day day={day} rowIdx={index()} />;
                   }}
                 </For>
               );
             }}
           </For>
         </div>
      </DragDropSensors>
    </DragDropProvider>
  );
}

export default Month;
