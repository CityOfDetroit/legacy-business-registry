'use strict';
import styles from '!!raw-loader!./LBDirectory.css';
import centroid from '@turf/centroid';

export default class LBDirectory extends HTMLElement {
    static get observedAttributes() {
        return ['data-app-state', 'data-raw-list', 'data-categorized-list', 'data-business-info-state', 'data-active-business'];
    }

    constructor() {
        // Always call super first in constructor
        super();

        // Create a shadow root
        const shadow = this.attachShadow({ mode: 'open' });

        // Create result section
        const app = this;

        fetch('https://services2.arcgis.com/qvkbeam7Wirps6zC/arcgis/rest/services/survey123_908f9c268b0249d6994b4500014cf887_results/FeatureServer/0/query?where=1%3D1&objectIds=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&relationParam=&returnGeodetic=false&outFields=*&returnGeometry=true&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=4326&defaultSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&collation=&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnTrueCurves=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pgeojson&token=')
        .then((resp) => resp.json()) // Transform the data into json
        .then(function (data) {
            app.setAttribute('data-raw-list', JSON.stringify(data));
        }).catch(err => {
        // console.log(err);
        });

        // Create Modal for Business
        this.modalContent = document.createElement('article');
        this.modalContent.innerHTML = ``;
        this.modal = document.createElement('cod-modal');
        this.modal.setAttribute('data-id', 'business-info');

        this.modalBody = document.createElement('cod-modal-body');
        this.modalBody.appendChild(this.modalContent);

        this.modal.appendChild(this.modalBody);
        shadow.appendChild(this.modal);

        // Adding styles
        const appStyles = document.createElement('style');
        appStyles.textContent = styles;
        this.shadowRoot.appendChild(appStyles);

        // Creating app wrapper
        this.appWrapper = document.createElement('section');
        this.appWrapper.id = 'app-wrapper';
        shadow.appendChild(this.appWrapper);
    }

    cleanCategoryName(name){
        switch (name) {
            case 'education_workforce':
                return 'Education and Training';
                break;

            case 'health_human':
                return 'Health & Human Services';
                break;

            case 'media_technology':
                return 'Media, Production and Electronic Technology';
                break;

            case 'clothing_apparel':
                return 'Clothing & Apparel';
                break;

            case 'home_landscape_construction':
                return 'Home Interior, Landscape, and Construction';
                break;

            case 'product_manufacturing':
                return 'Product Manufacturing';
                break;

            case 'professional_services':
                return 'Professional Services';
                break;

            case 'fitness_physical':
                return 'Fitness & Physical Recreation';
                break;

            case 'entertainment_nightlife':
                return 'Entertainment & Nightlife';
                break;

            case 'agriculture':
                return 'Agriculture';
                break;

            case 'hospitality_food_beverage':
                return 'Hospitality - Food & Beverage';
                break;

            case 'event_hospitality':
                return 'Event Space, Museum & Hospitality';
                break;

            case 'food_manufacturing_packaging':
                return 'Food Beverage Manufacturing & Packaging';
                break;

            case 'other_type':
                return 'Other';
                break;
        
            default:
                break;
        }
    }

    buildCategories(data, app){
        let organizedList = {
            'education_workforce': [],
            'health_human': [],
            'media_technology': [],
            'clothing_apparel': [],
            'home_landscape_construction': [],
            'product_manufacturing': [],
            'professional_services': [],
            'fitness_physical': [],
            'entertainment_nightlife': [],
            'agriculture': [],
            'hospitality_food_beverage': [],
            'event_hospitality': [],
            'food_manufacturing_packaging': [],
            'other_type': []
        };
        console.log(data);
        console.log(app);
        data.features.forEach(item => {
            switch (item.properties.busi_type) {
                case 'education_workforce':
                    organizedList.education_workforce.push(item);
                    break;

                case 'health_human':
                    organizedList.health_human.push(item);
                    break;

                case 'media_technology':
                    organizedList.media_technology.push(item);
                    break;

                case 'clothing_apparel':
                    organizedList.clothing_apparel.push(item);
                    break;

                case 'home_landscape_construction':
                    organizedList.home_landscape_construction.push(item);
                    break;

                case 'product_manufacturing':
                    organizedList.product_manufacturing.push(item);
                    break;

                case 'professional_services':
                    organizedList.professional_services.push(item);
                    break;

                case 'fitness_physical':
                    organizedList.fitness_physical.push(item);
                    break;

                case 'entertainment_nightlife':
                    organizedList.entertainment_nightlife.push(item);
                    break;

                case 'agriculture':
                    organizedList.agriculture.push(item);
                    break;

                case 'hospitality_food_beverage':
                    organizedList.hospitality_food_beverage.push(item);
                    break;

                case 'event_hospitality':
                    organizedList.event_hospitality.push(item);
                    break;

                case 'food_manufacturing_packaging':
                    organizedList.food_manufacturing_packaging.push(item);
                    break;

                case 'other_type':
                    organizedList.other_type.push(item);
                    break;
            
                default:
                    break;
            }
        });
        console.log(organizedList);
        app.setAttribute('data-categorized-list', JSON.stringify(organizedList));
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log(`App - attribute: ${name}, old: ${oldValue}, new: ${newValue}`);
        switch (name) {
            case 'data-active-filters':
                if(oldValue !== null){
                    const newFilters = newValue.split(',');
                    let url= this.buildQuery(newFilters);
                    console.log(url);
                    const app = this;
                    fetch(url)
                    .then((resp) => resp.json()) // Transform the data into json
                    .then(function (data) {
                        console.log(data);
                        (app.map.map.getSource('data-points')) ? app.map.map.getSource('data-points').setData(data) : 0;
                    }).catch(err => {
                    // console.log(err);
                    });
                }
                break;

            case 'data-active-boundaries':
                const oldBoundaries = oldValue.split(',');
                const newBoundaries = newValue.split(',');
                let boundariesDiff;
                if(newBoundaries.length > oldBoundaries.length){
                    boundariesDiff = this.arrayDifference(newBoundaries, oldBoundaries);
                    this.changeVisibility(boundariesDiff, 'visible', this.map);
                }else{
                    boundariesDiff = this.arrayDifference(oldBoundaries, newBoundaries);
                    this.changeVisibility(boundariesDiff, 'none', this.map);
                }
                break;
            
            case 'data-language':
                this.setAttribute('data-app-state', this.getAttribute('data-app-state'));
                break;

            case 'data-raw-list':
                this.buildCategories(JSON.parse(newValue), this);
                break;

            case 'data-categorized-list':
                this.setAttribute('data-app-state', 'loaded');
                break;
            
            case 'data-business-info-state':
                this.modal.setAttribute('data-show', newValue);
            
            case 'data-active-business':
                let bInfo = JSON.parse(newValue);
                console.log(bInfo);
                 this.modalContent.innerHTML = `
                    <p><strong>Name:</strong> ${bInfo.properties.busi_name}<br>
                    <strong>Address:</strong> ${bInfo.properties.busi_owners_address}<br>
                    <strong>Description:</strong> ${bInfo.properties.desc_business}
                    </p>
                    <cod-map data-location="{&quot;address&quot;:&quot;${bInfo.properties.busi_owners_address}&quot;,&quot;location&quot;:{&quot;x&quot;:${bInfo.geometry.coordinates[0]},&quot;y&quot;:${bInfo.geometry.coordinates[1]}}}" data-map-state="init"></cod-map>
                `;
                this.modal.setAttribute('data-show', true);
                break;
        
            default:
                this.loadApp(this);
                break;
        }
        
    }

