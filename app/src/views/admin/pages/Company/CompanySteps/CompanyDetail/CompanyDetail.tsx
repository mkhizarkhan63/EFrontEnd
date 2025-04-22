import { observer } from 'mobx-react';
import { useEffect, useRef } from 'react';
import { E, lang } from '~/api';
import { Button, ErrorList, Switch } from '~/bits';
import type { CompanyType } from '~/models';
import { CompanyForms } from '~/partials';
import { hook } from '~/utils';
import { CompanyDetailVm } from './CompanyDetail.vm';
import {
    CompanyDocuments,
    CompanyHistory,
    CompanyProfile,
    CompanyReferences,
    CompanyResource,
    CompanyServices,
} from './Components';

type Props = {
    company: CompanyType;
    setCompany: (company: CompanyType) => void;
};

const isScrollable = ($el: HTMLElement) => {
    const hasScrollableContent = $el.scrollHeight > $el.clientHeight;

    const overflowYStyle = window.getComputedStyle($el).overflowY;

    const isOverflowHidden = overflowYStyle.includes('hidden');

    return hasScrollableContent && !isOverflowHidden;
};

const getScrollableParent = ($el: HTMLElement): HTMLElement => {
    if (!$el || $el === document.body) {
        return document.body;
    }

    if (isScrollable($el)) {
        return $el;
    }

    return getScrollableParent($el.parentNode as HTMLElement);
};

export const CompanyDetail = observer(({ company, setCompany }: Props) => {
    const vm = hook.useVm(() => new CompanyDetailVm(company), [company]);

    const formButtons = (
        <>
            <Button
                color="white"
                value={lang.dict.get('cancel')}
                onClick={vm.closeSection}
            />
            <Button
                color="green"
                value={lang.dict.get('save')}
                rightImg="next"
                onClick={() => vm.save(setCompany)}
                isLoading={vm.isLoading}
                isSubmit={true}
            />
        </>
    );

    const props = {
        company: vm.draft,
        contractor: vm.contractor,
        buttons: formButtons,
        errorListHolder: vm.errorListHolder,
        submitAction: () => vm.save(setCompany),
    };

    const parent = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (vm.initial) {
            vm.setInitail();
            return;
        }

        const childElement = parent.current
            ?.querySelector<HTMLElement>(`[data-section-name="${vm.previousSection}"]`);

        const documentSubheader = document.querySelector('.subheader');

        if (!childElement || !documentSubheader) {
            return;
        }

        const scrollParent = getScrollableParent(childElement);

        const x = childElement.getBoundingClientRect().top;
        const y = scrollParent.getBoundingClientRect().top;
        const z = documentSubheader.getBoundingClientRect().height;

        scrollParent.scrollTop += x - y - z;
    }, [vm.previousSection, vm.openedSection]);

    return (
        <div ref={parent} className="company-detail">
            <h2 className="company-detail__header">{lang.dict.get('companyDetail')}</h2>
            <div
                data-section-name={E.CompanySteps.companyInfo}
            >
                <Switch
                    state={() => vm.isOpened(E.CompanySteps.companyInfo)}
                    alt={() => <CompanyProfile vm={vm} />}
                >
                    <CompanyForms.CompanyProfile {...props} />
                </Switch>
            </div>
            <div
                data-section-name={E.CompanySteps.productsServices}
            >
                <Switch
                    state={() => vm.isOpened(E.CompanySteps.productsServices)}
                    alt={() => <CompanyServices vm={vm} />}
                >
                    <CompanyForms.CompanyServices {...props} />
                </Switch>
            </div>
            <div
                data-section-name={E.CompanySteps.companyHistory}
            >
                <Switch
                    state={() => vm.isOpened(E.CompanySteps.companyHistory)}
                    alt={() => <CompanyHistory vm={vm} />}
                >
                    <CompanyForms.CompanyHistory {...props} />
                </Switch>
            </div>
            <div
                data-section-name={E.CompanySteps.companyResource}
            >
                <Switch
                    state={() => vm.isOpened(E.CompanySteps.companyResource)}
                    alt={() => <CompanyResource vm={vm} />}
                >
                    <CompanyForms.CompanyResource {...props} />
                </Switch>
            </div>
            <div
                data-section-name={E.CompanySteps.companyMarketing}
            >
                <Switch
                    state={() => vm.isOpened(E.CompanySteps.companyMarketing)}
                    alt={() => <CompanyReferences vm={vm} />}
                >
                    <CompanyForms.CompanyMarketing {...props} />
                </Switch>
            </div>
            <div
                data-section-name={E.CompanySteps.documents}
            >
                <Switch
                    state={() => vm.isOpened(E.CompanySteps.documents)}
                    alt={() => <CompanyDocuments vm={vm} />}
                >
                    <CompanyForms.CompanyDocuments {...props} />
                </Switch>
            </div>
            <ErrorList errors={vm.errorListHolder} />
        </div>
    );
});
