"use client";
import ReactConfetti from "react-confetti";
import { UseConfettiStore } from "@/hooks/use-confetti-store";

export const ConfettiProvider = () => {
  const confetti = UseConfettiStore();
  if (!confetti.isOpen) return null;
  return (
    <ReactConfetti
      className="pointer-event-none z-[100]"
      numberOfPieces={500}
      recycle={false}
    />
  );
};
