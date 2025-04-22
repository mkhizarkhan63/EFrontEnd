import { Img } from '~/api/Img';
import { Answer, Question } from '~/models';
import { stores } from '~/stores';
import { dtos } from '../..';

export const getProjectQuestions = async (id: number) => {
    const data = await dtos
        .construction
        .execListProjectQuestionByProjectIdQuery(
            {
                projectId: id,
                page: 1,
                pageSize: 200,
            },
        );

    if (!data || !data.result) {
        return [];
    }

    return data.result.map(item => {
        const firstAnswer = item.answers?.find(() => true);
        const answer = firstAnswer ?
            Answer.create({
                id: stores.idCollection.getInternal('questionAnswer', firstAnswer.id),
                text: firstAnswer.answer,
                isHidden: true,
                isEdited: false,
                date: firstAnswer.createdDate,
            })
            : Answer.create({
                isEdited: true,
                isHidden: true,
            });

        return Question.create({
            id: stores.idCollection.getInternal('question', item.id),
            date: item.createdDate,
            projectId: stores.idCollection.getInternal('project', item.id),
            text: item.question,
            avatar: Img.tryCreate(item.avatarId),
            answer: answer,
            isNew: !firstAnswer,
        });
    });
};
