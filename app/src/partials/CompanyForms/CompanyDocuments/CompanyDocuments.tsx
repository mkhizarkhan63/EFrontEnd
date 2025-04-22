import { observer } from 'mobx-react';
import type { ReactElement } from 'react';
import { lang, type ErrorListHolder } from '~/api';
import { Button, Input, Uploader } from '~/bits';
import type { CompanyType } from '~/models';
import { hook, preventDefault } from '~/utils';
import { CompanyDocumentsVm } from './CompanyDocuments.vm';

type Props = {
    company: CompanyType;
    buttons: ReactElement;
    errorListHolder: ErrorListHolder;
    submitAction?: () => void;
};

const TextAreaName = observer(() => (
    <p className="form__textarea-name">
        {lang.dict.get('commentsEbinaAdmin')}
    </p>
));

export const CompanyDocuments = observer((props: Props) => {
    const {
        company,
        buttons,
        errorListHolder,
        submitAction,
    } = props;

    const vm = hook.useVm(() => new CompanyDocumentsVm(company, errorListHolder));

    hook.useAutoFocus();

    return (
        <div className="company-forms company-forms--documents">
            <form
                onSubmit={preventDefault(submitAction)}
                className="form"
            >
                <h2 className="form__header">
                    {lang.dict.get('documents')}
                </h2>
                <div className='certificates-header'>
                    <h3 className='title'>{lang.dict.get('crCertificates')}</h3>
                    <Button color='white' isCircle={true} centerImg='add' />
                </div>
                <div className='certificates-section'>
                    <h3 className='title'>{lang.dict.get('crCertificates')}</h3>
                    <div className='CrNumber'>
                        <Input.Text
                            placeHolder={lang.dict.get('fieldCompanyCrNumber')}
                            name={lang.dict.get('crNumber')}
                        />
                    </div>

                    <div className="input-container">
                        <Input.Text
                            placeHolder={lang.dict.get('fieldWriteDate')}
                            name={lang.dict.get('crStartDate')}
                        />
                        <Input.Text
                            placeHolder={lang.dict.get('fieldWriteDate')}
                            name={lang.dict.get('crExpirationDate')}
                        />
                        <div className="uploader-item">
                            <p className="uploader-item-header">
                                {lang.dict.get('uploadCRCertificate')}
                            </p>
                            <Uploader
                                description={lang.dict.get('fieldDragDropUploaderPlaceholder')}
                                acceptExtensions={['image/*', 'application/pdf']}
                                fileList={vm.getFiles('crCertificate')}
                                onUpload={file => company.addFiles('crCertificate', file)}
                                onRemove={company.removeFiles}
                                canDelete={true}
                                canDownloadAll={true}
                                isWithName={true}
                            />
                        </div>
                        <div className="uploader-item">
                            <p className="uploader-item-header">
                                {lang.dict.get('uploadManpowerCertificate')}
                            </p>
                            <Uploader
                                description={lang.dict.get('fieldDragDropUploaderPlaceholder')}
                                acceptExtensions={['image/*', 'application/pdf']}
                                fileList={vm.getFiles('manpowerReportIssued')}
                                onUpload={file => company.addFiles('manpowerReportIssued', file)}
                                onRemove={company.removeFiles}
                                canDelete={true}
                                canDownloadAll={true}
                                isWithName={true}
                            />
                        </div>
                    </div>

                </div>

                <div className='financial-legal-section'>
                    <h3 className='title'>{lang.dict.get('financialAndLegal')}</h3>
                    <div className="input-container">
                        <div className="uploader-item">
                            <p className="uploader-item-header">
                                {lang.dict.get('uploadOwnerNationalId')}
                            </p>
                            <Uploader
                                description={lang.dict.get('fieldDragDropUploaderPlaceholder')}
                                acceptExtensions={['image/*', 'application/pdf']}
                                fileList={vm.getFiles('ownerNationalId')}
                                onUpload={file => company.addFiles('ownerNationalId', file)}
                                onRemove={company.removeFiles}
                                canDelete={true}
                                canDownloadAll={true}
                                isWithName={true}
                            />
                        </div>
                        <div className="uploader-item">
                            <p className="uploader-item-header">
                                {lang.dict.get('uploadMalaCreditReport')}
                            </p>
                            <Uploader
                                description={lang.dict.get('fieldDragDropUploaderPlaceholder')}
                                acceptExtensions={['image/*', 'application/pdf']}
                                fileList={vm.malaCreditFile}
                                onUpload={vm.uploadMalaCreditFile}
                                onRemove={vm.removingMalaCreditFile}
                                canDelete={true}
                                canDownloadAll={true}
                                isWithName={true}
                            />
                        </div>
                    </div>
                    <div className="uploader-item">
                        <p className="uploader-item-header">
                            {lang.dict.get('uploadTaxCertificate')}

                        </p>
                        <Uploader
                            description={lang.dict.get('fieldDragDropUploaderPlaceholder')}
                            acceptExtensions={['image/*', 'application/pdf']}
                            fileList={vm.taxCertificateFile}
                            onUpload={vm.uploadTaxCertificateFile}
                            onRemove={vm.removingTaxCertificateFile}
                            canDelete={true}
                            canDownloadAll={true}
                            isWithName={true}
                        />
                    </div>
                </div>


                <div className='marketing-section'>
                    <h3 className='title'>{lang.dict.get('marketing')}</h3>
                    <div className="input-container">
                        <div className="uploader-item">
                            <p className="uploader-item-header">
                                {lang.dict.get('uploadCompanyProfiles')}
                                <span className="form__optional-text">
                                    {lang.dict.get('fieldOptional')}
                                </span>
                            </p>
                            <Uploader
                                description={lang.dict.get('fieldDragDropUploaderPlaceholder')}
                                acceptExtensions={['image/*', 'application/pdf']}
                                fileList={vm.getFiles('companyProfile')}
                                onUpload={file => company.addFiles('companyProfile', file)}
                                onRemove={company.removeFiles}
                                canDelete={true}
                                canDownloadAll={true}
                                isWithName={true}
                            />
                        </div>
                        <div className="uploader-item">
                            <p className="uploader-item-header">
                                {lang.dict.get('uploadOtherFiles')}
                                <span className="form__optional-text">
                                    {lang.dict.get('fieldOptional')}
                                </span>
                            </p>
                            <Uploader
                                description={lang.dict.get('fieldDragDropUploaderPlaceholder')}
                                acceptExtensions={['image/*', 'application/pdf']}
                                fileList={vm.getFiles('otherFiles')}
                                onUpload={file => company.addFiles('otherFiles', file)}
                                onRemove={company.removeFiles}
                                canDelete={true}
                                canDownloadAll={true}
                                isWithName={true}
                            />
                        </div>
                    </div>
                </div>

                <div className='comment-section'>
                    <Input.Textarea
                        name={<TextAreaName />}
                        placeHolder={lang.dict.get('fieldWriteComment')}
                        value={company.additionalInformation}
                        onChange={company.setAdditionalInformation}
                    />
                </div>


            </form>
            <div className='documents-footer-content'>
                <p>{lang.dict.get('documentContent')}</p>
            </div>
            <div className="form__btns">
                {buttons}
            </div>
        </div>
    );
});
