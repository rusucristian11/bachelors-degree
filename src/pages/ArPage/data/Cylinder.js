import React from "react";

export default class Cylinder extends React.Component {
    render() {
        return (
            <a-scene embedded arjs='sourceType: webcam;'>
                <a-text value="r=2 h=3"></a-text>
                <a-entity
                    geometry="primitive: cylinder; height: 1; radius: 0.5"
                    material="opacity: 0.5"
                ></a-entity>
                <a-marker-camera preset='hiro'></a-marker-camera>
            </a-scene>
        )
    }
}
