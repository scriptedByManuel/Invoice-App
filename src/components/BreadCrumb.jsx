import { ChevronRight, Home } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const BreadCrumb = ({ currentPageTitle, links }) => {
  return (
    <div className="w-full flex items-center mb-5">
      <nav className="flex items-center" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-2">
          {/* Home link */}
          <li>
            <Link
              to="/dashboard"
              className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-blue-600 transition duration-200"
            >
              <Home size={16} />
              <span className="hidden sm:inline">Home</span>
            </Link>
          </li>

          {/* Dynamic breadcrumb links */}
          {links &&
            links.map((link, index) => (
              <li key={index} className="flex items-center">
                <ChevronRight
                  size={16}
                  className="mx-2 text-gray-400 shrink-0"
                />
                <Link
                  to={link.path}
                  className="text-sm font-medium text-gray-600 hover:text-blue-600 transition duration-200"
                >
                  {link.title}
                </Link>
              </li>
            ))}

          {/* Current page (not a link) */}
          <li className="flex items-center">
            <ChevronRight
              size={16}
              className="mx-2 text-gray-400 shrink-0"
            />
            <span className="text-sm font-semibold text-gray-900">
              {currentPageTitle}
            </span>
          </li>
        </ol>
      </nav>
    </div>
  );
};

export default BreadCrumb;
