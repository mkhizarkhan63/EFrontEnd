import { observer } from 'mobx-react';
import { useEffect, useRef } from 'react';
import { lang } from '~/api';
import { Button, Close, ErrorList, Icons, If, Input } from '~/bits';
import { hook, preventDefault } from '~/utils';
import { type BidingVm } from '~/views/Biding/Biding.vm';
import { QuestionsVm } from './Questions.vm';
import { QuestionTile } from './QuestionTile/QuestionTile';

type Props = {
    bidingVm?: BidingVm;
    id: number;
};

type HeaderProps = {
    bidingVm?: BidingVm;
    vm: QuestionsVm;
};

const Header = observer(({ vm, bidingVm }: HeaderProps) => {
    if (!bidingVm) {
        return (
            <>
                <div className="questions-title">
                    <div className="questions-title__heading">
                        {lang.dict.get('questions')} ({vm.questions.length})
                    </div>
                    <div className="questions-title__buttons">
                        <div className="questions-title__buttons">
                            <div className="search">
                                <Icons icon="search" />
                            </div>
                            <div className="filter">
                                <Icons icon="filter" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="questions-add">
                    <form
                        onSubmit={preventDefault(vm.submitQuestion)}
                    >
                        <div className="questions-add__input">
                            <Input.Text
                                value={vm.currentQuestion.text}
                                onChange={vm.setQuestionText}
                                placeHolder={lang.dict.get('fieldWriteQuestion')}
                            />
                        </div>
                        <div className="questions-add__input">
                            <Input.Text
                                value={vm.currentQuestion.answer.text}
                                onChange={vm.setAnswerText}
                                placeHolder={lang.dict.get('fieldWriteAnswer')}
                            />
                        </div>
                        <Button
                            onClick={vm.submitQuestion}
                            color="white"
                            value={lang.dict.get('addQuestion')}
                            leftImg="add"
                            isSubmit={true}
                        />
                    </form>
                </div>
            </>
        );
    }
    return (
        <>
            <div className="side-modal__header">
                <Close onClick={bidingVm.toggleIsPostQuestion} />
                <p className="side-modal__header-title">
                    {lang.dict.get('postQuestion')}
                    <span className="side-modal__header-number">({vm.questions.length})</span>
                </p>
            </div>
            <div className="post-question__search">
                <Icons icon="search" />
            </div>
        </>
    );
});

export const Questions = observer(({ id, bidingVm }: Props) => {
    const vm = hook.useVm(() => new QuestionsVm(id, bidingVm));

    const container = useRef<HTMLDivElement>(null);

    useEffect(() => container.current?.scrollIntoView(false), [vm.questionList.data]);

    const questionList = vm.questions.map(item => (
        <QuestionTile
            key={item.id}
            item={item}
            onRemove={() => vm.removeQuestion(item)}
            onSubmitAnswer={() => vm.onSubmitAnswer(item)}
            onChangeAnswer={item.answer.setText}
            onToggle={() => vm.toggleAnswerQuestion(item)}
            onAnswerEdit={() => vm.setAnswerEdit(item)}
            isAdmin={vm.isAdmin}
        />
    ));

    return (
        <>
            <Header vm={vm} bidingVm={bidingVm} />
            <div className="post-question__content">
                {vm.isAdmin ? questionList : questionList.reverse()}
                <If condition={() => !vm.isAdmin}>
                    <div ref={container} />
                </If>
            </div>
            <If condition={() => !vm.isAdmin}>
                <form
                    className="form"
                    onSubmit={preventDefault(vm.submitQuestion)}
                >
                    <div className="post-question__input">
                        <Input.Text
                            placeHolder={lang.dict.get('inputPostYourQuestion')}
                            value={vm.currentQuestion.text}
                            onChange={vm.setQuestionText}
                        />
                        <Button
                            color="transparent"
                            centerImg="send"
                            onClick={vm.submitQuestion}
                        />
                    </div>
                </form>
            </If>
            <ErrorList errors={vm.errorListHolder} />
        </>
    );
});
