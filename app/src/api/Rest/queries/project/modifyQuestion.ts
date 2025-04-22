import { E } from '~/api';
import { type QuestionType } from '~/models';
import { dtos } from '../..';

export const modifyQuestion = async (question: QuestionType, action: E.UpdateQuestionAction) => {
    if (!question.externalId) {
        return;
    }

    const res = await dtos.construction.execUpdateProjectQuestionCommand({
        questionAction: action,
        id: question.externalId,
        ...action === E.UpdateQuestionAction.question
            ? {
                question: question.text,
            }
            : {
                answer: question.answer.text,
                answerId: question.answer.externalId,
            },
    });

    if (!res) {
        return false;
    }

    if (res.answerId) {
        question.answer.connect(res.answerId);
        return res.isSuccess;
    }

    return res.isSuccess;
};
