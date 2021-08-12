import React from "react";

export default class Cone extends React.Component {
    render() {
        return (
            <a-scene embedded arjs='sourceType: webcam;'>
                <a-text value="diameter: 10cm"></a-text>
                <a-entity
                    geometry="primitive: cone; radiusBottom: 0.5; color: blue"
                    material="opacity: 0.75"
                ></a-entity>
                <a-marker-camera preset='hiro'></a-marker-camera>
            </a-scene>
        )
    }
}
