import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { listTodos, getTodo, addTodo, editTodo } from './todosClient';
import { useAuth } from '@clerk/clerk-react';
import type { AddTodo, EditTodo, ListTodos } from '#/features/todos/schemas';

export function useTodosSuspense({
  pageNumber,
  pageSize,
  name,
}: Partial<ListTodos> = {}) {
  const { getToken } = useAuth();
  const params = {
    pageNumber: pageNumber ?? 1,
    pageSize: pageSize ?? 10,
    name: name || undefined,
  };
  return useSuspenseQuery({
    queryKey: ['todos', params],
    queryFn: async () => {
      const token = await getToken();
      return listTodos(params, token);
    },
  });
}

export function useTodoSuspense(todoId: string) {
  const { getToken } = useAuth();
  return useSuspenseQuery({
    queryKey: ['todo', todoId],
    queryFn: async () => {
      const token = await getToken();
      return getTodo(todoId, token);
    },
  });
}

export function useAddTodo() {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();
  return useMutation({
    mutationFn: async (data: AddTodo) => {
      const token = await getToken();
      return addTodo(data, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
}

export function useEditTodo(todoId: string) {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();
  return useMutation({
    mutationFn: async (data: EditTodo) => {
      const token = await getToken();
      return editTodo(todoId, data, token);
    },
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      queryClient.setQueryData(['todo', todoId], data);
    },
  });
}
