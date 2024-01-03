import dayjs from "dayjs";
import { createEffect, createMemo, createSignal } from "solid-js";
import { createMutable } from "solid-js/store";
import { CalendarEvent, Label } from "./types";

export const [monthIndex, setMonthIndex] = createSignal(dayjs().month());
export const [smallCalendarMonth, setSmallCalendarMonth] = createSignal(null);
export const [daySelected, setDaySelected] = createSignal(dayjs());
export const [showEventModal, setShowEventModal] = createSignal(false);
export const [selectedEvent, setSelectedEvent] =
  createSignal<CalendarEvent>(null);
export const [labels, setLabels] = createSignal<Label[]>([]);

export const savedEvents = createMutable({
  events: JSON.parse(localStorage.getItem("events") || "[]") as CalendarEvent[],
  addEvent(event: CalendarEvent) {
    this.events.push(event);
    localStorage.setItem("events", JSON.stringify(this.events));
  },
  updateEvent(event: CalendarEvent) {
    this.events.map((e: CalendarEvent) => {
      if (e.id === event.id) {
        return event;
      }
      return e;
    });
    localStorage.setItem("events", JSON.stringify(this.events));
  },
  deleteEvent(event: CalendarEvent) {
    this.events = this.events.filter((e: CalendarEvent) => e.id !== event.id);
    localStorage.setItem("events", JSON.stringify(this.events));
  },
});

createEffect(() => {
  console.log("effect");
  if (smallCalendarMonth() !== null) {
    setMonthIndex(smallCalendarMonth());
  }
});

createEffect(() => {
  if (!showEventModal()) {
    setSelectedEvent(null);
  }
});

createEffect(() => {
  setLabels((prevLabels) => {
    return [...new Set(savedEvents.events!.map((evt) => evt.label))].map(
      (label) => {
        const currentLabel = prevLabels.find((lbl) => lbl.test === label);
        return {
          test: label,
          checked: currentLabel ? currentLabel.checked : true,
        } as Label;
      }
    );
  });
});

export const filteredEvents = createMemo(() => {
  return savedEvents.events.filter((evt: CalendarEvent) =>
    labels()
      .filter((lbl) => lbl.checked)
      .map((lbl) => lbl.test)
      .includes(evt.label)
  );
});

export function updateLabel(label: Label) {
  setLabels(labels().map((lbl) => (lbl.test === label.test ? label : lbl)));
}
