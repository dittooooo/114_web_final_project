export default function DateFilter({ value, onChange, onClear }) {
  return (
    <div className="row gap">
      <div className="field">
        <label>依日期查詢</label>
        <input
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
      <button className="btn" onClick={onClear}>
        顯示全部
      </button>
    </div>
  );
}
