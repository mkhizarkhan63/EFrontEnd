import { type RefObject, useEffect, useRef, type PropsWithChildren, useState, useCallback } from 'react';
import { Button, If } from '~/bits';
import { pdfs } from '~/api';
import { Footer, Header } from './Customs';
import type { ContractVm } from '../Contract.vm';
import { Drawings, Payments, Schedules, ScopeOfWork } from './Sections';
import { useDidMount, useMutationObserver, useWillUnmount } from 'rooks';
import { observer } from 'mobx-react';
import { when } from 'mobx';
import { pdfFix } from './PdfFixer';

const { useIsVisible } = (require as unknown as (name: string) => unknown)('react-is-visible') as {
    useIsVisible: (ref: RefObject<HTMLElement>) => boolean;
};

const PdfPage = ({
    children,
    toc,
}: PropsWithChildren<{
    toc?: string;
}>) => {
    const pdf = pdfs.get('contract');

    const ref = useRef<HTMLDivElement>(null);
    const isVisible = useIsVisible(ref);

    useEffect(() => {
        const { current } = ref;

        if (!current) {
            return;
        }

        pdf.setIsVisible(current, isVisible);
    }, [isVisible, ref]);

    return (
        <div ref={ref} className="pdf-page" data-pdf-toc={toc}>
            {children}
        </div>
    );
};

const PdfCanvasPage = ({ id }: { id: number }) => {
    const pdf = pdfs.get('contract');
    const page = pdf.file.getPage(id);

    return (
        <PdfPage>
            <div className="pdf-page__content">
                <canvas ref={page.setElement} />
            </div>
        </PdfPage>
    );
};

export type PdfCustomPageRawProps = {
    letter?: string;
    pageType: string;
    tableName?: string;
    toc?: string;
    tableItems?: Array<{
        name: string;
        count: string | number;
    }>;
    projectNumber: string;
    page: number;
    pageFooter: number;
    note?: string;
    withoutHeader?: boolean;
};

const PdfCustomPageRaw = (props: PropsWithChildren<PdfCustomPageRawProps>) => (
    <PdfPage toc={props.toc}>
        <div className="pdf-page__content pdf-page__content--custom">
            <If condition={!props.withoutHeader}>
                <Header
                    letter={props.letter}
                    titleBig={props.pageType}
                    tableName={props.tableName}
                    tableNumber={props.page}
                    tableItems={props.tableItems ?? []}
                    note={props.note}
                />
            </If>
            {props.children}
            <Footer
                projectNumber={props.projectNumber}
                page={props.pageType}
                pageNum={props.pageFooter}
            />
        </div>
    </PdfPage>
);

const createPdfCustomPage = (
    props: PdfCustomPageRawProps,
) => (
    props2: PropsWithChildren<Partial<PdfCustomPageRawProps>>,
) => <PdfCustomPageRaw {...props} {...props2} />;

export const PdfCustomPage = Object.assign(PdfCustomPageRaw, {
    create: createPdfCustomPage,
});

const PdfList = observer(() => {
    const pdf = pdfs.get('contract');

    const $els = Array(pdf.file.countOfPages).fill(0).map((x, i) => (
        <PdfCanvasPage
            key={`page-${i}`}
            id={i}
        />
    ));

    setTimeout(() => {
        pdf.regenerateCanvas();
    });

    return <>{$els}</>;
});

const useWhen = (condition: () => boolean, callback: () => void) => {
    useEffect(() => {
        const dispose = when(condition, callback);

        return () => {
            dispose();
        };
    });
};

const useDumped = () => {
    const [inputEl, setInputEl] = useState<HTMLElement | null>(null);
    const [outputEl, setOutputEl] = useState<HTMLElement | null>(null);

    const dump = useCallback((el: HTMLElement | null) => {
        setInputEl(el);
    }, []);

    useEffect(() => {
        if (!inputEl) {
            return;
        }

        setOutputEl(pdfFix(inputEl));
    }, [inputEl]);

    let props: Record<string, unknown> | null = null;

    const key1 = 'dangerouslySetInnerHTML';
    const key2 = '__html';

    if (outputEl) {
        props = {
            [key1]: {
                [key2]: outputEl.innerHTML,
            },
        };
    }

    return [
        dump,
        props,
    ] as const;
};

export const PdfPreview = ({ vm }: { vm: ContractVm }) => {
    const pdf = pdfs.get('contract');
    pdf.file.setPath(vm.pdfUrl);

    const ref = useRef<HTMLDivElement>(null);
    const [dump, fixerProps] = useDumped();

    useMutationObserver(ref, () => {
        pdf.htmlUpdate();
    }, {
        attributes: false,
        characterData: true,
        childList: true,
        subtree: true,
    });

    useWhen(
        () => pdf.isFullyLoaded,
        () => {
            const c = ref.current;

            if (!c) {
                return;
            }

            dump(c);
        },
    );

    const callback: IntersectionObserverCallback = entries => {
        entries.forEach(entry => {
            pdf.setIsVisible(entry.target as HTMLElement, entry.isIntersecting);
        });
    };

    useWhen(
        () => Boolean(fixerProps),
        () => {
            const pagesContainer = document.getElementById('pdf-preview');

            Array.from(pagesContainer?.children ?? []).forEach(page => {
                const intersectionObserver = new IntersectionObserver(callback);
                intersectionObserver.observe(page);
            });

            pdf.htmlUpdate();
            vm.setIsContractDivided();
        },
    );

    useDidMount(() => {
        pdf.htmlUpdate();
        pdf.mount();
    });

    useWillUnmount(() => {
        pdf.unmount();
    });

    pdf.htmlUpdate();

    const content = fixerProps
        ? (
            <div
                id="pdf-preview"
                className="pdf-preview"
                style={pdf.view.style}
                {...fixerProps}
            />
        )
        : (
            <div
                ref={ref}
                id="pdf-preview"
                className="pdf-preview"
                style={pdf.view.style}
            >
                <PdfList />
                <ScopeOfWork vm={vm} />
                <Payments vm={vm} />
                <Drawings vm={vm} />
                <Schedules vm={vm} />
            </div>
        );

    return (
        <>
            <div className="pdf-prev-container__btns">
                <Button
                    color="white"
                    centerImg="add"
                    isCircle={true}
                    onClick={() => pdf.view.scaleUp()}
                />
                <Button
                    color="white"
                    centerImg="minus"
                    isCircle={true}
                    onClick={() => pdf.view.scaleDown()}
                />
            </div>
            <div className="pdf-prev-container">
                <div className="pdf-preview-outer" data-is-loaded={Boolean(fixerProps)}>
                    {content}
                </div>
            </div>
        </>
    );
};
