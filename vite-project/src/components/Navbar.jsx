// src/components/Navbar.jsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { IoPersonCircleOutline } from "react-icons/io5";
import { Search } from "lucide-react";

import "./Navbar.css"; // <-- Import CSS

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showDropdown, setShowDropdown] = useState(false);

  // Mock data
  const courses = [
    { id: 1, title: "Web Development", category: "Programming" },
    { id: 2, title: "Machine Learning", category: "AI" },
    { id: 3, title: "IELTS Prep", category: "Language" },
  ];

  const categories = [
    { id: 1, title: "Programming" },
    { id: 2, title: "AI & Data Science" },
    { id: 3, title: "Language Learning" },
  ];

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filteredSuggestions = searchTerm
    ? [
      ...categories.map((cat) => ({ type: "category", title: cat.title })),
      ...courses.map((course) => ({
        type: "course",
        title: course.title,
        category: categories.find((c) => c.title === course.category)?.title,
      })),
    ]
      .filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase()))
      .slice(0, 6)
    : [];

  const handleSearch = () => {
    if (!searchTerm.trim()) return;

    const matchedCategory = categories.find((cat) =>
      cat.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (matchedCategory) {
      navigate(`/category/${matchedCategory.title.toLowerCase().replace(/\s+/g, "-")}`);
      resetSearch();
      return;
    }

    const matchedCourse = courses.find((course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (matchedCourse) {
      navigate(`/course/${matchedCourse.title.toLowerCase().replace(/\s+/g, "-")}`);
      resetSearch();
      return;
    }

    alert("No matching course or category found.");
  };

  const resetSearch = () => {
    setSearchTerm("");
    setShowDropdown(false);
  };

  const navItems = [
    { name: "Courses", path: "/course" },
    { name: "Blogs", path: "/blogs" },
    { name: "About Us", path: "/about" },
    { name: "Contact Us", path: "/contact" },
  ];

  const userItems = isLoggedIn
    ? [
      {
        title: "Profile",
        icon: <IoPersonCircleOutline size={20} />,
        path: "/profile",
        className: "navbar-mobile-auth-link-signin",
        linkClass: "flex items-center gap-2",
      },
      {
        title: "Logout",
        icon: <AiOutlineClose size={20} />,
        path: "/login",
        onClick: () => {
          logout();
          navigate("/login");
        },
        className: "navbar-mobile-auth-link-logout",
        linkClass: "flex items-center gap-2",
      },
    ]
    : [
      {
        title: "Login", // Changed from "Sign In" or "Get Started"
        path: "/login",
        className: "navbar-auth-link-signin",
      },
    ];
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <div className="navbar-logo-icon">
            <span className="text-white font-bold text-xl">E</span>
          </div>
          <Link to="/" className="navbar-logo-text">
            E-Learning
          </Link>
        </div>

        {/* Desktop Menu */}
        {!isMobile && (
          <div className="navbar-desktop-menu">
            <div className="navbar-nav-list">
              {navItems.map((item, idx) => (
                <Link key={idx} to={item.path} className="navbar-nav-link">
                  {item.name}
                </Link>
              ))}
            </div>

            <div className="navbar-search-container">
              <input
                type="search"
                placeholder="Search courses or categories..."
                className="navbar-search-input"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setShowDropdown(true);
                }}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <Search className="navbar-search-icon" />
              {showDropdown && filteredSuggestions.length > 0 && (
                <ul className="navbar-suggestions">
                  {filteredSuggestions.map((item, i) => (
                    <li
                      key={i}
                      className="navbar-suggestion-item"
                      onClick={() => {
                        if (item.type === "category") {
                          navigate(`/category/${item.title.toLowerCase().replace(/\s+/g, "-")}`);
                        } else {
                          navigate(`/course/${item.title.toLowerCase().replace(/\s+/g, "-")}`);
                        }
                        resetSearch();
                      }}
                    >
                      <span>{item.type === "category" ? "📁" : "📚"}</span>
                      <span>{item.title}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}

        {/* Desktop Auth Buttons */}
        {!isMobile && (
          <div className="navbar-auth-container">
            {userItems.map((item, i) => (
              <Link
                key={i}
                to={item.path}
                onClick={item.onClick || (() => { })}
                className={`navbar-auth-link ${item.className}`}
              >
                {item.icon && <span>{item.icon}</span>}
                {item.title}
              </Link>
            ))}
          </div>
        )}

        {/* Mobile Hamburger */}
        {isMobile && (
          <button onClick={() => setMenuOpen(!menuOpen)} className="navbar-hamburger">
            {menuOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
          </button>
        )}
      </div>

      {/* Mobile Menu */}
      {isMobile && menuOpen && (
        <div className="navbar-mobile-menu animate-fadeIn">
          <div className="navbar-mobile-nav">
            {navItems.map((item, idx) => (
              <Link
                key={idx}
                to={item.path}
                className="navbar-mobile-nav-link"
                onClick={() => setMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="navbar-mobile-search">
            <input
              type="search"
              placeholder="Search..."
              className="navbar-mobile-search-input"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowDropdown(true);
              }}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <Search className="navbar-mobile-search-icon" />
            {showDropdown && filteredSuggestions.length > 0 && (
              <ul className="navbar-mobile-suggestions">
                {filteredSuggestions.map((item, i) => (
                  <li
                    key={i}
                    className="navbar-mobile-suggestion-item"
                    onClick={() => {
                      if (item.type === "category") {
                        navigate(`/category/${item.title.toLowerCase().replace(/\s+/g, "-")}`);
                      } else {
                        navigate(`/course/${item.title.toLowerCase().replace(/\s+/g, "-")}`);
                      }
                      resetSearch();
                      setMenuOpen(false);
                    }}
                  >
                    {item.type === "category" ? "📁" : "📚"} {item.title}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="navbar-mobile-auth">
            {userItems.map((item, i) => (
              <Link
                key={i}
                to={item.path}
                onClick={(e) => {
                  e.preventDefault();
                  if (item.onClick) item.onClick();
                  setMenuOpen(false);
                }}
                className={`${item.className} ${item.linkClass || ""}`}
              >
                {item.icon && <span>{item.icon}</span>}
                <span>{item.title}</span>
              </Link>
            ))}

            {isLoggedIn && (
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                {user.role}
              </span>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;