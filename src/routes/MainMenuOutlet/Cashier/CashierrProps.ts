import { Dispatch, SetStateAction } from "react";
import { ToastMessage } from "../../../components/Toast/ToastProps";
import { Client } from "../../../entities/Client";
import { Product } from "../../../entities/Product";

/** Handle Sell Props */
export interface HandleSellProps {
  /** Client info. */
  client: Client;
  /** Product info. */
  product: Product;
  /** If money is being taking from client wallet. */
  isPayingFromWallet: boolean;
  /** Setter for toast message. */
  setReturnMessage: Dispatch<SetStateAction<ToastMessage>>;
  /** Loading state. */
  setIsLoading: (loading: boolean) => void;
}
  