import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

const Pagination = ({
    links: { prev, next, first, last },
    meta: { total, from, to, links },
    updateFetchUrl,
}) => {

    const handleClick = (url) => {
        if (url) updateFetchUrl(url);
    };

    return (
        <div className="flex justify-between items-center">

            {/* Help text */}
            <span className="text-sm text-black">
                Showing <b>{from}</b> to <b>{to}</b> of <b>{total}</b> Entries
            </span>

            {/* Pagination */}
            <div className="inline-flex mt-2 xs:mt-0 border border-gray-300 rounded-lg overflow-hidden">

                {/* First */}
                <button
                    onClick={() => handleClick(first)}
                    disabled={!first}
                    className="px-3 py-1 border-r border-gray-300 text-sm font-medium hover:bg-gray-50 transition disabled:opacity-50 disabled:pointer-events-none"
                >
                    &laquo;
                </button>

                {/* Previous */}
                <button
                    onClick={() => handleClick(prev)}
                    disabled={!prev}
                    className="px-3 py-1 border-r border-gray-300 text-sm font-medium flex items-center justify-center hover:bg-gray-50 transition disabled:opacity-50 disabled:pointer-events-none"
                >
                    <ChevronLeft size={16} />
                </button>

                {/* Page numbers */}
                {links
                    .filter((link) => !["&laquo; Previous", "Next &raquo;"].includes(link.label))
                    .map((link) => (
                        <button
                            key={link.label}
                            onClick={() => handleClick(link.url)}
                            disabled={!link.url}
                            className={`
                                px-3 py-1 border-r border-gray-300 text-sm font-medium transition
                                ${link.active
                                    ? "bg-primary text-white"
                                    : "bg-white text-black hover:bg-gray-50"
                                }
                                disabled:opacity-50 disabled:pointer-events-none
                            `}
                        >
                            {link.label}
                        </button>
                    ))}

                {/* Next */}
                <button
                    onClick={() => handleClick(next)}
                    disabled={!next}
                    className="px-3 py-1 text-sm font-medium flex items-center justify-center hover:bg-gray-50 transition disabled:opacity-50 disabled:pointer-events-none"
                >
                    <ChevronRight size={16} />
                </button>

                {/* Last */}
                <button
                    onClick={() => handleClick(last)}
                    disabled={!last}
                    className="px-3 py-1 border-l border-gray-300 text-sm font-medium hover:bg-gray-50 transition disabled:opacity-50 disabled:pointer-events-none"
                >
                    &raquo;
                </button>
            </div>
        </div>
    );
};

export default Pagination;
