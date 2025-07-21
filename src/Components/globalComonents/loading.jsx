function Loading() {
    return ( 
        <div
            style={{
                position: "fixed",
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                zIndex: 1000000,
            }}
            className="d-flex justify-content-center align-items-center loadingBg"
        >
            <i
                style={{ fontSize: '60px', color: 'white' }}
                className="fa-solid fa-spinner fa-spin-pulse fa-3x"
            ></i>
        </div>
    );
}

export default Loading;