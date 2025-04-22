import { observer } from 'mobx-react';
import moment from 'moment';
import { E, lang } from '~/api';
import { Button, Close, If, IfDef, Input, SideModal } from '~/bits';
import type { WorkflowType } from '~/models';
import { utilsString } from '~/utils';
import type { WorkflowModalVm } from './WorkflowModal.vm';

type Props = {
    vm: WorkflowModalVm;
};

type DetailsProps = {
    vm: WorkflowModalVm;
    workflow: WorkflowType;
};

type TasksProps = {
    vm: WorkflowModalVm;
    tasks: WorkflowType['tasks'];
};

type ChecklistItemProps = {
    en: string;
    ar: string;
    isFirst: boolean;
    setEn: (value: string) => void;
    setAr: (value: string) => void;
    remove: () => void;
    isPreview: boolean;
};

type ChecklistBlockProps = {
    vm: WorkflowModalVm;
    id: number;
};

const ChecklistItem = observer((p: ChecklistItemProps) => (
    <div className="input-container">
        <Input.Textarea
            placeHolder={lang.dict.get('checkEnglish')}
            onChange={p.setEn}
            value={p.en}
            isDisabled={p.isPreview}
            withoutHeader={true}
        />
        <Input.Textarea
            onChange={p.setAr}
            value={p.ar}
            placeHolder={lang.dict.get('checkArabic')}
            isArabic={true}
            isDisabled={p.isPreview}
            withoutHeader={true}
        />
        <If condition={!p.isFirst}>
            <Button
                centerImg="delete"
                color="transparent"
                onClick={p.remove}
                isDisabled={p.isPreview}
            />
        </If>
    </div>
));

const ChecklistBlock = observer((p: ChecklistBlockProps) => {
    const editor = p.vm.workflow.getEditor(p.id, 'checklist');
    const items = editor.options.map((item, index) => (
        <ChecklistItem
            key={`${index}-of-${editor.options.length}`}
            en={item.en}
            ar={item.ar}
            setAr={ar => editor.set(index, 'ar', ar)}
            setEn={en => editor.set(index, 'en', en)}
            isFirst={index === 0}
            remove={() => editor.remove(index)}
            isPreview={p.vm.params.isPreview}
        />
    ));

    return (
        <>
            {items}
            <If condition={!p.vm.params.isPreview}>
                <div className="btn-add-row">
                    <Button
                        color="white"
                        leftImg="add"
                        value={lang.dict.get('addNewRow')}
                        onClick={() => editor.add()}
                        isDisabled={p.vm.params.isPreview}
                    />
                </div>
            </If>
        </>
    );
});

const WorkflowTasks = observer(({ tasks, vm }: TasksProps) => {
    const items = tasks.map((x, i) => (
        <div
            className="workflow__task"
            key={`workflow-task-${x.nameEn}-${i}}`}
            data-is-checklist={x.actionType === E.WorkflowActionType.checklist}
        >
            <div className="workflow__task-header">
                <p className="workflow__task-title">
                    {lang.dict.format('task', [i + 1])}
                </p>
                <div className="workflow__task-details">
                    <p className="workflow__task-details-item">
                        {lang.dict.get('actionBy')}
                        <span className="workflow__task-details-text">
                            {utilsString.capitalize(x.actorType)}
                        </span>
                    </p>
                    <p className="workflow__task-details-item">
                        {lang.dict.get('duration')}
                        <span className="workflow__task-details-text">
                            {lang.dict.format('daysFormat', [moment.duration(x.defaultTaskTime).asDays()])}
                        </span>
                    </p>
                </div>
            </div>
            <div className="workflow__row">
                <div className="workflow__col">
                    <p className="workflow__col-text">{x.nameEn}</p>
                </div>
                <div className="workflow__col workflow__col--ar">
                    <p className="workflow__col-text">{x.nameAr}</p>
                </div>
            </div>
            <p className="workflow__block">
                Block Type -
                &nbsp;
                <span className="workflow__block-type">{lang.dict.enum('workflowsActionTypes', x.actionType)}</span>
            </p>
            <If condition={() => x.actionType === E.WorkflowActionType.checklist}>
                <ChecklistBlock vm={vm} id={x.id} />
            </If>
        </div>
    ));

    return <div className="workflow__tasks">{items}</div>;
});

const WorkflowDetails = observer(({ workflow, vm }: DetailsProps) => (
    <>
        <div className="workflow">
            <div className="workflow__details">
                <div className="workflow__row">
                    <div className="workflow__col">
                        <p className="workflow__col-title">
                            {lang.dict.get('workflowTitleEnglish')}
                        </p>
                        <p className="workflow__col-text">
                            {workflow.nameEn}
                        </p>
                    </div>
                    <div className="workflow__col workflow__col--ar">
                        <p className="workflow__col-title">
                            {lang.dict.get('workflowTitleArabic')}
                        </p>
                        <p className="workflow__col-text">
                            {workflow.nameAr}
                        </p>
                    </div>
                </div>
                <div className="workflow__row">
                    <div className="workflow__col">
                        <p className="workflow__col-desc">
                            {workflow.descriptionEn}
                        </p>
                    </div>
                    <div className="workflow__col workflow__col--ar">
                        <p className="workflow__col-text">
                            {workflow.descriptionAr}
                        </p>
                    </div>
                </div>
            </div>
            <IfDef
                condition={() => vm.workflowTasks}
                render={x => <WorkflowTasks tasks={x} vm={vm} />}
            />
            <If condition={!vm.params.isPreview}>
                <div className="btn-add">
                    <Button
                        color="blue"
                        rightImg="next"
                        value={lang.dict.get('addWorkflow')}
                        onClick={vm.apply}
                    />
                </div>
            </If>
        </div>
    </>
));

export const WorkflowModal = observer(({ vm }: Props) => (
    <SideModal variant="workflow" onBlur={vm.cancel}>
        <div className="side-modal__header">
            <Close onClick={vm.cancel} />
            <p className="side-modal__header-title">
                {lang.dict.get('addWorkflow')}
            </p>
        </div>
        <div className="side-modal__content">
            <Input.Select
                name={lang.dict.get('workflow')}
                values={vm.types}
                value={vm.workflowTypeId.asNumber()}
                onChange={vm.setTypeId}
                placeHolder={lang.dict.get('selectWorkflowType')}
                isDisabled={vm.params.isPreview}
            />
            <IfDef
                condition={() => vm.selectedType()}
                render={x => <WorkflowDetails workflow={x} vm={vm} />}
            />
        </div>
    </SideModal>
));
