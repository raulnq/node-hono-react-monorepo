import type { ComponentType } from 'react';
import { LayoutDashboard, ListTodo } from 'lucide-react';

type NavItem = {
  title: string;
  to: string;
  icon: ComponentType<{ className?: string }>;
  end?: boolean;
};

export const NAV_ITEMS: NavItem[] = [
  { title: 'Dashboard', to: '/', icon: LayoutDashboard, end: true },
  { title: 'Todos', to: '/todos', icon: ListTodo },
];
