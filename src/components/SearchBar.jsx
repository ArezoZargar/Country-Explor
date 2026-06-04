import { Search, X, RefreshCcw } from "lucide-react";

export default function SearchBar({ search, setSearch, region, setRegion }) {
  const hasText = search.trim().length > 0;
  const hasFilters = hasText || region !== "all";

  return (
    <div className="glass rounded-4 p-3 search-panel">
      <div className="input-group">
        <span className="input-group-text bg-transparent text-light border-0">
          <Search size={30} color="#600b0b" />
        </span>
        <input
          className="form-control bg-transparent border-0 input-title search-input"
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          placeholder="Search countries..."
        />
        <select
          className="form-select"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
        >
          <option value="all">all</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>{" "}
        {hasText ? (
          <button
            className="btn btn-sm btn-soft"
            type="button"
            onClick={() => setSearch("")}
            aria-label="Clear search"
            title="Clear"
          >
            <X size={16} />
          </button>
        ) : null}{" "}
      </div>{" "}
      {hasFilters ? (
        <div className="d-flex justify-content-end mt-3">
          <button
            className="btn btn-sm btn-outline-light"
            type="button"
            onClick={() => {
              setSearch("");
              setRegion("all");
            }}
          >
            <RefreshCcw size={14} className="me-1" />
            Clear filters
          </button>
        </div>
      ) : null}
    </div>
  );
}
