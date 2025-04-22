import type moment from 'moment';
import type { ComponentType, PropsWithChildren } from 'react';
import type { E } from '~/api';
import { If } from '~/bits';

type Props = PropsWithChildren<{
    steps: Array<{
        status: E.ProcessWizard;
        name: string;
        date?: moment.Moment;
        component?: ComponentType;
        class?: string;
        flex?: number;
    }>;
}>;

export const ProcessWizard = (props: Props) => {
    const header = props.steps.map((step, index) => {
        const component = step.component ? <step.component /> : null;

        return (
            <div
                key={`${step.name}${index}`}
                className={step.class ? `wizard__step wizard__step--${step.class}` : 'wizard__step'}
                data-status={step.status}
                style={{ flex: step.flex }}
            >
                <div
                    className="status"
                    data-status={step.status}
                >
                    <span className={step.status}>
                        {step.status !== 'done' ? index + 1 : null}
                    </span>
                </div>
                <div className="wizard__step-text">
                    <div className="wizard__step-name">{step.name}</div>
                    <If condition={() => Boolean(step.date)} >
                        <div className="wizard__step-date">
                            {step.date?.format('L')}
                        </div>
                    </If>
                </div>
                {component}
            </div>
        );
    });

    return (
        <div className="wizard">
            {header}
            {props.children}
        </div>
    );
};
