import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { http } from "../api/http";
import { useAuth } from "../contexts/AuthContext";

export default function LoginPage() {
  const nav = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    if (!form.email.trim()) return setErr("Email 必填");
    if (!form.password) return setErr("密碼必填");

    try {
      const { data } = await http.post("/api/auth/login", form);
      login(data);
      alert("登入成功");
      nav("/");
    } catch (e2) {
      setErr(e2?.response?.data?.message || "登入失敗");
    }
  };

  return (
    <main className="container">
      <h1 className="h1">登入</h1>

      <form className="panel" onSubmit={onSubmit}>
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
          登入
        </button>
        <p className="muted mt">
          還沒有帳號？ <Link to="/register">去註冊</Link>
        </p>
      </form>
    </main>
  );
}
