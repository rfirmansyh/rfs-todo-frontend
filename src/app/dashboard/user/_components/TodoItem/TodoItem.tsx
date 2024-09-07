import Link from 'next/link';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/atoms/button';
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle 
} from '@/components/atoms/card';
import { APP_ROUTES } from '@/constants/routes.constant';
import type { TSTodo } from '@/types/server/todo.server-type';
import TodoBanner from '../TodoBanner/TodoBanner';

type TTodoItemProps = {
  todo: TSTodo;
  onClickDetail?(): void;
  onClickDelete?(): void;
}

const TodoItem = ({
  todo,
  onClickDetail,
  onClickDelete
}: TTodoItemProps) => (
  <Card className="flex flex-col">
    <CardHeader className="pb-2">
      <CardTitle>{todo?.title ?? ''}</CardTitle>
    </CardHeader>
    <CardContent className="grow">
      <div className="my-2">
        <TodoBanner banner_url={todo.banner_url} />
      </div>
      <CardDescription>
        {todo?.content ?? ''}
      </CardDescription>
    </CardContent>
    <CardFooter className="flex justify-end gap-2">
      <div className="grow">
        <Button type="button" variant="outline-destructive" color="danger" onClick={onClickDelete}>
          <Trash2 size="sm" />
        </Button>
      </div>
      <div className="flex shrink-0 gap-2">
        <Link href={APP_ROUTES.dashboard.user.todos.update(todo.id).page}>
          <Button type="button" variant="outline">Update</Button>
        </Link>
        <Button type="button" onClick={onClickDetail}>Detail</Button>
      </div>
    </CardFooter>
  </Card>
);

export default TodoItem;