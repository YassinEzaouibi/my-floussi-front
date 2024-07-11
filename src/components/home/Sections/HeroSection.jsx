import { useEffect } from "react";
import AOS from "aos";
import investImage from "../../../assets/imgs/vectors/Revenue-bro.svg";

const HeroSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      offset: 100, // Offset (in pixels) from the top of the element
      easing: "ease-in-out", // Easing type
    });
  }, []);
  return (
    <div className="overflow-hidden lg:relative lg:py-28">
      <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-24 lg:px-8">
        <div>
          <div>
            <div className="mt-6 sm:max-w-xl text-center lg:text-left">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Investissez sereinement pour vos projets de vie
              </h1>
              <p className="mt-6 text-xl text-gray-500">
                Hikam Invest est la plateforme d'investissement idéale pour vous
                aider à atteindre vos objectifs financiers, qu'il s'agisse de
                préparer votre retraite, financer vos études ou acheter un bien
                immobilier.
              </p>
            </div>
            <div className="mt-2 sm:mt-3">
              <div className="sm:flex sm:justify-center lg:justify-start">
                <div className="mt-3 sm:mt-0 text-center">
                  <a
                    href="#"
                    className="block w-full rounded-md bg-gradient-to-r from-cyan-600 to-cyan-500 py-3 px-4 font-medium text-white shadow hover:from-teal-600 hover:to-cyan-700"
                  >
                    Commencer le questionnaire
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative lg:pl-12 mt-8 lg:mt-0">
          <img
            className="w-full lg:h-full lg:w-full object-cover"
            src={investImage}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;