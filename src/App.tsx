import { getAllTimeEntries, deleteTimeEntry } from "./services/time-entries.service";
import ITimeEntry from "./types/time-entry.types";
import { useState, useEffect } from "react";
import AddTimeEntryModal from "./components/AddTimeEntryModal";

function App() {
  const [entries, setEntries] = useState<ITimeEntry[]>([]);

  // Fetch entries from Firebase on component mount
  useEffect(() => {
    const fetchEntries = async () => {
      const fetchedEntries = await getAllTimeEntries();
      setEntries(fetchedEntries);
    };
    fetchEntries();
  }, []);

  const handleDelete = async (id: string) => {
    await deleteTimeEntry(id);
    const updatedEntries = entries.filter(entry => entry.id !== id);
    setEntries(updatedEntries);
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleShowModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };


  return (<>
        <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">The Yard 7-11 Dash</h1>
      
      <button
        className="bg-green-600 hover:bg-green-500 transition duration-150 text-white px-5 py-2 rounded-md"
        onClick={handleShowModal}>
        Add Time
      </button>

      {isModalVisible && <AddTimeEntryModal onClose={handleCloseModal} />}


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
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {entries.map((entry) => (
            <tr key={entry.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{entry.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.date}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.time}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <button
                  onClick={() => handleDelete(entry.id ? entry.id : "")}
                  className="bg-red-500 text-white py-1 px-3 rounded-md"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </>);
}

export default App;
