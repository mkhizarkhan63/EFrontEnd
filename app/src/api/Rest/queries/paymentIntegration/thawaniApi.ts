
import { Env, restClient } from '~/api';
// Define the request and response types for checkout session

interface Product {
    name: string;
    quantity: number;
    unit_amount: number;
}

export interface CheckoutSessionRequest {
    client_reference_id: string;
    mode: string;
    products: Product[];
    success_url: string;
    cancel_url: string;
    metadata: {
        'Customer name': string;
        'order id': number;
    };
}

export interface CheckoutSessionResponse {
    data: {
        session_id: string;
    };
    // Add other fields if needed in the response
}


export const createCheckoutSession = async (checkout: CheckoutSessionRequest) => {
    debugger;
    const url = `${Env.get('THAWANI_API_BASE_URL')}/checkout/session`;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'thawani-api-key': `${Env.get('THAWANI_API_KEY')}`
        },
        body: JSON.stringify(checkout)
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        console.log("data : ", data)
        const session_id = data.data.session_id;
        const redirectUrl = `${Env.get('SESSION_URL')}${session_id}?key=${Env.get('PUBLISH_KEY')}`;
        return { redirectUrl, session_id }
    } catch (error) {
        console.error(error);
    }
};


export const retrieveCheckoutSession = async (sessionId: string) => {
    const url = 'https://uatcheckout.thawani.om/api/v1/checkout/session/' + sessionId;
    const options = { method: 'GET', headers: { Accept: 'application/json', 'thawani-api-key': `${Env.get('THAWANI_API_KEY')}` } };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        console.log("retrieve session", data);
    } catch (error) {
        console.error(error);
    }
};

