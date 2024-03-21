import { Link } from "react-router-dom";

/**
 * Represents the Home component.
 * - Displays a link to navigate to the home page.
 * - Renders a back arrow icon with the link text.
 * @returns The Home component providing a link to navigate to the home page.
 */

export default function Home() {
    return (
        <div className="flex items-center mt-4">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              ></path>
            </svg>
            <Link to={"/"} className="text-purple-500 hover:underline">
              Home
            </Link>
        </div>
    );
}
