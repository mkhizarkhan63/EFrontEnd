import { observer } from 'mobx-react';
import moment from 'moment';
import type { PropsWithChildren } from 'react';
import { lang, type Img } from '~/api';
import { Button, Icons, If, Stars, type IconName } from '~/bits';
import { toExternalUrl } from '~/utils/string';

type Props<Key extends string> = PropsWithChildren<{
    name: string;
    stars: {
        labels: Record<Key, string>;
        values: Array<{ key: Key; value: number }>;
    };
    contact?: Array<{
        name: 'email' | 'phone';
        data: string;
    }>;
    socialMedia?: Array<{
        name: IconName;
        url: string;
    }>;
    dateSince?: moment.Moment;
    avatar?: Img;
    estabilished?: string;
    headOffice?: string;
    isPublicProfile?: boolean;
    isArchitectListing?: boolean;
    architectListingEstablishedFormat?: string;
    isProfileSettings?: boolean;
}>;

export const ProfileCompany = observer(<Key extends string>(props: Props<Key>) => {
    const socialMedia = props.socialMedia?.map((item, index) => (
        <a
            href={toExternalUrl(item.url)}
            target="_blank"
            className="profile-details__social-item"
            key={`social-${item.name}-${index}`}
        >
            <Icons icon={item.name} />
        </a>
    ));

    return (
        <div className="profile-company">
            <div className="profile-company__top">
                <div className="profile-company__avatar">
                    <img src={props.avatar?.url ?? ''} />
                </div>
                <div className="profile-details">
                    <h2 className="profile-details__header">
                        {props.name}
                    </h2>
                    <div className="stars-container">
                        <Stars labels={props.stars.labels} values={props.stars.values} />
                        <If condition={() => Boolean(props.dateSince)}>
                            <span className="profile-details__since">
                                {lang.dict.get('companyProfileSince')}
                                &nbsp;
                                {moment(props.dateSince).format('YYYY')}
                            </span>
                        </If>
                        <If condition={Boolean(props.isArchitectListing)}>
                            <span className="profile-details__established">
                                {props.architectListingEstablishedFormat}
                            </span>
                        </If>
                    </div>
                    <If condition={() => Boolean(props.socialMedia) && Boolean(props.isProfileSettings)}>
                        <div className="profile-details__social">
                            {socialMedia}
                        </div>
                    </If>
                </div>
                <If condition={Boolean(props.isPublicProfile)}>
                    <div
                        data-liked={false}
                        className="profile-company__btn-like"
                    >
                        <Button
                            color="transparent"
                            centerImg="like"
                            value={lang.dict.get('like')}
                        />
                    </div>
                </If>
            </div>
            <If condition={!props.isArchitectListing}>
                <div className="profile-company__head">
                    <div className="profile-company__head-col">
                        <p className="profile-company__head-title">{lang.dict.get('headOffice')}</p>&nbsp;
                        <p className="profile-company__head-text">{props.headOffice}</p>
                    </div>
                    <div className="profile-company__head-col">
                        <p className="profile-company__head-title">{lang.dict.get('estabilished')}</p>&nbsp;
                        <p className="profile-company__head-text">{props.estabilished}</p>
                    </div>
                </div>
            </If>
            <If condition={() => Boolean(props.socialMedia) && Boolean(!props.isProfileSettings)}>
                <div className="profile-details__social">
                    {socialMedia}
                </div>
            </If>
            {props.children}
        </div>
    );
});
