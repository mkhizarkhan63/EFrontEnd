import { Img, T, dtos, enums } from '~/api';
import { Actor, BankDetails, ConsultantPayment, FileData, SiteVisit } from '~/models';

export const getConsultantPayment = async (consultantPaymentUserTaskId: number) => {
    const response = await dtos.workflow.execGetFullConsultantPaymentQuery({
        consultantPaymentUserTaskId,
    });

    if (!response) {
        return;
    }

    const { result } = response;

    return ConsultantPayment.create({
        id: result.id,
        generationDate: T.create(
            result.generationDate,
            T.Timestamp,
        ),
        forMonth: result.forMonth,
        forYear: result.forYear,
        numberOfVisits: result.numberOfVisits,
        taxPercentage: result.taxPercentage,
        taxValue: result.taxValue,
        subTotal: result.visitsPrice,
        pricePerVisit: result.pricePerVisit,
        grandTotalPrice: result.grandTotalPrice,
        status: T.create(
            result.status,
            enums.TaskStatus.castToInternal,
        ),
        dueDate: T.create(
            result.dueDate,
            T.Timestamp,
        ),
        isConfirmed: result.isConfirmed,
        siteVisitsInformation: toInternalSiteVisit(result.siteVisitsInformation),
        fileId: FileData.create({
            fileId: result.fileId,
        }),
        invoiceId: result.invoiceId,
        actor: Actor.create({
            id: result.actorDto.profileId,
            name: result.actorDto.name,
            email: result.actorDto.email,
            phone: result.actorDto.phone,
            avatar: Img.tryCreate(result.actorDto?.avatarId),
        }),
        consultantId: result.consultantId,
        projectId: result.forConstructionProjectId,
        delayInDays: result.delayInDays,
        consultantName: result.consultant.name,
        bankDetails: BankDetails.create({
            bankName: result?.bankDetailsDto.bankName,
            accountHolderName: result?.bankDetailsDto.accountHolderName,
            accountNumber: result?.bankDetailsDto.accountNumber,
        }),
        numberOfPossiblePenalties: result.numberOfPossiblePenalties,
        penaltySubtotal: result.penaltySubtotal,
    });
};

const toInternalSiteVisit = (siteVisits?: dtos.workflow.SiteVisitDto[]) => {
    if (!siteVisits || siteVisits.length === 0) {
        return [];
    }

    return siteVisits.map(item => SiteVisit.create({
        order: item.order,
        siteVisitDescription: item.siteVisitDescription,
        visitDate: T.tryCreate(
            item.visitDate,
            T.Timestamp,
        ),
        stageOrder: item.stageOrder,
        isDelay: item.inDelay,
        daysInDelay: item.totalDaysInDelay,
    }));
};
