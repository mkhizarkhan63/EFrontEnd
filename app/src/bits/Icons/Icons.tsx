export type IconName = typeof ICONS[number]['name'];

type Props<T extends IconName> = {
    icon: T;
    remove?: () => void;
    isDisable?: boolean;
};

const ICONS = [
    {
        name: 'example-icon',
        description: '',
        url: 'https://upload.wikimedia.org/wikipedia/commons/e/e6/Home_Icon.svg',
    },
    {
        name: 'architecturalDesign',
        description: '',
        url: '/assets/graphics/architectural_design.svg'
    },
    {
        name: 'exteriorDesign',
        description: '',
        url: '/assets/graphics/exterior_design.svg'
    },
    {
        name: 'mepDesign',
        description: '',
        url: '/assets/graphics/mep_design.svg'
    },
    {
        name: 'structuralDesign',
        description: '',
        url: '/assets/graphics/structural_design.svg'
    },
    {
        name: 'interiorDesign',
        description: '',
        url: '/assets/graphics/interior_design.svg'
    },
    {
        name: 'authorityApprovals',
        description: '',
        url: '/assets/graphics/authority_approvals.svg'
    },
    {
        name: 'quantitySurveying',
        description: '',
        url: '/assets/graphics/quantity_surveying.svg'
    },
    {
        name: 'landscapeDesign',
        description: '',
        url: '/assets/graphics/landscape_design.svg'
    },
    
    {
        name: 'return',
        description: '',
        url: '/assets/graphics/return.svg'

    },
    {
        name: 'next',
        description: '',
        url: '/assets/graphics/next_arrow.svg',
    },
    {
        name: 'back',
        description: '',
        url: '/assets/graphics/return.svg',
    },
    {
        name: 'add',
        description: '',
        url: '/assets/graphics/plus.svg',
    },
    {
        name: 'delete',
        description: '',
        url: '/assets/graphics/delete.svg',
    },
    {
        name: 'close',
        description: '',
        url: '/assets/graphics/close.svg',
    },
    {
        name: 'reviewing',
        description: 'Reviewing…',
        url: '/assets/graphics/status_reviewing.svg',
    },
    {
        name: 'bidding',
        description: 'Contractors are Bidding…',
        url: '/assets/graphics/status_bidding.svg',
    },
    {
        name: 'done',
        description: 'Choose Contractor',
        url: '/assets/graphics/status_done.svg',
    },
    {
        name: 'supplier',
        description: '',
        url: '/assets/graphics/supplier.svg',
    },
    {
        name: 'contractor',
        description: '',
        url: '/assets/graphics/contractor.svg',
    },
    {
        name: 'consultant',
        description: '',
        url: '/assets/graphics/consultant.svg',
    },
    {
        name: 'developer',
        description: '',
        url: '/assets/graphics/Developer.svg',
    },
    {
        name: 'architect',
        description: '',
        url: '/assets/graphics/Architect.svg',

    },
    {
        name: 'tick',
        description: '',
        url: '/assets/graphics/tick.svg',
    },
    {
        name: 'logout',
        description: '',
        url: '/assets/graphics/log_out.svg',
    },
    {
        name: 'next-sign',
        description: '',
        url: '/assets/graphics/next_sign.svg',
    },
    {
        name: 'instagram',
        description: '',
        url: '/assets/graphics/insta.svg',
    },
    {
        name: 'pinterest',
        description: '',
        url: '/assets/graphics/pinterest.svg',
    },
    {
        name: 'whatsapp',
        description: '',
        url: '/assets/graphics/whatsapp.svg',
    },
    {
        name: 'facebook',
        description: '',
        url: '/assets/graphics/facebook.svg',
    },
    {
        name: 'linkedIn',
        description: '',
        url: '/assets/graphics/linkedin.svg',
    },
    {
        name: 'behance',
        description: '',
        url: '/assets/graphics/behance.svg',
    },
    {
        name: 'other',
        description: '',
        url: '/assets/graphics/other.svg',
    },
    {
        name: 'twitter',
        description: '',
        url: '/assets/graphics/twitter.svg',
    },
    {
        name: 'dribbble',
        description: '',
        url: '/assets/graphics/dribbble.svg',
    },
    {
        name: 'houzz',
        description: '',
        url: '/assets/graphics/houzz.svg',
    },
    {
        name: 'tikTok',
        description: '',
        url: '/assets/graphics/tiktok.svg',
    },
    {
        name: 'location',
        description: '',
        url: '/assets/graphics/location.svg',
    },
    {
        name: 'email',
        description: '',
        url: '/assets/graphics/email.svg',
    },
    {
        name: 'phone',
        description: '',
        url: '/assets/graphics/phone_blue.svg',
    },
    {
        name: 'companyWebsite',
        description: '',
        url: '/assets/graphics/website.svg',
    },
    {
        name: 'star',
        description: '',
        url: '/assets/graphics/star.svg',
    },
    {
        name: 'edit',
        description: '',
        url: '/assets/graphics/edit.svg',
    },
    {
        name: 'arrow-right',
        description: '',
        url: '/assets/graphics/arrow_right.svg',
    },
    {
        name: 'tick-btn',
        description: '',
        url: '/assets/graphics/tick_btn.svg',
    },
    {
        name: 'document',
        description: '',
        url: '/assets/graphics/document.svg',
    },
    {
        name: 'download',
        description: '',
        url: '/assets/graphics/download.svg',
    },
    {
        name: 'dropdown',
        description: '',
        url: '/assets/graphics/dropdown.svg',
    },
    {
        name: 'dropdown-up',
        description: '',
        url: '/assets/graphics/dropdown-up.svg',
    },
    {
        name: 'copy',
        description: '',
        url: '/assets/graphics/copy1.svg',
    },
    {
        name: 'add-in-circle',
        description: '',
        url: '/assets/graphics/add_circle.svg',
    },
    {
        name: 'lock',
        description: '',
        url: '/assets/graphics/lock.svg',
    },
    {
        name: 'filter',
        description: '',
        url: '/assets/graphics/filter.svg',
    },
    {
        name: 'search',
        description: '',
        url: '/assets/graphics/search.svg',
    },
    {
        name: 'minus',
        description: '',
        url: '/assets/graphics/minus.svg',
    },
    {
        name: 'three-dots-vertical',
        description: '',
        url: '/assets/graphics/ellipsis_vertical.svg',
    },
    {
        name: 'task',
        description: '',
        url: '/assets/graphics/task.svg',
    },
    {
        name: 'note',
        description: '',
        url: '/assets/graphics/note.svg',
    },
    {
        name: 'send',
        description: '',
        url: '/assets/graphics/send.svg',
    },
    {
        name: 'home',
        description: '',
        url: '/assets/graphics/home.svg',
    },
    {
        name: 'brickwall',
        description: '',
        url: '/assets/graphics/brickwall.svg',
    },
    {
        name: 'project-in-design',
        description: '',
        url: '/assets/graphics/project_in_design.svg',
    },
    {
        name: 'value-in-OMR',
        description: '',
        url: '/assets/graphics/value_in_OMR.svg',
    },
    {
        name: 'consultant-navy',
        description: '',
        url: '/assets/graphics/consultant_navy.svg',
    },
    {
        name: 'contractor-navy',
        description: '',
        url: '/assets/graphics/contractor_navy.svg',
    },
    {
        name: 'gift-box',
        description: '',
        url: '/assets/graphics/gift-box.svg',
    },
    {
        name: 'badge',
        description: '',
        url: '/assets/graphics/badge.svg',
    },
    {
        name: 'grab',
        description: '',
        url: '/assets/graphics/grab.svg',
    },
    {
        name: 'three-dashes',
        description: '',
        url: '/assets/graphics/three_dashes.svg',
    },
    {
        name: 'settings',
        description: '',
        url: '/assets/graphics/settings.svg',
    },
    {
        name: 'upload-cloud',
        description: '',
        url: '/assets/graphics/upload_cloud.svg',
    },
    {
        name: 'download-bigger',
        description: '',
        url: '/assets/graphics/download_bigger.svg',
    },
    {
        name: 'comment',
        description: '',
        url: '/assets/graphics/comment.svg',
    },
    {
        name: 'list',
        description: '',
        url: '/assets/graphics/list.svg',
    },
    {
        name: 'tiles',
        description: '',
        url: '/assets/graphics/tiles.svg',
    },
    {
        name: 'done-icon',
        description: '',
        url: '/assets/graphics/done.svg',
    },
    {
        name: 'exclamation',
        description: '',
        url: '/assets/graphics/exclamation.svg',
    },
    {
        name: 'download-without-underscore',
        description: '',
        url: '/assets/graphics/download_without_underscore.svg',
    },
    {
        name: 'print',
        description: '',
        url: '/assets/graphics/print.svg',
    },
    {
        name: 'play',
        description: '',
        url: '/assets/graphics/play.svg',
    },
    {
        name: 'like',
        description: '',
        url: '/assets/graphics/like.svg',
    },
    {
        name: 'like-red',
        description: '',
        url: '/assets/graphics/like_red.svg',
    },
    {
        name: 'built-up-area',
        description: '',
        url: '/assets/graphics/built_up_area.svg',
    },
    {
        name: 'bedroom',
        description: '',
        url: '/assets/graphics/bedroom.svg',
    },
    {
        name: 'toilets',
        description: '',
        url: '/assets/graphics/toilets.svg',
    },
    {
        name: 'info',
        description: '',
        url: '/assets/graphics/info.svg',
    },
    {
        name: 'close-red',
        description: '',
        url: '/assets/graphics/close_red.svg',
    },
    {
        name: 'rejected',
        description: '',
        url: '/assets/graphics/rejected.svg',
    },
    {
        name: 'drawing',
        description: '',
        url: '/assets/graphics/drawing.svg',
    },
    {
        name: 'price',
        description: '',
        url: '/assets/graphics/price.svg',
    },
    {
        name: 'design-menu-icon',
        description: '',
        url: '/assets/graphics/design_menu_icon.svg',
    },
    {
        name: 'hamburger',
        description: '',
        url: '/assets/graphics/hamburger.svg',
    },
    {
        name: 'materials-menu-icon',
        description: '',
        url: '/assets/graphics/materials_menu_icon.svg',
    },
    {
        name: 'comment-menu-icon',
        description: '',
        url: '/assets/graphics/comment_menu_icon.svg',
    },
    {
        name: 'filter-blue',
        description: '',
        url: '/assets/graphics/filter_blue.svg',
    },
    {
        name: 'photos-icon',
        description: '',
        url: '/assets/graphics/photos_icon.svg',
    },
    {
        name: 'docs-icon',
        description: '',
        url: '/assets/graphics/docs_icon.svg',
    },
    {
        name: 'log-icon',
        description: '',
        url: '/assets/graphics/log_icon.svg',
    },
    {
        name: 'tools-icon',
        description: '',
        url: '/assets/graphics/tools_icon.svg',
    },
    {
        name: 'client-observations',
        description: '',
        url: '/assets/graphics/client_observations.svg',
    },
    {
        name: 'meetings',
        description: '',
        url: '/assets/graphics/meetings.svg',
    },
    {
        name: 'resolve-disputes',
        description: '',
        url: '/assets/graphics/resolve_disputes.svg',
    },
    {
        name: 'variation-orders',
        description: '',
        url: '/assets/graphics/variation_orders.svg',
    },
    {
        name: 'star-outline',
        description: '',
        url: '/assets/graphics/star_outline.svg',
    },
    {
        name: 'clock',
        description: '',
        url: '/assets/graphics/clock.svg',
    },
    {
        name: 'dashboard',
        description: '',
        url: '/assets/graphics/dashboard.svg',
    },
    {
        name: 'calendar',
        description: '',
        url: '/assets/graphics/calendar.svg',
    },
    {
        name: 'attachment',
        description: '',
        url: '/assets/graphics/attachment.svg',
    },
    {
        name: 'camera',
        description: '',
        url: '/assets/graphics/camera.svg',
    },
    {
        name: 'flag',
        description: '',
        url: '/assets/graphics/flag.svg',
    },
    {
        name: 'flag-red',
        description: '',
        url: '/assets/graphics/flag_red.svg',
    },
    {
        name: 'eye',
        description: '',
        url: '/assets/graphics/eye.svg',
    },
    {
        name: 'eye-hide',
        description: '',
        url: '/assets/graphics/eye_hide.svg',
    },
    {
        name: 'tick-white',
        description: '',
        url: '/assets/graphics/white_tick.svg',
    },
    {
        name: 'filter-type',
        description: '',
        url: '/assets/graphics/filter_type.svg',
    },
    {
        name: 'upload',
        description: '',
        url: '/assets/graphics/upload.svg',
    },
    {
        name: 'calculator',
        description: '',
        url: '/assets/graphics/calculator.svg',
    },
    {
        name: 'price-loan',
        description: '',
        url: '/assets/graphics/price_loan.svg',
    },
    {
        name: 'tick-gray',
        description: '',
        url: '/assets/graphics/grey_tick.svg',
    },
    {
        name: 'location-gray',
        description: '',
        url: '/assets/graphics/location_gray.svg',
    },
    {
        name: 'play-blue',
        description: '',
        url: '/assets/graphics/play_blue.svg',
    },
    {
        name: 'lowCost',
        description: '',
        url: '/assets/graphics/low_cost.svg',
    },
    {
        name: 'highEnd',
        description: '',
        url: '/assets/graphics/high_end.svg',
    },
    {
        name: 'standard',
        description: '',
        url: '/assets/graphics/standard.svg',
    },
    {
        name: 'request-meeting',
        description: '',
        url: '/assets/graphics/request_meeting.svg',
    },
    {
        name: 'view-profile',
        description: '',
        url: '/assets/graphics/view_profile.svg',
    },
    {
        name: 'view-projects',
        description: '',
        url: '/assets/graphics/view_projects.svg',
    },
    {
        name: 'register-company',
        description: '',
        url: '/assets/graphics/register_company.svg',
    },
    {
        name: 'built-up-area-2',
        description: '',
        url: '/assets/graphics/built_up_area_2.svg',
    },
    {
        name: 'standalone',
        description: '',
        url: '/assets/graphics/standalone.svg',
    },
] as const;

export const Icons = <T extends IconName>(props: Props<T>) => {
    if (props.isDisable) {
        return null;
    }

    const icon = ICONS.find(x => x.name === props.icon);

    if (!icon) {
        return null;
    }

    const description = icon.description ? <span>{icon.description}</span> : null;

    return (
        <div onClick={props.remove} className="icon-box">
            <svg className="icon-box__svg">
                <image className="icon-box__image" xlinkHref={icon.url} />
            </svg>
            {description}
        </div>
    );
};
