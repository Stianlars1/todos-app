"use client";
import { updateTodo, updateTodoForm } from "@/app/actions/todos/fetch";
import { Priority, StatusId, UpdatedTodoDTO } from "@/app/actions/todos/types";
import { cacheInvalidate } from "@/app/lib/cache/cache";
import { CacheKeys } from "@/app/lib/cache/keys";
import { CustomForm } from "@/components/form/components/customForm/customForm";

import { UserSettings } from "@/app/actions/user/types";
import {
  CustomInput,
  CustomInputLabel,
  CustomInputLabelWrapper,
} from "@/components/form/components/customInput/customInput";
import { CustomTextArea } from "@/components/form/components/customTextArea/customTextArea";
import { FormContentWrapper } from "@/components/form/formContentWrapper";
import { useFetchTask } from "@/components/todoModal/hooks/useFetchTask";
import { CloseIcon } from "@/components/ui/icons/icons";
import { TextEditor } from "@/components/ui/richTextEditor/richTextEditor";
import { SuspenseFallback } from "@/components/ui/suspenseFallback/suspenseFallback";
import { Tag } from "@/components/ui/tag/tags";
import { toast } from "@/components/ui/toast/toast";
import { DashboardOnlyTypeDTO } from "@/LandingPages/dashboardPage/components/dashboard/dashboardSwitch/switchUtils";
import { TodoDTO } from "@/types/types";
import { arraysEqual, formatDate, normalizeDate } from "@/utils/utils";
import { Button } from "@stianlarsen/react-ui-kit";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { Suspense, useActionState, useEffect, useState } from "react";
import { UpdateTaskButton } from "./components/updateTaskButton";
import styles from "./css/taskviewer.module.scss";

type UPDATE_TASK = {
  isUpdating: boolean;
  isError: boolean | undefined;
  isSuccess: boolean | undefined;
};

const initialUseState: UpdatedTodoDTO = {
  title: "",
  description: "",
  statusId: undefined,
  priority: undefined,
  tags: [],
  dueDate: undefined,
  content: undefined,
};

