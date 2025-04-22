import { E, } from '~/api';
import { EngineeringServicesBlock } from '~/bits';
import { CompanyProfileVm } from '~/views/CompanyProfile/CompanyProfile.vm';
import { describe, it, mount, cy } from '~cypress';

type Service = {
    icon?: string;
    name?: string;
};

type Product = {
    icon?: string;
    name?: string;
    price?: number;
};

describe('bits/EngineeringServicesBlock', () => {
    it('should display and toggle prices', () => {
        const profile = new CompanyProfileVm(E.RoleInCompany.consultant);

        const services: Service[] = [
            { name: 'serv1', icon: 'serv11' },
            { name: 'serv2', icon: 'serv22' },
            { name: 'serv3', icon: 'serv33' },
            { name: 'serv4', icon: 'serv44' },
        ];

        const products: Product[] = [
            { name: 'prod1', icon: 'prod11', price: 200 },
            { name: 'prod2', icon: 'prod22', price: 300 },
            { name: 'prod3', icon: 'prod33', price: 400 },
            { name: 'prod4', icon: 'prod44', price: 500 },
        ];

        mount(() => (
            <EngineeringServicesBlock
                services={services}
                products={products}
                isShowingPrices={profile.isShowingPrices}
                toggleShowPrices={profile.toggleShowPrices}
                servicesPrice={1000}
                supervisionPrice={2000}
            />
        ));

        cy.get('.services__item-price').should('not.exist');
        cy.get('.services__item').should('have.length', 9);
        cy.get('img').should('have.length', 9);

        cy.get('.services__item').eq(2).should('contain', 'serv3');
        cy.get('.services__item').eq(6).should('contain', 'prod3');

        cy.contains('View Prices').click();
        cy.get('.services__item-price').should('exist');
        cy.contains('Hide Prices').should('exist');
    });
});