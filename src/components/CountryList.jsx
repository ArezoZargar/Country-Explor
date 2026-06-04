import CountryCard from "./CountryCard";

export default function CountryList({ countries, loading }) {
  if (loading) {
    return <h3 className="text-center py-5">Loading countries...</h3>;
  }

  return (
    <div className="row">
      {countries.map((country) => (
        <div className="col-md-4 mb-3" key={country.cca3 || country.name?.common}>
          <CountryCard country={country} />
        </div>
      ))}
    </div>
  );
}
