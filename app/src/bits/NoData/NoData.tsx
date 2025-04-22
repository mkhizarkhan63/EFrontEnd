import { observer } from 'mobx-react';
import { lang } from '~/api';

type Props = {
    forPm?: boolean;
    forReview?: boolean;
};

export const NoData = observer(({ forPm, forReview }: Props) => {
    const error = forReview ? lang.dict.get('previousNotShared') : lang.dict.get('noDataFound');

    if (forPm) {
        return (
            <div className="no-data no-data--pm">
                <img src="/assets/graphics/empty_updates.svg" alt="" className="no-data__img" />
                <p className="no-data__text">{lang.dict.get('youHaveNoUpdates')}</p>
                <p className="no-data__desc">{lang.dict.get('updatesWillAppear')}</p>
            </div>
        );
    }

    return (
        <div className="no-data">
            <img src="/assets/graphics/empty.svg" alt="" className="no-data__img" />
            <p className="no-data__text">{error}</p>
        </div>
    );
});
