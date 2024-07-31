"use client";

import { findTasksByTag } from "@/app/actions/tags/api";
import { UserSettingsDTO } from "@/app/actions/user/types";
import { CustomForm } from "@/components/form/components/customForm/customForm";
import {
  CustomInput,
  CustomInputLabel,
  CustomInputLabelWrapper,
} from "@/components/form/components/customInput/customInput";
import { FormContentWrapper } from "@/components/form/formContentWrapper";
import { shouldReturn } from "@/components/ui/cards/draggableCard/draggableCard";
import { TaskCard } from "@/components/ui/cards/taskCard/taskCard";
import { Tag } from "@/components/ui/tag/tags";
import { ShowTaskModalContainer } from "@/LandingPages/dashboardPage/components/showTaskModal/showTaskModal";
import { TodoDTO } from "@/types/types";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFormState } from "react-dom";

const DEBOUNCE_TIME_MS = 300;
// /*..*/
// const onNameChange = useMemo(
//  () =>
//    debounce((event: React.ChangeEvent<HTMLInputElement>) => {
//      setEffects(/*..*/);
//    }, DEBOUNCE_TIME_MS),
//  []
// );

export const TagsContainer = ({
  tags,
  userSettings,
}: {
  tags: string[] | null;
  userSettings: UserSettingsDTO | undefined;
}) => {
  const [state, dispatch] = useFormState(findTasksByTag, undefined);
  const [tasks, setTasks] = useState<TodoDTO[] | null>(null);
  const [input, setInput] = useState("");
  const text = useTranslations("TagsPage");
  const locale = useLocale();
  const router = useRouter();
  const openTask = (event: React.MouseEvent<HTMLDivElement>, todoId: any) => {
    const shouldItReturn = shouldReturn(event);
    if (shouldItReturn) {
      return;
    }

    event.preventDefault();
    router.push(`/${locale}/tags?selectedTask=${todoId}`, undefined);
  };

  const handleOnChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const eventValue = event.target.value;
    console.log("eventValue: ", eventValue);
    setInput(eventValue);
    const formData = new FormData();
    formData.append("tagName", eventValue);
    dispatch(formData);
  };

  const getTasks = async () => {};

  console.log("state: ", state);

  return (
    <>
      <CustomForm>
        <FormContentWrapper>
          <CustomInputLabelWrapper>
            <CustomInputLabel htmlFor="tagName">
              {text("search.label")}
            </CustomInputLabel>

            <CustomInput
              name="tagName"
              id="tagName"
              value={input}
              placeholder={text("search.placeholder")}
              onChange={handleOnChange}
            />
          </CustomInputLabelWrapper>
        </FormContentWrapper>
      </CustomForm>
      <ul>
        {state?.data?.data && state.data.data.length > 0 && (
          <>
            {state.data.data.map((todo: TodoDTO, index: number) => {
              console.log("todo: ", todo);

              return (
                <TaskCard
                  key={todo.todoId}
                  priority={todo.priority}
                  tags={todo.tags}
                  index={index}
                  title={todo.title}
                  description={todo.description || ""}
                  onClick={(event: any) => openTask(event, todo.todoId)}
                />
              );
            })}
          </>
        )}
      </ul>

      {tags &&
        tags.length > 0 &&
        tags.map((tag: string) => <Tag key={tag} tags={[tag]} variant="tag" />)}

      <ShowTaskModalContainer redirectUrl="tags" userSettings={userSettings} />
    </>
  );
};
