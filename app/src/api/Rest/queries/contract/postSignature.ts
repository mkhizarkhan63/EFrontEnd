import moment from 'moment';
import { dtos, E, Id, Mobx, T } from '~/api';
import { Signature, type FileDataType, type Contract } from '~/models';
import { file } from '..';
import { enums } from '../..';

export const postSignature = async (contract: Contract, signatureFile: FileDataType) => {
    const signature = await file.add([signatureFile]);

    const external: dtos.contract.CreateContractSignatureCommand = {
        fileId: signature[0] ?? '',
        contractId: contract.id.asNumber(),
        subject: T.create(
            contract.subject,
            enums.ContractSubject.castToExternal,
        ),
    };

    const data = await dtos
        .contract
        .execCreateContractSignatureCommand(external);

    if (!data) {
        return;
    }

    const signatureField = () => {
        switch (contract.subject) {
            case E.ContractSubjects.client:
                return 'clientSignature';
            case E.ContractSubjects.contractor:
                return 'contractorSignature';
            case E.ContractSubjects.consultant:
            default:
                return 'consultantSignature';
        }
    };

    // Add signature to contract without reload
    Mobx.extendsObservable(contract, {
        [signatureField()]: Mobx.extendsObservable(new Signature(), {
            id: Id.init(data.id, 'external'),
            fileId: external.fileId,
            contractId: contract.id,
            createdDate: moment(),
            subject: contract.subject,
        }),
    });

    return Id.init(data.id, 'external');
};
