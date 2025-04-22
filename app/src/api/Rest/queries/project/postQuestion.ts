import { type QuestionType } from '~/models';
import { stores } from '~/stores';
import { dtos } from '../..';

export const postQuestion = async (question: QuestionType, projectId: number) => {
    if (question.projectId.isType('internal')) {
        return;
    }

    const answer = question.answer.text.length > 0 ? question.answer.text : undefined;

    const res = await dtos
        .construction
        .execCreateProjectQuestionCommand({
            projectId,
            answer,
            question: question.text,
        });

    if (!res) {
        return;
    }

    question.connect(res.id);

    if (stores.profile.currentProfile.avatar?.img) {
        question.setAvatar(stores.profile.currentProfile.avatar.img);
    }

    if (!res.answerId) {
        return res.isSuccess;
    }

    question.answer.connect(res.answerId);

    return res.isSuccess;
};
