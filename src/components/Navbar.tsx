import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-711-green p-4">
      <div className="container mx-auto flex justify-between">
        <div className="text-white font-bold text-xl">
          The Yard
        </div>
        <div className="space-x-4">
            <NavLink
                to="/"
                className={({ isActive }) => isActive ? "text-white underline" : "text-white"}
                end>
                Leaderboard
            </NavLink>
            <NavLink
                to="/categories"
                className={({ isActive }) => isActive ? "text-white underline" : "text-white"}
                end>
                Categories
            </NavLink>
            <NavLink
                to="/runners"
                className={({ isActive }) => isActive ? "text-white underline" : "text-white"}
                end>
                Runners
            </NavLink>
        </div>
      </div>
    </nav>
  );
}