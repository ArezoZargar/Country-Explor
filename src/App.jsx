import { useEffect, useState } from "react";
import { Flag } from "lucide-react";
import SearchBar from "./components/SearchBar";
import "./App.css";
import CountryList from "./components/CountryList";

async function requestCountries({
  search,
  region,
  signal,
  setCountries,
  setLoading,
  setError,
}) {
  try {
    setLoading(true);
    setError(null);

    const normalizedSearch = search.trim();
    const baseFields = "name,flags,region,population,cca3";

    let url = `https://restcountries.com/v3.1/all?fields=${baseFields}`;

    if (region !== "all") {
      url = `https://restcountries.com/v3.1/region/${region}?fields=${baseFields}`;
    } else if (normalizedSearch.length >= 2) {
      url = `https://restcountries.com/v3.1/name/${encodeURIComponent(normalizedSearch)}?fields=${baseFields}`;
    }

    const res = await fetch(url, { signal });

    if (res.status === 404) {
      setCountries([]);
      return;
    }

    if (!res.ok) {
      throw new Error("Failed to fetch countries");
    }

    const data = await res.json();

    const filteredCountries =
      region !== "all" && normalizedSearch.length >= 2
        ? data.filter((country) =>
            country.name?.common
              ?.toLowerCase()
              .includes(normalizedSearch.toLowerCase()),
          )
        : data;

    setCountries(filteredCountries);
  } catch (err) {
    if (err.name !== "AbortError") {
      setError(err.message || "Something went wrong");
      setCountries([]);
    }
  } finally {
    if (!signal?.aborted) {
      setLoading(false);
    }
  }
}

export default function App() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("all");

  useEffect(() => {
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => {
      requestCountries({
        search,
        region,
        signal: controller.signal,
        setCountries,
        setLoading,
        setError,
      });
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
      controller.abort();
    };
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
              onClick={() =>
                requestCountries({
                  search,
                  region,
                  setCountries,
                  setLoading,
                  setError,
                })
              }
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
