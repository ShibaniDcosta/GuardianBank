import React from "react";
import { ReactComponent as OnlineIcon } from "../../../../assets/icons/online-icon-n_1.svg";
import { ReactComponent as OnboardingIcon } from "../../../../assets/icons/onboard-icon-n_1.svg";
import { ReactComponent as BudgetingIcon } from "../../../../assets/icons/budget-icon-n.svg";
import { ReactComponent as ApiIcon } from "../../../../assets/icons/API-icon-n.svg";

const motivationItems = [
  {
    icon: OnlineIcon,
    title: "Banking made easy",
    subtitle:
      "Access your account anytime, anywhere using our intuitive web and mobile app.",
  },
  {
    icon: BudgetingIcon,
    title: "Personalized Budgeting",
    subtitle:
      "Take charge of your spending with our customizable budgeting tools.",
  },
  {
    icon: OnboardingIcon,
    title: "Effortless Onboarding",
    subtitle:
      "Experience hassle-free account setup with our quick and easy online onboarding process.",
  },
  {
    icon: ApiIcon,
    title: "Integrated API",
    subtitle: "Streamline your financial management like never before.",
  },
];

export default function Motivation() {
  return (
    <section id="About" className="py-10 md:py-40 bg-[#4647a8]">
      <div className="max-w-[1800px] w-full mx-auto flex flex-col justify-center items-center gap-10 px-4 sm:px-10 md:px-12  text-center lg:text-left">
        <div className="grid lg:grid-cols-2 mb-12 lg:mb-16">
          <div className="col-span-1">
            <h2 className="text-white !text-3xl font-bold !font-sans lg:text-4xl pb-5  mb-5">
              {/* {" "} */}
              Discover the Top Reasons to Bank with Guardian Bank
            </h2>
            <p className="text-white !font-sans font-light  text-lg leading-5">
              We leverage Open Banking to turn your bank account into your
              financial hub. Control your finances like never before.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-9 lg:gap-6 lg:grid-cols-2">
          {motivationItems.map((item) => (
            <div key={item.title} className="justify-center">
              <div className="flex justify-center lg:justify-start">
              <div className="w-20 h-20 flex items-center justify-center rounded-full bg-white">
                  <item.icon
                    style={{
                      width: "100%", // Ensure the icon fits entirely within the circular container
                      height: "100%", // Ensure the icon fits entirely within the circular container
                    }}
                  />
                </div>
              </div>

              <h3 className="text-white ! text-lg font-semibold py-4 lg:pt-9 lg:pb-6 lg:text-xl lg:font-bold">
                {item.title}
              </h3>
              <p className="text-white !font-sans text-sm font-light lg:text-base leading-5">
                {item.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
