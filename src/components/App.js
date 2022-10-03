import '../index.css';
import Header from './Header';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import Footer from './Footer';
import { useEffect, useState } from "react";
import workingApi from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from './EditProfilePopup';

function App() {

  //переменные состояния
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});

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

  //обработчик ошибок в запросе
  function proceedError(err) {
    alert(`Ошибка. Запрос не выполнен: ${err}`);
  }

  //обработчик изменения профиля
  function handleUpdateUser(userInfo) {
    workingApi.setNewUserInfo(userInfo)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch(proceedError.bind(this));
    }

  //эффект при монтировании компонента
  useEffect(() => {
    //загружаем информацию о пользователе
    workingApi.downloadUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch(proceedError.bind(this));
  }, []);

  return (
    <div className="page">

      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
        />
        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

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
      </CurrentUserContext.Provider>

    </div >
  );
}

export default App;
