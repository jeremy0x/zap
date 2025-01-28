import axios from "axios";
import type {
  RatePayload,
  RateResponse,
  InstitutionProps,
  PubkeyResponse,
  VerifyAccountPayload,
  OrderStatusResponse,
} from "../types";

const AGGREGATOR_URL = process.env.NEXT_PUBLIC_AGGREGATOR_URL;
const NGN_PROVIDER_ID = process.env.NEXT_PUBLIC_NGN_PROVIDER_ID;
const KES_PROVIDER_ID = process.env.NEXT_PUBLIC_KES_PROVIDER_ID;

export const fetchRate = async ({
  token,
  amount,
  currency,
}: RatePayload): Promise<RateResponse> => {
  try {
    const providerId = currency === "KES" ? KES_PROVIDER_ID : NGN_PROVIDER_ID;
    const response = await axios.get(
      `${AGGREGATOR_URL}/rates/${token}/${amount}/${currency}?provider_id=${providerId}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching rate:", error);
    throw error;
  }
};

export const fetchSupportedInstitutions = async (
  currency: string,
): Promise<InstitutionProps[]> => {
  try {
    const response = await axios.get(
      `${AGGREGATOR_URL}/institutions/${currency}`,
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching supported institutions:", error);
    throw error;
  }
};

export const fetchAggregatorPublicKey = async (): Promise<PubkeyResponse> => {
  try {
    const response = await axios.get(`${AGGREGATOR_URL}/pubkey`);
    return response.data;
  } catch (error) {
    console.error("Error fetching aggregator public key:", error);
    throw error;
  }
};

export const fetchAccountName = async (
  payload: VerifyAccountPayload,
): Promise<string> => {
  try {
    const response = await axios.post(
      `${AGGREGATOR_URL}/verify-account`,
      payload,
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching supported institutions:", error);
    throw error;
  }
};

export const fetchOrderStatus = async (
  orderId: string,
): Promise<OrderStatusResponse> => {
  try {
    const response = await axios.get(
      `${AGGREGATOR_URL}/orders/8453/${orderId}`, // 8453 is the chain id for Base
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching order status:", error);
    throw error;
  }
};
