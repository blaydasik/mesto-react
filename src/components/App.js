import '../index.css';
import Header from './Header';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import Footer from './Footer';
import {useState} from "react";

function App() {

  //переменные состояния
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  
  //обработчики открытия попапов
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  //обработчик закрытия попапов
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
  }

  //обработчик нажатия на картинку
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  return (
    <div className="page">
      <Header />
      <Main 
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
        />
      <Footer />

      <PopupWithForm name="profile" title="Редактировать профиль" textOnButton="Сохранить" 
        isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
        <label className="popup__label-field">
          <input className="popup__input popup__input_type_name" id="input_type_name" placeholder="Имя" type="text"
            minLength="2" maxLength="40" name="name" required />
          <span className="popup__error popup__error_type_name" id="input_type_name-error"></span>
          <input className="popup__input popup__input_type_about" id="input_type_about" placeholder="О себе" type="text"
            minLength="2" maxLength="200" name="about" required />
          <span className="popup__error popup__error_type_about" id="input_type_about-error"></span>
        </label>
      </PopupWithForm>

      <PopupWithForm name="add-card" title="Новое фото" textOnButton="Создать" 
        isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
        <label className="popup__label-field">
          <input className="popup__input popup__input_type_title" id="input_type_title" placeholder="Название"
            type="text" minLength="2" maxLength="30" name="name" required />
          <span className="popup__error popup__error_type_title" id="input_type_title-error"></span>
          <input className="popup__input popup__input_type_link" id="input_type_link" placeholder="Ссылка на картинку"
            type="url" name="link" required />
          <span className="popup__error popup__error_type_link" id="input_type_link-error"></span>
        </label>
      </PopupWithForm>

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />

      <PopupWithForm name="confirm-delete" title="Вы уверены?" textOnButton="Да" onClose={closeAllPopups} />

      <PopupWithForm name="update-avatar" title="Обновить аватар" textOnButton="Сохранить" 
        isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
        <label className="popup__label-field">
          <input className="popup__input popup__input_type_avatar" id="input_type_avatar" placeholder="Ссылка на аватар" type="url"
            name="avatar" required />
          <span className="popup__error popup__error_type_avatar" id="input_type_avatar-error"></span>
        </label>
      </PopupWithForm>

    </div >
  );
}

export default App;
