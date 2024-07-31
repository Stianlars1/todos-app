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
import { TodoDTO } from "@/types/types";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { useFormState } from "react-dom";

export const TagsInputSearch = ({
  initialSearchValue,
  setTasks,
  userSettings,
}: {
  initialSearchValue?: string;
  setTasks: Dispatch<SetStateAction<TodoDTO[] | null>>;
  userSettings: UserSettingsDTO | undefined;
}) => {
  const [state, dispatch] = useFormState(findTasksByTag, undefined);
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

  const fetchTasks = async (tagValue: string) => {
    const formData = new FormData();
    formData.append("tagName", tagValue);
    const response = await findTasksByTag(undefined, formData);

    if (response.error) {
      console.error("Error fetching tasks: ", response.error);
    }
    setTasks(response.data?.data);
  };

  const handleOnChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const eventValue = event.target.value;
    setInput(eventValue);
    const taskResponse = await fetchTasks(eventValue);
  };

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
    </>
  );
};
