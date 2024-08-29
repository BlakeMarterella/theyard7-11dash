import { useState } from "react";
import { addTimeEntry } from "../services/time-entries.service";
import ITimeEntry from "../types/time-entry.types";
import { Timestamp } from "firebase/firestore";
import { convertToMilliseconds } from "../helpers/TimeDuration";

interface AddTimeEntryModalProps {
  onClose: () => void;
}

export default function AddTimeEntryModal({ onClose }: AddTimeEntryModalProps) {
  const [newEntry, setNewEntry] = useState<Omit<ITimeEntry, 'id'>>({
    name: '',
    date: Timestamp.now(),
    time: 0
  });

  const [minutes, setMinutes] = useState<string>('');
  const [seconds, setSeconds] = useState<string>('');
  const [milliseconds, setMilliseconds] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setNewEntry((prevEntry) => ({
      ...prevEntry,
      [name]: value
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const timeInMilliseconds = convertToMilliseconds(
      parseInt(minutes, 10) || 0,
      parseInt(seconds, 10) || 0,
      parseInt(milliseconds, 10) || 0
    );

    await addTimeEntry({
      ...newEntry,
      time: timeInMilliseconds
    });

    setNewEntry({
      name: '',
      date: Timestamp.now(),
      time: 0
    });

    setMinutes('');
    setSeconds('');
    setMilliseconds('');

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
                className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <input
                type="date"
                name="date"
                value={newEntry.date.toString()}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Time</label>
              <div className="flex space-x-2 align-middle justify-center">
                <input
                  type="number"
                  placeholder="Minutes"
                  value={minutes}
                  onChange={(e) => setMinutes(e.target.value)}
                  className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                />
                <span className="flex justify-center items-center">:</span>
                <input
                  type="number"
                  placeholder="Seconds"
                  value={seconds}
                  onChange={(e) => setSeconds(e.target.value)}
                  className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                />
                <span className="flex justify-center items-center">:</span>
                <input
                  type="number"
                  placeholder="Milliseconds"
                  value={milliseconds}
                  onChange={(e) => setMilliseconds(e.target.value)}
                  className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                />
              </div>
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
