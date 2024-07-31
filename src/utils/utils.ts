export const handleCloseNav = () => {
  const isOpen = document.body.getAttribute("data-nav-open");
  document.body.setAttribute("data-nav-open", String(!isOpen));
};

export function debounce(fn: Function, delay: number) {
  let timeoutId: any;
  return (...args: any) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}
