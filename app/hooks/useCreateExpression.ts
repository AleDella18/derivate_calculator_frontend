import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "@/app/api/clients";
import PayLoad from "@/app/models/expression";

export const useCreateExpression = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: PayLoad) => createPost(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expressions"] });
    },
    onError: (error: Error) => {
      console.error("Error creating expression:", error.message);
    },
  });
};
