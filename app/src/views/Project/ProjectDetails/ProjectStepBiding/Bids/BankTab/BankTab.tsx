import { lang } from '~/api';
import { Button, Input } from '~/bits';

export const BankTab = () => (
    <div className="bank">
        <div className="bank__left">
            <p className="bank__title">{lang.dict.get('applyForLoan')}</p>
            <p className="bank__info">{lang.dict.get('loanInfo')}</p>
            <p className="bank__info">{lang.dict.get('loanInfo2')}</p>
            <form className="bank__form">
                <Input.Text
                    name={lang.dict.get('idNumber')}
                    value=""
                    onChange={() => { /* */ }}
                    placeHolder={lang.dict.get('idNumberPlaceholder')}
                />
                <Input.DateSelect
                    onChange={() => { /* */ }}
                    name={lang.dict.get('dateOfBirth')}
                    placeHolder="DD / MM / YYYY"
                />
                <div className="working-at">
                    <Input.Text
                        name={lang.dict.get('workingAt')}
                        value=""
                        onChange={() => { /* */ }}
                        placeHolder={lang.dict.get('enterCompanyName')}
                    />
                </div>
                <Input.Text
                    name={lang.dict.get('monthlySalary')}
                    value=""
                    onChange={() => { /* */ }}
                    placeHolder={lang.dict.get('inputPlaceholderNumber')}
                />
                <Input.Text
                    name={lang.dict.get('monthlyLoans')}
                    value=""
                    onChange={() => { /* */ }}
                    placeHolder={lang.dict.get('inputPlaceholderNumber')}
                />
                <div className="bank__form-btn">
                    <Button
                        color="blue"
                        value={lang.dict.get('goSubmit')}
                        rightImg="next"
                        onClick={() => { /* */ }}
                        isLoading={false}
                        isSubmit={true}
                    />
                </div>
            </form>
        </div>
        <div className="bank__right">
            <p className="bank__title">{lang.dict.get('leadingBanks')}</p>
            <div className="bank__list">
                <div className="bank__list-item">Oman Arab Bank</div>
                <div className="bank__list-item">Bank Muscat</div>
                <div className="bank__list-item">National Bank of Oman</div>
                <div className="bank__list-item">Oman Housing Bank</div>
                <div className="bank__list-item">Bank Nizwa</div>
                <div className="bank__list-item">Alizz Islamic Bank</div>
            </div>
        </div>
    </div>
);
