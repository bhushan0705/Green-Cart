import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const Seller = () => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);

  const dashboardIcon = <svg className="w-6 h-6" />;
  const overviewIcon = <svg className="w-6 h-6" />;
  const chatIcon = <svg className="w-6 h-6" />;

  const sidebarLinks = [
    { name: "Add Product", path: "/seller", icon: dashboardIcon },
    { name: "Product Lists", path: "/seller/product-list", icon: overviewIcon },
    { name: "Orders", path: "/seller/sellerOrder", icon: chatIcon },
  ];

  useEffect(() => {
    if (location.state?.fromLogin) toast.success("Welcome, admin!");
  }, [location.state]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="inline-flex flex-col  md:flex-row min-h-screen absolute left-0 w-[100%]">
      <div className="hidden md:block md:w-64 border-r border-gray-300 pt-4 sticky top-0 h-screen">
        {sidebarLinks.map(({ name, path, icon }) => {
          const active = location.pathname === path;
          return (
            <Link
              key={name}
              to={path}
              className={`flex items-center gap-3 py-3 px-4 border-r-4 transition-all
                ${active
                  ? "border-indigo-500 bg-indigo-100 text-indigo-600 font-medium"
                  : "border-transparent hover:bg-gray-100 text-gray-700"}`}
            >
              {icon}
              <span>{name}</span>
            </Link>
          );
        })}
      </div>

      <div className="flex-1 pb-16 md:pb-0 px-3 md:px-6 pt-4">
        <Outlet />
      </div>

      {isMobile && (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-300 shadow-md md:hidden">
          <ul className="flex justify-around py-2">
            {sidebarLinks.map(({ name, path, icon }) => {
              const active = location.pathname === path;
              return (
                <li key={name}>
                  <Link
                    to={path}
                    className={`flex flex-col items-center text-xs transition
                      ${active ? "text-indigo-600" : "text-gray-600 hover:text-indigo-500"}`}
                  >
                    {icon}
                    <span>{name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </div>
  );
};

export default Seller;
