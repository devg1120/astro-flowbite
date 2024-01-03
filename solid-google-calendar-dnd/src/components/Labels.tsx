import { labels, updateLabel } from "../store";
import { For } from "solid-js";

import {
  //useDragDropContext,
  createDraggable,
} from "@thisbeyond/solid-dnd";

export default function Labels() {

/*
  const [, { onDragEnd }] = useDragDropContext();
  let draggablesContainer;
  const [inDropZone, setInDropZone] = createSignal(false);


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
*/

  const Draggable = (props) => {

    const draggable = createDraggable(props.id);
    return <div  use:draggable></div>;
  };

  return (
    <Draggable>
      <p class="text-gray-500 font-bold mt-10">Label</p>
      <For each={labels()}>
        {({ test, checked }) => (
          <label class="items-center mt-3 block">
            <input
              type="checkbox"
              checked={checked}
              onChange={() => updateLabel({ test, checked: !checked })}
              class={`form-checkbox h-5 w-5 text-${test}-400 rounded focus:ring-0 cursor-pointer`}
            />
            <span class="ml-2 text-gray-700 capitalize">{test}</span>
          </label>
        )}
      </For>
    </Draggable>
  );
}
