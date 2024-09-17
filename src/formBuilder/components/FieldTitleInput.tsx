// types
import type { ReactElement, SyntheticEvent } from "react";

type Props = {
    title: string,
    onTitleChange: (title: string) => void;
}

export const FieldTitleInput = (props: Props): ReactElement => {
    const { title, onTitleChange } = props;

    const handleChange = (event: SyntheticEvent<HTMLInputElement>): void => {
        onTitleChange(event.currentTarget.value);
    };

    return (
        <div className='relative border-2 border-solid border-slate-300 rounded-md py-2 px-3'>
            <span className='absolute -top-3 left-10 bg-white text-sm px-1 text-slate-500'>Question Title</span>
            <input type="text" value={title} onChange={handleChange} className='h-8 w-full p-0 border-none outline-none' />
        </div>
    );
}