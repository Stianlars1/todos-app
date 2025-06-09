"use server";
import { redirect } from "next/navigation";
import {
  AccessRestrictedOrCacheHasCleaned,
  getErrorMessage,
  vpnInternetError,
} from "./errorMessages";
import { getAuthHeaderOnly } from "./fetch";
import { deleteSession } from "@/lib/session";
import { ROUTE_SIGN_IN } from "@/utils/urls";

export interface FetchState<T> {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  data: T | null;
  error: string | null;
}

export interface FetchStateForm<T> extends FetchState<T> {
  formErrors: string[] | undefined;
}

export async function customFetch<T>({
  url,
  options,
  headers = {},
  cacheKey,
  revalidate,
  noAuthHeader,
}: {
  url: string;
  options: RequestInit;
  headers?: HeadersInit;
  cacheKey?: string;
  revalidate?: number;
  noAuthHeader?: boolean;
}): Promise<FetchState<T>> {
  console.log("Running customFetch with URL:", url);
  const authHeader = await getAuthHeaderOnly();
  const headersOptions = noAuthHeader
    ? headers
      ? {
          ...headers,
        }
      : undefined
    : authHeader
      ? {
          ...authHeader,
          ...headers, // Include passed headers as well
        }
      : {
          ...headers,
        };

  const fetchOptions: RequestInit = {
    ...options,
    headers: headersOptions,
    next: {
      revalidate: revalidate || 0,
      tags: cacheKey ? [cacheKey] : undefined,
    },
  };

  const state: FetchState<T> = {
    isLoading: true,
    isSuccess: false,
    isError: false,
    data: null,
    error: null,
  };

  try {
    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
      const contentType = response.headers.get("Content-Type");
      let errorData: any;
      if (contentType && contentType.includes("application/json")) {
        errorData = await response.json();
      } else {
        errorData = await response.text(); // Fallback to plain text
      }

      const errorMessage =
        errorData.message || errorData || getErrorMessage(response.status);
      throw new Error(errorMessage);
    }

    const contentType = response.headers.get("Content-Type");
    let data;
    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else if (contentType && contentType.includes("image")) {
      data = await response.blob();
    } else {
      data = await response.text(); // Fallback to plain text
    }

    return {
      ...state,
      isLoading: false,
      isSuccess: true,
      data,
    };
  } catch (error: any) {
    let message = error.message;

    if (error instanceof TypeError) {
      message = vpnInternetError;
    }

    if (message === AccessRestrictedOrCacheHasCleaned) {
      await deleteSession();
      return redirect(ROUTE_SIGN_IN);
    }
    return {
      ...state,
      isLoading: false,
      isError: true,
      error:
        message ||
        "An unknown error occured. We're sorry about the inconvenience. Please come back at a later time.",
    };
  }
}
