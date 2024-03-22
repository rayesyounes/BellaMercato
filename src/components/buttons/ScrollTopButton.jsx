import React, { useState, useEffect } from "react";
import { IoMdArrowRoundUp } from "react-icons/io";
import { Button } from "@chakra-ui/react";

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisible = () => {
      const scrolled = document.documentElement.scrollTop;
      if (scrolled > 300) {
        setVisible(true);
      } else if (scrolled <= 300) {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisible);
    return () => {
      window.removeEventListener("scroll", toggleVisible);
    };
  }, []);

  return (
    <Button
      onClick={() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      boxSize={12}
      position="fixed"
      bottom="10"
      right="5"
      borderRadius="full"
      boxShadow="md"
      bg={"rgba(255,255,255,0.3)"}
      _hover={{ bg: "teal.500" ,color : "white"}}
      animation="duration-300 ease-in-out"
      zIndex="50"
      display={visible ? "block" : "none"}
    >
      <IoMdArrowRoundUp />
    </Button>
  );
};

export default ScrollToTop;
