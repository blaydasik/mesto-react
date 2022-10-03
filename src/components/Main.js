import { useEffect, useState } from "react";
import React from "react";
import workingApi from "../utils/Api";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {

  //переменные состояния
  const [cards, setCards] = useState([]);

  //обработчик ошибок в запросе
  function proceedError(err) {
    alert(`Ошибка. Запрос не выполнен: ${err}`);
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
        setCards((state) => state.filter((cardItem) => cardItem._id != card._id));
      })
      .catch(proceedError.bind(this));
  }

  //эффект при монтировании компонента
  useEffect(() => {
    //загружаем массив карточек
    workingApi.downloadCards()
      .then((cardsData) => {
        setCards(cardsData);
      })
      .catch(proceedError.bind(this));
  }, []);

  //подпишемся на контекст текущего пользователя
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">

      <section className="profile">
        <img className="profile__picture" alt="аватар пользователя." src={currentUser.avatar} />
        <button className="profile__update-button" name="profile__update-button" aria-label="update-button"
          type="button" onClick={props.onEditAvatar} />
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button className="profile__edit-button" name="profile__edit-button" aria-label="edit-button"
            type="button" onClick={props.onEditProfile} />
          <p className="profile__about">{currentUser.about}</p>
        </div>
        <button className="profile__add-button" name="profile__add-button" type="button" onClick={props.onAddPlace} />
      </section>

      //с помощью JSX итерации добавим карточки на страницу
      <section className="cards">
        {cards.map((cardItem) => (
          <Card key={cardItem._id} card={cardItem} onCardClick={props.onCardClick} onCardLike={handleCardLike} onCardDelete={handleCardDelete} />
        ))}
      </section>

    </main>
  );
}

export default Main;