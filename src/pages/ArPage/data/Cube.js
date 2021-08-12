import React from "react";

export default class Cube extends React.Component {
    render() {
        return (
            <a-scene embedded arjs='sourceType: webcam;'>
                <a-text value="side: 3cm"></a-text>
                <a-entity
                    geometry="primitive: box; width: 1; height: 1; depth: 1; segmentsDepth: 0; segmentsHeight: 0"
                    material="opacity: 0.7"
                ></a-entity>
                <a-marker-camera preset='hiro'></a-marker-camera>
            </a-scene>
        )
    }
}
