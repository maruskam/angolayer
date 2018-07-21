import OlMap from 'ol/Map';
import OlView from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import { Image as ImageLayer}  from 'ol/layer';
import OlXYZ from 'ol/source/XYZ';
import {fromLonLat} from 'ol/proj';
import {BingMaps} from 'ol/source';
import {OSM, TileArcGISRest} from 'ol/source';


export class MapService{
    arcgisLayer: TileLayer;
    bingLayer: TileLayer;
    myLayers: TileLayer[] = [];
    
    
    constructor(){
        const url = 'https://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Specialty/ESRI_StateCityHighway_USA/MapServer';
        this.arcgisLayer = new TileLayer({
          extent: [-13884991, 2870341, -7455066, 6338219],
          source: new TileArcGISRest({
            url: url
          })
        })

        this.bingLayer = new TileLayer({
            preload: Infinity,
            source: new BingMaps({
            key: 'AvIBOGp2-9TAfsERj6U4AI21Df-MNZcrDfLWEPguIwUVk7fjw-GXnmjoUYZCwu-U',
            imagerySet: 'road'
            // use maxZoom 19 to see stretched tiles instead of the BingMaps
            // "no photos at this zoom level" tiles
            // maxZoom: 19
          })
        });
    }
    getLayers(): TileLayer[]{
        return [this.arcgisLayer, this.bingLayer];
    }
    getLayersWithKey(){
        this.myLayers['bing'] = {'layer': this.bingLayer, 'active': false, 'externalName':'Bing', 'key':'bing'};
        this.myLayers['arcgis'] = {'layer': this.arcgisLayer, 'active': false, 'externalName':'ArcGis', 'key':'arcgis'}; 
        return this.myLayers;
    }
}