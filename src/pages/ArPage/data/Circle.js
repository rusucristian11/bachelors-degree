import React from "react";

export default class Circle extends React.Component {
    render() {
        return (
            // <a-scene embedded asrjs='sourceType: camera;'>
            //     <a-entity
            //         geometry="primitive: ring; radiusInner: 0.9; radiusOuter: 1"
            //         rotation="90 0 0"
            //     />
            //     <a-entity position="-1 1 1" text="value: radius 5cm"/>
            //     <a-entity position="0 0 0" text="Compute the diameter of the circle"/>
            //     <a-marker-camera preset='hiro'/>
            // </a-scene>
            <a-scene embedded arjs='sourceType: webcam;'>
                <a-text value="radius: 10cm"></a-text>
                <a-entity geometry="primitive: ring; width: 1; height: 1; depth: 1; radiusInner: 0.9; radiusOuter: 1"></a-entity>
                <a-marker-camera preset='hiro'></a-marker-camera>
            </a-scene>
        )
    }
}
