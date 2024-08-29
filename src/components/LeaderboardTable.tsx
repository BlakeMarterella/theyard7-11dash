import React from 'react';
import ITimeEntry from '../types/time-entry.types';
import { convertMillisecondsToTimeString } from '../helpers/TimeDuration';

interface LeaderboardTableProps {
  entries: ITimeEntry[];
  onDelete: (id: string) => void;
  onSort: () => void;
  sortOrder: 'asc' | 'desc';
}

const LeaderboardTable: React.FC<LeaderboardTableProps> = ({ entries, onDelete, onSort, sortOrder }) => {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Name
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Date
          </th>
          <th 
            scope="col" 
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
            onClick={onSort}
          >
            Time {sortOrder === 'asc' ? '▲' : '▼'}
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {entries.map((entry) => (
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
        ))}
      </tbody>
    </table>
  );
};

export default LeaderboardTable;
