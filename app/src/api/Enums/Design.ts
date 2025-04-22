export enum CurrencyType {
    none = 'none',
    omr = 'omr',
    usd = 'usd',
    eur = 'eur',
}

export enum FeatureType {
    none = 'none',
    pool = 'pool',
    rooftopSeating = 'rooftopSeating',
    gym = 'gym',
    office = 'office',
}

export enum QualityType {
    economical = 'economical',
    standard = 'standard',
    premium = 'premium',
}

export enum FloorType {
    none = 'none',
    basement = 'basement',
    ground = 'ground',
    floor = 'floor',
    penthouse = 'penthouse',
}

export enum RoomType {
    none = 'none',
    masterBedroom = 'masterBedroom',
    bedroom = 'bedroom',
    livingRoom = 'livingRoom',
    maidRoom = 'maidRoom',
    majilis = 'majilis',
    kitchen = 'kitchen',
    dining = 'dining',
    toilet = 'toilet',
    garage = 'garage',
    bathroom = 'bathroom',
    guestRoom = 'guestRoom',
    guestDining = 'guestDining',
    multiPurpose = 'multiPurpose',
    laundry = 'laundry',
    store = 'store',
    balconies = 'balconies',
    balcony = 'balcony',
    openKitchen = 'openKitchen',
    closedKitchen = 'closedKitchen',
    pantry = 'pantry',
    driverRoom = 'driverRoom',
    outdoorGrill = 'outdoorGrill',
    gym = 'gym',
    rooftopSeating = 'rooftopSeating',
    informalSeating = 'informalSeating',
    familySeating = 'familySeating',
    receptionHall = 'receptionHall',
    office = 'office',
    library = 'library',
    swimmingPool = 'swimmingPool',
    storage = 'storage',
}

export enum SlideType {
    exterior = 'exterior',
    interior = 'interior',
    landscape = 'landscape',
    layouts = 'layouts',
    epc = 'epc',
}

export enum DesignProjectStatus {
    noneDesign = 'noneDesign',
    adminReviewDesign = 'adminReviewDesign',
    consultantReviewDesign = 'consultantReviewDesign',
    advancePaymentDesign = 'advancePaymentDesign',
    uploadDrawingsDesign = 'uploadDrawingsDesign',
    finalPaymentDesign = 'finalPaymentDesign',
    finalReviewDesign = 'finalReviewDesign',
    completedDesign = 'completedDesign',
    rejectedDesign = 'rejectedDesign',
}

export enum AdminProjectView {
    none = 0,
    construction = 1,
    design = 2,
}

export enum DesignProjectTrigger {
    none = 'none',
    adminReview = 'adminReview',
    consultantReview = 'consultantReview',
    payment = 'payment',
    uploadDrawings = 'uploadDrawings',
    submitDrawings = 'submitDrawings',
    reject = 'reject',
    accept = 'accept',
}

export enum DesignListingMenu {
    designListings = 'designListings',
    architectListings = 'architectListings',
}
