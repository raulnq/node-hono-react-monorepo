import { useNavigate } from 'react-router';
import type { SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';
import type { AddTodo } from '#/features/todos/schemas';
import { useAddTodo } from '../stores/useTodos';
import { TodoAddForm } from '../components/TodoAddForm';

export function AddTodoPage() {
  const navigate = useNavigate();
  const add = useAddTodo();

  const onSubmit: SubmitHandler<AddTodo> = async data => {
    try {
      const result = await add.mutateAsync(data);
      toast.success('Todo created successfully');
      navigate(`/todos/${result.todoId}/edit`);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to save todo'
      );
    }
  };

  return (
    <div className="space-y-4">
      <TodoAddForm
        isPending={add.isPending}
        onSubmit={onSubmit}
        onCancel={() => navigate('/todos')}
      />
    </div>
  );
}
