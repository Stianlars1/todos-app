import { getUserPreferences } from "@/app/actions/preferences/fetch";
import { FilterTaskColumn } from "./FilterTaskColumn";

export const FilterTasksWrapper = async () => {
  const { data: userPreferences } = await getUserPreferences();

  if (!userPreferences) return;
  return (
    <div>
      <h3>Filter Task Columns</h3>

      <FilterTaskColumn userPreferences={userPreferences} />
    </div>
  );
};
