import { getTodoById } from "@/app/actions/todos/fetch";
import { FetchState } from "@/utils/fetch/customFetch";
import { NextResponse, type NextRequest } from "next/server";
export const revalidate = false;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const taskId = searchParams.get("taskId");
  if (!taskId) {
    const error: FetchState<null> = {
      isLoading: false,
      isSuccess: false,
      isError: true,
      data: null,
      error: "No task id provided",
    };
    return NextResponse.json(error);
  }

  const task = await getTodoById(taskId);

  return NextResponse.json(task);
  // query is "hello" for /api/search?query=hello
}
