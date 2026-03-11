import { useNavigate, useParams } from 'react-router';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { useTodoSuspense } from '../stores/useTodos';
import { TodoViewCard } from '../components/TodoViewCard';
import { TodoSkeleton } from '../components/TodoSkeleton';
import { ErrorFallback } from '@/components/ErrorFallback';

export function ViewTodoPage() {
  const { todoId } = useParams<{ todoId: string }>();
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            onReset={reset}
            FallbackComponent={({ resetErrorBoundary }) => (
              <ErrorFallback
                resetErrorBoundary={resetErrorBoundary}
                message="Failed to load todo"
              />
            )}
          >
            <Suspense fallback={<TodoSkeleton />}>
              <InnerTodo todoId={todoId!} onCancel={() => navigate('/todos')} />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </div>
  );
}

type InnerTodoProps = {
  todoId: string;
  onCancel: () => void;
};

function InnerTodo({ todoId, onCancel }: InnerTodoProps) {
  const { data } = useTodoSuspense(todoId);
  return <TodoViewCard todo={data} onCancel={onCancel} />;
}
