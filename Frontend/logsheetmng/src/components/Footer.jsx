import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../styles/footer.css";

export default function Footer() {
  return (
    <footer className="site-footer mt-auto py-3 text-light">
      <div className="container-fluid">
        <div className="site-footer-inner">
          <div className="row gy-3">
            <div className="col-12 col-lg-4 text-center text-lg-start">
              <h5 className="fw-bold mb-2">LogiTrack</h5>
              <p className="small mb-0">
                A professional logsheet management system for tracking courses,
                modules, and staff logs efficiently.
              </p>
            </div>

            <div className="col-12 col-lg-4 text-center">
              <h6 className="fw-bold mb-2">Quick Links</h6>
              <ul className="list-unstyled mb-0">
                <li>
                  <a href="/home">Home</a>
                </li>
                <li>
                  <a href="/about">About</a>
                </li>
                <li>
                  <a href="/contact">Contact</a>
                </li>
              </ul>
            </div>

            <div className="col-12 col-lg-4 text-center text-lg-end">
              <h6 className="fw-bold mb-2">Follow Us</h6>
              <div className="d-flex justify-content-center justify-content-lg-end gap-3">
                <a href="#">
                  <i className="bi bi-facebook"></i>
                </a>
                <a href="#">
                  <i className="bi bi-twitter"></i>
                </a>
                <a href="#">
                  <i className="bi bi-linkedin"></i>
                </a>
              </div>
            </div>
          </div>

          <hr className="border-secondary my-3" />
          <p className="small mb-0 text-center">
            © {new Date().getFullYear()} LogiTrack. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
