import { labels, updateLabel } from "../store";
import { For } from "solid-js";

export default function Labels() {
  return (
    <>
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
    </>
  );
}
