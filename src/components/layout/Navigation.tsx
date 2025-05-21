
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface NavigationProps {
  mobile: boolean;
  onItemClick?: () => void;
}

const Navigation = ({ mobile, onItemClick }: NavigationProps) => {
  const links = [
    { text: "Home", href: "/" },
    { text: "Projects", href: "/projects" },
    { text: "About", href: "/about" },
    { text: "Contact", href: "/contact" },
    { text: "Admin", href: "/admin" },
  ];

  return (
    <nav className={cn(
      "flex",
      mobile ? "flex-col space-y-4" : "items-center space-x-6"
    )}>
      {links.map((link) => (
        <Link
          key={link.href}
          to={link.href}
          className={cn(
            "text-foreground/70 hover:text-foreground transition-colors",
            mobile ? "text-lg" : "text-sm font-medium"
          )}
          onClick={onItemClick}
        >
          {link.text}
        </Link>
      ))}
    </nav>
  );
};

export default Navigation;
