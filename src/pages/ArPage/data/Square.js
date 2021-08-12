import React from "react";

export default class Square extends React.Component {
    render() {
        return (
            <a-scene embedded asrjs='sourceType: camera;'>
                <a-entity
                    geometry="primitive: plane; width: 5;height: 5"
                    rotation="90 0 0"
                />
                <a-entity position="-1 1 1" text="value of a side is: 5cm"/>
                <a-entity position="0 0 0" text="Calculate the perimeter of the square"/>
                <a-marker-camera preset='hiro'/>
            </a-scene>
        )
    }
}