    arrayDifference(arr1, arr2) {
        const difference = [];
     
        for (let i = 0; i < arr1.length; i++) {
            if (arr2.indexOf(arr1[i]) === -1) {
                difference.push(arr1[i]);
            }
        }
     
        return difference;
    }

    buildQuery(filters){
        console.log(filters)
        let tmpWhere = [];
        filters.forEach(filter => {
            switch (filter) {
                case 'is_asian_owned':
                    tmpWhere.push('is_asian_owned%3D1');
                    break;

                default:
                    break;
            }
        });
        tmpWhere = tmpWhere.join('+AND+');
        (tmpWhere === '') ? tmpWhere = '1%3D1' : 0;
        return `https://services2.arcgis.com/qvkbeam7Wirps6zC/ArcGIS/rest/services/council_surveyed_businesses/FeatureServer/0/query?where=${tmpWhere}&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&relationParam=&returnGeodetic=false&outFields=*&returnGeometry=true&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&defaultSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=geojson&token=`;
        
    }

    changeVisibility(layers, visibility, _map){
        layers.forEach(layer => {
          _map.map.setLayoutProperty(layer, "visibility", visibility);
        });
    }

    clearApp(app) {
        const shadow = app.shadowRoot;
        while (shadow.firstChild) {
            shadow.removeChild(shadow.firstChild);
        }
    }

    updateMainData(ev){
        const app = document.getElementsByTagName('d6-business-map');
        let filters = (app[0].getAttribute('data-active-filters') === null) ? '' : app[0].getAttribute('data-active-filters');
        let tempFilters = filters.split(',');
        filters = [];
        if(ev.target.formCheck.checked){
            filters = tempFilters;
            filters.push(ev.target.formCheck.value);
        }else{
            let multiLayers = ev.target.formCheck.value.split(',');
            tempFilters.forEach((filter) => {
                (multiLayers.includes(filter)) ? 0 : filters.push(filter);
            });
        }
        filters = filters.join(',');
        app[0].setAttribute('data-active-filters', filters);
    }

    showBusiness(ev){
        let app = document.getElementsByTagName('lb-directory');
        app[0].setAttribute('data-active-business', ev.target.getAttribute('data-business'))
    }

    loadApp(app) {
        const shadow = app.shadowRoot;
        const appWrapper = document.createElement('div');
        appWrapper.id = 'app-wrapper';
        switch (app.getAttribute('data-app-state')) {
            case 'start':
                let loader = document.createElement('cod-loader');
                loader.setAttribute('data-color', 'color-1');
                appWrapper.appendChild(loader);
                break;

            case 'loaded':
                let bList = document.createElement('article');
                let bTitle = document.createElement('h2');
                bTitle.innerText = 'Legacy Businesses';
                let bContainer = document.createElement('div');
                bContainer.className = 'full-list';
                let organizedData = JSON.parse(app.getAttribute('data-categorized-list'));
                for (const cat in organizedData){
                    let bCategory = document.createElement('h3');
                    bCategory.innerText = app.cleanCategoryName(cat);
                    bContainer.appendChild(bCategory);
                    organizedData[cat].forEach(item => {
                        let bItem = document.createElement('cod-button');
                        bItem.setAttribute('variant', 'text');
                        bItem.setAttribute('data-business', JSON.stringify(item));
                        bItem.innerText = item.properties.busi_name;    
                        bItem.addEventListener('click', app.showBusiness);
                        bContainer.appendChild(bItem);    
                    });
                }
                bList.appendChild(bTitle);
                bList.appendChild(bContainer);
                this.appWrapper.appendChild(bList);
                break;

            case 'error':
                display.setAttribute('data-display-type', 'error');
                appWrapper.appendChild(display);
                break;

            default:
                break;
        }
        if (shadow.firstChild == null) {
            shadow.appendChild(appWrapper);
        }
    }
}
