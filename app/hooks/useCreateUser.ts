import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signUp } from "@/app/api/clients";
import User from "@/app/models/user";


export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: User) => signUp(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error: Error) => {
      console.error("Error creating user:", error.message);
    },
  });
};