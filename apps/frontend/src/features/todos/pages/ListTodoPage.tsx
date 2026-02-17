import { Card, CardContent } from '@/components/ui/card';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { TodosError, TodosSkeleton, TodoTable } from '../components/TodoTable';
import { TodoSearchBar } from '../components/TodoSearchBar';
import { ListCardHeader } from '@/components/ListCardHeader';

export function ListTodoPage() {
  return (
    <div className="space-y-4">
      <Card>
        <ListCardHeader
          title="Todos"
          description="Things you need to do."
          addLink="/todos/new"
          addText="Add Todo"
        >
          <TodoSearchBar />
        </ListCardHeader>
        <CardContent>
          <QueryErrorResetBoundary>
            {({ reset }) => (
              <ErrorBoundary onReset={reset} FallbackComponent={TodosError}>
                <Suspense fallback={<TodosSkeleton />}>
                  <TodoTable />
                </Suspense>
              </ErrorBoundary>
            )}
          </QueryErrorResetBoundary>
        </CardContent>
      </Card>
    </div>
  );
}
