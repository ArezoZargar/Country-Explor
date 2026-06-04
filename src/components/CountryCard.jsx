export default function CountryCard({ country }) {
  return (
    <div className="card h-100">
      <img
        src={country.flags?.png}
        alt={country.name?.common}
        className="card-img-top"
      />

      <div className="card-body">
        <h5>{country.name?.common}</h5>

        <p>
          <strong>Region:</strong> {country.region}
        </p>

        <p>
          <strong>Population:</strong>{" "}
          {country.population?.toLocaleString()}
        </p>
      </div>
    </div>
  );
}