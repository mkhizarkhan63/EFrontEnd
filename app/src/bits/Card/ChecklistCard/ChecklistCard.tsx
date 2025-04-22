import type { ComponentProps } from 'react';
import { Button } from '~/bits';
import { Top } from '../Top';

type ChecklistProps = ComponentProps<typeof Top> & {
    subtitle: string;
    checklist: string[];
    by: string;
    picture: 'material' | 'insureHome' | 'loan';
    buttonName: string;
    byLogo: 'assas' | 'bank' | 'omanInsurance';
    onClickButton?: () => void;
};

export const ChecklistCard = (props: ChecklistProps) => {
    const features = props.checklist.map(feature => (
        <div key={feature} className="feature">
            {feature}
        </div>
    ));

    return (
        <div className="checklist-card card">
            <Top
                title={props.title}
                optionalTopTitle={props.optionalTopTitle}
            />
            <div className="content">
                <div className="checklist">
                    <div className="subtitle">{props.subtitle}</div>
                    {features}
                </div>
                <div className="picture" data-picture={props.picture} />
            </div>
            <div className="bottom">
                <div className="bottom__by">
                    <div className="bottom__text">{props.by}</div>
                    <div className="bottom__logo" data-logo={props.byLogo} />
                </div>
                <Button
                    color="gray"
                    value={props.buttonName}
                    onClick={props.onClickButton}
                />
            </div>
        </div>
    );
};
