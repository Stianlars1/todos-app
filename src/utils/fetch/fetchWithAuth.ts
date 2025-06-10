"use server";

import { cookies } from "next/headers";
import { getSession } from "@/lib/session";
import { COOKIE_ACCESS_TOKEN } from "@/utils/cookiesConstants";
import { APPLICATION_JSON_V1 } from "@/utils/fetch/fetch";

export type FetchResponse<T> = {
  data: T | null;
  error: string | null;
  status: number;
};

type FetchOptions = RequestInit & {
  tag?: string[];
};

export async function fetchWithAuth<T>(
  url: string,
  options: RequestInit = {},
): Promise<FetchResponse<T>> {
  try {
    const session = await getSession();
    if (!session?.accessToken) {
      return { data: null, error: "No active session", status: 401 };
    }
    const isFormData = options.body instanceof FormData;

    const headers: HeadersInit = {
      ...options.headers,
      ...(isFormData ? {} : { ...APPLICATION_JSON_V1 }),
      Authorization: `Bearer ${session.accessToken}`,
    };

    const res = await fetch(url, {
      ...options,
      headers,
      credentials: "include",
    });

    // Handle non-JSON responses (like DELETE requests)
    if (res.status === 204 || res.headers.get("content-length") === "0") {
      return { data: null, error: null, status: res.status };
    }

    if (!res.ok) {
      let errorMessage: string;
      try {
        // Try to get feedback message from response body
        // decide based on content type how to parse the response
        const contentType = res.headers.get("content-type");
        let errorBody: string | null = null;
        if (contentType?.includes("application/json")) {
          const errorData = await res.json();
          console.error("auth error res", errorData);
          errorBody = errorData?.message || errorData?.error;
        } else {
          errorBody = await res.text();
        }

        errorMessage = errorBody || `HTTP error: ${res.status}`;
      } catch {
        errorMessage = `HTTP error: ${res.status}`;
      }

      return {
        data: null,
        error: errorMessage,
        status: res.status,
      };
    }

    try {
      const contentType = res.headers.get("content-type");
      if (contentType?.includes("application/json")) {
        const data = await res.json();
        return { data, error: null, status: res.status };
      } else {
        // Handle non-JSON successful responses
        const textData = await res.text();
        return {
          data: textData as unknown as T,

          error: null,
          status: res.status,
        };
      }
    } catch (parseError) {
      console.error("Error parsing response:", parseError);
      return {
        data: null,
        error: "Invalid response format",
        status: res.status,
      };
    }
  } catch (error) {
    console.error("Network or other feedback:", error);
    return {
      data: null,
      error:
        error instanceof Error ? error.message : "Unknown feedback occurred",
      status: 500,
    };
  }
}

export async function tryToFetchWithAuth(
  url: string,
  options: FetchOptions,
): Promise<Response> {
  const accessToken = (await cookies()).get(COOKIE_ACCESS_TOKEN)?.value;

  const headers = accessToken
    ? {
        ...options.headers,
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      }
    : {
        ...options.headers,
        "Content-Type": "application/json",
      };

  return fetch(url, {
    ...options,
    headers,
    credentials: "include",
  });
}
