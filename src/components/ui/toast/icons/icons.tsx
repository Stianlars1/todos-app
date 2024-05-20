import "./toastIcons.css";
export const TaskBuddyToastIcon = ({
  className = " ",
}: {
  className?: string;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 1004 1004"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path
        d="M856.968 856.968C660.924 1053.01 343.076 1053.01 147.032 856.968C-49.0108 660.924 -49.0108 343.076 147.032 147.032C343.076 -49.0108 660.924 -49.0108 856.968 147.032C1053.01 343.076 1053.01 660.924 856.968 856.968Z"
        fill="black"
      />
      <path
        d="M199.926 492.514C169.075 461.663 169.075 411.643 199.926 380.791C230.778 349.94 280.798 349.94 311.649 380.791L365.389 434.532C366.561 435.703 366.561 437.603 365.389 438.774L257.909 546.254C256.738 547.426 254.838 547.426 253.666 546.254L199.926 492.514Z"
        fill="white"
      />
      <rect
        x="267.102"
        y="559.689"
        width="158"
        height="158"
        transform="rotate(-45 267.102 559.689)"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M971.618 324.273L501.651 794.24L389.928 682.517L888.939 183.506L894.913 189.48C928.015 230.991 953.583 276.533 971.618 324.273Z"
        fill="white"
      />
    </svg>
  );
};
export const WarningToastIcon = ({
  className = " ",
}: {
  className?: string;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path>
      <path d="M12 9v4"></path>
      <path d="M12 17h.01"></path>
    </svg>
  );
};
export const InfoToastIcon = ({ className = " " }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10"></circle>
      <path d="M12 16v-4"></path>
      <path d="M12 8h.01"></path>
    </svg>
  );
};
