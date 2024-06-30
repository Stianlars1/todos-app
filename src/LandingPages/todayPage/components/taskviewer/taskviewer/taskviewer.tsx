"use client";
import { updateTodo, updateTodoForm } from "@/app/actions/todos/fetch";
import { Priority, StatusId, UpdatedTodoDTO } from "@/app/actions/todos/types";
import { cacheInvalidate } from "@/app/lib/cache/cache";
import { CacheKeys } from "@/app/lib/cache/keys";
import { CustomForm } from "@/components/form/components/customForm/customForm";
import moment from "moment-timezone";

import { UserSettingsDTO } from "@/app/actions/user/types";
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
import { TodoDTO } from "@/types/types";
import { Button } from "@stianlarsen/react-ui-kit";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useFormState } from "react-dom";
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

export const Taskviewer = ({
  taskId,
  sidebarOpen,
  userSettings,
}: {
  taskId: string | null;
  sidebarOpen: boolean;
  userSettings: UserSettingsDTO | null;
}) => {
  // Variables
  const { task: taskDTO } = useFetchTask(taskId);

  // STATES
  const [formState, dispatch] = useFormState(updateTodoForm, undefined);
  const [state, setState] = useState<UpdatedTodoDTO>(initialUseState);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [content, setContent] = useState<string>(taskDTO?.content || "");
  const [contentClicked, setContentClicked] = useState(false);

  const [startAnimation, setStartAnimation] = useState(false);
  const [endAnimation, setEndAnimation] = useState(false);

  const [markAsCompletedState, setMarkAsCompletedState] = useState<UPDATE_TASK>(
    { isUpdating: false, isError: undefined, isSuccess: undefined }
  );

  const router = useRouter();
  const locale = useLocale();

  const text = useTranslations("TodayPage.taskViewer");
  const textGeneral = useTranslations("general");

  useEffect(() => {
    if (taskDTO) {
      setState(mapDTOtoUpdatedTodoDTO(taskDTO));
      setContent(taskDTO.content || "");
      const startAnimationTimeout = setTimeout(() => {
        setStartAnimation(true);
      }, 50);

      return () => clearTimeout(startAnimationTimeout);
    }
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

      toast.success(text("taskUpdated"), "bottomRight");
    }
  }, [formState?.isSuccess]);

  const handleClose = () => {
    setEndAnimation(true);

    setTimeout(() => {
      setEndAnimation(false);
      setStartAnimation(false);

      router.replace(`/${locale}/today`, undefined);
      document
        .getElementById("grid-container")
        ?.setAttribute("data-sidebar-open", String(sidebarOpen));
    }, 350);
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
    document
      .getElementById("grid-container")
      ?.setAttribute("data-sidebar-open", String(sidebarOpen));

    cacheInvalidate({ cacheKey: CacheKeys.TODOS_TODAY });
    cacheInvalidate({ cacheKey: CacheKeys.CATEGORIZED_TODOS });
    cacheInvalidate({ cacheKey: CacheKeys.ALL_TODOS });
    toast.success(text("markedAsCompleted"), "bottomRight");
  };

  const handleOnChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    console.log("\n\nHandlee change");
    console.log("\ne.target.name", e.target.name);
    console.log("\n\n e.target.value", e.target.value);

    const newState = { ...state, [e.target.name]: e.target.value };
    console.log("\n\n jewState");
    console.log("\n\n jewState.dueDate", newState.dueDate);
    setState(newState);

    setHasUnsavedChanges(
      newState.title !== taskDTO?.title ||
        newState.description !== taskDTO?.description ||
        newState.statusId?.toString() !== taskDTO?.status.statusId.toString() ||
        newState.priority?.toString().toLocaleUpperCase() !==
          taskDTO?.priority?.toString().toLocaleUpperCase() ||
        newState.dueDate !== taskDTO?.dueDate
    );
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
      e: React.ChangeEvent<HTMLSelectElement>
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

  console.log(
    "formatDate(state.dueDate)",
    state && state.dueDate && formatDate(state.dueDate, userSettings?.timeZone)
  );

  return (
    <Suspense fallback={<SuspenseFallback fixed={false} />}>
      <div
        suppressHydrationWarning={true}
        className={`${styles.taskViewer} ${
          startAnimation ? styles.startAnimation : ""
        } ${endAnimation ? styles.endAnimation : ""}`}
      >
        <div className={styles.topCTAwrapper}>
          <h2>{text("task")}</h2>

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

            {state.statusId !== undefined && (
              <SelectStatus key={state.statusId} />
            )}

            {state.priority !== undefined && (
              <TaskPriority key={state.priority} />
            )}

            {state?.dueDate !== undefined && (
              <CustomInputLabelWrapper>
                <CustomInputLabel htmlFor="dueDate">
                  {text("formDueDate")}
                </CustomInputLabel>

                <CustomInput
                  value={formatDate(state.dueDate, userSettings?.timeZone)}
                  onChange={handleOnChange}
                  name="dueDate"
                  id="dueDate"
                  type="date"
                  className={styles.dueDateInput}
                />
              </CustomInputLabelWrapper>
            )}

            {(contentClicked || content.length === 0) && (
              <>
                <CustomInputLabelWrapper
                  style={{ overflow: "visible" }}
                  key={taskDTO?.content}
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
            <div className={styles.info}>
              {taskDTO?.priority && (
                <Tag variant="priority" priority={taskDTO.priority!} />
              )}

              {taskDTO?.tags && <Tag variant="tag" tags={taskDTO.tags} />}
            </div>
          )}
          {hasUnsavedChanges && (
            <div className={styles.bottomButtons}>
              <UpdateTaskButton />
              <Button onClick={handleCancel} variant="secondary">
                {text("cancel")}
              </Button>
            </div>
          )}
        </CustomForm>
      </div>
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

const formatDate = (date: Date | string, timezone: string = "UTC"): string => {
  console.log("format date: ", date);
  const d = moment.tz(date, timezone);
  console.log("d: ", d.format());

  const month = d.format("MM");
  const day = d.format("DD");
  const year = d.format("YYYY");

  const result = `${year}-${month}-${day}`;
  console.log("result: ", result);
  return result;
};

const compareDates = (date1: string, date2: string): boolean => {
  // Convert the first date to Date object
  const d1 = new Date(date1);
  // Extract only the date part from the second date and convert it to Date object
  const d2 = new Date(date2.split("T")[0]);
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};
