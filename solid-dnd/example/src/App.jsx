
import "./App.css";


import {
  DragDropProvider,
  DragDropSensors,
  useDragDropContext,
  createDraggable,
  createDroppable,
} from "@thisbeyond/solid-dnd";

import { createSignal } from "solid-js";

const Draggable = (props) => {
  const draggable = createDraggable(props.id);
  return <div id={props.id} use:draggable>draggable</div>;
};

const Droppable = (props) => {
  const droppable = createDroppable(props.id);
  //return <div id={props.id} use:droppable>droppable</div>;
  return (
    <div
     id={props.id} 
      use:droppable
      class="droppable"
      classList={{ "!droppable-accept": droppable.isActiveDroppable }}
    >
      Droppable.
      {props.children}
    </div>
  );
};

const Sandbox = () => {
  const [, { onDragEnd }] = useDragDropContext();
  let draggablesContainer;
  const [inDropZone, setInDropZone] = createSignal(false);

/*
  onDragEnd(({draggable, droppable}) => {
    if (droppable) {
      // Handle the drop. Note that solid-dnd doesn't move a draggable into a
      // droppable on drop. It leaves it up to you how you want to handle the
      // drop.
    }
  });
*/
  onDragEnd ( ({ draggable, droppable }) => {
    if (droppable) {
      const child = droppable.node.children[0];
      droppable.node.insertBefore(draggable.node, child);
      setInDropZone(true);
    } else if (draggable.node.parentElement !== draggablesContainer) {
      draggablesContainer.append(draggable.node);
      setInDropZone(false);
    }
  });

/*
  return (
    <div>
         <Draggable id="draggable-1" />
      <Droppable id="droppable-2" />
    </div>
  );
*/

  return (
    <div>
      <Droppable id="droppable-1">
         <Draggable id="draggable-1" />
      </Droppable>
      <Droppable id="droppable-2">
         <Draggable id="draggable-2" />
      </Droppable>
      <Droppable id="droppable-3">
         <Draggable id="draggable-3" />
         <Draggable id="draggable-4" />
         <Draggable id="draggable-5" />
      </Droppable>
    </div>
  );
  
};

const App = () => {
  return (
    <DragDropProvider>
      <DragDropSensors>
        <Sandbox />
      </DragDropSensors>
    </DragDropProvider>
  );
};

export default App;




