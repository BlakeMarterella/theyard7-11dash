import { useState } from "react";
import AddTimeEntryModal from "./components/AddTimeEntryModal";
import Leaderboard from "./components/Leaderboard/Leaderboard";
import Header from "./components/Header";

function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (<div className="w-full">    
            <Header></Header>
      
            <div className="container mx-auto p-4">
              <button
                className="bg-711-green hover:bg-green-500 transition duration-150 text-white px-5 py-2 rounded-md"
                onClick={() => setIsModalVisible(true)}>
                Add Time
              </button>

              {isModalVisible && <AddTimeEntryModal onClose={() => setIsModalVisible(false)} />}

            <Leaderboard />
          </div>
        </div>);
}

export default App;
