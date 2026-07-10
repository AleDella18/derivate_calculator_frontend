import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signIn } from "@/app/api/clients";
import User from "@/app/models/user";


export const useLoginUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: User) => signIn(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error: Error) => {
      console.error("Error creating user:", error.message);
    },
  });
};