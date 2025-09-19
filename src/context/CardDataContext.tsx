import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

type CardData = {
    colorChoice: string,
    patternChoice: string,
    cardName: string,
    cardNumber: string
}
interface CardDataContextType {
  cardData: CardData;
  setCardData: (data: CardData) => void;
}

const CardDataContext = createContext<CardDataContextType | undefined>(
  undefined
);

export function CardDataProvider({ children }: { children: ReactNode }) {
  const [cardData, setCardData] = useState<CardData>({
    colorChoice: '#FFFFFF',
    patternChoice: 'clear',
    cardName: 'Andrea Wingårdh',
    cardNumber: '1234 5678 9123 4567'
  });

    const value: CardDataContextType = {
        cardData,
        setCardData,
    }

  return (
    <CardDataContext.Provider value={value}>
      {children}
    </CardDataContext.Provider>
  );
}

export function useCardData(): CardDataContextType {
  const context = useContext(CardDataContext);

  if (context === undefined) {
    throw new Error("useCardData must be used within a CardDataProvider");
  }

  return context;
}
