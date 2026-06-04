import { useEffect, useState } from "react";
import { Flag } from "lucide-react";
import SearchBar from "./components/SearchBar";
import "./App.css";
import CountryList from "./components/CountryList";

export default function App() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("all");

  useEffect(() => {
    async function fetchCountries() {
      try {
        setLoading(true);
        setError(null);

        let url =
          "https://restcountries.com/v3.1/all?fields=name,flags,region,population";

        if (search.length >= 2) {
          url = `https://restcountries.com/v3.1/name/${search}`;
        } else if (region !== "all") {
          url = `https://restcountries.com/v3.1/region/${region}`;
        }

        const res = await fetch(url);

        if (!res.ok) {
          throw new Error("Failed to fetch countries");
        }

        const data = await res.json();

        setCountries(data);
      } catch (err) {
        setError(err.message);
        setCountries([]);
      } finally {
        setLoading(false);
      }
    }

    fetchCountries();
  }, [search, region]);

  return (
    <div className="py-4 py-sm-5">
      <div className="container py-5">
        <div className="glass rounded-4 p-3 p-sm-4 mb-4">
          <div className="d-flex align-items-center gap-3 mb-3">
            <div className="brand-badge glass">
              <Flag size={22} />
            </div>
            <div>
              <h1 className="h3 mb-0">Country Search</h1>
              <div className="muted small">
                Search countries that you know...
              </div>
            </div>
          </div>
        </div>

        <SearchBar
          search={search}
          setSearch={setSearch}
          region={region}
          setRegion={setRegion}
        />

        {error && (
          <div className="alert alert-danger">
            Error: {error}
            <button
              className="btn btn-danger ms-2"
              onClick={() => window.location.reload()}
            >
              Retry
            </button>
          </div>
        )}

        {!loading && countries.length === 0 && !error && (
          <div className="alert alert-warning">No results found</div>
        )}

        <CountryList countries={countries} loading={loading} />
      </div>
    </div>
  );
}
