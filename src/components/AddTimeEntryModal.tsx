import { useState } from "react";
import { addTimeEntry } from "../services/time-entries.service";
import ITimeEntry from "../types/time-entry.types";

interface AddTimeEntryModalProps {
  onClose: () => void;
}

export default function AddTimeEntryModal({ onClose }: AddTimeEntryModalProps) {
  const [newEntry, setNewEntry] = useState<Omit<ITimeEntry, 'id'>>({
    name: '',
    date: '',
    time: ''
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setNewEntry((prevEntry) => ({
      ...prevEntry,
      [name]: value
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await addTimeEntry(newEntry);
    setNewEntry({
      name: '',
      date: '',
      time: ''
    });

    onClose();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-70">

      <div className="bg-white rounded-md overflow-hidden max-w-md w-full mx-4">
        <nav className="bg-black text-white flex justify-between px-4 py-2">
          <span className="text-lg">Add Time Entry</span>
          <button
            className="bg-red-300 bg-opacity-50 py-1 px-2 hover:bg-red-500 hover:bg-opacity-70 transition-all rounded-full text-sm"
            onClick={onClose}
          >
            &#10005;
          </button>
        </nav>
        <div className="p-4">
          <form onSubmit={handleSubmit} className="mb-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={newEntry.name}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <input
                type="text"
                name="date"
                value={newEntry.date}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Time</label>
              <input
                type="text"
                name="time"
                value={newEntry.time}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>

            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md">
              Add Entry
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
