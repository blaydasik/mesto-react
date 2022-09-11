import { useEffect, useState } from "react";
import workingApi from "../utils/Api";
import Card from "./Card";

function Main(props) {

  //переменные состояния
  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [cards, setCards] = useState([]);

  //обработчик ошибок в запросе
  function proceedError(err) {
    alert(`Ошибка. Запрос не выполнен: ${err}`);
  }

  //эффект при монтировании компонента
  useEffect(() => {
    //загружаем информацию о пользователе
    workingApi.downloadUserInfo()
      .then((userData) => {
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);
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
    <main className="content">

      <section className="profile">
        <img className="profile__picture" alt="аватар пользователя." src={userAvatar} />
        <button className="profile__update-button" name="profile__update-button" aria-label="update-button"
          type="button" onClick={props.onEditAvatar} />
        <div className="profile__info">
          <h1 className="profile__name">{userName}</h1>
          <button className="profile__edit-button" name="profile__edit-button" aria-label="edit-button"
            type="button" onClick={props.onEditProfile} />
          <p className="profile__about">{userDescription}</p>
        </div>
        <button className="profile__add-button" name="profile__add-button" type="button" onClick={props.onAddPlace} />
      </section>

      //с помощью JSX итерации добавим карточки на страницу
      <section className="cards">
        {cards.map((cardItem) => (
          <Card key={cardItem._id} card={cardItem} onCardClick={props.onCardClick}/>
        ))}
      </section>

    </main>
  );
}

export default Main;