export const TaskViewer = ({
  taskId,
  redirectUrl = "",
  dashboards,
  onTaskLoaded,
  onClose,
}: {
  taskId: string | null;
  userSettings: UserSettings;
  redirectUrl: string;
  dashboards: DashboardOnlyTypeDTO[] | null;
  onTaskLoaded?: () => void;
  onClose?: () => void;
}) => {
  // Variables
  const { task: taskDTO } = useFetchTask(taskId);
  const pathName = usePathname();

  // STATES
  const [formState, dispatch] = useActionState(updateTodoForm, undefined);
  const [state, setState] = useState<UpdatedTodoDTO>(initialUseState);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [content, setContent] = useState<string>(taskDTO?.content || "");
  const [contentClicked, setContentClicked] = useState(false);
  const [rawTagsInput, setRawTagsInput] = useState<string>("");

  const [startAnimation, setStartAnimation] = useState(false);
  const [endAnimation, setEndAnimation] = useState(false);

  const [markAsCompletedState, setMarkAsCompletedState] = useState<UPDATE_TASK>(
    { isUpdating: false, isError: undefined, isSuccess: undefined },
  );

  const [selectedDashboardIds, setSelectedDashboardIds] = useState<number[]>(
    taskDTO && dashboards ? getActiveDashboardIds(taskDTO, dashboards) : [],
  );

  const router = useRouter();
  const locale = useLocale();

  const text = useTranslations("TodayPage.taskViewer");
  const textGeneral = useTranslations("general");

  const closeModalOnESC = (event: any) => {
    if (event.key === "Escape") {
      handleClose();
      setTimeout(() => {
        document.body.setAttribute("taskviewer-modal-open", false.toString());
      }, 500);
    }
  };
  useEffect(() => {
    if (document === undefined) return;
    // close modal on ESC key
    window.addEventListener("keydown", closeModalOnESC);
    if (taskDTO) {
      document.body.style.overflow = "hidden";

      document.body.setAttribute("taskviewer-modal-open", true.toString());

      if (onTaskLoaded) {
        onTaskLoaded();
      }
      setState(mapDTOtoUpdatedTodoDTO(taskDTO));
      setContent(taskDTO.content || "");
      setRawTagsInput(taskDTO?.tags?.join(", "));
      if (taskDTO && dashboards) {
        const activeDashboardIds = getActiveDashboardIds(taskDTO, dashboards);
        setSelectedDashboardIds(activeDashboardIds);
      }

      const startAnimationTimeout = setTimeout(() => {
        setStartAnimation(true);
      }, 50);

      return () => {
        setStartAnimation(false);
        clearTimeout(startAnimationTimeout);
        document.body.style.overflow = "auto";
      };
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto"; // Reset when component unmounts
      window.removeEventListener("keydown", closeModalOnESC);
    };
  }, [taskDTO]);

  useEffect(() => {
    if (formState?.isSuccess) {
      setHasUnsavedChanges(false);

      if (formState.data?.data.status.statusId === StatusId.COMPLETED) {
        handleClose();
      }
      cacheInvalidate({ cacheKey: CacheKeys.TODOS_TODAY });
      cacheInvalidate({ cacheKey: CacheKeys.ALL_TODOS });
      cacheInvalidate({ cacheKey: CacheKeys.CATEGORIZED_TODOS });
      cacheInvalidate({ cacheKey: CacheKeys.ALL_TAGS });
      cacheInvalidate({ cacheKey: CacheKeys.TODOS_BY_TAGNAME });
      cacheInvalidate({ cacheKey: CacheKeys.ALL_TASKS_AND_TAGS_GROUPED });

      toast.success(text("taskUpdated"), "bottomRight");
    }
  }, [formState?.isSuccess]);

  const handleClose = () => {
    setEndAnimation(true);
    setTimeout(() => {
      setEndAnimation(false);
      setStartAnimation(false);
      document.body.setAttribute("taskviewer-modal-open", false.toString());
      window.removeEventListener("keydown", closeModalOnESC);
      if (onClose) {
        onClose();
      } else {
        router.replace(`/${locale}/${pathName}`, undefined);
      }
    }, 350);

    document.body.style.overflow = "auto"; // Reset when component unmounts
  };

  const handleMarkAsCompleted = async () => {
    if (!taskId) return;
    setMarkAsCompletedState({
      isUpdating: true,
      isError: undefined,
      isSuccess: undefined,
    });
    const updatedTask: UpdatedTodoDTO = { statusId: 3 };
    const updateResponse = await updateTodo(taskId, updatedTask);
    if (updateResponse.isError) {
      setMarkAsCompletedState({
        isUpdating: false,
        isError: true,
        isSuccess: false,
      });
    }

    setMarkAsCompletedState({
      isUpdating: false,
      isError: false,
      isSuccess: true,
    });
    router.replace(`/${locale}/today`, undefined);

    cacheInvalidate({ cacheKey: CacheKeys.TODOS_TODAY });
    cacheInvalidate({ cacheKey: CacheKeys.CATEGORIZED_TODOS });
    cacheInvalidate({ cacheKey: CacheKeys.ALL_TODOS });
    toast.success(text("markedAsCompleted"), "bottomRight");
  };

  const handleOnChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    if (e.target.name === "tags") {
      const newTags = e.target.value
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== "");
      const newState = {
        ...state,
        tags: newTags,
      };

      setState(newState);
      setRawTagsInput(e.target.value);
      const titleChanged = newState.title !== taskDTO?.title;
      const descriptionChanged = newState.description !== taskDTO?.description;
      const statusChanged =
        newState.statusId?.toString() !== taskDTO?.status.statusId.toString();
      const priorityChanged =
        newState.priority?.toString().toLocaleUpperCase() !==
        taskDTO?.priority?.toString().toLocaleUpperCase();
      const dueDateChanged = newState.dueDate !== taskDTO?.dueDate;
      const tagsChanged = !arraysEqual(
        newState.tags as any[],
        taskDTO?.tags as any[],
      );

      setHasUnsavedChanges(
        titleChanged ||
          descriptionChanged ||
          statusChanged ||
          priorityChanged ||
          dueDateChanged ||
          tagsChanged,
      );
    } else {
      const isDueDate = e.target.name === "dueDate";

      const dueDateInput = document.getElementById(
        "dueDate",
      ) as HTMLInputElement;
      const valueDate = normalizeDate(new Date(dueDateInput.value || ""));
      const taskDueDate = taskDTO?.dueDate
        ? normalizeDate(new Date(taskDTO?.dueDate))
        : undefined;

      const newState = {
        ...state,
        [e.target.name]: isDueDate ? valueDate : e.target.value,
      };

      setState(newState);

      const titleChanged = newState.title !== taskDTO?.title;
      const descriptionChanged = newState.description !== taskDTO?.description;
      const statusChanged =
        newState.statusId?.toString() !== taskDTO?.status.statusId.toString();
      const priorityChanged =
        newState.priority?.toString().toLocaleUpperCase() !==
        taskDTO?.priority?.toString().toLocaleUpperCase();
      const dueDateChanged = valueDate !== taskDueDate;
      const tagsChanged = !arraysEqual(
        newState.tags as any[],
        taskDTO?.tags as any[],
      );

      setHasUnsavedChanges(
        titleChanged ||
          descriptionChanged ||
          statusChanged ||
          priorityChanged ||
          dueDateChanged ||
          tagsChanged,
      );
    }
  };

  const SelectStatus = () => {
    const handleOnChangeStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
      handleOnChange(e);
    };

    return (
      <CustomInputLabelWrapper>
        <CustomInputLabel htmlFor="statusId">
          {textGeneral("tasks.status.label")}
        </CustomInputLabel>

        <select
          id="statusId"
          name="statusId"
          value={state.statusId || ""} // Fallback to the empty string if statusId is undefined
          onChange={handleOnChangeStatus}
          className={styles.customSelect}
        >
          <option defaultValue={state.statusId} disabled>
            Select status
          </option>
          <option value={StatusId.CREATED}>
            {textGeneral("tasks.status.CREATED")}
          </option>
          <option value={StatusId.ON_HOLD}>
            {textGeneral("tasks.status.ON_HOLD")}
          </option>
          <option value={StatusId.PENDING}>
            {textGeneral("tasks.status.PENDING")}
          </option>
          <option value={StatusId.IN_PROGRESS}>
            {textGeneral("tasks.status.IN_PROGRESS")}
          </option>
          <option value={StatusId.COMPLETED}>
            {textGeneral("tasks.status.COMPLETED")}
          </option>
          <option value={StatusId.CANCELLED}>
            {textGeneral("tasks.status.CANCELLED")}
          </option>
          <option value={StatusId.DELETED}>
            {textGeneral("tasks.status.DELETED")}
          </option>
        </select>
      </CustomInputLabelWrapper>
    );
  };

  const TaskPriority = () => {
    const handleOnChangePriority = (
      e: React.ChangeEvent<HTMLSelectElement>,
    ) => {
      handleOnChange(e);
    };

    return (
      <CustomInputLabelWrapper>
        <CustomInputLabel htmlFor="priority">
          {textGeneral("tasks.priority.label")}
        </CustomInputLabel>
        <select
          id="priority"
          name="priority"
          className={styles.customSelect}
          value={state.priority?.toLocaleUpperCase() || ""}
          onChange={handleOnChangePriority}
        >
          <option value={Priority.LOW}>
            {textGeneral("tasks.priority.LOW")}
          </option>
          <option value={Priority.MEDIUM}>
            {textGeneral("tasks.priority.MEDIUM")}
          </option>
          <option value={Priority.HIGH}>
            {textGeneral("tasks.priority.HIGH")}
          </option>
        </select>
      </CustomInputLabelWrapper>
    );
  };

  const TaskDashboard = () => {
    const handleDashboardSelectsOnChange = (
      e: React.ChangeEvent<HTMLSelectElement>,
    ) => {
      const options = e.target.options;
      const selectedIds: number[] = [];

      for (let i = 0; i < options.length; i++) {
        if (options[i].selected) {
          selectedIds.push(parseInt(options[i].value, 10));
        }
      }

      setSelectedDashboardIds(selectedIds);
      if (taskDTO && taskDTO.dashboardIds) {
        setHasUnsavedChanges(!arraysEqual(taskDTO?.dashboardIds, selectedIds));
      } else {
        setHasUnsavedChanges(true);
      }
    };

    return (
      <>
        <select
          id="dashboardIds"
          name="dashboardIds"
          multiple
          size={(dashboards && dashboards.length) || 1}
          value={selectedDashboardIds.map(String)}
          onChange={handleDashboardSelectsOnChange}
          className={styles.dashboardSelect}
        >
          <>
            {dashboards &&
              dashboards.map((dashboard) => {
                return (
                  <option
                    className={styles.dashboardOption}
                    key={dashboard.dashboardId}
                    value={dashboard.dashboardId}
                  >
                    {dashboard.name}
                  </option>
                );
              })}
          </>
        </select>
      </>
    );
  };

  const handleCancel = () => {
    if (taskDTO) {
      setState(mapDTOtoUpdatedTodoDTO(taskDTO));
    }
    setHasUnsavedChanges(false);
  };

  const handleTextEditorChange = () => {
    setContentClicked(true);

    setHasUnsavedChanges(content !== taskDTO?.content);
  };

  const handleMoveToTrash = async () => {
    if (!taskId) return;
    const updatedTask: UpdatedTodoDTO = { statusId: 6 };
    const updateResponse = await updateTodo(taskId, updatedTask);
    if (updateResponse.isError) {
      toast.error(text("errorMovingToTrash"), "bottomRight");
    } else {
      cacheInvalidate({ cacheKey: CacheKeys.TODOS_TODAY });
      cacheInvalidate({ cacheKey: CacheKeys.ALL_TODOS });
      cacheInvalidate({ cacheKey: CacheKeys.CATEGORIZED_TODOS });
      cacheInvalidate({ cacheKey: CacheKeys.ALL_TAGS });
      cacheInvalidate({ cacheKey: CacheKeys.TODOS_BY_TAGNAME });
      cacheInvalidate({ cacheKey: CacheKeys.ALL_TASKS_AND_TAGS_GROUPED });
      toast.success(text("movedToTrash"), "bottomRight");
      router.replace(`/${locale}/${redirectUrl}`, undefined);
    }
  };

  return (
    <Suspense fallback={<SuspenseFallback fixed={false} />}>
      <div
        suppressHydrationWarning={true}
        className={`${styles.taskViewer} ${
          startAnimation ? styles.startAnimation : ""
        } ${endAnimation ? styles.endAnimation : ""}
        
        `}
      >
        <div className={styles.topCTAwrapper}>
          <div className={styles.topCTAbuttonsWrapper}>
            <Button
              loading={markAsCompletedState.isUpdating}
              disabled={markAsCompletedState.isUpdating}
              variant="primary"
              onClick={handleMarkAsCompleted}
              loadingText="updating status.."
            >
              {text("markAsCompleted")}
            </Button>
            <Button
              variant="icon"
              className={`${styles.backButton} ${
                markAsCompletedState.isSuccess && styles.success
              } ${markAsCompletedState.isError && styles.error}`}
              onClick={handleClose}
            >
              <CloseIcon />
            </Button>
          </div>
        </div>
        <CustomForm action={dispatch}>
          <FormContentWrapper>
            <CustomInputLabelWrapper>
              <CustomInputLabel htmlFor="title">
                {text("formTitle")}
              </CustomInputLabel>

              <CustomInput
                value={state?.title || ""}
                placeholder={
                  state.title ? state.title : text("placeholderTitle")
                }
                onChange={handleOnChange}
                width="100%"
                name="title"
                id="title"
                className={styles.titleInput}
              />

              <input
                readOnly
                value={taskDTO?.todoId || ""}
                aria-hidden
                style={{ display: "none" }}
                id="todoId"
                name="todoId"
              />
            </CustomInputLabelWrapper>
            <CustomInputLabelWrapper>
              <CustomInputLabel htmlFor="description">
                {text("formDescription")}
              </CustomInputLabel>

              <CustomTextArea
                value={state?.description || ""}
                onChange={handleOnChange}
                placeholder={
                  state.description
                    ? state.description
                    : text("placeholderDescription")
                }
                name="description"
                id="description"
                width="100%"
              />
            </CustomInputLabelWrapper>
            <CustomInputLabelWrapper>
              <CustomInputLabel>{text("formDashboardSelect")}</CustomInputLabel>
              <p className={styles.dashboardSelectDescription}>
                {text("formDashboardSelectDescription")}
              </p>

              <TaskDashboard />
            </CustomInputLabelWrapper>
            <div className={styles.statusPriorityDueDateWrapper}>
              {state.statusId !== undefined && (
                <SelectStatus key={state.statusId} />
              )}
              {state.priority !== undefined && (
                <TaskPriority key={state.priority} />
              )}

              {state && state.dueDate && (
                <>
                  <CustomInputLabelWrapper>
                    <CustomInputLabel htmlFor="dueDate">
                      {text("formDueDate")}
                    </CustomInputLabel>

                    <CustomInput
                      value={formatDate(state.dueDate)}
                      onChange={handleOnChange}
                      name="dueDate"
                      id="dueDate"
                      type="date"
                      suppressHydrationWarning
                      className={styles.dueDateInput}
                    />
                  </CustomInputLabelWrapper>
                </>
              )}
            </div>

            {(contentClicked || content.length === 0) && (
              <>
                <CustomInputLabelWrapper
                  style={{ overflow: "visible" }}
                  key={taskDTO?.content}
                  className={styles.contentWrapper}
                >
                  <CustomInputLabel suppressHydrationWarning htmlFor="content">
                    {text("formContent")}
                  </CustomInputLabel>

                  <TextEditor
                    content={content}
                    setContent={setContent}
                    onChange={handleTextEditorChange}
                  />
                  {content && (
                    <input
                      suppressHydrationWarning
                      aria-hidden
                      style={{ display: "none" }}
                      value={content}
                      type="text"
                      id="content"
                      name="content"
                      readOnly
                    />
                  )}
                </CustomInputLabelWrapper>
              </>
            )}
          </FormContentWrapper>
          {content && !contentClicked && (
            <div
              onClick={() => setContentClicked(true)}
              suppressHydrationWarning
              className={styles.content}
              dangerouslySetInnerHTML={{ __html: state?.content || "" }}
            />
          )}

          {(taskDTO?.priority || taskDTO?.tags) && (
            <>
              <FormContentWrapper>
                <CustomInputLabelWrapper>
                  <CustomInputLabel htmlFor="tags">
                    {text("tagsLabel")}
                  </CustomInputLabel>

                  <CustomInput
                    type="text"
                    placeholder="Tags"
                    id="tags"
                    name="tags"
                    value={rawTagsInput}
                    onChange={handleOnChange}
                  />
                </CustomInputLabelWrapper>
              </FormContentWrapper>
              <div className={styles.info}>
                {taskDTO?.priority && (
                  <Tag variant="priority" priority={taskDTO.priority!} />
                )}

                {taskDTO?.tags && <Tag variant="tag" tags={taskDTO.tags} />}
              </div>
            </>
          )}
          {hasUnsavedChanges && (
            <div className={styles.bottomButtons}>
              <UpdateTaskButton />
              <Button onClick={handleCancel} variant="secondary">
                {text("cancel")}
              </Button>
              <Button
                className={styles.delete}
                onClick={handleMoveToTrash}
                variant="secondary"
              >
                {text("deleteTask")}
              </Button>
            </div>
          )}

          {!hasUnsavedChanges && state.statusId !== 6 && (
            <div className={styles.bottomButtons}>
              <Button
                className={styles.delete}
                onClick={handleMoveToTrash}
                variant="outline"
                type="button"
              >
                {text("deleteTask")}
              </Button>
            </div>
          )}
        </CustomForm>
      </div>
      <div onClick={handleClose} className={styles.taskBackdrop} />
    </Suspense>
  );
};

const mapDTOtoUpdatedTodoDTO = (taskDTO: TodoDTO) => {
  return {
    title: taskDTO?.title || "",
    description: taskDTO?.description || "",
    statusId: taskDTO?.status?.statusId ?? undefined,
    priority: (taskDTO?.priority?.toLocaleUpperCase() as Priority) ?? undefined,
    tags: taskDTO?.tags || [],
    dueDate: taskDTO?.dueDate ?? undefined,
    content: taskDTO?.content || "",
    todoId: taskDTO?.todoId || "",
  };
};

const getActiveDashboardIds = (
  taskDTO: TodoDTO,
  dashboards: DashboardOnlyTypeDTO[],
) => {
  return dashboards
    .filter((dashboard) => taskDTO.dashboardIds.includes(dashboard.dashboardId))
    .map((dashboard) => dashboard.dashboardId);
};
