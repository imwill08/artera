import React, { useEffect, useRef, useState } from "react";

const CameraKit = () => {
    const [images, setImages] = useState([]);
    const sdkReadyRef = useRef(false);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://plugins-media.makeupar.com/v2.2-camera-kit/sdk.js";
        script.async = true;

        script.onload = () => {
            console.log("Camera Kit SDK loaded");

            const waitForYMK = setInterval(() => {
                if (window.YMK) {
                    clearInterval(waitForYMK);

                    window.YMK.addEventListener("loaded", () => {
                        console.log("YMK ready");
                        sdkReadyRef.current = true;
                    });

                    window.YMK.addEventListener("faceDetectionCaptured", (result) => {
                        const imgs = result.images.map((img) =>
                            typeof img.image === "string"
                                ? img.image
                                : URL.createObjectURL(img.image)
                        );
                        setImages(imgs);
                    });
                }
            }, 100);
        };

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const openCameraKit = () => {
        if (!window.YMK || !sdkReadyRef.current) {
            alert("Camera Kit not loaded yet");
            return;
        }

        window.YMK.init({
            faceDetectionMode: "skincare",
            imageFormat: "base64",
            language: "enu",
        });

        window.YMK.openCameraKit();
    };

    return (
        <div>
            <button onClick={openCameraKit}>Open Camera Kit</button>

            <div
                id="YMK-module"
                style={{
                    width: "100%",
                    height: "520px",
                    background: "#000",
                    marginTop: "20px",
                }}
            />

            <h3>Captured Results:</h3>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {images.map((src, i) => (
                    <img key={i} src={src} width={140} alt="capture" />
                ))}
            </div>
        </div>
    );
};

export default CameraKit;