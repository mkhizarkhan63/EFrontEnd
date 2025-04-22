import { observer } from 'mobx-react';
import { lang } from '~/api';
import { Button, If, Input } from '~/bits';
import { type QuestionType } from '~/models';
import { preventDefault } from '~/utils';

type ItemProps = {
    item: QuestionType;
    onRemove: () => void;
    onSubmitAnswer: () => void;
    onChangeAnswer: (value: string) => void;
    onToggle: () => void;
    onAnswerEdit: () => void;
    isAdmin: boolean;
};

export const QuestionTile = observer((p: ItemProps) => {
    const question = p.item;
    const answer = p.item.answer;

    const hiddenAnswer = (
        <div>
            <div className="question-item__answer">
                <div className="question-item__answer-text">
                    {answer.text}
                    <div className="question-item__btn question-item__btn--edit">
                        <Button
                            color="transparent"
                            centerImg="edit"
                            onClick={p.onAnswerEdit}
                        />
                    </div>
                </div>
            </div>
            <p className="question-item__answer-date">
                {lang.dict.get('answered')}&nbsp;
                <span>
                    {answer.date.format('ll')}
                </span>
            </p>
        </div>
    );

    const shownAnswer = (
        <div className="question-item__answer-container">
            <If condition={!answer.isHidden}>
                {hiddenAnswer}
            </If>
            <div className="question-item__btn question-item__btn--answer">
                <Button
                    color="transparent"
                    value={answer.isHidden ? lang.dict.get('seeAnswer') : lang.dict.get('hideAnswer')}
                    onClick={p.onToggle}
                />
            </div>
        </div>
    );

    const editAnswer = (
        <form
            className="form"
            onSubmit={preventDefault(p.onSubmitAnswer)}
        >
            <div
                className="question-item__input"
            >
                <Input.Text
                    value={answer.text}
                    onChange={value => p.onChangeAnswer?.(value)}
                    placeHolder={lang.dict.get('fieldWriteAnswer')}
                />
                <div className="question-item__btn question-item__btn--send">
                    <Button
                        color="transparent"
                        centerImg="send"
                        onClick={p.onSubmitAnswer}
                    />
                </div>
            </div>
        </form>
    );

    const editableAnswer = answer.isEdited
        ? editAnswer
        : shownAnswer;

    return p.isAdmin ?
        (
            <div className="question-item">
                <div className="question-item__heading">
                    <img className="question-item__heading-img" src={question.avatar?.url} alt="avatar" />
                    <div className="question-item__heading-text">
                        <div className="question-item__heading-row">
                            <If condition={() => question.isNew}>
                                <p className="question-item__heading-new">
                                    {lang.dict.get('new')}
                                </p>
                            </If>
                            <div className="question-item__heading-date">
                                {question.date.format('ll | LT')}
                            </div>
                        </div>
                        <div className="question-item__heading-question">
                            {question.text}
                        </div>
                    </div>
                    <div
                        className="question-item__btn question-item__btn--delete"
                    >
                        <Button
                            color="transparent"
                            centerImg="delete"
                            onClick={p.onRemove}
                        />
                    </div>
                </div>
                <div className="question-item__answer">{editableAnswer}</div>
            </div>
        )
        :
        (
            <div className="post">
                <p className="post__date">{question.date.format('ll | LT')}</p>
                <p className="post__question">{question.text}</p>
                <If condition={!answer.isHidden}>
                    <p className="post__answer">{answer.text}</p>
                    <p className="post__answer-date">
                        {lang.dict.get('answered')}
                        <span className="post__answer-date-num">{answer.date.format('ll')}</span>
                    </p>
                </If>
                <If condition={answer.text.length > 0}>
                    <div className="post__btn">
                        <Button
                            color="transparent"
                            value={answer.isHidden
                                ? lang.dict.get('seeAnswer')
                                : lang.dict.get('hideAnswer')}
                            onClick={p.onToggle}
                        />
                    </div>
                </If>
                <If condition={answer.text.length === 0}>
                    <p className="post__answer-waiting">{lang.dict.get('waitingForAnswer')}</p>
                </If>
            </div>
        );
});
