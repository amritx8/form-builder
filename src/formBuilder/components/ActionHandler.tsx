// libraries
import { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import { arrayMove } from '@dnd-kit/sortable';

// hooks
import { useFetchAndSaveData } from '../../hooks/useFetchAndSaveData';

// constants
import { FieldType } from '../constants';
import { ActionType } from '../actionTypes'

// types
import type { ReactNode, ReactElement } from "react";
import type { Action, OnAction, Config } from '../types'

type State = Config[];
  
const DEFAULT_CONFIG: Config = {
    id: uuid(),
    isCollapsed: true,
    title: 'What is your age?',
    fieldType: FieldType.NUMBER,
}

type Props = {
    children: ({ state, onAction, onDragEnd }: { state: State, onAction: OnAction, onDragEnd: any }) => ReactNode;
}

export const ActionHandler = (props: Props): ReactElement => {
    const { children } = props;

    const {
      data,
      loading,
      saveData,
    } = useFetchAndSaveData();

    const [state, setState] = useState<State>([DEFAULT_CONFIG]);

    useEffect(() => {
      if(data) {
        setState(data);
      }
    }, [data]);
    
    const handleAction = (action: Action): void => {
        switch(action.type) {
          case ActionType.ADD: {
            setState(prevState => {
              const newState = [...prevState, { ...DEFAULT_CONFIG, id: uuid() }];
              saveData(newState);
              return newState;
            });

            break;
          }
          case ActionType.DELETE: {
            const { payload } = action;
            const { id } = payload;

            setState(prevState => {
              const newState = prevState.filter(config => config.id !== id)
              saveData(newState);
              return newState;
            });
            break;
          }
          case ActionType.TOGGLE_COLLAPSE: {
            const { payload } = action;
            const { id } = payload;
            
            setState(prevState => {
              const newState = prevState.map(config => 
                config.id === id ? ({ ...config, isCollapsed: !config.isCollapsed }) : config
              );

              saveData(newState);
              return newState;
            });
            break;
          }
          case ActionType.UPDATE: {
            const { payload } = action;
            const { config: updatedConfig } = payload;
            
            setState(prevState => {
              const newState = prevState.map(config => 
                config.id === updatedConfig.id ? updatedConfig : config
              );
              
              saveData(newState);
              return newState;
            });
            break;
          }
          default: {
            break;
          }
        }
    }

    const handleDragEnd = (event: any) => {
      const {active, over} = event;

      if(active.id === over.id) return;

      setState(prevState => {
        const oldIndex = prevState.findIndex(({ id }) => id === active.id);
        const newIndex = prevState.findIndex(({ id }) => id === over.id);

        return arrayMove(prevState, oldIndex, newIndex);
      })

    }
  

    return !loading ? (
        <>
            {children({ state, onAction: handleAction, onDragEnd: handleDragEnd })}
        </>
    ) : <div className='h-full w-full flex items-center justify-center'>Loading</div>;
}