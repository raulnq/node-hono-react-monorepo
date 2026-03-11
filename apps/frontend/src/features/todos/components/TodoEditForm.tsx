import { useForm, Controller, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import {
  editTodoSchema,
  type EditTodo,
  type Todo,
} from '#/features/todos/schemas';
import { FormCard } from '@/components/FormCard';
import { Checkbox } from '@/components/ui/checkbox';

type TodoEditFormProps = {
  isPending: boolean;
  onSubmit: SubmitHandler<EditTodo>;
  onCancel: () => void;
  todo: Todo;
};

export function TodoEditForm({
  isPending,
  onSubmit,
  onCancel,
  todo,
}: TodoEditFormProps) {
  const form = useForm<EditTodo>({
    resolver: zodResolver(editTodoSchema),
    defaultValues: todo,
  });

  return (
    <FormCard
      onSubmit={form.handleSubmit(onSubmit)}
      onCancel={onCancel}
      saveText="Save Todo"
      isPending={isPending}
      title="Edit Todo"
      description="Update todo details."
    >
      <FieldGroup>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input
                {...field}
                id="name"
                aria-invalid={fieldState.invalid}
                placeholder="Name"
                disabled={isPending}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="completed"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field orientation="horizontal" data-invalid={fieldState.invalid}>
              <Checkbox
                id="completed"
                name={field.name}
                checked={field.value}
                onCheckedChange={field.onChange}
                disabled={isPending}
              />
              <FieldLabel htmlFor="completed" className="font-normal">
                Completed
              </FieldLabel>
            </Field>
          )}
        />
      </FieldGroup>
    </FormCard>
  );
}
