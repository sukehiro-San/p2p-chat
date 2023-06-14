import "./Popup.scss";

function SuccessfulPopup({ showPopup, closePopup, message }) {
    const handleClose = () => {
        closePopup();
    }
  return (
    <div onClick={handleClose}>
      {showPopup && <div className="popup">
        <div>
            <div>Successfully {message}</div>
        </div>
        </div>}
    </div>
  );
}

export default SuccessfulPopup;
