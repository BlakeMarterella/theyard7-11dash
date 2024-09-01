import ITimeEntry from "../../types/time-entry.types";
import { convertMillisecondsToTimeString } from "../../helpers/TimeDuration";

interface RowProps {
    entry: ITimeEntry;
    onDelete: (id: string) => void;
}

function Row(props: RowProps) {
    return (
        <tr key={props.entry.id}>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{props.entry.name}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{props.entry.date.toString()}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{convertMillisecondsToTimeString(props.entry.time)}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          <button
            onClick={() => props.onDelete(props.entry.id ? props.entry.id : "")}
            className="bg-711-red text-white py-1 px-3 rounded-md"
          >
            Delete
          </button>
        </td>
      </tr>
    );
}

export default Row;