export const getDocument = () =>
    '__cy_document' in window
        ? (window as any).__cy_document
        : window.document;
