"use client";
import {
  CategorizedTodosDTO,
  SoonDueSubCategories,
  StatusCodes,
} from "@/types/todo/types";
import {
  animations,
  handleDragoverNode,
  handleDragoverParent,
  handleDragstart,
  handleEnd,
  handleTouchOverNode,
  handleTouchOverParent,
  handleTouchmove,
  handleTouchstart,
  resetState,
} from "@formkit/drag-and-drop";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";

import { UserSettingsDTO } from "@/app/actions/user/types";
import { cacheInvalidate } from "@/app/lib/cache/cache";
import { CacheKeys } from "@/app/lib/cache/keys";
import { toast } from "@/components/ui/toast/toast";
import { useBrowserInfo } from "@/hooks/useBrowserInfo";
import { TodoDTO } from "@/types/types";
import { useEffect, useRef } from "react";
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
  const { isMobile } = useBrowserInfo();
  const columnRefs = useRef([]);

  const columnsList: ColumnListDND[] = Object.entries(tasks).map(
    ([categoryString, todosList]) => {
      let flatTasks: TodoDTO[] = [];

      if (categoryString === "SOON_DUE") {
        const soonDueTasks = todosList as {
          [key in SoonDueSubCategories]?: TodoDTO[];
        };
        flatTasks = Object.values(soonDueTasks).flat();
      } else {
        flatTasks = todosList as TodoDTO[];
      }

      return {
        column: categoryString as StatusCodes,
        tasks: flatTasks,
        categoryCode: categoryString as StatusCodes,
      };
    }
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

      handleDragstart: (data) => {
        if (isMobile) {
          if (
            data.e.target instanceof HTMLElement ||
            data.e.target instanceof SVGElement
          ) {
            if (data.e.target.id !== "dragHandle") {
              return;
            }
          }
        }
        return handleDragstart(data);
      },

      handleTouchstart: (data) => {
        if (isMobile) {
          if (
            data.e.target instanceof HTMLElement ||
            data.e.target instanceof SVGElement
          ) {
            if (data.e.target.id !== "dragHandle") {
              return;
            }
          }
        }
        handleTouchstart(data);
      },
      handleDragoverNode: (data) => {
        return handleDragoverNode(data);
      },
      handleDragoverParent: (data) => {
        return handleDragoverParent(data);
      },

      handleTouchOverNode: (data) => {
        return handleTouchOverNode(data);
      },
      handleTouchmove: (data) => {
        return handleTouchmove(data);
      },
      handleTouchOverParent: (data) => {
        return handleTouchOverParent(data);
      },

      handleEnd: async (data) => {
        handleEnd(data);

        if (data.e.target instanceof HTMLElement) {
          if (data.e.target.getAttribute("data-group") == TASKCARD_GROUP) {
            // Needs this cause the drag of a task also fires of this.
            return;
          }
        }

        if (isMobile) {
          if (
            data.e.target instanceof HTMLElement ||
            data.e.target instanceof SVGElement
          ) {
            if (data.e.target.id !== "dragHandle") {
              return;
            }
          }
        }

        const didIndexChange = didCategoryIndexChange({
          oldList: columnsList,
          newList: columns,
        });

        // If order didnt change, no need to do update
        if (!didIndexChange) {
          return;
        }

        // save the new displayOrder of the columns
        const columnsUpdateResponse = await handleUpdateColumnsOrder(columns);

        if (columnsUpdateResponse.isError) {
          toast.error(
            "An error occured while updating the sort preference of the status columns"
          );
        }
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

      <ShowTaskModalContainer userSettings={userSettings} />
    </>
  );
};
