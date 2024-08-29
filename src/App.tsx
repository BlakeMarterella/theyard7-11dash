// import { Timestamp } from "firebase/firestore";
import { getAllTimeEntries, addTimeEntry } from "./services/time-entries.service";
import ITimeEntry from "./types/time-entry.types";
import { useState, useEffect } from "react";

function App() {
  const [entries, setEntries] = useState<ITimeEntry[]>([]);
  const [newEntry, setNewEntry] = useState<Omit<ITimeEntry, 'id'>>({
    name: '',
    date: '',
    time: ''
  });

  // Fetch entries from Firebase on component mount
  useEffect(() => {
    const fetchEntries = async () => {
      const fetchedEntries = await getAllTimeEntries();
      setEntries(fetchedEntries);
    };
    fetchEntries();
  }, []);

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await addTimeEntry(newEntry);
    const updatedEntries = await getAllTimeEntries();
    setEntries(updatedEntries);
    setNewEntry({
      name: '',
      date: '',
      time: ''
    });
  };

  // Handle input changes
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setNewEntry((prevEntry) => ({
      ...prevEntry,
      [name]: value
    }));
  };

  return (<>
        <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">The Yard 7-11 Dash</h1>
      
      {/* Form for creating a new entry */}
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
        
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md">
          Add Entry
        </button>
      </form>

      {/* Table to display entries */}
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Time
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {entries.map((entry) => (
            <tr key={entry.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{entry.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.time}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </>);
}

export default App;
