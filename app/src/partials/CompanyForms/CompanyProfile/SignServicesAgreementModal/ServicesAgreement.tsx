import { observer } from 'mobx-react';
import { Env, lang } from '~/api';
import { SideModal, Close, Button } from '~/bits';
import { ProfileRegistrationVm } from '~/views/ProfileRegistration/ProfileRegistration.vm';
import { Signature } from './Components/Signature';
import { useEffect, useRef, useState } from 'react';
import { CheckoutSessionRequest, createCheckoutSession, retrieveCheckoutSession } from '~/api/Rest/queries/paymentIntegration/thawaniApi';

type Props = {
    profileVm: ProfileRegistrationVm
};

export const ServicesAgreement = observer(({ profileVm }: Props) => {
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);
    const modalContentRef = useRef<HTMLDivElement>(null);

    // Check if the user has scrolled to the bottom of the modal
    const handleScroll = () => {
        if (modalContentRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = modalContentRef.current;

            // Calculate a dynamic threshold (e.g., 90% of the total scrollable height)
            //const scrollThreshold = scrollHeight - clientHeight * 0.1;
          
            const final = scrollTop + clientHeight + 2;
            // console.log("final" , final)
            // console.log("scrollHeight" , scrollHeight)
            // console.log("scrollThreshold" , scrollThreshold)
            // Enable the button when the user reaches 90% of the scrollable height
            if (final >= scrollHeight) {
                setIsButtonEnabled(false); // Button disabled when not at bottom
            } else {
                setIsButtonEnabled(true);  // Button enabled when scrolled to bottom
            }
        }
    };

    // Attach the scroll event listener when the component mounts
    useEffect(() => {
        const contentElement = modalContentRef.current;

        if (contentElement) {
            contentElement.addEventListener('scroll', handleScroll);
        }

        // Cleanup the event listener when the component unmounts
        return () => {
            if (contentElement) {
                contentElement.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    const handleClickPay = async () => {

        const checkoutData: CheckoutSessionRequest = {
            client_reference_id: '123412',
            mode: 'payment',
            products: [
                { name: "card", quantity: 1, unit_amount: 200 },
            ],
            success_url: Env.get('SUCCESS_URL', ''),
            cancel_url: Env.get('CANCEL_URL', ''),
            metadata: { 'Customer name': 'Test', 'order id': 1 },
        };
        const response = await createCheckoutSession(checkoutData);
        console.log(response)
        if (response && response.redirectUrl) {
            // Open the payment gateway in a new tab
            const { session_id, redirectUrl } = response;
            const successUrlWithSessionId = `${window.location.origin}/payment-success?session_id=${session_id}`;

            // Now update the checkoutData with the dynamic success_url
            checkoutData.success_url = successUrlWithSessionId;
            // retrieveCheckoutSession(session_id);
            window.open(redirectUrl, '_blank');
        }
    }

    return (
        <SideModal variant="services-agreement">
            <div className="side-modal__header">
                <Close onClick={profileVm.closeServiceContract} />
                <p className="side-modal__header-title">{lang.dict.get('payAndRegister')}</p>
            </div>
            <div className="side-modal__content" ref={modalContentRef}>
                <div className="content-flex">
                    <div className="title">
                        <h4>{lang.dict.get('recitals')}</h4>
                    </div>
                    <div className="content">
                        {lang.dict.get('recitalContent')}
                    </div>
                </div>
                <div className="content-flex">
                    <div className="title">
                        <h4>{lang.dict.get('defination')}</h4>
                    </div>
                    <div className="content">
                        {lang.dict.get('definationContent')}
                        {lang.dict.get('definationContent')}
                    </div>
                </div>
                {/* More content */}
            </div>
            <div className="side-modal__footer">
                <Signature vm={profileVm} />
                <div className="agree-sign-contract">
                    <Button
                        color='white'
                        value='Next'
                        onClick={profileVm.goNextStep}
                    />
                    <Button
                        color="blue"
                        value={lang.dict.get('agreeAndSignContract')}
                        rightImg="next"
                        isDisabled={isButtonEnabled}
                        onClick={handleClickPay}
                    />
                </div>
            </div>
        </SideModal>
    );
});
