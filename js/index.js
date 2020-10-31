
var infoWindow;
var map;
var markers=[];
function initMap() {
    var losAngeles={ lat: 34.063380, lng: -118.358080   }
    map = new google.maps.Map(document.getElementById("map"), {
    center: losAngeles,
    zoom: 11,
});
infoWindow=new google.maps.InfoWindow();
getStores();    
}

const getStores=()=>{
    var API_URL='http://localhost:3000/api/stores';
    fetch(API_URL)
    .then((responce)=>{
         if(responce.status==200){
             return responce.json();
         }
         else{
             throw new Error(responce.status)
         }
    })
     .then((data)=>{
         searchLoctionNear(data);
         setStoresList(data);
         setOnClickListener();
     })

}
const setStoresList=(stores)=>{
    var mainHtml='';
    stores.forEach((store,index)=>{
        
        html=`
            <div class="store-container">
                            <div class="store-container-background">
                                <div class="store-info-container">
                                    <div class="store-address">
                                        <span>${store.addressLines[0]}</span>
                                            <span>${store.addressLines[1]}</span></div>
                                    <div class="store-phone-number">${store.phoneNumber}</div>
                                </div>
                                <div class="store-number-container">
                                    <div class="store-number"><span>${index+1}</span></div>
                                </div>
                            </div>
            </div> 
        `
        mainHtml+=html;
    });
    document.querySelector(".stores-list").innerHTML=mainHtml;
}

const  setOnClickListener=()=>{
    var storeElements=document.querySelectorAll('.store-container');
    storeElements.forEach((elem,index)=>{
        elem.addEventListener('click',()=>{
            google.maps.event.trigger(markers[index],'click')
        })
    })
}

const  searchLoctionNear=(stores)=>{
    let bounds=new google.maps.LatLngBounds();
    stores.forEach((store,index)=>{
        let latlng=new google.maps.LatLng(
            store.location.coordinates[1],
            store.location.coordinates[0]);
        let name=store.storeName;
        let address=store.addressLines[0];
        let openStatusText=store.openStatusText;
        let phone=store.phoneNumber;
        bounds.extend(latlng);
        CreateMarker(latlng,name,phone,openStatusText,address,index+1);
    })
    map.fitBounds(bounds);
}
const CreateMarker=(latlng,name,phoneNumber,openStatusText,address,storeNumber)=>{
    var html=`
    <div class="store-info-window">
        <div class="store-info-name">
         ${name}
        </div>
        <div class="store-info-open-status">
           ${openStatusText}
        </div>
        <div class="store-info-address">
        <div class="icon">
        <i class="fa fa-location-arrow" ></i>
        </div>
        <span>${address}</span> 
        </div>
        <div class="store-info-phone">
        <div class="icon">
        <i class="fa fa-phone" ></i>
        </div>
            <a href="tel:${phoneNumber}"><span>${phoneNumber}</span></a>
        </div>
    </div>`;
    var marker = new google.maps.Marker({
        position:latlng,
        map:map,
        label:`${storeNumber}`
        });
    google.maps.event.addListener(marker,'click',()=>{
        infoWindow.setContent(html);
        infoWindow.open(map,marker);
    })
    markers.push(marker);

}