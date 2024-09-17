// libraries
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities'

// components
import { FieldTypeComponentContainer } from './components/FieldTypeComponentContainer'

// icons
import { MdDelete } from "react-icons/md";
import { IoChevronDownOutline } from "react-icons/io5";
import { RxDragHandleDots2 } from "react-icons/rx";

// constants
import { ActionType } from './actionTypes';

// types
import type { OnAction, Config } from './types';


type Props = {
  config: Config;
  onAction: OnAction;
}

export const FormBuilder = (props: Props) => {
  const { config, onAction } = props;
  const { id, isCollapsed, title } = config;

  const handleDelete = () => {
    onAction({ type: ActionType.DELETE, payload: { id }});
  };

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform)
  }

  return (
    <div ref={setNodeRef} style={style} className='flex justify-between items-center gap-4 bg-white p-4 border border-solid rounded-md'>
      {isCollapsed ? (
        <>
          <button {...attributes} {...listeners}><RxDragHandleDots2 size={20} /></button>
          <div className='w-full'>{title}</div>
          <button onClick={handleDelete}><MdDelete size={20} /></button>
          <button onClick={() => {
            onAction({ type: ActionType.TOGGLE_COLLAPSE, payload: { id }});
          }}>
            <IoChevronDownOutline size={20} />
          </button>
        </>
      ) : <FieldTypeComponentContainer config={config} onAction={onAction} /> }
  </div>)
}
