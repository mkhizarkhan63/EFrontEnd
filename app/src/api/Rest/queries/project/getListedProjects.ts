import { dtos, models, type Paging } from '~/api';
import { ListedProjectStatus } from '~/api/Enums';

type RoomType = {
    roomType: number;
    amount: number;
};

type FloorType = {
    floorType: number;
    level: number;
    area: number;
    rooms: RoomType[];
};

export type ProjectType = {
    projectName: string,
    companyName: string,
    projectId: string,
    likes: number,
    visits: number,
    purchases: number,
    publishedOn: string,
    status: ListedProjectStatus,
    price: number;
    municipalityFees: number;
    advancePayment: number;
    finalPayment: number;
    currencyType: number;
    approverId: number;
    architectId: number;
    companyId: number;
    totalBuiltUpArea: number;
    structurePrice: number;
    finishesPrice: number;
    estimatedConstructionPrice: number;
    quality: number;
    titleEn: string;
    titleAr: string;
    deliveryIn: number;
    minimumLandWidth: number;
    minimumLandLength: number;
    unitType: number;
    floors: FloorType[];
    imagesIds: string[];
    numberOfBedrooms: number;
    numberOfToilets: number;
    id: number;
    liked: boolean;
    picturesMainIds: string[];
    picturesExteriorIds: string[];
    picturesInteriorIds: string[];
    picturesLandscapeIds: string[];
    picturesLayoutsIds: string[];
    youtubeLink: string;
    featuresEn: string[];
    featuresAr: string[];
    requiredLandSize: number;
    landType: number;
    inspirationDescriptionEn: string;
    inspirationDescriptionAr: string;
    descriptionEn: string;
    descriptionAr: string;
    sowTemplateId: number;
    stageTemplateId: number;
    isLiked: boolean;
};
export const getListedProjects = async (paging?: Paging) => {
    const allProjects = [
        {
            publishedOn: '22/11/2021',
            likes: 4,
            visits: 24,
            purchases: 32,
            projectName: 'Nizwa',
            companyName: 'xyz',
            projectId: '1E23s',
            status: ListedProjectStatus.draft,
            price: 1200,
            municipalityFees: 300,
            advancePayment: 500,
            finalPayment: 1000,
            currencyType: 1,
            approverId: 0,
            architectId: 265,
            companyId: 72,
            totalBuiltUpArea: 457,
            structurePrice: 54780,
            finishesPrice: 36220,
            estimatedConstructionPrice: 91000,
            quality: 2,
            titleEn: "The Lift",
            titleAr: "المصعد",
            deliveryIn: 12,
            minimumLandWidth: 20,
            minimumLandLength: 30,
            unitType: 1,
            floors: [
                {
                    floorType: 3,
                    level: 2,
                    area: 95,
                    rooms: [
                        { roomType: 14, amount: 1 },
                        { roomType: 23, amount: 1 },
                        { roomType: 8, amount: 3 },
                        { roomType: 4, amount: 1 },
                        { roomType: 2, amount: 1 }
                    ]
                },
                {
                    floorType: 3,
                    level: 1,
                    area: 162,
                    rooms: [
                        { roomType: 20, amount: 1 },
                        { roomType: 3, amount: 1 },
                        { roomType: 8, amount: 3 },
                        { roomType: 2, amount: 2 },
                        { roomType: 1, amount: 1 }
                    ]
                },
                {
                    floorType: 2,
                    level: 0,
                    area: 200,
                    rooms: [
                        { roomType: 9, amount: 1 },
                        { roomType: 31, amount: 1 },
                        { roomType: 8, amount: 2 },
                        { roomType: 19, amount: 1 },
                        { roomType: 18, amount: 1 },
                        { roomType: 7, amount: 1 },
                        { roomType: 5, amount: 1 },
                        { roomType: 3, amount: 1 }
                    ]
                }
            ],
            imagesIds: [
                "ca6de3ed85d14988955cb73c168bddd9",
                "22301c95cac645df974042fc29e3c96d"
            ],
            numberOfBedrooms: 3,
            numberOfToilets: 8,
            id: 52,
            liked: false,
            picturesMainIds: [
                "ca6de3ed85d14988955cb73c168bddd9",
                "22301c95cac645df974042fc29e3c96d"
            ],
            picturesExteriorIds: [
                "92e92d4b424a47139af956702f175d59",
                "6b2fbaffeca44512af90781d55f61772",
                "3b5a6fc6c7464c89a55cf11163bb33fb",
                "eda681cbc3c94f688ae3d2fb4ed6e610",
                "099075ed26b04110bbc48d1578e22d94"
            ],
            picturesInteriorIds: [
                "25ed2f01eda84cebb912f973d9f5338c",
                "a9500916b1d2499baed9677bf04b690a"
            ],
            picturesLandscapeIds: [],
            picturesLayoutsIds: [
                "4dfc96eb31a24da599101ef6d5457de4",
                "46007231024b4737b5fe9d1f060919db",
                "993ec95c86e34af4bb1d091730d25931",
                "a7a968f5be3f464cbcd4e001d8ebcd4a"
            ],
            youtubeLink: "",
            featuresEn: [
                "Smart LED Light",
                "Security System",
                "Insulated Walls",
                "Customize interior",
                "Provision for lifts"
            ],
            featuresAr: [
                "إضاءة LED ذكية",
                "نظام أمان",
                "جدران معزولة",
                "تخصيص التصميم الداخلي",
                "توفير المصاعد"
            ],
            requiredLandSize: 600,
            landType: 1,
            inspirationDescriptionEn: "",
            inspirationDescriptionAr: "",
            descriptionEn: "This Twin Villa is designed with 3 halls on every level connected with a lift to host formal, informal and intimate seating spaces. Open and closed kitchen provide the diversity required for family needs",
            descriptionAr: "تم تصميم هذه الفيلا توين بثلاث قاعات على كل مستوى متصلة بمصعد لاستضافة أماكن جلوس رسمية وغير رسمية وحميمة. المطبخ المفتوح والمغلق يوفر التنوع المطلوب لاحتياجات الأسرة",
            sowTemplateId: 51,
            stageTemplateId: 56,
            isLiked: false
        },
        {
            publishedOn: '22/11/2021',
            likes: 4,
            visits: 24,
            purchases: 32,
            projectName: 'Nizwa 2',
            companyName: 'xyz 1',
            projectId: '32412-xsda',
            status: ListedProjectStatus.published,
            price: 1200,
            municipalityFees: 300,
            advancePayment: 500,
            finalPayment: 1000,
            currencyType: 1,
            approverId: 0,
            architectId: 265,
            companyId: 72,
            totalBuiltUpArea: 457,
            structurePrice: 54780,
            finishesPrice: 36220,
            estimatedConstructionPrice: 91000,
            quality: 2,
            titleEn: "The Lift",
            titleAr: "المصعد",
            deliveryIn: 12,
            minimumLandWidth: 20,
            minimumLandLength: 30,
            unitType: 1,
            floors: [
                {
                    floorType: 3,
                    level: 2,
                    area: 95,
                    rooms: [
                        { roomType: 14, amount: 1 },
                        { roomType: 23, amount: 1 },
                        { roomType: 8, amount: 3 },
                        { roomType: 4, amount: 1 },
                        { roomType: 2, amount: 1 }
                    ]
                },
                {
                    floorType: 3,
                    level: 1,
                    area: 162,
                    rooms: [
                        { roomType: 20, amount: 1 },
                        { roomType: 3, amount: 1 },
                        { roomType: 8, amount: 3 },
                        { roomType: 2, amount: 2 },
                        { roomType: 1, amount: 1 }
                    ]
                },
                {
                    floorType: 2,
                    level: 0,
                    area: 200,
                    rooms: [
                        { roomType: 9, amount: 1 },
                        { roomType: 31, amount: 1 },
                        { roomType: 8, amount: 2 },
                        { roomType: 19, amount: 1 },
                        { roomType: 18, amount: 1 },
                        { roomType: 7, amount: 1 },
                        { roomType: 5, amount: 1 },
                        { roomType: 3, amount: 1 }
                    ]
                }
            ],
            imagesIds: [
                "ca6de3ed85d14988955cb73c168bddd9",
                "22301c95cac645df974042fc29e3c96d"
            ],
            numberOfBedrooms: 3,
            numberOfToilets: 8,
            id: 2,
            liked: false,
            picturesMainIds: [
                "ca6de3ed85d14988955cb73c168bddd9",
                "22301c95cac645df974042fc29e3c96d"
            ],
            picturesExteriorIds: [
                "92e92d4b424a47139af956702f175d59",
                "6b2fbaffeca44512af90781d55f61772",
                "3b5a6fc6c7464c89a55cf11163bb33fb",
                "eda681cbc3c94f688ae3d2fb4ed6e610",
                "099075ed26b04110bbc48d1578e22d94"
            ],
            picturesInteriorIds: [
                "25ed2f01eda84cebb912f973d9f5338c",
                "a9500916b1d2499baed9677bf04b690a"
            ],
            picturesLandscapeIds: [],
            picturesLayoutsIds: [
                "4dfc96eb31a24da599101ef6d5457de4",
                "46007231024b4737b5fe9d1f060919db",
                "993ec95c86e34af4bb1d091730d25931",
                "a7a968f5be3f464cbcd4e001d8ebcd4a"
            ],
            youtubeLink: "",
            featuresEn: [
                "Smart LED Light",
                "Security System",
                "Insulated Walls",
                "Customize interior",
                "Provision for lifts"
            ],
            featuresAr: [
                "إضاءة LED ذكية",
                "نظام أمان",
                "جدران معزولة",
                "تخصيص التصميم الداخلي",
                "توفير المصاعد"
            ],
            requiredLandSize: 600,
            landType: 1,
            inspirationDescriptionEn: "",
            inspirationDescriptionAr: "",
            descriptionEn: "This Twin Villa is designed with 3 halls on every level connected with a lift to host formal, informal and intimate seating spaces. Open and closed kitchen provide the diversity required for family needs",
            descriptionAr: "تم تصميم هذه الفيلا توين بثلاث قاعات على كل مستوى متصلة بمصعد لاستضافة أماكن جلوس رسمية وغير رسمية وحميمة. المطبخ المفتوح والمغلق يوفر التنوع المطلوب لاحتياجات الأسرة",
            sowTemplateId: 51,
            stageTemplateId: 56,
            isLiked: false
        }
        ,
        {
            publishedOn: '22/11/2021',
            likes: 4,
            visits: 24,
            purchases: 32,
            projectName: 'Nizwa 2',
            companyName: 'xyz 1',
            projectId: '32412-xsda',
            status: ListedProjectStatus.archived,
            price: 1200,
            municipalityFees: 300,
            advancePayment: 500,
            finalPayment: 1000,
            currencyType: 1,
            approverId: 0,
            architectId: 265,
            companyId: 72,
            totalBuiltUpArea: 457,
            structurePrice: 54780,
            finishesPrice: 36220,
            estimatedConstructionPrice: 91000,
            quality: 2,
            titleEn: "The Lift",
            titleAr: "المصعد",
            deliveryIn: 12,
            minimumLandWidth: 20,
            minimumLandLength: 30,
            unitType: 1,
            floors: [
                {
                    floorType: 3,
                    level: 2,
                    area: 95,
                    rooms: [
                        { roomType: 14, amount: 1 },
                        { roomType: 23, amount: 1 },
                        { roomType: 8, amount: 3 },
                        { roomType: 4, amount: 1 },
                        { roomType: 2, amount: 1 }
                    ]
                },
                {
                    floorType: 3,
                    level: 1,
                    area: 162,
                    rooms: [
                        { roomType: 20, amount: 1 },
                        { roomType: 3, amount: 1 },
                        { roomType: 8, amount: 3 },
                        { roomType: 2, amount: 2 },
                        { roomType: 1, amount: 1 }
                    ]
                },
                {
                    floorType: 2,
                    level: 0,
                    area: 200,
                    rooms: [
                        { roomType: 9, amount: 1 },
                        { roomType: 31, amount: 1 },
                        { roomType: 8, amount: 2 },
                        { roomType: 19, amount: 1 },
                        { roomType: 18, amount: 1 },
                        { roomType: 7, amount: 1 },
                        { roomType: 5, amount: 1 },
                        { roomType: 3, amount: 1 }
                    ]
                }
            ],
            imagesIds: [
                "ca6de3ed85d14988955cb73c168bddd9",
                "22301c95cac645df974042fc29e3c96d"
            ],
            numberOfBedrooms: 3,
            numberOfToilets: 8,
            id: 2,
            liked: false,
            picturesMainIds: [
                "ca6de3ed85d14988955cb73c168bddd9",
                "22301c95cac645df974042fc29e3c96d"
            ],
            picturesExteriorIds: [
                "92e92d4b424a47139af956702f175d59",
                "6b2fbaffeca44512af90781d55f61772",
                "3b5a6fc6c7464c89a55cf11163bb33fb",
                "eda681cbc3c94f688ae3d2fb4ed6e610",
                "099075ed26b04110bbc48d1578e22d94"
            ],
            picturesInteriorIds: [
                "25ed2f01eda84cebb912f973d9f5338c",
                "a9500916b1d2499baed9677bf04b690a"
            ],
            picturesLandscapeIds: [],
            picturesLayoutsIds: [
                "4dfc96eb31a24da599101ef6d5457de4",
                "46007231024b4737b5fe9d1f060919db",
                "993ec95c86e34af4bb1d091730d25931",
                "a7a968f5be3f464cbcd4e001d8ebcd4a"
            ],
            youtubeLink: "",
            featuresEn: [
                "Smart LED Light",
                "Security System",
                "Insulated Walls",
                "Customize interior",
                "Provision for lifts"
            ],
            featuresAr: [
                "إضاءة LED ذكية",
                "نظام أمان",
                "جدران معزولة",
                "تخصيص التصميم الداخلي",
                "توفير المصاعد"
            ],
            requiredLandSize: 600,
            landType: 1,
            inspirationDescriptionEn: "",
            inspirationDescriptionAr: "",
            descriptionEn: "This Twin Villa is designed with 3 halls on every level connected with a lift to host formal, informal and intimate seating spaces. Open and closed kitchen provide the diversity required for family needs",
            descriptionAr: "تم تصميم هذه الفيلا توين بثلاث قاعات على كل مستوى متصلة بمصعد لاستضافة أماكن جلوس رسمية وغير رسمية وحميمة. المطبخ المفتوح والمغلق يوفر التنوع المطلوب لاحتياجات الأسرة",
            sowTemplateId: 51,
            stageTemplateId: 56,
            isLiked: false
        }
    ];

    // Implementing a simple pagination
    const pageSize = paging?.pageSize || 18;
    const start = (paging?.page || 0) * pageSize;
    const end = start + pageSize;

    return allProjects.slice(start, end); // Return only the projects for the requested page
};
