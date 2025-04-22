import { observer } from 'mobx-react';
import type { Paging as PagingModel } from '~/api';
import { If } from '../If';

const MARGIN = 2;

type Props = {
    paging: PagingModel | false;
};

const PageButton = (props: {
    index: number;
    isSelected?: boolean;
    onClick: () => void;
}) => (
    <div
        className="paging-button"
        data-is-current={props.isSelected}
        onClick={props.onClick}
    >
        {props.index + 1}
    </div>
);

export const Paging = observer((props: Props) => {
    if (props.paging === false) {
        return null;
    }

    const doubleMargin = MARGIN * 2;
    const { paging } = props;
    const { page, pagesCount } = paging;
    const showFirst = page > MARGIN;
    const showEndDots = pagesCount - page > 5 && pagesCount !== 6;
    const showPenult = pagesCount - page === 5 && pagesCount !== 6 && pagesCount !== 5;
    const showLast =
        pagesCount > doubleMargin &&
        page < pagesCount - MARGIN - 1 &&
        !(pagesCount === 5 && page < 2);

    const indices = Array(doubleMargin + 1 + Math.max(0, MARGIN - page))
        .fill(0)
        .map((x, index) => page + index - MARGIN)
        .filter(x => x >= 0 && x < pagesCount);

    const pagesButtons = indices
        .map(x => <PageButton key={x} index={x} isSelected={x === page} onClick={() => paging.setPage(x)} />);

    return (
        <div className="paging">
            <div
                className="first-page"
                data-is-visible={showFirst}
            >
                <PageButton index={0} onClick={() => paging.setPage(0)} />
                <If condition={page === 4}>
                    <PageButton index={1} onClick={() => paging.setPage(1)} />
                </If>
                <If condition={page > 4}>
                    <div className="paging-dots" />
                </If>
            </div>
            {pagesButtons}
            <If condition={showPenult}>
                <PageButton index={pagesCount - 2} onClick={() => paging.setPage(pagesCount - 2)} />
            </If>
            <If condition={showLast}>
                <If condition={showEndDots}>
                    <div className="paging-dots" />
                </If>
                <PageButton index={pagesCount - 1} onClick={() => paging.setPage(pagesCount - 1)} />
            </If>
        </div>
    );
});
