import { observer } from 'mobx-react';
import { E, lang } from '~/api';
import { Button, Switch, NoData } from '~/bits';
import type { FileDataType } from '~/models';
import { downloadFile } from '~/utils';
import type { CompanyDetailVm } from '../../CompanyDetail.vm';

const FILE_TYPES = [
    'crCertificate',
    'ownerNationalId',
    'manpowerReportIssued',
    'companyProfile',
    'otherFiles',
] as const;

type FileType = typeof FILE_TYPES[number];

type Props = {
    vm: CompanyDetailVm;
};

type FileProps = {
    file: FileDataType;
};

const File = observer((props: FileProps) => (
    <li className="file-list__item">
        <img
            className="file-list__item-icon"
            src="/assets/graphics/document.svg"
            alt="document"
        />
        <div className="file-list__item-text">
            <div className="file-list__item-name">{props.file.name}</div>
        </div>
        <div className="file-list__item-icons">
            <img
                className="file-list__item-download"
                src="/assets/graphics/download.svg"
                alt="download-icon"
                onClick={e => downloadFile(props.file, e)}
            />
        </div>
    </li>
));

export const CompanyDocuments = observer(({ vm }: Props) => {
    const getFiles = (type: FileType) => vm.company
        .getFiles(type)
        .map(item => (
            <File
                key={item.id}
                file={item}
            />
        ));

    return (
        <div className="company-detail-box company-detail-box--documents">
            <div className="company-detail-box__edit-btn">
                <Button
                    color="white"
                    isCircle={true}
                    centerImg="edit"
                    onClick={() => vm.openSection(E.CompanySteps.documents)}
                />
            </div>
            <p className="title">{lang.dict.get('documents')}</p>
            <Switch
                state={() => vm.hasDocuments}
                alt={() => <NoData />}
            >
                <div className="company-desc">
                    <p className="company-desc__title">{lang.dict.get('commentsAdditional')}</p>
                    <p className="company-desc__text">
                        {vm.company.additionalInformation}
                    </p>
                </div>
                <div className="company-documents">
                    <div className="company-documents__item">
                        <p className="company-documents__item-title">{lang.dict.get('crCertificate')}</p>
                        <ul className="file-list">
                            {getFiles('crCertificate')}
                        </ul>
                    </div>
                    <div className="company-documents__item">
                        <p className="company-documents__item-title">{lang.dict.get('ownerNational')}</p>
                        <ul className="file-list">
                            {getFiles('ownerNationalId')}
                        </ul>
                    </div>
                    <div className="company-documents__item">
                        <p className="company-documents__item-title">{lang.dict.get('manpower')}</p>
                        <ul className="file-list">
                            {getFiles('manpowerReportIssued')}
                        </ul>
                    </div>
                    <div className="company-documents__item">
                        <p className="company-documents__item-title">{lang.dict.get('pageCompanyProfile')}</p>
                        <ul className="file-list">
                            {getFiles('companyProfile')}
                        </ul>
                    </div>
                    <div className="company-documents__item">
                        <p className="company-documents__item-title">{lang.dict.get('otherFiles')}</p>
                        <ul className="file-list">
                            {getFiles('otherFiles')}
                        </ul>
                    </div>
                </div>
            </Switch>
        </div>
    );
});
