import { ChevronRight, Home } from "lucide-react";
import { Link } from "react-router-dom";

const BreadCrumb = ({ currentPageTitle, links }) => {
  return (
    <div className="w-full flex items-center mb-5">
      <nav className="flex items-center" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-2">

          {/* Home */}
          <li>
            <Link
              to="/dashboard"
              className="flex items-center gap-1 text-sm font-medium text-secondary hover:text-primary transition"
            >
              <Home size={16} />
              <span className="hidden sm:inline">Home</span>
            </Link>
          </li>

          {/* Dynamic links */}
          {links?.map((link, index) => (
            <li key={index} className="flex items-center">
              <ChevronRight
                size={16}
                className="mx-2 text-secondary shrink-0"
              />
              <Link
                to={link.path}
                className="text-sm font-medium text-secondary hover:text-primary transition"
              >
                {link.title}
              </Link>
            </li>
          ))}

          {/* Current page */}
          <li className="flex items-center">
            <ChevronRight
              size={16}
              className="mx-2 text-secondary shrink-0"
            />
            <span className="text-sm font-semibold text-foreground">
              {currentPageTitle}
            </span>
          </li>

        </ol>
      </nav>
    </div>
  );
};

export default BreadCrumb;
