import { For } from "solid-js";
import { createStore } from "solid-js/store";
import { LabelsClasses } from "../constants";
import {
  daySelected,
  savedEvents,
  selectedEvent,
  setShowEventModal,
} from "../store";
import { CalendarEvent } from "../types";

export default function EventModal() {
  const [event, setFormEvent] = createStore({
    title: selectedEvent() ? selectedEvent().title : "",
    description: selectedEvent() ? selectedEvent().description : "",
    label: selectedEvent()
      ? LabelsClasses.find((lbl) => lbl === selectedEvent().label)
      : LabelsClasses[0],
  });

  function handInputChange(e) {
    const { value, name } = e.target;
    setFormEvent(name, value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const calendarEvent = {
      ...event,
      day: daySelected().valueOf(),
      id: selectedEvent() ? selectedEvent().id : Date.now(),
    } as CalendarEvent;

    if (selectedEvent()) {
      savedEvents.updateEvent(calendarEvent);
    } else {
      savedEvents.addEvent(calendarEvent);
    }

    setShowEventModal(false);
  }

  return (
    <div class="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
      <form class="bg-white rounded-lg shadow-2xl w-1/4">
        <header class="bg-gray-100 px-4 py-2 flex justify-between items-center">
          <span class="material-icons-outlined text-gray-400">drag_handle</span>
          <div>
            {selectedEvent && (
              <span
                onClick={() => {
                  savedEvents.deleteEvent(selectedEvent());
                  setShowEventModal(false);
                }}
                class="material-icons-outlined text-gray-400 cursor-pointer"
              >
                delete
              </span>
            )}
            <button onClick={() => setShowEventModal(false)}>
              <span class="material-icons-outlined text-gray-400">close</span>
            </button>
          </div>
        </header>
        <div class="p-3">
          <div class="grid grid-cols-1/5 items-end gap-y-7">
            <div></div>
            <input
              type="text"
              name="title"
              placeholder="Add title"
              value={event.title}
              required
              class="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onInput={handInputChange}
            />
            <span class="material-icons-outlined text-gray-400">schedule</span>
            <p>{daySelected().format("dddd, MMMM DD")}</p>
            <span class="material-icons-outlined text-gray-400">segment</span>
            <input
              type="text"
              name="description"
              placeholder="Add a description"
              onInput={handInputChange}
              required
              class="pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              value={event.description}
            />
            <span class="material-icons-outlined text-gray-400">
              bookmark_border
            </span>
            <div class="flex gap-x-2">
              <For each={LabelsClasses}>
                {(lblClass) => (
                  <span
                    onClick={() => setFormEvent("label", lblClass)}
                    class={`bg-${lblClass}-500 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}
                  >
                    {event.label === lblClass && (
                      <span class="material-icons-outlined text-white text-sm">
                        check
                      </span>
                    )}
                  </span>
                )}
              </For>
            </div>
          </div>
        </div>
        <footer class="flex justify-end border-t p-3 mt-5">
          <button
            type="submit"
            onClick={handleSubmit}
            class="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white"
          >
            Save
          </button>
        </footer>
      </form>
    </div>
  );
}
