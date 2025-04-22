import { action, runInAction } from 'mobx';
import { restQuery, LazyModelList, T, ErrorListHolder, E } from '~/api';
import { Question, type QuestionType } from '~/models';
import { stores } from '~/stores';
import { type BidingVm } from '~/views/Biding/Biding.vm';

const questionStruct = (isAdmin: boolean) => T.type({
    question: T.size(T.string(), 3, 100),
    ...isAdmin
        ? {
            answer: T.size(T.string(), 3, 100),
        }
        : {},
});

export class QuestionsVm {
    isSaving = false;

    errorListHolder = new ErrorListHolder(
        () => this.validationData,
        () => questionStruct(this.isAdmin),
    );

    currentQuestion = Question.create();

    questionList = new LazyModelList(
        'Bid question',
        () => restQuery.project.getProjectQuestions(this.id),
    );

    constructor(readonly id: number, readonly bidingVm?: BidingVm) {
        makeSafeObservable(this, {
            setQuestionText: action,
            setAnswerText: action,
            submitQuestion: action,
            removeQuestion: action,
            toggleAnswerQuestion: action,
            setAnswerEdit: action,
            onSubmitAnswer: action,
        });
    }

    get questions() {
        return this.questionList.data;
    }

    get isAdmin() {
        return Boolean(!this.bidingVm);
    }

    get validationData() {
        return {
            question: this.currentQuestion.text,
            answer: this.isAdmin ? this.currentQuestion.answer.text : undefined,
        };
    }

    setQuestionText = (value: string) => this.currentQuestion.setText(value);

    setAnswerText = (value: string) => this.currentQuestion.answer.setText(value);

    submitQuestion = () => {
        (async () => {
            if (this.isSaving || !this.errorListHolder.test()) {
                return;
            }

            this.isSaving = true;

            const externalQuestion = await stores.projects
                .postQuestion(this.currentQuestion, this.id);

            if (!externalQuestion) {
                this.isSaving = false;
                return;
            }

            this.currentQuestion.answer.setIsHidden(true);
            this.questionList.add(this.currentQuestion, true);

            this.isSaving = false;

            runInAction(() => {
                this.currentQuestion = Question.create();
            });
        })();
    };

    removeQuestion = (question: QuestionType) => {
        (async () => {
            if (this.isSaving || !question.externalId) {
                return;
            }

            this.isSaving = true;

            const externalQuestionId = await stores.projects
                .deleteQuestion(question.externalId);

            if (!externalQuestionId) {
                this.isSaving = false;
                return;
            }

            this.questionList.removeId(question.externalId);
            this.isSaving = false;
        })();
    };

    toggleAnswerQuestion = (question: QuestionType) => {
        question.answer.setIsHidden(!question.answer.isHidden);
    };

    setAnswerEdit = (question: QuestionType) => {
        question.answer.switchEdited();
    };

    onSubmitAnswer = (question: QuestionType) => {
        if (!question.externalId) {
            return;
        }

        (async () => {
            const res = await stores.projects.modifyQuestion(question, E.UpdateQuestionAction.answer);

            if (!res) {
                return;
            }

            question.answer.switchEdited();
            question.answer.setIsHidden(false);
            question.setIsNew(false);
        })();
    };
}
