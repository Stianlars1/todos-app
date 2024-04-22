import { GridMain } from "@/components/grid/gridComponents/gridMain/gridMain";
import { LandingPage } from "@/features/landingPage/landingPage";
import { verifySession } from "./lib/sessions";

export default async function Home() {
  const auth = await verifySession();
  return (
    <GridMain>
      <LandingPage />
    </GridMain>
  );
}
