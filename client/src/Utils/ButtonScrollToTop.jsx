function ButtonScrollToTop() {
  const scrollToBottom = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <button className="secondary" onClick={scrollToBottom}>
      Haut de page
    </button>
  );
}

export default ButtonScrollToTop;
