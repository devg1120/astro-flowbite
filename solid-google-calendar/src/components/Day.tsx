import dayjs from "dayjs";
import { createEffect, createSignal, For } from "solid-js";
import { DATE_FORMAT } from "../constants";
import {
  filteredEvents,
  setDaySelected,
  setSelectedEvent,
  setShowEventModal,
} from "../store";

export default function Day({ day, rowIdx }) {
  const [dayEvents, setDayEvents] = createSignal([]);

  createEffect(() => {
    const events = filteredEvents().filter(
      (evt) =>
        dayjs(evt.day).format(DATE_FORMAT.DDMMYY) ===
        day.format(DATE_FORMAT.DDMMYY)
    );

    setDayEvents(events);
  });

  function getCurrentDayClass() {
    return day.format(DATE_FORMAT.DDMMYY) === dayjs().format(DATE_FORMAT.DDMMYY)
      ? "bg-blue-600 text-white rounded-full w-7"
      : "";
  }

  return (
    <div class="border border-gray-200 flex flex-col">
      <header class="flex flex-col items-center">
        {rowIdx === 0 && (
          <p class="text-sm mt-1">
            {day.format(DATE_FORMAT.ddd).toUpperCase()}
          </p>
        )}
        <p class={`text-sm p-1 my-1 text-center  ${getCurrentDayClass()}`}>
          {day.format(DATE_FORMAT.DD)}
        </p>
      </header>
      <div
        class="flex-1 cursor-pointer"
        onClick={() => {
          setDaySelected(day);
          setShowEventModal(true);
        }}
      >
        <For each={dayEvents()}>
          {(evt) => (
            <div
              onClick={() => setSelectedEvent(evt)}
              class={`bg-${evt.label}-200 p-1 mr-3 text-gray-600 text-sm rounded mb-1 truncate`}
            >
              {evt.title}
            </div>
          )}
        </For>
      </div>
    </div>
  );
}
