import { createContext, useContext, useState, ReactNode } from "react";

export interface PaymentMethod {
  id: string;
  type: "card" | "paypal";
  cardNumber?: string;
  cardHolder?: string;
  expiryDate?: string;
  bank?: string;
}

interface PaymentContextType {
  paymentMethods: PaymentMethod[];
  selectedPaymentMethod: PaymentMethod | null;
  addPaymentMethod: (method: Omit<PaymentMethod, "id">) => void;
  selectPaymentMethod: (id: string) => void;
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export function PaymentProvider({ children }: { children: ReactNode }) {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: "1",
      type: "card",
      cardNumber: "**** 5542",
      cardHolder: "Juan Pérez",
      expiryDate: "12/25",
      bank: "BBVA",
    },
    {
      id: "2",
      type: "card",
      cardNumber: "**** 5542",
      cardHolder: "Juan Pérez",
      expiryDate: "12/25",
      bank: "BBVA",
    },
  ]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod | null>(null);

  const addPaymentMethod = (method: Omit<PaymentMethod, "id">) => {
    const newMethod = {
      ...method,
      id: Date.now().toString(),
    };
    setPaymentMethods([...paymentMethods, newMethod]);
    setSelectedPaymentMethod(newMethod);
  };

  const selectPaymentMethod = (id: string) => {
    const method = paymentMethods.find((m) => m.id === id);
    if (method) {
      setSelectedPaymentMethod(method);
    }
  };

  return (
    <PaymentContext.Provider
      value={{
        paymentMethods,
        selectedPaymentMethod,
        addPaymentMethod,
        selectPaymentMethod,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
}

export function usePayment() {
  const context = useContext(PaymentContext);
  if (context === undefined) {
    throw new Error("usePayment must be used within a PaymentProvider");
  }
  return context;
}
