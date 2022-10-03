import PopupWithForm from './PopupWithForm';
import React, { useEffect, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const currentUser = React.useContext(CurrentUserContext);

  //обработчики
  function handleNameUpdate(evt) {
    setName(evt.target.value);
  }

  function handleJobUpdate(evt) {
    setDescription(evt.target.value)
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    //передаим значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  //получим данные пользователя в управляемые компоненты
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      textOnButton="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >

      <label className="popup__label-field">
        <input className="popup__input popup__input_type_name"
          id="input_type_name"
          placeholder="Имя"
          type="text"
          minLength="2"
          maxLength="40"
          name="name"
          value={name || ''}
          onChange={handleNameUpdate}
          required
        />
        <span className="popup__error popup__error_type_name" id="input_type_name-error"></span>
        <input className="popup__input popup__input_type_about"
          id="input_type_about"
          placeholder="О себе"
          type="text"
          minLength="2"
          maxLength="200"
          name="about"
          value={description || ''}
          onChange={handleJobUpdate}
          required
        />
        <span className="popup__error popup__error_type_about" id="input_type_about-error"></span>
      </label>

    </PopupWithForm >
  )
}

export default EditProfilePopup;