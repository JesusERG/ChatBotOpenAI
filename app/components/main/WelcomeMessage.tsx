import { useEffect, useState, useRef } from "react";
import Loading from "../general/Loading";

const WelcomeMessage = () => {
  const [customMessage, setCustomMessage] = useState<string>("hey");
  const hasFetched = useRef(false);

  // useEffect(() => {
  //   // only fetch the welcome message once
  //   if (hasFetched.current) return;
  //   hasFetched.current = true;
  //   const fetchWelcomeMessage = async () => {
  //     try {
  //       const response = await fetch("/api/welcome", {
  //         method: "POST",
  //         body: JSON.stringify({
  //           prompt: "Give me a really short Welcome message",
  //         }),
  //       });

  //       const result = await response.json();
  //       setCustomMessage(result);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };

  //   fetchWelcomeMessage();
  // }, []);

  return (
    <div className="flex flex-2 flex-col  mt-35 animate-fadeInUp">
      <h1 className="text-text text-center ">Hello Jesus!</h1>
      {customMessage ? (
        <h3 className="text-text-muted animate-fadeInUp text-center">
          {customMessage}
        </h3>
      ) : (
        <div className="flex items-center justify-center">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default WelcomeMessage;
