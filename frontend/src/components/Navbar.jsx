import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
  const { isAuthed, user, logout } = useAuth();

  return (
    <header className="nav">
      <Link className="brand" to="/">
        飲食紀錄
      </Link>

      <nav className="links">
        <NavLink to="/" end>
          首頁
        </NavLink>

        {!isAuthed ? (
          <>
            <NavLink to="/login">登入</NavLink>
            <NavLink to="/register">註冊</NavLink>
          </>
        ) : (
          <>
            <NavLink to="/meals/new">新增紀錄</NavLink>
            <button className="btn btn-ghost" onClick={logout}>
              登出
            </button>
            <span className="chip">{user?.username}</span>
          </>
        )}
      </nav>
    </header>
  );
}
