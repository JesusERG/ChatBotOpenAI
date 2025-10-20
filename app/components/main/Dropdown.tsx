import { useContext, useState, useEffect, memo } from "react";
import { ModelContext } from "../../context/ModelContext";
import { IconRobot } from "@/app/assets/Icons";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const model = useContext(ModelContext);
  const modelArray = [
    { model: "gpt-5-nano", displayName: "GPT 5 Nano" },
    { model: "gpt-4-turbo", displayName: "GPT 4 Turbo" },
    { model: "gpt-3.5-turbo", displayName: "GPT 3.5 Turbo" },
  ];

  useEffect(() => {
    const initAnimation = setTimeout(() => {
      setIsOpen(false);
    }, 2000);
    return () => clearTimeout(initAnimation);
  }, []);

  console.log("model: ", model?.model);
  return (
    <>
      {isOpen ? (
        <select
          onChange={(e) => {
            model?.setModel(e.target.value);
            setTimeout(() => setIsOpen(false), 500);
          }}
          value={model?.model}
          className="bg-primary w-40 h-10 p-2 rounded-xl absolute left-14 top-8 items-center justify-center animate-fadeInUp text-highlight"
        >
          {modelArray.map((model) => (
            <option
              className="text-highlight p-0.5"
              key={model.model}
              value={model.model}
            >
              {model.displayName}
            </option>
          ))}
        </select>
      ) : (
        <div
          className="w-10 h-10 p-3 rounded-xl animate-fadeInUp bg-primary absolute left-15 top-8 items-center justify-center shadow-md shadow-highlight cursor-pointer "
          onClick={() => setIsOpen(true)}
        >
          <IconRobot />
        </div>
      )}
    </>
  );
};

export default memo(Dropdown);
