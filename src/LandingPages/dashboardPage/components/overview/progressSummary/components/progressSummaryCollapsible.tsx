"use client";
import { Button } from "@stianlarsen/react-ui-kit";
import { useTranslations } from "next-intl";
import { useState } from "react";

export const ProgressSummaryCollapsible = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const text = useTranslations("Dashboard.header.taskSummary");
  return (
    <>
      <Button
        variant="secondary"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          marginBottom: isOpen ? "1rem " : "3rem ",
          width: "100%",
        }}
      >
        {isOpen ? text("HIDE_SUMMARY") : text("SHOW_SUMMARY")}
      </Button>
      {isOpen && children}
    </>
  );
};
