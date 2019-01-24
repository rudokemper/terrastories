import React, { Component } from 'react';


export default class Map extends Component {
  constructor(props) {
    super(props);
    mapboxgl.accessToken = this.props.mapboxAccessToken;
  }

  state = {
    points: this.props.points, // Used for points on map
  }

  componentDidUpdate() {
    if (this.props.pointCoords.length  > 0) {
      if (this.map) {
        this.map.flyTo({center: this.props.pointCoords, zoom: 14});
      }
    }
  }

  componentDidMount() {
    // @NOTE: MAKE SURE ARRAY IS [LONGITUDE, LATITUDE]
    const bounds = [
      [-58.103795, -9.293554], //southwest
      [-50.242182, -0.841550] //northeast
    ]

    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: this.props.mapboxStyle,
      center: [-53.470567, -12.470138],
      zoom: 7.6,
      maxBounds: bounds
    });
    this.map.addControl(new mapboxgl.NavigationControl());
    if(this.props.points) {
      this.map.on('load', () => {
        // just testing the passing in of the coords
        this.props.points.features.forEach(marker => {
          (marker.properties);
           // create a HTML element for each feature
           var el = document.createElement('div');
           el.className = 'marker';
           el.id = 'storypoint' + marker.id;
           var popup = new mapboxgl
             .Popup({ offset: 15 })
             .setHTML('<h1>' + marker.properties.title + '</h1>' + '<h2>' + marker.properties.region + '</h2>')
           // make a marker for each feature and add to the map
           new mapboxgl.Marker(el)
           .setLngLat(marker.geometry.coordinates)
           .setPopup(popup) // sets a popup on this marker
           .addTo(this.map);

           el.addEventListener('click', () =>
           {
             $(".story").hide();
             $(".story." + el.id).show();
           }
         )
        });
      });
    }
  }
  render() {
    return (
      <div ref={
        el => this.mapContainer = el
      }
      className = "ts-MainMap"/>
    );
  }
}
