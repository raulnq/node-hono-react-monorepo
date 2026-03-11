import { useForm, Controller, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { addTodoSchema, type AddTodo } from '#/features/todos/schemas';
import { FormCard } from '@/components/FormCard';

type TodoAddFormProps = {
  isPending: boolean;
  onSubmit: SubmitHandler<AddTodo>;
  onCancel: () => void;
};

export function TodoAddForm({
  isPending,
  onSubmit,
  onCancel,
}: TodoAddFormProps) {
  const form = useForm<AddTodo>({
    resolver: zodResolver(addTodoSchema),
    defaultValues: {
      name: '',
    },
  });

  return (
    <FormCard
      onSubmit={form.handleSubmit(onSubmit)}
      onCancel={onCancel}
      saveText="Save Todo"
      isPending={isPending}
      title="Add Todo"
      description="Create a new todo item."
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
      </FieldGroup>
    </FormCard>
  );
}
