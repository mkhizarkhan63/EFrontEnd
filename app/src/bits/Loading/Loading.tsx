type Props = {
    isEnabled: boolean;
};

export const Loading = (props: Props) => (
    props.isEnabled
        ? (
            <div className="loading-container">
                <div className="loading-container__loader">
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                </div>
            </div>
        )
        : null
);
