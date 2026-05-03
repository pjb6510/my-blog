import { DEFAULT_THEME } from "@/lib/theme";

const defaultIsDark = DEFAULT_THEME === "dark";
const script = `(function(){try{var s=localStorage.getItem('theme');var d=s?s==='dark':${defaultIsDark};var c=document.documentElement.classList;d?c.add('dark'):c.remove('dark');}catch(e){document.documentElement.classList.${defaultIsDark ? "add" : "remove"}('dark');}})();`;

export function ThemeScript() {
  return (
    <span
      hidden
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: `<script>${script}</script>` }}
    />
  );
}
