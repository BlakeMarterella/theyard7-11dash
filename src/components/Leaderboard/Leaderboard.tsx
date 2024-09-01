import Table from './Table';
import { getAllTimeEntries, deleteTimeEntry } from "../../services/time-entries.service";
import ITimeEntry from "../../types/time-entry.types";
import { useState, useEffect } from "react";


export default function Leaderboard() {
    const [entries, setEntries] = useState<ITimeEntry[]>([]);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    useEffect(() => {
        const fetchEntries = async () => {
        const fetchedEntries = await getAllTimeEntries();
        setEntries(sortEntries(fetchedEntries, sortOrder));
        };
        fetchEntries();
    }, [sortOrder]);

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

  return (

    <Table
        entries={entries}
        onDelete={handleDelete}
        onSort={handleSort}
        sortOrder={sortOrder} 
    />

  );
}