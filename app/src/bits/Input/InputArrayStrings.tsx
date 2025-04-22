import { observer } from 'mobx-react';
import { Icons } from '~/bits';
import { preventDefault } from '~/utils';

type Props = {
    placeHolder?: string;
    isDisabled?: boolean;
    name?: string;
    listValues: string[];
    value: string;
    onChange: (value: string) => void;
    addItem: () => void;
    deleteItem: (value: string) => void;
    error?: string;
};

export const InputArrayStrings = observer((props: Props) => {

    const showValues = props.listValues.map((value, index) => (
        <div
            className="input-array-results-row"
            key={`value-${value}-${index}`}
        >
            {value}
            <Icons remove={() => props.deleteItem(value)} icon="close" />
        </div>
    ));

    return (
        <div
            className="input-array"
        >
            <div className="input-array-name">
                {props.name}
            </div>
            <form className="input-array-input" onSubmit={preventDefault(props.addItem)}>
                <input
                    type="text"
                    data-is-error={Boolean(props.error)}
                    className="input-array-input-text"
                    placeholder={props.placeHolder}
                    disabled={props.isDisabled}
                    value={props.value}
                    onChange={e => props.onChange(e.target.value)}
                />
                <div className="input-array-input-add" data-role="add-value" onClick={props.addItem}>
                    <Icons icon="add" />
                </div>
            </form>
            {props.error ? <div className="input-array-error">{props.error}</div> : null}
            <div className="input-array-results">
                {props.listValues ? showValues : null}
            </div>
        </div>
    );
});
