import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

const Toaster = ({ ...props }) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      style={{
        "--normal-bg": "hsl(173, 72%, 40%)", // teal-500 background
        "--normal-text": "hsl(0, 0%, 100%)", // White text
        "--normal-border": "hsl(173, 72%, 30%)", // Darker teal border
        "--success": "hsl(173, 72%, 40%)", // teal-500 for success
        "--error": "hsl(0, 100%, 50%)", // Red for error
        "--warning": "hsl(40, 100%, 50%)", // Yellow for warning
      }}
      {...props}
    />
  );
};

export { Toaster };
