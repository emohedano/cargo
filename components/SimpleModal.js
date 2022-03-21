export default function SimpleModal({ title, description, acceptLabel, open, onClose, onAccept, children }) {
  function handleModalClose() {
    onClose()
  }
  
  function handleModalAccept() {
    onAccept()
  }

  return (
    <div className={`modal ${open ? 'is-active' : ''}`}>
      <div className="modal-background"></div>
      <div className="modal-content">
        <div className="box">
          <div className="is-flex is-justify-content-space-between">
            <div className="title">{title}</div>
            <span className="icon is-large has-text-grey-light" onClick={handleModalClose}>
              <i className="fa fa-lg fa-xmark"></i>
            </span>
          </div>

          <div className="mb-4">
            {description}
          </div>
          {children}
          <hr />
          <div className="is-flex is-justify-content-flex-end">
            <button className="button mr-2" onClick={handleModalClose}>Cancel</button>
            <button className="button is-primary" onClick={handleModalAccept}>{acceptLabel}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
