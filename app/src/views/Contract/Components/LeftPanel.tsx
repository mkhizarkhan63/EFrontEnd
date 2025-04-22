import { observer } from 'mobx-react';
import { lang, pdfs } from '~/api';
import { Button, If } from '~/bits';
import type { ContractVm } from '../Contract.vm';

type Props = {
    vm: ContractVm;
};

const Titles = observer(() => {
    const pdf = pdfs.get('contract');

    const titleItem = pdf.toc.map((item, index) => (
        <li
            key={`${item.title}-${index}`}
            className="left-panel__list-item"
            data-is-active={index === pdf.topVisibleSection}
            data-pdf-thumbnail-index={item.page}
            onClick={() => pdf.jumpToSection(index)}
        >
            <span className="left-panel__list-item-title">
                {item.title}
            </span>
            <span className="left-panel__list-item-num">
                {item.page}
            </span>
        </li>
    ));

    return <ol className="left-panel__list">{titleItem}</ol>;
});

// const Thumbnails = observer(() => {
//     const pdf = pdfs.get('contract');

//     if (pdf.isThumbnailsLoading) {
//         return <p className="left-panel__loading">Loading...</p>;
//     }

//     const titleItem = Array(pdf.countOfPages).fill(0).map((item, index) => (
//         <li
//             key={`${pdf.getThumbnail(index).url}-${index}`}
//             className="left-panel__thumbnails-item"
//             data-is-active={pdf.topVisible === index}
//             data-pdf-thumbnail-index={index}
//             onClick={() => pdf.jumpToPage(index)}
//         >
//             <img className="pdf-thumbnail" src={pdf.getThumbnail(index).url} alt="" />
//         </li>
//     ));
//     return <ol key="yes" className="left-panel__thumbnails">{titleItem}</ol>;
// });

export const LeftPanel = observer(({ vm }: Props) => (
    <div className="left-panel__content" data-tab={vm.activeTab}>
        <div className="left-panel__btns">
            <div className="left-panel__btns-scheme">
                {/* TODO: uncomment when thumbnails will be ready  */}
                {/* <div className="left-panel__btn" data-is-active={vm.activeTab === 'document'}>
                    <Button
                        color="transparent"
                        centerImg="tiles"
                        onClick={vm.onDocument}
                    />
                </div> */}
            </div>
            <Button
                color="blue"
                leftImg="print"
                value={lang.dict.get('printPdf')}
                onClick={vm.printPdf}
                isDisabled={!vm.contract.allSigned}
            />
        </div>
        {/* <If condition={() => vm.activeTab === 'document'} >
            <Thumbnails />
        </If> */}
        <If condition={() => vm.activeTab === 'titles'} >
            <Titles />
        </If>
    </div>
));
