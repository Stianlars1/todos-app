export const handleCloseNav = () => {
  const isOpen = document.body.getAttribute("data-nav-open");
  document.body.setAttribute("data-nav-open", String(!isOpen));
};
