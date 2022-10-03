import '../index.css';
import Header from './Header';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import Footer from './Footer';
import { useEffect, useState } from "react";
import workingApi from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

function App() {

  //переменные состояния
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

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

  //обработчик изменения аватара
  function handleUpdateAvatar(avatarLink) {
    workingApi.updateUserAvatar(avatarLink)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch(proceedError.bind(this));
  }

  //обработчик лайка
  function handleCardLike(card) {
    //проверяем, есть ли уже лайк
    const isLiked = card.likes.some(user => user._id === currentUser._id);
    //отправим запрос на постановку/удаление лайка
    workingApi.proceedLike(card._id, isLiked)
      .then((newCard) => {
        //обновим массив карточек
        setCards((state) => state.map((cardItem) => cardItem._id === card._id ? newCard : cardItem));
      })
      .catch(proceedError.bind(this));
  }

  //обработчик удаления карточки
  function handleCardDelete(card) {
    workingApi.deleteCard(card._id)
      .then((filteredCards) => {
        //обновим массив карточек
        setCards((state) => state.filter((cardItem) => cardItem._id !== card._id));
      })
      .catch(proceedError.bind(this));
  }

  //обработчик добавления карточки
  function handleAddPlaceSubmit(cardData) {
    workingApi.addNewCard(cardData)
    .then((newCard) => {
      //обновим массив карточек
      setCards([newCard, ...cards]);
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
    //загружаем массив карточек
    workingApi.downloadCards()
      .then((cardsData) => {
        setCards(cardsData);
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
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <PopupWithForm
          name="confirm-delete"
          title="Вы уверены?"
          textOnButton="Да"
          onClose={closeAllPopups}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

      </CurrentUserContext.Provider>

    </div >
  );
}

export default App;