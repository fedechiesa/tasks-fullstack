export default function Toast({ show, type = "success", msg, onClose }) {
  return (
    <div className="toast-container position-fixed bottom-0 end-0 p-3" style={{ zIndex: 1080 }} aria-live="polite" aria-atomic="true">
      <div className={`toast align-items-center text-bg-${type} ${show ? "show" : "hide"}`} role="status">
        <div className="d-flex">
          <div className="toast-body">{msg}</div>
          <button type="button" className="btn-close btn-close-white me-2 m-auto" onClick={onClose} aria-label="Close" />
        </div>
      </div>
    </div>
  );
}
