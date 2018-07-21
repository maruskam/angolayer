import {Component, OnInit} from '@angular/core';

import OlMap from 'ol/Map';
import OlView from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import { Image as ImageLayer}  from 'ol/layer';
import OlXYZ from 'ol/source/XYZ';
import {fromLonLat} from 'ol/proj';
import {BingMaps} from 'ol/source';
import {OSM, TileArcGISRest} from 'ol/source';
import { MapService } from './map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {

  map: OlMap;
  source: OlXYZ;
  layer: TileLayer;
  view: OlView;
  layers: any[];
  binglayer: TileLayer;
  arcgis: TileLayer;


  constructor(private mapService: MapService) {
  }

  ngOnInit() {
     // get all layers handled
    this.layers = this.mapService.getLayersWithKey();
   
   
    this.source = new OlXYZ({
      // Tiles from Mapbox (Light)
      url: 'https://api.tiles.mapbox.com/v4/mapbox.light/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFydXNrYSIsImEiOiJjajN2cGF5cjkwMDZ5NG9wbTRtd2V2bTFnIn0.Pf-ZxqHjStEj5efiToz--g'
    });

    this.layer = new TileLayer({
      source: this.source
    });

    this.view = new OlView({
      center: fromLonLat([12.903144, 43.897919]),
      zoom: 10,
    });

    this.map = new OlMap({
      target: 'map',
      layers: [this.layer],
      view: this.view
    });
  }

  addLayer( wich:string){
    //this.binglayer.set('visible', !this.binglayer.get('visible'));
  //  this.arcgis.set('visible', true);
    
    let current:TileLayer;
    switch(wich){
      case "bing":
        current = this.layers['bing'];
      break;
      case "arcgis":
        current = this.layers['arcgis'];
      break;
      default:
      current = this.layers['arcgis'];
      break;
    }
    if(this.map.getLayerGroup().getLayers().getArray().includes(current.layer)){
      this.map.removeLayer(current.layer);
      current.active = false;
    }else{
      this.map.addLayer(current.layer);
      current.active = true;
    }
    
    console.log("??"+this.map.get('view'));
}




}