import type { ComponentProps } from 'react';
import { Top } from '../Top';
import { Button } from '~/bits';

type Props = ComponentProps<typeof Top> & {
    tip: string;
    primaryBtnName: string;
    secondaryBtnName: string;
    picture: 'material' | 'supervision' | 'loan';
    onPrimaryBtnClick?: () => void;
    onSecondaryBtnClick?: () => void;
};

export const InviteCard = (props: Props) => (
    <div className="invite-card card">
        <Top title={props.title} optionalTopTitle={props.optionalTopTitle} />
        <div className="picture" data-picture={props.picture} />
        <div className="tip">{props.tip}</div>
        <div className="buttons">
            <Button
                color="white"
                value={props.primaryBtnName}
                onClick={props.onPrimaryBtnClick}
            />
            <Button
                color="gray"
                value={props.secondaryBtnName}
                onClick={props.onSecondaryBtnClick}
            />
        </div>
    </div>
);
