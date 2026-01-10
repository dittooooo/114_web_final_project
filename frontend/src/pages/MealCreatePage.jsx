import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { http } from "../api/http";

function todayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(d.getDate()).padStart(2, "0")}`;
}

export default function MealCreatePage() {
  const nav = useNavigate();
  const maxDate = useMemo(() => todayStr(), []);
  const [form, setForm] = useState({
    title: "",
    mealType: "Breakfast",
    date: maxDate,
    description: "",
  });
  const [image, setImage] = useState(null);
  const [err, setErr] = useState("");

  const validate = () => {
    if (!form.title.trim()) return "料理名稱必填";
    if (form.description.length > 100) return "描述不可超過 100 字";
    if (form.date > maxDate) return "不可選擇未來日期";
    return "";
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const msg = validate();
    if (msg) return setErr(msg);
    setErr("");

    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("mealType", form.mealType);
    fd.append("date", form.date);
    fd.append("description", form.description);
    if (image) fd.append("image", image);

    try {
      await http.post("/api/meals", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("新增成功");
      nav("/");
    } catch (e2) {
      setErr(e2?.response?.data?.message || "新增失敗");
    }
  };

  return (
    <main className="container">
      <h1 className="h1">新增飲食紀錄</h1>

      <form className="panel" onSubmit={onSubmit}>
        <div className="field">
          <label>料理名稱（必填）</label>
          <input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>

        <div className="row gap">
          <div className="field">
            <label>餐別</label>
            <select
              value={form.mealType}
              onChange={(e) => setForm({ ...form, mealType: e.target.value })}
            >
              <option value="Breakfast">早餐</option>
              <option value="Lunch">午餐</option>
              <option value="Dinner">晚餐</option>
            </select>
          </div>

          <div className="field">
            <label>日期（不可未來）</label>
            <input
              type="date"
              max={maxDate}
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />
          </div>
        </div>

        <div className="field">
          <label>照片（最多 1 張）</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
          />
          <p className="muted">支援 jpg/png/webp，建議 3MB 以內。</p>
        </div>

        <div className="field">
          <label>簡短描述（最多 100 字）</label>
          <textarea
            rows="3"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <div className="muted">{form.description.length}/100</div>
        </div>

        {err ? <p className="error">{err}</p> : null}

        <button className="btn btn-primary" type="submit">
          送出
        </button>
      </form>
    </main>
  );
}
