import Link from "next/link";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const Navbar = () => {
  const router = useRouter();

  return (
    <nav className="px-2 navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link href="/" className="fw-bold navbar-brand">
          Anon IIT-K
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="justify-content-end collapse navbar-collapse"
          id="navbarNavAltMarkup"
        >
          <div className="navbar-nav">
            <Link
              href="/login"
              className={
                router.pathname === "/login" ? "nav-link" : "nav-link active"
              }
            >
              Login
            </Link>
            <Link
              href="/contact"
              className={
                router.pathname === "/contact" ? "nav-link" : "nav-link active"
              }
            >
              Contact Admin
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
