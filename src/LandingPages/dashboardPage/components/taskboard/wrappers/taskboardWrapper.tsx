"use client";
import { CategorizedTodosDTO, StatusCodes } from "@/types/todo/types";
import { animations, resetState } from "@formkit/drag-and-drop";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";

import { UserSettingsDTO } from "@/app/actions/user/types";
import { cacheInvalidate } from "@/app/lib/cache/cache";
import { CacheKeys } from "@/app/lib/cache/keys";
import { ToastContainer, toast } from "@/components/ui/toast/toast";
import { useEffect } from "react";
import { ShowTaskModalContainer } from "../../showTaskModal/showTaskModal";
import columnWrapper from "../css/columnWrapper.module.css";
import { DraggableColumn } from "../draggables/draggableColumn";
import { ColumnListDND } from "../types";
import {
  COLUMN_GROUP,
  TASKCARD_GROUP,
  didCategoryIndexChange,
  handleUpdateColumnsOrder,
} from "../utils";

export const TaskboardWrapper = ({
  tasks,
  userSettings,
  categorizedTexts,
  taskboardTexts,
}: {
  tasks: CategorizedTodosDTO;
  userSettings: UserSettingsDTO | undefined;
  categorizedTexts: { [key in StatusCodes]: string };
  taskboardTexts: { header: { sortSwitchTitle: string } };
}) => {
  const columnsList: ColumnListDND[] = Object.entries(tasks).map(
    ([categoryString, todosList]) => ({
      column: categoryString as StatusCodes,
      tasks: todosList,
      categoryCode: categoryString as StatusCodes,
    })
  );

  const isColumnLayout = userSettings?.isColumnLayout;

  // Handle the drag and drop of the columns
  const [parent, columns, setColumnsList, updateConfig] = useDragAndDrop<
    HTMLUListElement,
    ColumnListDND
  >(
    columnsList,

    {
      dragHandle: ".column-drag-handle",
      group: COLUMN_GROUP,
      name: "ColumnsListWrapper",
      plugins: [animations({ duration: 150 })],

      draggable: (el) => {
        return el.attributes.getNamedItem("data-group")?.value == COLUMN_GROUP;
      },

      handleEnd: async (data) => {
        if (data.e.target instanceof HTMLElement) {
          if (data.e.target.getAttribute("data-group") == TASKCARD_GROUP) {
            // Needs this cause the drag of a task also fires of this.
            return;
          }
        }

        const didIndexChange = didCategoryIndexChange({
          oldList: columnsList,
          newList: columns,
        });

        // If order didnt change, no need to do update
        if (!didIndexChange) {
          toast.info("No changes were made to the column order", "bottomRight");
          return;
        }

        // save the new displayOrder of the columns
        const columnsUpdateResponse = await handleUpdateColumnsOrder(columns);

        if (columnsUpdateResponse.isError) {
          toast.error(
            "An error occured while updating the sort preference of the status columns"
          );
        }
        console.log("🟢 columnsUpdateResponse", columnsUpdateResponse);
        await cacheInvalidate({ cacheKey: CacheKeys.USER_PREFERENCES });
        await cacheInvalidate({ cacheKey: CacheKeys.CATEGORIZED_TODOS });

        // if (parent.current) {
        //   remapNodes(parent.current);
        // }

        resetState();

        toast.success("Column was updated successfully", "bottomRight");
      },

      sortable: true,
    }
  );

  useEffect(() => {
    if (tasks && columnsList) {
      resetState();
      setColumnsList(columnsList);
    }
  }, [tasks]);

  // Need this since the drag and drop library does not update the columnsList when the columns are updated

  return (
    <>
      <ul
        ref={parent}
        className={`${columnWrapper.columnWrapper} ${COLUMN_GROUP} ${
          isColumnLayout ? columnWrapper.columnLayout : columnWrapper.rowLayout
        }`}
        data-group={COLUMN_GROUP}
      >
        {columns.map((columnObject: ColumnListDND, index: number) => (
          <DraggableColumn
            data-label={columnObject.column}
            key={columnObject.column}
            columnObject={columnObject}
            title={categorizedTexts[columnObject.column]}
            userSettings={userSettings}
          />
        ))}
      </ul>

      <ShowTaskModalContainer />
      <ToastContainer />
    </>
  );
};
