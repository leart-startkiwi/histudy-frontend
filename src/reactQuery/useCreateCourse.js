import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCourse as createCourseApi } from "../services/apiCourses";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export function useCreateCourse() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isLoading, mutate: createCourse } = useMutation({
    mutationFn: createCourseApi,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["courses"],
      });
      navigate(`/instructor/course/${data.data.id}/manage`);
      // toast.success("Course created successfully.");
    },
  });

  return { isLoading, createCourse };
}
