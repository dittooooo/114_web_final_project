import { Link } from "react-router-dom";

export default function MealCard({ meal }) {
  const d = new Date(meal.date);
  const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(d.getDate()).padStart(2, "0")}`;

  return (
    <Link className="card" to={`/meals/${meal._id}`}>
      <div className="thumb">
        {meal.imageUrl ? (
          <img
            src={`${import.meta.env.VITE_API_BASE_URL}${meal.imageUrl}`}
            alt="thumb"
          />
        ) : (
          <div className="thumb-placeholder">No Photo</div>
        )}
      </div>

      <div className="card-body">
        <div className="meta">
          <span className="pill">{meal.mealType}</span>
          <span className="muted">{dateStr}</span>
        </div>
        <h3 className="title">{meal.title}</h3>
      </div>
    </Link>
  );
}
