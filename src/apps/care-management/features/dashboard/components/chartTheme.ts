/**
 * ECharts can't read CSS variables, so resolve MDS tokens at render time.
 * Fallbacks are the MDS v5 token values, used only if the stylesheet hasn't loaded.
 */
function token(name: string, fallback: string) {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return value || fallback;
}

export function getChartTheme() {
  return {
    primary: token('--primary', '#0070dd'),
    success: token('--success', '#2ea843'),
    warning: token('--warning', '#f8a723'),
    alert: token('--alert', '#d93737'),
    text: token('--inverse', '#1f1f1f'),
    subtleText: token('--inverse-lighter', '#868686'),
    gridLine: token('--secondary-light', '#e5e5e5'),
    surface: token('--white', '#ffffff'),
    fontFamily: token('--font-family', 'Nunito Sans'),
  };
}
