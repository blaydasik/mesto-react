import PopupWithForm from './PopupWithForm';
import { useState } from "react";

function AddPlacePopup(props) {

  const [cardName, setCardName] = useState('');
  const [cardLink, setCardLink] = useState('');

  
  //обработчики
  function handleCardNameUpdate(evt) {
    setCardName(evt.target.value);
  }

  function handleCardLinkUpdate(evt) {
    setCardLink(evt.target.value)
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onAddPlace({
      name: cardName,
      link: cardLink
    });
    //и очистим инпут
    setCardName('');
    setCardLink('');
  }

  return (
    <PopupWithForm
      name="add-card"
      title="Новое фото"
      textOnButton="Создать"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >

      <label className="popup__label-field">
        <input
          className="popup__input popup__input_type_title"
          id="input_type_title"
          placeholder="Название"
          type="text"
          minLength="2"
          maxLength="30"
          name="name"
          value={cardName || ''}
          onChange={handleCardNameUpdate}
          required />
        <span className="popup__error popup__error_type_title" id="input_type_title-error"></span>
        <input className="popup__input popup__input_type_link"
          id="input_type_link"
          placeholder="Ссылка на картинку"
          type="url"
          name="link"
          value={cardLink || ''}
          onChange={handleCardLinkUpdate}
          required />
        <span className="popup__error popup__error_type_link" id="input_type_link-error"></span>
      </label>

    </PopupWithForm>
  )
}

export default AddPlacePopup;