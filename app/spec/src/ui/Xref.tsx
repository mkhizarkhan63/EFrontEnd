import { describe, it, mount, cy } from '~cypress';
import { xRef } from '~/utils';

type Props = xRef.Props<(
    | 'button'
    | `div.${number}`
), {
    btnText: string;
    divTexts: string[];
}>;

const MyComponent = (props: Props) => {
    const bindRef = xRef.binder(props);

    const divs = props.divTexts.map((text, i) => <div key={`${text}-${i}`} ref={bindRef(`div.${i}`)}>{text}</div>);

    return (
        <>
            <button ref={bindRef('button')}>{props.btnText}</button>
            {divs}
        </>
    );
};

describe('api/Xref', () => {
    it('xref have to bind valid elements', () => {
        const xref = xRef.connect(MyComponent);

        const btnText = 'button here xd';

        mount(() => (
            <MyComponent
                {...xref.props}
                btnText={btnText}
                divTexts={['a', 'b', 'c']}
            />
        ));

        cy.getRef(xref, 'button').should('contain.text', btnText);
        cy.getRef(xref, 'div.0').should('contain.text', 'a');
        cy.getRef(xref, 'div.1').should('contain.text', 'b');
        cy.getRef(xref, 'div.2').should('contain.text', 'c');
    });
});
