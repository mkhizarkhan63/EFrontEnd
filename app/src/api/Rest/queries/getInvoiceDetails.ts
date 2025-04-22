import { Actor, Company, FileData, InvoiceDetails } from '~/models';
import { dtos, enums } from '..';
import { Img, T } from '~/api';
import { stores } from '~/stores';

export const getInvoiceDetails = async (taskId: number) => {
    const response = await dtos.workflow.execGetInvoiceDetailsQuery({ taskId });

    if (!response) {
        return;
    }

    const res = response.result;

    const logo = await FileData.tryFromExternal(res.payee.companyLogoId);
    logo?.loadImg();

    return InvoiceDetails.create({
        description: res.description,
        projectValue: res.projectValue,
        stageValue: res.stageValue,
        subtotal: res.subtotal,
        taxPercentage: res.taxPercentage,
        taxTotal: res.taxTotal,
        grandTotal: res.grandTotal,
        projectId: res.projectId,
        invoiceId: res.invoiceId,
        dueDate: T.create(res.dueDate, T.Timestamp),
        invoiceDateIssued: T.create(res.invoiceDateIssued, T.Timestamp),
        payer: Actor.create({
            id: stores.idCollection.getInternal('actor', res.payer.profileId),
            name: res.payer.name,
            email: res.payer.email,
            phone: res.payer.phone,
            avatar: Img.tryCreate(res.payer.avatarId),
        }),
        payee: Company.create({
            id: stores.idCollection.getInternal('company', res.payee.id),
            name: res.payee.name,
            type: T.create(
                res.payee.companyType,
                enums.ProfileType.castToInternal,
            ),
            logo: logo,
        }),
        isRefund: res.penaltyDto.isRefundable,
        isPenalty: res.penaltyDto.isPenaltyAvailable,
        penaltySubtotal: res.penaltyDto.penaltySubtotal,
        refundSubtotal: res.penaltyDto.refundSubtotal,
    });
};
