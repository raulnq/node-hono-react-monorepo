import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import type { Todo } from '#/features/todos/schemas';
import { FormCard } from '@/components/FormCard';
import { EditButton } from '@/components/EditButton';

type TodoViewCardProps = {
  todo: Todo;
  onCancel: () => void;
};

export function TodoViewCard({ todo, onCancel }: TodoViewCardProps) {
  return (
    <FormCard
      onCancel={onCancel}
      title="View Todo"
      description="View todo details."
      readOnly={true}
      renderAction={
        <EditButton text="Edit" link={`/todos/${todo.todoId}/edit`} />
      }
    >
      <FieldGroup>
        <Field>
          <FieldLabel>Name</FieldLabel>
          <Input value={todo.name} disabled />
        </Field>
        <Field orientation="horizontal">
          <Checkbox id="completed" checked={todo.completed} disabled />
          <FieldLabel htmlFor="completed" className="font-normal">
            Completed
          </FieldLabel>
        </Field>
      </FieldGroup>
    </FormCard>
  );
}
