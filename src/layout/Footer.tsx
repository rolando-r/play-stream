import { FaGithub, FaLinkedin, FaGlobe } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="bg-black/90 text-gray-300 py-6 mt-10">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center px-4">
        {/* Rights reserved */}
        <p className="text-xs sm:text-sm text-center sm:text-left mb-4 sm:mb-0">
          &copy; {new Date().getFullYear()} Play Stream by Rolando Rodriguez. All rights reserved.
        </p>

        {/* Social media links */}
        <div className="flex space-x-4">
          <a
            href="https://github.com/rolando-r"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            <FaGithub size={20} />
          </a>
          <a
            href="https://linkedin.com/in/rolando-rodriguez-garcia"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            <FaLinkedin size={20} />
          </a>
          <a
            href="https://rolandor.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            <FaGlobe size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};
