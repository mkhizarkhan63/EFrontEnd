import { observer } from 'mobx-react';
import type { ErrorListHolder } from '~/api';
import { Button } from '../Button';

type Props = ({
    isRaw?: false;
    errors: ErrorListHolder;
    messages?: string[];
} | {
    isRaw: true;
    onClick: (key: string) => void;
    getErrors: () => Array<{
        text: string;
        key: string;
    }>;
});

const RawErrorList = observer((props: Props & { isRaw: true }) => {
    const messages = props.getErrors().map((item, idx) => (
        <li
            key={`${item.key}-${item.text}-${idx}`}
            onClick={() => props.onClick(item.key)}
        >
            {item.text}
        </li>
    ));

    return (
        <ul className="error-list" data-is-alt="true">
            {messages}
        </ul>
    );
});

export const ErrorList = observer((props: Props) => {
    if (props.isRaw) {
        return <RawErrorList {...props} />;
    }

    if (props.errors.noItems && props.messages?.length === 0) {
        return null;
    }

    const messages = props.messages?.map((item, idx) => (
        <li key={`${item}-${idx}`}>
            {item}
        </li>
    ));

    const list = props.errors.translated
        .map(item => (
            <li
                key={item.id.asStr()}
                onClick={() => props.errors.remove(item.id)}
            >
                {item.message}
                <Button
                    color="transparent"
                    centerImg="close"
                    onClick={() => props.errors.remove(item.id)}
                />
            </li>
        ));

    return (
        <ul className="error-list">
            {messages}
            {list}
        </ul>
    );
});
