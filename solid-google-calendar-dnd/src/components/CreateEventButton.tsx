
import plusImg from "../assets/plus.svg";
import { setShowEventModal } from "../store";

export default function CreateEventButton() {
  return (
    <button
      onClick={() => setShowEventModal(true)}
      class="border p-2 rounded-full flex items-center shadow-md hover:shadow-2xl"
    >
      <img src={plusImg} alt="create_event" class="w-7 h-7" />
      <span class="pl-3 pr-7">Create</span>
    </button>
  );
}
