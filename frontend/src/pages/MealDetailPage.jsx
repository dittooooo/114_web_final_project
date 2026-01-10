import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { http } from "../api/http";
import MealInfoModule from "../components/MealInfoModule";

export default function MealDetailPage() {
  const { id } = useParams();
  const nav = useNavigate();
  const [meal, setMeal] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      setErr("");
      try {
        const { data } = await http.get(`/api/meals/${id}`);
        setMeal(data);
      } catch (e) {
        setErr(e?.response?.data?.message || "載入失敗");
      }
    })();
  }, [id]);

  const onDelete = async () => {
    if (!confirm("確定要刪除這筆紀錄？")) return;
    try {
      await http.delete(`/api/meals/${id}`);
      alert("刪除成功");
      nav("/");
    } catch (e) {
      alert(e?.response?.data?.message || "刪除失敗");
    }
  };

  if (err)
    return (
      <main className="container">
        <p className="error">{err}</p>
      </main>
    );
  if (!meal)
    return (
      <main className="container">
        <p className="muted">載入中...</p>
      </main>
    );

  return (
    <main className="container">
      <div className="row space-between">
        <h1 className="h1">詳細資料</h1>
        <div className="row gap">
          <Link className="btn" to={`/meals/${id}/edit`}>
            編輯
          </Link>
          <button className="btn btn-danger" onClick={onDelete}>
            刪除
          </button>
        </div>
      </div>

      <MealInfoModule meal={meal} />
    </main>
  );
}
