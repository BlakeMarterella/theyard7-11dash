import ITimeEntry from "../../types/time-entry.types";
import { convertMillisecondsToTimeString } from "../../helpers/TimeDuration";

interface RowProps {
    entry: ITimeEntry;
    onDelete: (id: string) => void;
}

const Row: React.FC<RowProps> = ({ entry, onDelete }) => {
    return (
        <tr key={entry.id}>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{entry.name}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.date.toString()}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{convertMillisecondsToTimeString(entry.time)}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          <button
            onClick={() => onDelete(entry.id ? entry.id : "")}
            className="bg-red-500 text-white py-1 px-3 rounded-md"
          >
            Delete
          </button>
        </td>
      </tr>
    );
}

export default Row;