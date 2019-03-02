import React, { Component } from 'react';
import MapGL, { Marker, Popup, NavigationControl } from 'react-map-gl';
import config from '../../../config';
import PlantPin from './plant-pin.jsx';
import PlantInfo from './plant-info.jsx';

const TOKEN = config.pubKey; // Set your mapbox token here
const navStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  padding: '10px',
};
export default class MapView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: props.viewport,
      popupInfo: null,
    };
    this.updateViewport = this.updateViewport.bind(this);
  }

  componentWillReceiveProps({ viewport: newViewPort }) {
    this.setState({
      viewport: newViewPort,
    });
  }

  updateViewport(viewport) {
    const { viewport: { latitude, longitude }} = this.props;
    this.setState({ 
      viewport: {
        latitude,
        longitude,
        ...viewport,
      } });
  }


  render() {
    const { popupInfo, viewport } = this.state;
    return (
      <MapGL
        {...viewport}
        mapStyle="mapbox://styles/mapbox/basic-v9"
        mapboxApiAccessToken={TOKEN}
        onViewportChange={this.updateViewport}
      >

        {/* {CITIES.map(this.renderPlantMarker)} */}
        {/* {this.renderPopup()} */}
        <div className="nav" style={navStyle}>
          <NavigationControl onViewportChange={this.updateViewport} />
        </div>
      </MapGL>
    );
  }
}
