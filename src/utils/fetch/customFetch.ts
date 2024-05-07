"use server";
import { deleteSession } from "@/app/actions/session";
import { redirect } from "next/navigation";
import {
  AccessRestrictedOrCacheHasCleaned,
  getErrorMessage,
  vpnInternetError,
} from "./errorMessages";
import { getAuthHeaderOnly } from "./fetch";

export interface FetchState<T> {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  data: T | null;
  error: string | null;
}

export async function customFetch<T>({
  url,
  options,
  headers,
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
  console.log("\n\n\n\n\n 🟢 ===  customFetch called === ");

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
    },
  };

  // console.log("\n\n 🟢 fetchOptions", fetchOptions);

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
      // console.log("\n\n 🔴 response customFetch: \n", response);
      const errorMessage = getErrorMessage(response.status);
      // console.log("\n\n 🔴 errorMessage: \n", errorMessage);
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

    // console.log("\n\n 🟢 customFetch data response : \n", data);

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

    // console.log("\n\n 🔴 customFetch error: \n", error);
    // console.log(
    //   `error:\n ${error}\n === \n ${AccessRestrictedOrCacheHasCleaned}`
    // );
    if (message === AccessRestrictedOrCacheHasCleaned) {
      console.log(
        "\n\n 🔴 Access restricted or cache has cleaned and session expired. \n",
        error
      );
      await deleteSession();
      return redirect("/login");
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
