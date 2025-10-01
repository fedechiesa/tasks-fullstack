export default function ConfirmModal({
  show, title, message,
  confirmText = "Confirmar", cancelText = "Cancelar",
  onConfirm, onCancel, busy = false
}) {
  if (!show) return null;
  return (
    <div className="modal fade show" style={{ display: "block", background: "rgba(0,0,0,.6)" }} aria-modal="true" role="dialog">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content" style={{ border: "1px solid #262a33" }}>
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button type="button" className="btn-close" onClick={onCancel} aria-label="Close" />
          </div>
          <div className="modal-body"><p className="m-0">{message}</p></div>
          <div className="modal-footer">
            <button className="btn btn-outline-secondary" onClick={onCancel} disabled={busy}>{cancelText}</button>
            <button className="btn btn-danger" onClick={onConfirm} disabled={busy}>
              {busy ? (<><span className="spinner-border spinner-border-sm me-2" aria-hidden /> Eliminando...</>) : confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
