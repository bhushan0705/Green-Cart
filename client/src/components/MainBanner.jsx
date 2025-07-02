import { useNavigate } from "react-router-dom";
import banner from "../assets/main_banner_bg.png";
import banner_mb from "../assets/main_banner_bg_sm.png";

const MainBanner = () => {
  const navigate = useNavigate();

  function handleClickAllItem() {
    navigate("/allproducts");
  }

  return (
    <div className="relative ">
      <img
        src={banner}
        alt="main_banner"
        className="h-[80vh] object-cover w-70% px-20 py-10 hidden lg:block "
      />
      <div className=" absolute lg:top-30 lg:left-50 bottom-30 left-15 flex flex-col gap-5">
        <h1 className="lg:text-5xl text-4xl text-wrap lg:w-[450px] w-[250px] font-bold text-black/70 tracking-wider [word-spacing:0.2rem]">
          Freshness You Can Trust, Savings You will Love!
        </h1>
        <div className="flex items-center justify-start gap-4">
          <button
            className="py-3 px-5 text-lg cursor-pointer rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors duration-300"
            onClick={handleClickAllItem}
          >
            Shop now
          </button>
          <p
            className="group cursor-pointer inline-flex items-center"
            onClick={() => navigate("/deal")}
          >
            Explore deals
            <i className="fa-solid fa-arrow-right ml-2 transition-transform duration-300 group-hover:translate-x-2"></i>
          </p>
        </div>
      </div>
      <div>
        <img
          src={banner_mb}
          alt="main_banner_mobile"
          className="block lg:hidden p-10 object-cover h-[90vh] w-[100%]"
        />
      </div>
    </div>
  );
};

export default MainBanner;
