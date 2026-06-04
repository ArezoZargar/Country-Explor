import { Search } from "lucide-react";
import { X } from "lucide-react";
export default function SearchBar({ search, setSearch, region, setRegion }) {
  const hasText = search.trim().length > 0;
  return (
    <div className="glass rounded-4 p-3 search-panel">
      <div className="input-group">
        <span className="input-group-text bg-transparent text-light border-0">
          <Search size={30} color="#600b0b" />
        </span>
        <input
          className="form-control bg-transparent text-light border-0 input-title"
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          placeholder="Explor Countries..."
        />
        <select
          className="form-select"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
        >
          {" "}
          <option value="all">All</option>{" "}
          <option value="Africa">Africa</option>{" "}
          <option value="Americas">Americas</option>{" "}
          <option value="Asia">Asia</option>{" "}
          <option value="Europe">Europe</option>{" "}
          <option value="Oceania">Oceania</option>{" "}
        </select>{" "}
        {hasText ? (
          <button
            className="btn btn-sm btn-soft"
            type="button"
            onClick={() => setSearch("")}
            aria-label="Clear search"
            title="Clear"
          >
            {" "}
            <X size={16} />{" "}
          </button>
        ) : null}{" "}
      </div>{" "}
    </div>
  );
}
