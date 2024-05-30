export function getErrorMessage(statusCode: number): string {
  switch (statusCode) {
    case 400:
      return "We couldn’t process the request due to missing or incorrect information.";
    case 401:
      return "You need to be logged in to see this content.";
    case 403:
      return error_403_message;
    case 404:
      return "We couldn’t find the resource you were looking for.";
    case 409:
      return "Conflict occured. Please try again.";
    case 500:
      return "We’re experiencing technical difficulties. Please try again later.";
    case 503:
      return "Our service is temporarily unavailable. We’re working to restore it as quickly as possible.";
    default:
      return "An unexpected error occurred. Please try again.";
  }
}

export const vpnInternetError =
  "An error occured when loading the data. Please check your internet connection, firewall, or VPN.";

export const conflictError = "Conflict occured. Please try again.";
const error_403_message =
  "Access to this resource is restricted. Please contact support if you think this is a mistake.";
export const AccessRestrictedOrCacheHasCleaned = error_403_message;
