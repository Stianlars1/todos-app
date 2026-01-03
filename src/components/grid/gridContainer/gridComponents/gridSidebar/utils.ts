export const getSidebarState = () => {
  if (typeof window !== "undefined") {
    const storedState = localStorage.getItem("grid-sidebar-open");
    return storedState ? JSON.parse(storedState) : true; // Default to true if nothing is stored
  }
  return true; // Default open state if SSR
};

export const setSidebarState = (sidebarOpen: boolean) => {
  localStorage.setItem("grid-sidebar-open", JSON.stringify(sidebarOpen));
};
