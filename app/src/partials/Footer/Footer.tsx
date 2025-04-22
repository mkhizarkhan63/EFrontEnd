import { observer } from 'mobx-react';
import { lang } from '~/api';

export const Footer = observer(() => (
    <div className="footer">
        <div className="copyrights">
            {lang.dict.format('footerCopyrights', [String(new Date().getFullYear())])}
        </div>
        <div className="links">
            <a href="https://auth.ebinaa.com/TermsAndConditions" className="link">{lang.dict.get('footerTerms')}</a>
            <a href="https://blog.ebinaa.com/faqs/" target="_blank" className="link">
                {lang.dict.get('footerContactUs')}
            </a>
        </div>
    </div>
));
