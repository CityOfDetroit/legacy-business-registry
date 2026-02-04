'use strict';
import styles from '!!raw-loader!./LBDirectory.css';
import centroid from '@turf/centroid';

export default class LBDirectory extends HTMLElement {
    static get observedAttributes() {
        return ['data-app-state', 'data-raw-list', 'data-categorized-list', 'data-business-info-state', 'data-active-business','data-active-filters','data-display-type'];
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

        // Business Categories
        this.businessCategories = [
            {'value':'education_workforce','text':'Education and Training'},
            {'value':'health_human','text':'Health & Human Services'},
            {'value':'media_technology','text':'Media, Production and Electronic Technology'},
            {'value':'clothing_apparel','text':'Clothing & Apparel'},
            {'value':'home_landscape_construction','text':'Home Interior, Landscape, and Construction'},
            {'value':'product_manufacturing','text':'Product Manufacturing'},
            {'value':'professional_services','text':'Professional Services'},
            {'value':'fitness_physical','text':'Fitness & Physical Recreation'},
            {'value':'entertainment_nightlife','text':'Entertainment & Nightlife'},
            {'value':'agriculture','text':'Agriculture'},
            {'value':'hospitality_food_beverage','text':'Hospitality - Food & Beverage'},
            {'value':'event_hospitality','text':'Event Space, Museum & Hospitality'},
            {'value':'food_manufacturing_packaging','text':'Food Beverage Manufacturing & Packaging'},
            {'value':'other_type','text':'Other'},
        ];

        // Create Modal for Business
        this.modalContent = document.createElement('article');
        this.modalContent.innerHTML = ``;
        this.modal = document.createElement('cod-modal');
        this.modal.setAttribute('data-id', 'business-info');
        this.modal.setAttribute('data-size', 'lg');

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
        app.setAttribute('data-categorized-list', JSON.stringify(organizedList));
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log(`App - attribute: ${name}, old: ${oldValue}, new: ${newValue}`);
        switch (name) {
            case 'data-active-filters':
                    const newFilters = JSON.parse(newValue);
                    let url= this.buildQuery(newFilters);
                    console.log(url);
                    const app = this;
                    fetch(url)
                    .then((resp) => resp.json()) // Transform the data into json
                    .then(function (data) {
                        console.log(data);
                        app.setAttribute('data-raw-list', JSON.stringify(data));
                        // (app.map.map.getSource('data-points')) ? app.map.map.getSource('data-points').setData(data) : 0;
                    }).catch(err => {
                    // console.log(err);
                    });
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
            
            case 'data-display-type':
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
                    <h4>${bInfo.properties.busi_name}</h4>
                    <div class="row">
                        <div class="col-md-6 order-2 order-md-1">
                            <p>
                            <strong>Category:</strong> ${this.cleanCategoryName(bInfo.properties.busi_type)}<br>
                            <strong>Address:</strong> ${bInfo.properties.busi_owners_address}<br>
                            <strong>Neighborhood:</strong> ${bInfo.properties.Neighborhood}<br>
                            <strong>Council District:</strong> ${bInfo.properties.CouncilDistrict}<br>
                            <strong>Established:</strong> ${this.getCleanDate(bInfo.properties.date_)}
                            ${(bInfo.properties.busi_owners_email != null) ? `<br><strong>Email:</strong>${bInfo.properties.busi_owners_email}` : ''}
                            ${(bInfo.properties.busi_owners_phone != null) ? `<br><strong>Phone:</strong>${bInfo.properties.busi_owners_phone}` : ''}
                            ${(bInfo.properties.busi_owners_website != null) ? `<br><a href="${bInfo.properties.busi_owners_website}" target="_blank">Website</a>` : ''}
                            </p>
                        </div>
                        <div class="col-md-6 order-1 order-md-2">
                            <p>
                            ${bInfo.properties.desc_business}
                            </p>
                        </div>
                    </div>
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
        for (const filter in filters){
            switch (filter) {
                case 'busi_type':
                    (filters[filter] != 'null') ? tmpWhere.push(`busi_type%3D%27${filters[filter]}%27`) : '';
                    break;

                default:
                    break;
            }
        };
        tmpWhere = tmpWhere.join('+AND+');
        console.log(tmpWhere);
        (tmpWhere === '') ? tmpWhere = '1%3D1' : 0;
        return `https://services2.arcgis.com/qvkbeam7Wirps6zC/arcgis/rest/services/survey123_908f9c268b0249d6994b4500014cf887_results/FeatureServer/0/query?where=${tmpWhere}&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&relationParam=&returnGeodetic=false&outFields=*&returnGeometry=true&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&defaultSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=geojson&token=`;
        
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
        const app = document.getElementsByTagName('cod-lb-directory');
        let filters = (app[0].getAttribute('data-active-filters') === null) ? {} : JSON.parse(app[0].getAttribute('data-active-filters'));
        if(ev.target.tagName == 'SELECT'){
            filters[ev.target.id] = ev.target.value;
        }else{
            // let multiLayers = ev.target.formCheck.value.split(',');
            // tempFilters.forEach((filter) => {
            //     (multiLayers.includes(filter)) ? 0 : filters.push(filter);
            // });
        }
        console.log(filters);
        app[0].setAttribute('data-active-filters', JSON.stringify(filters));
    }

    getCleanDate(date){
        let tempDate = new Date(date);
        let formatedDate = '';
        switch (tempDate.getMonth()) {
            case 0:
                formatedDate = `Jan ${tempDate.getFullYear()}`;
                break;
            
            case 1:
                formatedDate = `Feb ${tempDate.getFullYear()}`;
                break;
            
            case 2:
                formatedDate = `Mar ${tempDate.getFullYear()}`;
                break;
            
            case 3:
                formatedDate = `Apr ${tempDate.getFullYear()}`;
                break;
            
            case 4:
                formatedDate = `May ${tempDate.getFullYear()}`;
                break;
            
            case 5:
                formatedDate = `Jun ${tempDate.getFullYear()}`;
                break;
            
            case 6:
                formatedDate = `Jul ${tempDate.getFullYear()}`;
                break;
            
            case 7:
                formatedDate = `Aug ${tempDate.getFullYear()}`;
                break;
            
            case 8:
                formatedDate = `Sep ${tempDate.getFullYear()}`;
                break;
            
            case 9:
                formatedDate = `Oct ${tempDate.getFullYear()}`;
                break;
            
            case 10:
                formatedDate = `Nov ${tempDate.getFullYear()}`;
                break;
        
            default:
                formatedDate = `Dec ${tempDate.getFullYear()}`;
                break;
        }
        return formatedDate;
    }

    showBusiness(ev){
        let app = document.getElementsByTagName('cod-lb-directory');
        app[0].setAttribute('data-active-business', ev.target.getAttribute('data-business'))
    }

    loadApp(app) {
        const shadow = app.shadowRoot;
        const currentFilters = (app.getAttribute('data-active-filters')) ? JSON.parse(app.getAttribute('data-active-filters')): null;
        const rawData = JSON.parse(app.getAttribute('data-raw-list'));
        const displayType = app.getAttribute('data-display-type');
        switch (app.getAttribute('data-app-state')) {
            case 'start':
                let loader = document.createElement('cod-loader');
                loader.setAttribute('data-color', 'color-1');
                appWrapper.appendChild(loader);
                break;

            case 'loaded':

                while (this.appWrapper.firstChild) {
                    this.appWrapper.removeChild(this.appWrapper.firstChild);
                }
                let bList = document.createElement('article');
                let bTitle = document.createElement('h2');
                bTitle.innerText = 'Legacy Businesses';
                
                bList.appendChild(bTitle);
                // Build view switch
                let displayGroup = document.createElement('cod-button-group');
                displayGroup.setAttribute('label', 'Display switch');

                let listDisplay = document.createElement('cod-button');
                listDisplay.id = 'display-list';
                listDisplay.setAttribute('variant', 'primary');
                listDisplay.innerHTML = `<cod-icon data-icon="list-task" data-size="small" slot="prefix"></cod-icon> List`;
                listDisplay.addEventListener('click', (ev)=>{
                    console.log(ev.target);
                    app.setAttribute('data-display-type', ev.target.id);
                })

                let mapDisplay = document.createElement('cod-button');
                mapDisplay.id = 'display-map';
                mapDisplay.setAttribute('variant', 'primary');
                mapDisplay.innerHTML = `<cod-icon data-icon="bounding-box" data-size="small" slot="prefix"></cod-icon> Map`;
                mapDisplay.addEventListener('click', (ev)=>{
                    console.log(ev.target);
                    app.setAttribute('data-display-type', ev.target.id);
                });
                displayGroup.appendChild(mapDisplay);
                displayGroup.appendChild(listDisplay);
                
                // Build filters
                let filterContainer = document.createElement('section');
                filterContainer.className = 'filter-section';
                bList.appendChild(filterContainer);

                let businessType = document.createElement('div');
                businessType.id = 'b-type-select-box';
                let businessTypeSelect = document.createElement('select');
                businessTypeSelect.id = 'busi_type';
                let defaultBusinessType = document.createElement('option');
                defaultBusinessType.value = null;
                defaultBusinessType.innerText = 'All';
                businessTypeSelect.appendChild(defaultBusinessType);
                this.businessCategories.forEach((category)=>{
                    let opItem = document.createElement('option');
                    opItem.value = category.value;
                    opItem.innerText = category.text;
                    businessTypeSelect.appendChild(opItem);
                    (currentFilters != null && currentFilters['busi_type'] == category.value) ? opItem.selected = true : '';
                });
                businessTypeSelect.addEventListener('change', (ev)=>{
                    this.updateMainData(ev);
                })
                let businessTypeLabel = document.createElement('label');
                businessTypeLabel.setAttribute('for', 'busi_type');
                businessTypeLabel.innerHTML = `Business Type
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16">
                <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                </svg>
                `;
                businessType.appendChild(businessTypeSelect);
                businessType.appendChild(businessTypeLabel);

                filterContainer.appendChild(displayGroup);
                filterContainer.appendChild(businessType);

                if(displayType == 'display-map'){
                    // Building business map
                    let tempMapData = { 
                        "id": "businesses", 
                        "layers": [
                            { "name": "data-points", 
                                "type": "circle", 
                                "radius": 10, 
                                "color": "#9fd5b3", 
                                "active": true, 
                                "sort": 10, 
                                "source": "data-points" 
                            }
                        ], 
                        "source": rawData
                    };
                    let tempLayers = [
                        {
                            "name":"council",
                            "layers":[
                                {"name":"council-lines","type":"line","color":"#9fd5b3","opacity":null,"width":2,"active":true,"source":"council"}
                            ],
                            "source":"https://services2.arcgis.com/qvkbeam7Wirps6zC/arcgis/rest/services/Council_Districts/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson"
                        }
                    ];
                    console.log(tempMapData);
                    let bMap = document.createElement('cod-map');
                    bMap.id = 'business-map';
                    bMap.setAttribute('data-map-mode','popup');
                    // bMap.setAttribute('data-center','-83.103111,42.31103400000001');
                    bMap.setAttribute('data-zoom','11');
                    bMap.setAttribute('data-basemap', 'dark');
                    bMap.setAttribute('data-map-data',JSON.stringify(tempMapData));
                    bMap.setAttribute('data-map-layers',JSON.stringify(tempLayers));
                    bMap.setAttribute('data-popup-structure','{"businesses":[{"type":"field-value","label":"Name:","value":"busi_name"},{"type":"field-value","label":"Address:","value":"busi_owners_address"},{"type":"field-value","label":"Neighborhood:","value":"Neighborhood"},{"type":"field-value","label":"Council District:","value":"CouncilDistrict"},{"type":"field-value","label":"Email:","value":"busi_owners_email"},{"type":"field-value","label":"Phone:","value":"busi_owners_phone"},{"type":"field-link","label":"Website","value":"busi_owners_website"},{"type":"field-value","label":"Description","value":"desc_business"}]}');
                    bMap.setAttribute('data-map-state','init');
                    bMap.setAttribute('data-map-active-data','businesses');
                    bList.appendChild(bMap);
                }else{
                    // Build business listing
                    let bContainer = document.createElement('section');
                    bContainer.className = 'full-list';
                    let organizedData = JSON.parse(app.getAttribute('data-categorized-list'));
                    for (const cat in organizedData){
                        if(organizedData[cat].length > 0) {
                            let catBlock = document.createElement('div');
                            catBlock.className = 'b-cat-block';
                            let bCategory = document.createElement('h3');
                            bCategory.innerText = app.cleanCategoryName(cat);
                            catBlock.appendChild(bCategory);
                            organizedData[cat].forEach(item => {
                                let bItem = document.createElement('cod-button');
                                bItem.setAttribute('variant', 'text');
                                bItem.setAttribute('data-business', JSON.stringify(item));
                                bItem.innerText = item.properties.busi_name;    
                                bItem.addEventListener('click', app.showBusiness);
                                catBlock.appendChild(bItem);    
                            });
                            bContainer.appendChild(catBlock);
                        }
                    }
                    bList.appendChild(bContainer);
                }
                
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
