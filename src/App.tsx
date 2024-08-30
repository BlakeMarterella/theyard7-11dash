import { getAllTimeEntries, deleteTimeEntry } from "./services/time-entries.service";
import ITimeEntry from "./types/time-entry.types";
import { useState, useEffect } from "react";
import AddTimeEntryModal from "./components/AddTimeEntryModal";
import LeaderboardTable from "./components/LeaderboardTable";
import Header from "./components/Header";

function App() {
  const [entries, setEntries] = useState<ITimeEntry[]>([]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [isModalVisible, setIsModalVisible] = useState(false);

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
          <Header></Header>
      
      <div className="container mx-auto p-4">
      <button
        className="bg-711-green hover:bg-green-500 transition duration-150 text-white px-5 py-2 rounded-md"
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
