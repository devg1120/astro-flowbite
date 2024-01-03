import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { createEffect, createSignal, For } from "solid-js";
import { DATE_FORMAT } from "../constants";
import {
  daySelected,
  monthIndex,
  setDaySelected,
  setSmallCalendarMonth,
  setMonthIndex,
} from "../store";
import { getDaysMatrix } from "../utils";

export default function SmallCalendar() {
  const [currentMonth, setCurrentMonth] = createSignal(getDaysMatrix());

  createEffect(() => {
    setCurrentMonth(getDaysMatrix(monthIndex()));
  });

  function handlePrevMonth() {
    setMonthIndex(monthIndex() - 1);
  }

  function handleNextMonth() {
    setMonthIndex(monthIndex() + 1);
  }

  function getDayClass(day: Dayjs) {
    const format = DATE_FORMAT.DDMMYY;
    const nowDay = dayjs().format(format);
    const currDay = day.format(format);
    const slcDay = daySelected() && daySelected().format(format);

    if (nowDay === currDay) {
      return "bg-blue-500 rounded-full text-white";
    } else if (currDay === slcDay) {
      return "bg-blue-100 rounded-full text-blue-600 font-bold";
    } else {
      return "";
    }
  }

  return (
    <div class="mt-9">
      <header class="flex justify-between">
        <p class="text-gray-500 font-bold">
          {dayjs(new Date(dayjs().year(), monthIndex())).format(
            DATE_FORMAT.MMMMYYYY
          )}
        </p>
        <div>
          <button onClick={handlePrevMonth}>
            <span class="material-icons-outlined cursor-pointer text-gray-600 mx-2">
              chevron_left
            </span>
          </button>
          <button onClick={handleNextMonth}>
            <span class="material-icons-outlined cursor-pointer text-gray-600 mx-2">
              chevron_right
            </span>
          </button>
        </div>
      </header>
      <div class="grid grid-cols-7 grid-rows-6 gap-0">
        <For each={currentMonth()[0]}>
          {(day) => (
            <span class="text-sm py-1 text-center">
                {day.format(DATE_FORMAT.dd)}
            </span>
          )}
        </For>
        <For each={currentMonth()}>
          {(row) => (
            <For each={row}>
              {(day) => (
                <button
                  onClick={() => {
                    setSmallCalendarMonth(monthIndex());
                    setDaySelected(day);
                  }}
                  class={`py-1 w-full ${getDayClass(day)}`}
                >
                  <span class="text-sm">{day.format(DATE_FORMAT.D)}</span>
                </button>
              )}
            </For>
          )}
        </For>
      </div>
    </div>
  );
}
