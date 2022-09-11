function PopupWithForm(props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button className="popup__button-close" name="popup__button-close" 
          aria-label='button-close' type="button" onClick={props.onClose}/>
        <form className={`popup__form popup__form_type_${props.name}`} 
          name={`popup__form_type_${props.name}`}>
          <h2 className={`popup__title popup__title_type_${props.name}`}>{props.title}</h2>
          <fieldset className="popup__fieldset">
            {props.children}
            <button className="popup__button-save" id={`popup__button-${props.name}`} 
              type="submit">{props.textOnButton}</button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;