export const themeStorageKey = "natures-basket-theme"

export const themeBootScript =
  'try { document.documentElement.classList.toggle("dark", localStorage.getItem(' +
  JSON.stringify(themeStorageKey) +
  ') === "dark") } catch {}'
