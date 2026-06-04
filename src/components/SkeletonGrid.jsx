export default function SkeletonGrid() {
  return (
    <div className="row g-3 g-md-4">
      {Array.from({ length: 9 }).map((_, i) => (
        <div className="col-12 col-sm-6 col-lg-4" key={i}>
          <div className="glass rounded-4 overflow-hidden">
            <div className="skeleton" style={{ aspectRatio: "2 / 3" }} />
            <div className="p-3 p-md-4">
              <div className="skeleton rounded mb-2" style={{ height: 14, width: "75%" }} />
              <div className="skeleton rounded mb-3" style={{ height: 12, width: "50%" }} />
              <div className="skeleton rounded-3" style={{ height: 40, width: "100%" }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
