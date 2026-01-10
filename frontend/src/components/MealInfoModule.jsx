export default function MealInfoModule({ meal }) {
  const d = new Date(meal.date);
  const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(d.getDate()).padStart(2, "0")}`;

  return (
    <section className="panel">
      <div className="row space-between">
        <div>
          <h2 className="h2">{meal.title}</h2>
          <div className="row gap">
            <span className="pill">{meal.mealType}</span>
            <span className="muted">{dateStr}</span>
          </div>
        </div>
      </div>

      {meal.imageUrl ? (
        <img
          className="hero-img"
          src={`${import.meta.env.VITE_API_BASE_URL}${meal.imageUrl}`}
          alt="meal"
        />
      ) : null}

      <div className="mt">
        <h4 className="h4">簡短描述</h4>
        <p className="muted">{meal.description || "（無）"}</p>
      </div>
    </section>
  );
}
