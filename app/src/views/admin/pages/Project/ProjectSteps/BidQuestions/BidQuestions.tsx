import { Questions } from '~/partials/Questions';

type Props = {
    id: number;
};

export const BidQuestions = (p: Props) => (
    <div className="question-list">
        <Questions id={p.id} />
    </div>
);
