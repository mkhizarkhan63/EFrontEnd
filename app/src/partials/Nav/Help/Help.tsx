import { observer } from 'mobx-react';
import { lang } from '~/api/Lang';
import { Close, Icons } from '~/bits';
import { helpViewModel } from './Help.vm';

const Section = observer((props: {
    title: string;
    content: string;
    index: number;
}) => (
    <div
        className="section"
        data-is-expanded={helpViewModel.openedIndices.includes(props.index)}
        onClick={helpViewModel.toggleAtIndex(props.index)}
    >
        <div className="section__title">
            {props.title}
        </div>
        <div className="section__content">
            {props.content}
        </div>
    </div>
));

export const Help = (props: {
    onClose: () => void;
}) => (
    <div className="help">
        <div className="top">
            <Close
                onClick={props.onClose}
            />
            <div className="top__title">
                {lang.dict.get('helpTitle')}
            </div>
        </div>
        <div className="help__main">
            <div className="help__sections">
                <Section
                    title={lang.dict.get('helpSectionKnowTitle')}
                    content={lang.dict.get('helpSectionKnowContent')}
                    index={0}
                />
                <Section
                    title={lang.dict.get('helpSectionFindTitle')}
                    content={lang.dict.get('helpSectionFindContent')}
                    index={1}
                />
                <Section
                    title={lang.dict.get('helpSectionPricesTitle')}
                    content={lang.dict.get('helpSectionPricesContent')}
                    index={2}
                />
                <Section
                    title={lang.dict.get('helpSectionSignTitle')}
                    content={lang.dict.get('helpSectionSignContent')}
                    index={3}
                />
                <Section
                    title={lang.dict.get('helpSectionAutomatedTitle')}
                    content={lang.dict.get('helpSectionAutomatedContent')}
                    index={4}
                />
                <Section
                    title={lang.dict.get('helpSectionSuccessTitle')}
                    content={lang.dict.get('helpSectionSuccessContent')}
                    index={5}
                />
                <Section
                    title={lang.dict.get('helpSectionComfortTitle')}
                    content={lang.dict.get('helpSectionComfortContent')}
                    index={6}
                />
                <Section
                    title={lang.dict.get('helpSectionOthersTitle')}
                    content={lang.dict.get('helpSectionOthersContent')}
                    index={7}
                />
            </div>
        </div>
        <div className="contact">
            <a href="tel:77553010" className="contact__phone-icon">
                <Icons icon="phone" />
            </a>
            <p className="contact__tip">
                {lang.dict.get('helpGetInTouch')}
            </p>
            <a href="tel:77553010" className="contact__number">
                {lang.dict.get('helpPhoneNumber')}
            </a>
        </div>
    </div>
);
