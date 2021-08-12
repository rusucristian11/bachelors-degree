import React from "react";

export default class Rectangle extends React.Component {
    render() {
        return (
            <a-scene embedded asrjs='sourceType: camera;'>
                <a-entity
                    geometry="primitive: plane; width: 6;height: 4"
                    rotation="90 0 0"
                />
                <a-entity position="-1 1 1" text="The length is 4 cm and the width is 6cm"/>
                <a-entity position="0 0 0" text="Calculate the area of the rectangle"/>
                <a-marker-camera preset='hiro'/>
            </a-scene>
        )
    }
}