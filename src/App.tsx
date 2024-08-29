import { getAllTimeEntries, deleteTimeEntry } from "./services/time-entries.service";
import ITimeEntry from "./types/time-entry.types";
import { useState, useEffect } from "react";
import AddTimeEntryModal from "./components/AddTimeEntryModal";
import LeaderboardTable from "./components/LeaderboardTable";

function App() {
  const [entries, setEntries] = useState<ITimeEntry[]>([]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Fetch entries from Firebase on component mount
  useEffect(() => {
    const fetchEntries = async () => {
      const fetchedEntries = await getAllTimeEntries();
      setEntries(sortEntries(fetchedEntries, sortOrder));
    };
    fetchEntries();
  }, [sortOrder, isModalVisible]);

  const handleDelete = async (id: string) => {
    await deleteTimeEntry(id);
    const updatedEntries = entries.filter(entry => entry.id !== id);
    setEntries(updatedEntries);
  };

  const handleSort = () => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);
  };

  const sortEntries = (entries: ITimeEntry[], order: 'asc' | 'desc'): ITimeEntry[] => {
    return entries.sort((a, b) => {
      const timeA = new Date(a.time).getTime();
      const timeB = new Date(b.time).getTime();
      return order === 'asc' ? timeA - timeB : timeB - timeA;
    });
  };

  return (<>
        <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">The Yard 7-11 Dash</h1>
      
      <button
        className="bg-green-600 hover:bg-green-500 transition duration-150 text-white px-5 py-2 rounded-md"
        onClick={() => setIsModalVisible(true)}>
        Add Time
      </button>

      {isModalVisible && <AddTimeEntryModal onClose={() => setIsModalVisible(false)} />}


      <LeaderboardTable 
        entries={entries}
        onDelete={handleDelete}
        onSort={handleSort}
        sortOrder={sortOrder}
      />
    </div>
  </>);
}

export default App;
