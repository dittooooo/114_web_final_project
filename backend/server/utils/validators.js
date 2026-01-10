export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || "").trim());
}

export function assertNotFutureDate(dateStrOrDate) {
  const d = new Date(dateStrOrDate);
  if (Number.isNaN(d.getTime())) {
    const err = new Error("Invalid date");
    err.status = 400;
    throw err;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(d);
  target.setHours(0, 0, 0, 0);

  if (target.getTime() > today.getTime()) {
    const err = new Error("Date cannot be in the future");
    err.status = 400;
    throw err;
  }
  return target;
}

export function assertDescMax100(desc) {
  if (!desc) return "";
  const s = String(desc);
  if (s.length > 100) {
    const err = new Error("Description must be <= 100 characters");
    err.status = 400;
    throw err;
  }
  return s;
}
