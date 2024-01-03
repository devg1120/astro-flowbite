import type { Component } from "solid-js";
import { createEffect, createSignal } from "solid-js";
import Month from "./components/Month";
import { monthIndex, showEventModal } from "./store";
import { getDaysMatrix } from "./utils";

import CalendarHeader from "./components/CalendarHeader";
import Sidebar from "./components/Sidebar";
import EventModal from "./components/EventModal";

const App: Component = () => {
  const [currenMonth, setCurrentMonth] = createSignal(getDaysMatrix());

  createEffect(() => {
    setCurrentMonth(getDaysMatrix(monthIndex()));
  });

  return (
    <>
      {showEventModal() && <EventModal />}

      <div class="h-screen flex flex-col">
        <CalendarHeader />
        <div class="flex flex-1">
          <Sidebar />
          <Month month={currenMonth} />
        </div>
      </div>
    </>
  );
};

export default App;
