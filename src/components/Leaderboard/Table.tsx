import ITimeEntry from '../../types/time-entry.types';
import Row from './Row';

interface TableProps {
  entries: ITimeEntry[];
  onDelete: (id: string) => void;
  onSort: () => void;
  sortOrder: 'asc' | 'desc';
}

function Table(props: TableProps) {
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
            onClick={props.onSort}
          >
            Time {props.sortOrder === 'asc' ? '▲' : '▼'}
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {props.entries.map((entry) => (
          <Row key={entry.id} entry={entry} onDelete={props.onDelete} />
        ))}
      </tbody>
    </table>
  );
};

export default Table;
