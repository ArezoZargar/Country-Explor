export default function CountryCard({ country }) {
  const countryName = country.name?.common || "Unknown country";
  const flagImage = country.flags?.svg || country.flags?.png || "";

  return (
    <div className="card h-100">
      {flagImage ? (
        <img
          src={flagImage}
          alt={countryName}
          className="card-img-top country-flag"
          onError={(event) => {
            event.currentTarget.style.display = "none";
            event.currentTarget.nextElementSibling?.classList.remove("d-none");
          }}
        />
      ) : (
        <div className="card-img-top country-flag-placeholder">
          No flag available
        </div>
      )}

      <div className="card-img-top country-flag-placeholder d-none">
        No flag available
      </div>

      <div className="card-body">
        <h5>{countryName}</h5>

        <p>
          <strong>Region:</strong> {country.region || "Unknown"}
        </p>

        <p>
          <strong>Population:</strong>{" "}
          {typeof country.population === "number"
            ? country.population.toLocaleString()
            : "Unknown"}
        </p>
      </div>
    </div>
  );
}
