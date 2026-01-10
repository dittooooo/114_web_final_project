import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { http } from "../api/http";

export default function RegisterPage() {
  const nav = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [err, setErr] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    console.log("[REGISTER] submit payload =", {
      username: form.username,
      email: form.email,
      password: "***",
    });
    console.log("[REGISTER] API base =", import.meta.env.VITE_API_BASE_URL);
    if (!form.username.trim()) return setErr("使用者名稱必填");
    if (!form.email.trim()) return setErr("Email 必填");
    if (form.password.length < 6) return setErr("密碼至少 6 碼");

    try {
      console.log("[REGISTER] sending request...");
      await http.post("/api/auth/register", form);
      console.log("[REGISTER] success =", res.data);
      alert("註冊成功，請登入");
      nav("/login");
    } catch (e2) {
      console.log("[REGISTER] failed status =", err?.response?.status);
      console.log("[REGISTER] failed data =", err?.response?.data);
      console.log("[REGISTER] failed message =", err?.message);
      setErr(e2?.response?.data?.message || "註冊失敗");
    }
  };

  return (
    <main className="container">
      <h1 className="h1">註冊</h1>

      <form className="panel" onSubmit={onSubmit}>
        <div className="field">
          <label>使用者名稱</label>
          <input
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
        </div>
        <div className="field">
          <label>Email</label>
          <input
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>
        <div className="field">
          <label>密碼</label>
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>

        {err ? <p className="error">{err}</p> : null}

        <button className="btn btn-primary" type="submit">
          建立帳號
        </button>
        <p className="muted mt">
          已有帳號？ <Link to="/login">去登入</Link>
        </p>
      </form>
    </main>
  );
}
