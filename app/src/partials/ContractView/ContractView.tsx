import { type ComponentType } from 'react';
import { observer } from 'mobx-react';

type ContractViewProps = {
    leftPanel: ComponentType;
    centerPanel: ComponentType;
    rightPanel: ComponentType;
};

export const ContractView = observer((props: ContractViewProps) => {
    const {
        leftPanel: LeftPanel,
        centerPanel: CenterPanel,
        rightPanel: RightPanel,
    } = props;

    return (
        <div className="contract-view">
            <div className="left-panel">
                <LeftPanel />
            </div>
            <div className="center-panel">
                <CenterPanel />
            </div>
            <div className="right-panel">
                <RightPanel />
            </div>
        </div>
    );
});
