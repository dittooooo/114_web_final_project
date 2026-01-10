import { useEffect, useState } from "react";
import { http } from "../api/http";
import { useAuth } from "../contexts/AuthContext";
import MealCard from "../components/MealCard";
import DateFilter from "../components/DateFilter";

export default function HomePage() {
  const { isAuthed } = useAuth();
  const [date, setDate] = useState("");
  const [meals, setMeals] = useState([]);
  const [err, setErr] = useState("");

  const load = async () => {
    setErr("");
    if (!isAuthed) return setMeals([]);
    try {
      const q = date ? `?date=${date}` : "";
      const { data } = await http.get(`/api/meals${q}`);
      setMeals(data);
    } catch (e) {
      setErr(e?.response?.data?.message || "載入失敗");
    }
  };

  useEffect(() => {
    load();
  }, [isAuthed, date]);

  return (
    <main className="container">
      <div className="row space-between">
        <div>
          <h1 className="h1">飲食紀錄</h1>
          <p className="muted">依日期排序（新到舊），點擊卡片看詳情。</p>
        </div>
      </div>

      {!isAuthed ? (
        <section className="panel">
          <p>請先登入後開始新增與瀏覽你的飲食紀錄。</p>
        </section>
      ) : (
        <>
          <DateFilter
            value={date}
            onChange={setDate}
            onClear={() => setDate("")}
          />

          {err ? <p className="error mt">{err}</p> : null}

          {date && meals.length === 0 ? (
            <section className="panel mt">當日尚無紀錄</section>
          ) : null}

          <section className="grid mt">
            {meals.map((m) => (
              <MealCard key={m._id} meal={m} />
            ))}
          </section>
        </>
      )}
    </main>
  );
}
