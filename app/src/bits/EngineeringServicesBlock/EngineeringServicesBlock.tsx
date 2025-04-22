import { observer } from 'mobx-react';
import { If } from '~/bits';
import { lang } from '~/api';

type Service = {
    icon?: string;
    name?: string;
};

type Product = {
    icon?: string;
    name?: string;
    price?: string;
};

type Props = {
    services: Service[];
    products: Product[];
    servicesPrice?: number;
    everyPrice?: number;
    everySize?: number;
    upTo?: number;
    supervisionPrice?: string;
    isProvidingSupervision: boolean;
    isProvidingDesign: boolean;
};

export const EngineeringServicesBlock = observer((props: Props) => {
    const servicesData = props.services
        .map((item, index) => (
            <div
                key={`service-${item.name}-${index}`}
                className="services__item"
            >
                <img src={item.icon} className="services__item-img" />
                <p className="services__item-title">{item.name}</p>
            </div>
        ));

    const productsData = props.products
        .map((item, index) => (
            <div
                key={`product-${item.name}-${index}`}
                className="services__item services__item--right"
            >
                <img src={item.icon} className="services__item-img" />
                <div className="services__item-text">
                    <p className="services__item-title">{item.name}</p>
                    <div className="services__item-price">
                        {item.price} {lang.dict.get('omrM2')}
                    </div>
                </div>
            </div>
        ));

    const designLength = props.isProvidingDesign
        ? props.products.length + props.services.length
        : 0;

    const servicesLength = props.isProvidingSupervision ? designLength + 1 : designLength;

    return (
        <div
            className="services"
            data-view-price={true}
        >
            <If condition={() => props.isProvidingDesign || props.isProvidingSupervision}>
                <div className="services__header">
                    <p className="services__title">
                        {lang.dict.get('engineeringServices')}
                        <span className="services__title-num">({servicesLength})</span>
                    </p>
                </div>
            </If>
            <div className="services__container">
                <If condition={() => props.isProvidingDesign}>
                    <div className="services__items">
                        {servicesData}
                        <div className="services__container-price">
                            {lang.dict.format('designUpToFormat', [props.upTo, props.servicesPrice])}
                        </div>
                        <p className="services__container-desc">
                            {lang.dict.format('designAdditionalFormat', [props.everySize, props.everyPrice])}
                        </p>
                    </div>
                </If>
                <div className="services__items services__items--right">
                    <If condition={() => props.isProvidingDesign}>
                        {productsData}
                    </If>
                    <If condition={Boolean(props.supervisionPrice && props.isProvidingSupervision)}>
                        <div className="services__item services__item--right">
                            <img
                                src="/assets/graphics/site_supervision.svg"
                                className="services__item-img services__item-img--auto"
                            />
                            <div className="services__item-text">
                                <p className="services__item-title">
                                    {lang.dict.get('siteSupervision')}
                                </p>
                                <div className="services__item-price">
                                    {props.supervisionPrice} {lang.dict.get('omrMonth')}
                                </div>
                            </div>
                        </div>
                    </If>
                </div>
            </div>
        </div>
    );
});
