import React from "react";

export default class Triangle extends React.Component {
    render() {
        return (
            <a-scene embedded arjs='sourceType: webcam;'>
                <a-text
                    value="P=30cm"
                    height="2"
                    width="2"
                    color="black"
                    position="0 0 0"
                ></a-text>
                <a-entity
                    geometry="primitive: triangle; vertexA: 1 0 0;vertexB: 0 1 0;vertexC: 0 0 1"
                    material="opacity: 0.5"
                    position="0 0 0"
                ></a-entity>
                <a-marker-camera preset='hiro'></a-marker-camera>
            </a-scene>
        )
    }
}
