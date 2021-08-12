import React from "react";

export default class Sphere extends React.Component {
    render() {
        return (
            <a-scene embedded arjs='sourceType: webcam;'>
                <a-text value="pi: 3.14"></a-text>
                <a-entity
                    geometry="primitive: sphere"
                    material="opacity: 0.6"
                ></a-entity>
                <a-marker-camera preset='hiro'></a-marker-camera>
            </a-scene>
        )
    }
}
