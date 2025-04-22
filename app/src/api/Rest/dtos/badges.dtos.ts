export class BadgesListDTO {
    public id?: number;
    public iconUrl?: string;
    public badgeName?: string;
    public badgeLogoId?: string;
    public dateissued?: string;
    public type?: string;
    public service?: string;
    public applied?: number;
    public awarded?: number;
    public status!: string;

    public constructor(init?: Partial<BadgesListDTO>) { (Object as any).assign(this, init); }
}