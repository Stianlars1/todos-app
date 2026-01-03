// "use client";
// import { CreateDashboard } from "@/LandingPages/dashboardPage/components/dashboardSwitch/components/createDashboard/createDashboard";
// import { Button } from "@stianlarsen/react-ui-kit";
// import { useTranslations } from "next-intl";
// import { useState } from "react";
// import styles from "./css/createNewDashboard.module.css";
// export const CreateNewDashboard = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const text = useTranslations("CreateDashboard");
//   return (
//     <li>
//       <Button onClick={() => setIsOpen(true)} className={styles.createButton}>
//         {text("create_dashboard")}
//       </Button>
//       {isOpen && (
//         <>
//           <CreateDashboard onClose={() => setIsOpen(false)} />
//         </>
//       )}
//     </li>
//   );
// };
