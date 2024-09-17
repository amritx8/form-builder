// libraries
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

// components
import { ActionHandler } from './formBuilder/components/ActionHandler';
import { FormBuilder } from './formBuilder/FormBuilder'
import Button from 'react-bootstrap/Button';

// constants
import { ActionType } from './formBuilder/actionTypes';

// types
import type { ReactElement } from 'react';

export const App = (): ReactElement => {

  return (
    <ActionHandler>
      {({state: configs, onAction, onDragEnd }) => (
        <div className="w-full h-full p-8 bg-zinc-300">
          <div className="flex flex-col gap-4">
            <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
              <SortableContext items={configs} strategy={verticalListSortingStrategy}>
                {configs.map((config) => (
                  <FormBuilder key={config.id} config={config} onAction={onAction} />
                ))}
              </SortableContext>
            </DndContext>
          </div>
          <Button variant="outline-primary" onClick={() => onAction({ type: ActionType.ADD })} className="mt-4">Add Question</Button>
        </div>
      )}
    </ActionHandler>
  );
}

