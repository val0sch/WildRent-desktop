function CardSport(sportList:any) {
    const cardStyle = {
        backgroundImage: `url(${sportList.imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      };
    
  return (
    <div style={cardStyle} className="home-sport-card">
        <h4>{sportList.name}</h4>
    </div>
  )
}

export default CardSport