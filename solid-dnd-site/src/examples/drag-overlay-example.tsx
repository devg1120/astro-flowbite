import {
  DragDropProvider,
  DragDropSensors,
  DragOverlay,
  createDraggable,
  createDroppable,
} from "@thisbeyond/solid-dnd";
import { createSignal, Show } from "solid-js";

const Draggable = () => {
  const draggable = createDraggable(1);
  return (
    <div
      use:draggable
      class="draggable"
      classList={{ "opacity-25": draggable.isActiveDraggable }}
    >
      Draggable
    </div>
  );
};

const Droppable = (props) => {
  const droppable = createDroppable(1);
  return (
    <div
      use:droppable
      class="droppable"
      classList={{ "!droppable-accept": droppable.isActiveDroppable }}
    >
      Droppable.
      {props.children}
    </div>
  );
};

export const DragOverlayExample = () => {
  const [where, setWhere] = createSignal("outside");

  const onDragEnd = ({ droppable }) => {
    if (droppable) {
      setWhere("inside");
    } else {
      setWhere("outside");
    }
  };

  return (
    <DragDropProvider onDragEnd={onDragEnd}>
      <DragDropSensors />
      <div class="min-h-15">
        <Show when={where() === "outside"}>
          <Draggable />
        </Show>
      </div>
      <Droppable>
        <Show when={where() === "inside"}>
          <Draggable />
        </Show>
      </Droppable>
      <DragOverlay>
        <div class="draggable">Drag Overlay!</div>
      </DragOverlay>
    </DragDropProvider>
  );
};
