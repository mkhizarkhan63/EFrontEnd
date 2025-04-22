import type { PropsWithChildren } from 'react';
import { Icons, type IconName } from '~/bits';

type Props = PropsWithChildren<{
    steps: Array<({
        status: 'wait' | 'done' | 'archived' | 'rejected' | 'inProgress';
        name: string;
        description: string;
        icon?: IconName;
    })>;
}>;

export const ProcessBox = (props: Props) => {
    const header = props.steps.map((step, index) => {
        let showIcon;

        if (step.status === 'inProgress' && step.icon) {
            showIcon = (
                <div className="process-box__status-image">
                    <Icons icon={step.icon} />
                </div>
            );
        }

        return (
            <div key={`${step.name}${index}`} className="process-box__status-box" data-status={step.status}>
                <div className="status" data-status={step.status}>
                    <span className={step.status}>
                        {step.status !== 'done' ? index + 1 : null }
                    </span>
                </div>
                {showIcon}
                <div className="process-box__status-text">
                    <div className="process-box__status-name">{step.name}</div>
                    <div className="process-box__status-description">{step.description}</div>
                </div>
            </div>
        );
    });

    return (
        <div className="process-box">
            <div className="process-box__header">
                {header}
            </div>
            <div className="process-box__content">
                {props.children}
            </div>
        </div>
    );
};
