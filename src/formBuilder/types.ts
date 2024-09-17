// constants
import { ActionType } from './actionTypes';
import { FieldType } from './constants';

// types
import { NumberConfig as NumberFieldConfig } from './components/fieldRenderer/numberInput/types'
 
type AddAction = {
    type: ActionType.ADD;
}

type DeleteAction = {
    type: ActionType.DELETE;
    payload: {
        id: string;
    }
}

type ToggleCollapseAction = {
    type: ActionType.TOGGLE_COLLAPSE;
    payload: {
        id: string;
    }
}

type UpdateAction = {
    type: ActionType.UPDATE;
    payload: {
        config: Config;
    }
}

export type Action = AddAction | DeleteAction | ToggleCollapseAction | UpdateAction;

export type OnAction = (action: Action) => void;

export type FieldTypeConfig = NumberFieldConfig;

export type Config = {
    id: string;
    isCollapsed: boolean;
    title: string;
    fieldType: FieldType;
    required?: boolean;
    helperText?: string;
    fieldTypeConfig?: FieldTypeConfig;
}