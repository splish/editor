import * as React from 'react';
import { EditableIdentifier } from './editable.component';
export interface EditorProps {
    defaultPlugin?: any;
    plugins?: any[];
    mode?: any;
}
export declare class Editor extends React.Component<EditorProps> {
    static defaultProps: {
        mode: string;
    };
    private undoStack;
    private redoStack;
    private editor;
    private DragDropContext;
    private persistState;
    private undo;
    private redo;
    serializeState: ({ id }: EditableIdentifier) => any;
    private Editable;
    constructor(props: EditorProps);
    componentDidUpdate(prevProps: EditorProps): void;
    changeMode: (buttonMode: String) => void;
    render(): JSX.Element;
}
