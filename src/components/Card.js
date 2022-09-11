function Card(props) {

  function handleClick() {
    props.onCardClick(props.card);
  }

  return (
    <article className="card">
      <img className="card__image" src={props.card.link} alt={props.card.name} onClick={handleClick}/>
      <h2 className="card__title">{props.card.name}</h2>
      <div className="card__like-container">
        <button className="card__button-like" name="card__like-button" aria-label='button-like' type="button" />
        <span className="card__likes-counter">{props.card.likes.length}</span>
      </div>
      <button className="card__button-delete" name="card__like-button-delete" aria-label='button-delete'
        type="button" />
    </article>
  );
}

export default Card;