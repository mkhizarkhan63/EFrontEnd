import { BadgesType } from "~/api/Enums/BadgesType";
import { Paging } from "~/api/Paging";
import { BadgesListDTO } from "~/api/Rest/dtos/badges.dtos";

export type BadgesList = BadgesListDTO;

export const getListedBadges = async (searchValue: string, paging?: Paging) => {
    const data = [
        {
            id: 1,
            badgeLogoId: "",
            iconUrl: "https://ebinaa-api.rccloud.app/file/getfilerequest/ae00035591fb434f9a705fd1cca431e6?imageSize=0",
            badgeName: "Test",
            dateissued: "20/10/2024",
            type: "people",
            service: "construction",
            applied: 5000,
            awarded: 3000,
            status: BadgesType.live
        },
        {
            id: 2,
            badgeLogoId: "",
            iconUrl: "https://ebinaa-api.rccloud.app/file/getfilerequest/ae00035591fb434f9a705fd1cca431e6?imageSize=0",
            badgeName: "Test",
            dateissued: "20/10/2024",
            type: "people",
            service: "construction",
            applied: 5000,
            awarded: 3000,
            status: BadgesType.suspended
        }

    ];
    if (!data) {
        return [];
    }


    // Implementing a simple pagination
    const pageSize = paging?.pageSize || 18;
    const start = (paging?.page || 0) * pageSize;
    const end = start + pageSize;

    return data.slice(start, end); // Return only the projects for the requested page
};