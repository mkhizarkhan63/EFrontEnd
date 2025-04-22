export enum Status {
    done = 'done',
    wait = 'wait',
    inProgress = 'inProgress',
}

type Props = {
    steps: Array<{
        name: string;
        status: Status;
        onClick?: () => void;
    }>;
};

const SelectStep = (props: { status: string; index: number }) => {
    switch (props.status) {
        case 'done':
            return <div className="done"><span /></div>;
        case 'wait':
            return <div className="wait">{props.index}</div>;
        case 'inProgress':
            return <div className="in-progress">{props.index}</div>;
        default:
            return null;
    }
};

export const StepBar = (props: Props) => {

    const content = props.steps.map((step, index) => (
        <div key={index} onClick={step.onClick} className="side-bar-step">
            <SelectStep status={step.status} index={index+1} />
            <div className="side-bar-step-name">
                {step.name}
            </div>
        </div>
    ));

    return (
        <div className="side-bar">
            <div className="side-bar-content">
                {content}
            </div>
        </div>
    );
};
