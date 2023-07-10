function CardSport(categories:any) {
    const cardStyle = {
        backgroundImage: `url(${categories.imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      };
    
  return (
    <div style={cardStyle} className="home-sport-card">
        <h4>{categories.label}</h4>
    </div>
  )
}

export default CardSport