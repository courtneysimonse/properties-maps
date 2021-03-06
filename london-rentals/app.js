let map, popup, Popup;

var imageModal = new bootstrap.Modal(document.getElementById('imageModal'));

// 15-25, 25-35, 35+
const breaks = {
  price: [
    [25000000,"#ffcc00"],
    [35000000,"#ff0000"],
    [50000000,"#4264fb"],
    ["Price on Application","#1a9e06"]
  ],
  "price-sqft": [
    [2500,"#ffcc00"],
    [3500,"#ff0000"],
    [4000,"#b2df8a"],
    [4500,"#a6cee3"],
    [5000,"#4264fb"],
    [5500,"purple"],
    ["N/A","#1a9e06"]
  ],
  "area-sqft": [
    [8000,"#1a9e06"],
    [12000,"#4264fb"],
    [14000,"purple"],
    ["N/A","orange"]
  ]
};
const labels = {
  // price: "Price (£)",
  // "price-sqft": "£/sq ft",
  "area-sqft": "Sq ft"
}

const colors = ["#1a9e06","#4264fb","purple","orange"];
var category = "area-sqft";
// var categories = [];
// for (var cat in breaks) {
//   categories.push(cat);
// }

// const svgMarker = {
//   // path: "M0-48c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z",
//   fillColor: "navy",
//   // path: "M 0.000 20.000" +
//   //     "L 23.511 32.361" +
//   //     "L 19.021 6.180" +
//   //     "L 38.042 -12.361" +
//   //     "L 11.756 -16.180" +
//   //     "L 0.000 -40.000" +
//   //     "L -11.756 -16.180" +
//   //     "L -38.042 -12.361" +
//   //     "L -19.021 6.180" +
//   //     "L -23.511 32.361" +
//   //     "L 0.000 20.000",
//   // path: 'M 0.000 5.000 L 5.878 8.090 L 4.755 1.545 L 9.511 -3.090 L 2.939 -4.045 L 0.000 -10.000 L -2.939 -4.045 L -9.511 -3.090 L -4.755 1.545 L -5.878 8.090 L 0.000 5.000',
//   // fillOpacity: 0.8,
//   fillOpacity: 1,
//   path: "M 0 0 l 0.000 20.000  l -20.000 0.000 l 0.000 -20.000 l 20.000 0.000",  // rectangle
//   // strokeWeight: 1,
//   // strokeColor: 'grey',
//   rotation: 0,
//   scale: .75,
//   // url: "icons/blank-star.svg"
//   // scale: .5, // for pin
//   // anchor: new google.maps.Point(15, 30),
// };
// console.log(svgMarker);

var markerImage = document.querySelector('.markerImage');
var markerImageSvg = markerImage.innerHTML;


function initMap() {

  // https://github.com/googlemaps/v3-utility-library/tree/master/archive/infobox/src
  function InfoBox(t){t=t||{},google.maps.OverlayView.apply(this,arguments),this.content_=t.content||"",this.disableAutoPan_=t.disableAutoPan||!1,this.maxWidth_=t.maxWidth||0,this.pixelOffset_=t.pixelOffset||new google.maps.Size(0,0),this.position_=t.position||new google.maps.LatLng(0,0),this.zIndex_=t.zIndex||null,this.boxClass_=t.boxClass||"infoBox",this.boxStyle_=t.boxStyle||{},this.closeBoxMargin_=t.closeBoxMargin||"2px",this.closeBoxURL_=t.closeBoxURL||"//www.google.com/intl/en_us/mapfiles/close.gif",""===t.closeBoxURL&&(this.closeBoxURL_=""),this.closeBoxTitle_=t.closeBoxTitle||" Close ",this.infoBoxClearance_=t.infoBoxClearance||new google.maps.Size(1,1),void 0===t.visible&&(void 0===t.isHidden?t.visible=!0:t.visible=!t.isHidden),this.isHidden_=!t.visible,this.alignBottom_=t.alignBottom||!1,this.pane_=t.pane||"floatPane",this.enableEventPropagation_=t.enableEventPropagation||!1,this.div_=null,this.closeListener_=null,this.moveListener_=null,this.contextListener_=null,this.eventListeners_=null,this.fixedWidthSet_=null}InfoBox.prototype=new google.maps.OverlayView,InfoBox.prototype.createInfoBoxDiv_=function(){var t,i,e,o=this,s=function(t){t.cancelBubble=!0,t.stopPropagation&&t.stopPropagation()};if(!this.div_){if(this.div_=document.createElement("div"),this.setBoxStyle_(),void 0===this.content_.nodeType?this.div_.innerHTML=this.getCloseBoxImg_()+this.content_:(this.div_.innerHTML=this.getCloseBoxImg_(),this.div_.appendChild(this.content_)),this.getPanes()[this.pane_].appendChild(this.div_),this.addClickHandler_(),this.div_.style.width?this.fixedWidthSet_=!0:0!==this.maxWidth_&&this.div_.offsetWidth>this.maxWidth_?(this.div_.style.width=this.maxWidth_,this.div_.style.overflow="auto",this.fixedWidthSet_=!0):(e=this.getBoxWidths_(),this.div_.style.width=this.div_.offsetWidth-e.left-e.right+"px",this.fixedWidthSet_=!1),this.panBox_(this.disableAutoPan_),!this.enableEventPropagation_){for(this.eventListeners_=[],i=["mousedown","mouseover","mouseout","mouseup","click","dblclick","touchstart","touchend","touchmove"],t=0;t<i.length;t++)this.eventListeners_.push(google.maps.event.addDomListener(this.div_,i[t],s));this.eventListeners_.push(google.maps.event.addDomListener(this.div_,"mouseover",function(t){this.style.cursor="default"}))}this.contextListener_=google.maps.event.addDomListener(this.div_,"contextmenu",function(t){t.returnValue=!1,t.preventDefault&&t.preventDefault(),o.enableEventPropagation_||s(t)}),google.maps.event.trigger(this,"domready")}},InfoBox.prototype.getCloseBoxImg_=function(){var t="";return""!==this.closeBoxURL_&&(t="<img",t+=" src='"+this.closeBoxURL_+"'",t+=" align=right",t+=" title='"+this.closeBoxTitle_+"'",t+=" style='",t+=" position: relative;",t+=" cursor: pointer;",t+=" margin: "+this.closeBoxMargin_+";",t+=" width: 10px; height: 10px;",t+="'>"),t},InfoBox.prototype.addClickHandler_=function(){var t;""!==this.closeBoxURL_?(t=this.div_.firstChild,this.closeListener_=google.maps.event.addDomListener(t,"click",this.getCloseClickHandler_())):this.closeListener_=null},InfoBox.prototype.getCloseClickHandler_=function(){var t=this;return function(i){i.cancelBubble=!0,i.stopPropagation&&i.stopPropagation(),google.maps.event.trigger(t,"closeclick"),t.close()}},InfoBox.prototype.panBox_=function(t){var i,e=0,o=0;if(!t&&(i=this.getMap())instanceof google.maps.Map){i.getBounds().contains(this.position_)||i.setCenter(this.position_);var s=this.pixelOffset_.width,n=this.pixelOffset_.height,h=this.div_.offsetWidth,l=this.div_.offsetHeight,d=this.infoBoxClearance_.width,r=this.infoBoxClearance_.height;if(2==i.panToBounds.length){var a={left:0,right:0,top:0,bottom:0};a.left=-s+d,a.right=s+h+d,this.alignBottom_?(a.top=-n+r+l,a.bottom=n+r):(a.top=-n+r,a.bottom=n+l+r),i.panToBounds(new google.maps.LatLngBounds(this.position_),a)}else{var _=i.getDiv(),p=_.offsetWidth,v=_.offsetHeight,f=this.getProjection().fromLatLngToContainerPixel(this.position_);if(f.x<-s+d?e=f.x+s-d:f.x+h+s+d>p&&(e=f.x+h+s+d-p),this.alignBottom_?f.y<-n+r+l?o=f.y+n-r-l:f.y+n+r>v&&(o=f.y+n+r-v):f.y<-n+r?o=f.y+n-r:f.y+l+n+r>v&&(o=f.y+l+n+r-v),0!==e||0!==o){i.getCenter();i.panBy(e,o)}}}},InfoBox.prototype.setBoxStyle_=function(){var t,i;if(this.div_){for(t in this.div_.className=this.boxClass_,this.div_.style.cssText="",i=this.boxStyle_)i.hasOwnProperty(t)&&(this.div_.style[t]=i[t]);(void 0===this.div_.style.WebkitTransform||-1===this.div_.style.WebkitTransform.indexOf("translateZ")&&-1===this.div_.style.WebkitTransform.indexOf("matrix"))&&(this.div_.style.WebkitTransform="translateZ(0)"),void 0!==this.div_.style.opacity&&""!==this.div_.style.opacity&&(this.div_.style.MsFilter='"progid:DXImageTransform.Microsoft.Alpha(Opacity='+100*this.div_.style.opacity+')"',this.div_.style.filter="alpha(opacity="+100*this.div_.style.opacity+")"),this.div_.style.position="absolute",this.div_.style.visibility="hidden",null!==this.zIndex_&&(this.div_.style.zIndex=this.zIndex_)}},InfoBox.prototype.getBoxWidths_=function(){var t,i={top:0,bottom:0,left:0,right:0},e=this.div_;return document.defaultView&&document.defaultView.getComputedStyle?(t=e.ownerDocument.defaultView.getComputedStyle(e,""))&&(i.top=parseInt(t.borderTopWidth,10)||0,i.bottom=parseInt(t.borderBottomWidth,10)||0,i.left=parseInt(t.borderLeftWidth,10)||0,i.right=parseInt(t.borderRightWidth,10)||0):document.documentElement.currentStyle&&e.currentStyle&&(i.top=parseInt(e.currentStyle.borderTopWidth,10)||0,i.bottom=parseInt(e.currentStyle.borderBottomWidth,10)||0,i.left=parseInt(e.currentStyle.borderLeftWidth,10)||0,i.right=parseInt(e.currentStyle.borderRightWidth,10)||0),i},InfoBox.prototype.onRemove=function(){this.div_&&(this.div_.parentNode.removeChild(this.div_),this.div_=null)},InfoBox.prototype.draw=function(){this.createInfoBoxDiv_();var t=this.getProjection().fromLatLngToDivPixel(this.position_);this.div_.style.left=t.x+this.pixelOffset_.width+"px",this.alignBottom_?this.div_.style.bottom=-(t.y+this.pixelOffset_.height)+"px":this.div_.style.top=t.y+this.pixelOffset_.height+"px",this.isHidden_?this.div_.style.visibility="hidden":this.div_.style.visibility="visible"},InfoBox.prototype.setOptions=function(t){void 0!==t.boxClass&&(this.boxClass_=t.boxClass,this.setBoxStyle_()),void 0!==t.boxStyle&&(this.boxStyle_=t.boxStyle,this.setBoxStyle_()),void 0!==t.content&&this.setContent(t.content),void 0!==t.disableAutoPan&&(this.disableAutoPan_=t.disableAutoPan),void 0!==t.maxWidth&&(this.maxWidth_=t.maxWidth),void 0!==t.pixelOffset&&(this.pixelOffset_=t.pixelOffset),void 0!==t.alignBottom&&(this.alignBottom_=t.alignBottom),void 0!==t.position&&this.setPosition(t.position),void 0!==t.zIndex&&this.setZIndex(t.zIndex),void 0!==t.closeBoxMargin&&(this.closeBoxMargin_=t.closeBoxMargin),void 0!==t.closeBoxURL&&(this.closeBoxURL_=t.closeBoxURL),void 0!==t.closeBoxTitle&&(this.closeBoxTitle_=t.closeBoxTitle),void 0!==t.infoBoxClearance&&(this.infoBoxClearance_=t.infoBoxClearance),void 0!==t.isHidden&&(this.isHidden_=t.isHidden),void 0!==t.visible&&(this.isHidden_=!t.visible),void 0!==t.enableEventPropagation&&(this.enableEventPropagation_=t.enableEventPropagation),this.div_&&this.draw()},InfoBox.prototype.setContent=function(t){this.content_=t,this.div_&&(this.closeListener_&&(google.maps.event.removeListener(this.closeListener_),this.closeListener_=null),this.fixedWidthSet_||(this.div_.style.width=""),void 0===t.nodeType?this.div_.innerHTML=this.getCloseBoxImg_()+t:(this.div_.innerHTML=this.getCloseBoxImg_(),this.div_.appendChild(t)),this.fixedWidthSet_||(this.div_.style.width=this.div_.offsetWidth+"px",void 0===t.nodeType?this.div_.innerHTML=this.getCloseBoxImg_()+t:(this.div_.innerHTML=this.getCloseBoxImg_(),this.div_.appendChild(t))),this.addClickHandler_()),google.maps.event.trigger(this,"content_changed")},InfoBox.prototype.setPosition=function(t){this.position_=t,this.div_&&this.draw(),google.maps.event.trigger(this,"position_changed")},InfoBox.prototype.setZIndex=function(t){this.zIndex_=t,this.div_&&(this.div_.style.zIndex=t),google.maps.event.trigger(this,"zindex_changed")},InfoBox.prototype.setVisible=function(t){this.isHidden_=!t,this.div_&&(this.div_.style.visibility=this.isHidden_?"hidden":"visible")},InfoBox.prototype.getContent=function(){return this.content_},InfoBox.prototype.getPosition=function(){return this.position_},InfoBox.prototype.getZIndex=function(){return this.zIndex_},InfoBox.prototype.getVisible=function(){return void 0!==this.getMap()&&null!==this.getMap()&&!this.isHidden_},InfoBox.prototype.getWidth=function(){var t=null;return this.div_&&(t=this.div_.offsetWidth),t},InfoBox.prototype.getHeight=function(){var t=null;return this.div_&&(t=this.div_.offsetHeight),t},InfoBox.prototype.show=function(){this.isHidden_=!1,this.div_&&(this.div_.style.visibility="visible")},InfoBox.prototype.hide=function(){this.isHidden_=!0,this.div_&&(this.div_.style.visibility="hidden")},InfoBox.prototype.open=function(t,i){var e=this;i&&(this.setPosition(i.getPosition()),this.moveListener_=google.maps.event.addListener(i,"position_changed",function(){e.setPosition(this.getPosition())})),this.setMap(t),this.div_&&this.panBox_(this.disableAutoPan_)},InfoBox.prototype.close=function(){var t;if(this.closeListener_&&(google.maps.event.removeListener(this.closeListener_),this.closeListener_=null),this.eventListeners_){for(t=0;t<this.eventListeners_.length;t++)google.maps.event.removeListener(this.eventListeners_[t]);this.eventListeners_=null}this.moveListener_&&(google.maps.event.removeListener(this.moveListener_),this.moveListener_=null),this.contextListener_&&(google.maps.event.removeListener(this.contextListener_),this.contextListener_=null),this.setMap(null)};


  map = new google.maps.Map(document.getElementById("mapid"), {
    mapId: "4b8d32be0b6717d",
    center: { lat: 51.515, lng: -0.155 },
    zoom: 11,
    fullscreenControlOptions: {
      position: google.maps.ControlPosition.BOTTOM_LEFT
    },
    mapTypeControl: true,
    mapTypeControlOptions: {
      position: google.maps.ControlPosition.LEFT_TOP,
      style: google.maps.MapTypeControlStyle.DEFAULT,
      mapTypeIds: ["roadmap","satellite"],
    }
  });

  map.setTilt(45);

  //https://docs.google.com/spreadsheets/d/{key}/gviz/tq?tqx=out:csv&sheet={sheetname}
  // https://docs.google.com/spreadsheets/d/1b-b0LPCGVj1u1Y92xhADyRSLb2TpEJZ_d46moTdPpFI/edit#gid=0

  d3.csv("https://docs.google.com/spreadsheets/d/1b-b0LPCGVj1u1Y92xhADyRSLb2TpEJZ_d46moTdPpFI/gviz/tq?tqx=out:csv&sheet=Map", (d) => {
    console.log(d);
    return {
      type: "Feature",
      properties: {
        id: d.id,
        mainImage: d.mainImage,
        marker: d.marker,
        locationName: d.locationName,
        locationLink: d.locationLink,
        price: d.price,
        "price-sqft": d["price-sqft"],
        "area-sqft": d["area-sqft"],
        acres: d.acres,
        link: d.link,
        documents: d.documents,
        locationType: d.locationType,
        numImages: d.numImages,
        image: d.image,
        bedrooms: d.bedrooms
      },
      geometry: {
        type: "Point",
        coordinates: [+d.longitude,+d.latitude]
      }
    }
  }).then((data) => {
    console.log(data);
    drawMarkers(data);
  });

  map.data.setStyle(function(feature) {
    return markerStyle(category,feature);
  });

  // var marker1 = new google.maps.Marker({
  //   position: { lat: 38.80905, lng: -9.289156 },
  //   map,
  //   title: "Marker",
  // });

  function drawMarkers(data) {
    var geojson = {
      type: "FeatureCollection",
      features: data
    };
    console.log(geojson);
    var propertyFeatures = map.data.addGeoJson(geojson,{idPropertyName:"id"});
    // console.log(propertyFeatures);

    // console.log(propertyFeatures);
    // propertyFeatures.forEach((feature) => {
    //   // console.log(feature);
    // });


    google.maps.event.addListenerOnce(map, 'idle', function () {

          const bounds = new google.maps.LatLngBounds();

          propertyFeatures.forEach((feature) => {
            const geometry = feature.getGeometry();

            if (geometry) {
              processPoints(geometry, bounds.extend, bounds);
            }
          });
          map.fitBounds(bounds, 0);

    });

    var windowHeight = window.innerHeight;
    var windowWidth = window.innerWidth;
    console.log(windowWidth + " " + windowHeight);
    var iwHeight, iwWidth;

    if (windowWidth < 576) {
      console.log('xs');
      iwHeight = windowHeight * .3;
      iwWidth = windowWidth * .8;

    } else {
      console.log('sm or greater');
      iwHeight = windowHeight * .5;
      iwWidth = windowWidth * .6;

    }

    // const infowindow = new google.maps.InfoWindow({
    //   content: "Test",
    //   maxWidth: iwWidth,
    //   minWidth: iwWidth,
    //   pixelOffset: new google.maps.Size(0,-15)
    // });

    var xOffset = -1*iwWidth/2;

    var infobox = new InfoBox({
      alignBottom: true,
      pixelOffset: new google.maps.Size(xOffset,-31),
      maxWidth: iwWidth,
      infoBoxClearance: new google.maps.Size(10,10),
      closeBoxURL: "icons/close.svg",
      closeBoxMargin: "5px"
    });

    // popup = new Popup(
    //   new google.maps.LatLng(-33.866, 151.196),
    //   document.getElementById("content")
    // );
    // popup.setMap(map);

    map.data.addListener("click", (event) => {
      console.log(event.feature.getProperty("locationName"));

      if (event.feature.getProperty("marker") == "property") {
        windowHeight = window.innerHeight;
        windowWidth = window.innerWidth;
        console.log(windowWidth + " " + windowHeight);
        if (windowWidth < 576) {
          console.log('xs');
          iwHeight = windowHeight * .3;
          iwWidth = windowWidth * .8;

        } else {
          console.log('sm or greater');
          iwHeight = windowHeight * .5;
          iwWidth = windowWidth * .6;

        }
        var imgWidth, imgHeight;

        infobox.setOptions({
          maxWidth: iwWidth
        });

        let popupHTML = "";
        popupHTML += "<div class='m-0 p-0 bg-navy text-light' style='height: "+iwHeight+"px; width: "+iwWidth+"px;'><div class='row' style='max-width: 100%; height: "+iwHeight+"px; overflow: hidden'>";

        if (windowWidth < 576) {
          console.log('xs');
          imgWidth = iwWidth;
          imgHeight = iwHeight - 70;

        } else {
          console.log('sm or greater');
          imgWidth = iwWidth * (8/12);
          imgHeight = iwHeight;

        }

        if (event.feature.getProperty('numImages')) {
          // popupHTML += "<div class='col-sm-8 col-12'>";
          let carousel = addCarousel(event.feature,imgWidth,imgHeight);
          carousel.classList.add('col-sm-8','col-12','ps-3','pe-0');
          console.log(carousel);
          popupHTML += carousel.outerHTML;
          // popupHTML += "</div>"
        } else if (event.feature.getProperty('mainImage') == "N/A") {
          popupHTML += "<div class='col-sm-8 col-12 ps-3 pe-0'></div>";
        } else {
          popupHTML += "<div class='col-sm-8 col-12 ps-3 pe-0'><img class='mainImage' style='width:"+imgWidth+"px;height:"+imgHeight+"px;' src='images/" + event.feature.getProperty('mainImage') + "?nf_resize=smartcrop&w="+Math.round(imgWidth)+"&h="+Math.round(imgHeight)+"'></div>";
        }

        // mobile only section
        popupHTML += "<div class='col-12 d-sm-none ms-2'>";
        // name on mobile
        popupHTML += "<h4 class='text-white mb-0 pb-0'>"+event.feature.getProperty("locationName")+"</h4>";
          //" <span class='text-price'>"+event.feature.getProperty("price")+"</span></h4>";

        // sq ft
        if (event.feature.getProperty("area-sqft") != "N/A") {
          popupHTML += event.feature.getProperty("area-sqft") + " sq ft | ";
        }

        if (event.feature.getProperty("bedrooms") != "") {
          popupHTML += event.feature.getProperty('bedrooms') + " bedrooms | ";
        }

        // documents on mobile
        if (event.feature.getProperty('documents') != "") {
          popupHTML += "Documents: ";
          let documents = JSON.parse(event.feature.getProperty('documents'));
          console.log(documents);
          documents.forEach((item, i) => {
            popupHTML += "<a target='_blank' class='link-light' href='./documents/"+item[1]+"'>"+item[0]+"</a> ";
          });
        }
        popupHTML += "</div>"  // end mobile-only section

        popupHTML += "<div class='col-4 d-none d-sm-block px-0 position-relative'>";
        // popupHTML += "<div class='col-md-6 col-xs-6'>";
        // popupHTML += "<div>"

        // price
        if (event.feature.getProperty('price') != "N/A" && event.feature.getProperty('price') != "" ) {
          popupHTML += "<p class='fs-5 my-1 pt-1 text-price'>" + event.feature.getProperty('price') + "</p>";
        } else if (event.feature.getProperty('price') == "" || event.feature.getProperty('price') == "N/A") {
          // popupHTML += "<p class='fs-5 my-1 pt-1 text-price'>" + "POA" + "</p>";
        }

        // address
        popupHTML += "<p class='my-1 pb-0 fs-3'><strong>";
        if (event.feature.getProperty("locationLink") != "") {
          popupHTML += "<a class='iw-link link-light text-decoration-none' href='" + event.feature.getProperty("locationLink") + "' target='_blank'>" + event.feature.getProperty("locationName") + "</a>";
        } else {
          popupHTML += "<span class='text-white'>"+event.feature.getProperty("locationName")+"</span>";
        }
        popupHTML += "</strong></p>";

        popupHTML += "<div class='position-absolute bottom-0'>";
        // sq ft
        if (event.feature.getProperty("area-sqft") != "N/A") {
          popupHTML += "<div class='fs-5'>" + event.feature.getProperty("area-sqft") + " sq ft</div>";
        } else {
          console.log(event.feature.getProperty("area-sqft"));
        }

        // price/sqft
        popupHTML += "<div class='pb-1 fs-5'>";
        if (event.feature.getProperty("price-sqft") != "N/A" && event.feature.getProperty("price-sqft") != "#VALUE!") {
          popupHTML += event.feature.getProperty('price-sqft') + "/sq ft</div>";
        } else {
          popupHTML += "</div>";
        }

        // bedrooms
        popupHTML += "<div class='pb-1 fs-5'>";
        if (event.feature.getProperty("bedrooms") != "") {
          popupHTML += event.feature.getProperty('bedrooms') + " bedrooms</div>";
        } else {
          popupHTML += "</div>";
        }

        // link
        // if (event.feature.getProperty('link') != "") {
        //   popupHTML += "<div class='py-2 my-1'><a class='link-light' target='_blank' href='"+event.feature.getProperty('link')+"'>Learn more...</a></div>";
        // }

        if (event.feature.getProperty('documents') != "") {
          popupHTML += "<div class='col-12 py-0 fs-5'>Documents:";
          let documents = JSON.parse(event.feature.getProperty('documents'));
          console.log(documents);
          documents.forEach((item, i) => {
            popupHTML += "<a target='_blank' class='link-light' href='"+item[1]+"'>"+item[0]+"</a> ";
          });
          popupHTML += "</div>";
        }

        popupHTML += "</div></div>"

        // infowindow.setContent(popupHTML);
        infobox.setContent(popupHTML);
        // popup.outerHTML = popupHTML;

        // center map on marker
        map.panTo(event.feature.getGeometry().get());

        // infowindow.setPosition(event.feature.getGeometry().get());
        // popup.position = event.feature.getGeometry().get();
        // console.log(popup);
        infobox.setPosition(event.feature.getGeometry().get());


        // infowindow.open(map);
        infobox.open(map);
      } else {
        const infowindow = new google.maps.InfoWindow({
          content: event.feature.getProperty("locationName"),
          pixelOffset: new google.maps.Size(-5,-25)
        });

        // console.log(event);

        infowindow.setPosition(event.latLng)

        infowindow.open({
          map,
          shouldFocus: false,
        });

      }


    });


    map.addListener('click', () => {
      if (infobox) {
          infobox.close();
      }
    });

    // infowindow.addListener('domready', () => {
    //   console.log('domready');
    //
    //   console.log(document.getElementById('carouselProp-london-1'));
    //   document.getElementById('carouselProp-london-1')
    //
    //   var images = document.getElementsByClassName('mainImage');
    //
    //   if (images[images.length-1]) {
    //     images[images.length-1].addEventListener('click', function () {
    //       // console.log('click');
    //       let url = images[images.length-1].attributes[2].nodeValue;
    //       console.log(url);
    //       url = url.replace(/\?.*/,"");
    //       console.log(url);
    //       document.getElementById('image').innerHTML = "<button type='button' class='btn-close pt-3 px-3' data-bs-dismiss='modal' aria-label='Close'></button>" +
    //               "<img class='modalImg' src='"+url+"'>"
    //       imageModal.show();
    //     });
    //   }
    //
    // });

    // cascaisBtn.addEventListener('click', () => {zoomToCenter({lat: 38.75, lng: -9.39},12)});
    // setubalBtn.addEventListener('click', () => {zoomToCenter({lat: 38.525, lng: -8.893},15)});

    function zoomToCenter(latLng, zoom) {
      map.panTo(latLng);
      map.setZoom(zoom);
      // map.setTilt(45);
    }

  } // end drawMarkers


  // const legend = document.createElement('div');
  // legendControl(legend, map);
  // map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(legend);


  // const categoryDiv = document.createElement('div');
  // categoryControl(categoryDiv, map);
  // map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(categoryDiv);

  // updateCategory(category);

} //end initMap

function legendControl(legend, map) {

  legend.classList = "legend ms-2";

  // var categoryDiv = document.createElement('div');
  // categoryDiv.id = "categoryControl";
  // categoryDiv.classList = "btn-group dropup m-2"
  // let categoryHTML = '<select class="form-select form-select-sm">';

  // for (var cat in labels) {
  //   console.log(cat);
  //   // categoryHTML += '<li><button class="dropdown-item" type="button" id="' + cat + '">' + cat + '</button></li>';
  //   categoryHTML += '<option value=' + cat + '>' + labels[cat] + '</option>';
  // }
  // categoryHTML += '</ul></div>';
  // categoryHTML += '</select>'
  // categoryDiv.innerHTML = categoryHTML;

  // legend.appendChild(categoryDiv);

  // categoryDiv.addEventListener("change", () => {
  //   console.log(event.target.value);
  //   updateCategory(event.target.value);
  // });

  var legendDiv = document.createElement('div');
  legendDiv.id = "legend";

  // let legendHTML = '<h3>Price (&pound;)</h3><ul>';
  let legendHTML = '<h3>Sq Ft</h3><ul>';

  let catBreaks = breaks[category];

  legendHTML += '<li><span style="background:' + catBreaks[0][1] + '"></span> ' + catBreaks[0][0] + ' &mdash; ' + catBreaks[1][0] + '</li>';
  legendHTML += '<li><span style="background:' + catBreaks[1][1] + '"></span> ' + catBreaks[1][0] + ' &mdash; ' + catBreaks[2][0] + '</li>';
  legendHTML += '<li><span style="background:' + catBreaks[2][1] + '"></span> > ' + catBreaks[2][0] + '</li>';
  legendHTML += '<li><span style="background:' + catBreaks[3][1] + '"></span> ' + catBreaks[3][0] + '</li>';
  legendHTML += '</ul>';



  legendDiv.innerHTML = legendHTML;

  legend.appendChild(legendDiv);

}

function updateCategory(category) {
  console.log(category);
  console.log(breaks[category]);
  console.log(document.getElementById('legend'));
  const legendDiv = document.getElementById('legend');

  let legendHTML = '<h3>'+labels[category]+'</h3><ul>';

  let legendText = '';
  let legendMult = 1;
  if (category == 'price') {
    legendText = ' million';
    legendMult = 1000000;
  }

  for (var i = 0; i < breaks[category].length; i++) {
    console.log(breaks[category][i]);
    let j = breaks[category];
    if (i <= (j.length - 3)) {
      legendHTML += '<li><span style="background:' + j[i][1] + '"></span> ' + j[i][0]/legendMult + ' &mdash; ' + j[i+1][0]/legendMult + legendText + '</li>';
    } else if (i == (j.length - 2)) {
      legendHTML += '<li><span style="background:' + j[i][1] + '"></span> > ' + j[i][0]/legendMult + legendText + '</li>';
    } else {
      legendHTML += '<li><span style="background:' + j[i][1] + '"></span> ' + j[i][0] + '</li>';
    }

  }
  // legendHTML += '<li><span style="background:' + colors[0] + '"></span> ' + breaks[category][0]/legendMult + ' &mdash; ' + breaks[category][1]/legendMult + legendText + '</li>';
  // legendHTML += '<li><span style="background:' + colors[1] + '"></span> ' + breaks[category][1]/legendMult + ' &mdash; ' + breaks[category][2]/legendMult + legendText + '</li>';
  // legendHTML += '<li><span style="background:' + colors[2] + '"></span> > ' + breaks[category][2]/legendMult + legendText + '</li>';
  // legendHTML += '<li><span style="background:' + colors[3] + '"></span> ' + breaks[category][3] + '</li>';
  legendHTML += '</ul>';

  legendDiv.innerHTML = legendHTML;

  map.data.setStyle(function(feature) {
    return markerStyle(category,feature);
  });

}

function processPoints(geometry, callback, thisArg) {
  if (geometry instanceof google.maps.LatLng) {
    callback.call(thisArg, geometry);
  } else if (geometry instanceof google.maps.Data.Point) {
    callback.call(thisArg, geometry.get());
  } else {
    geometry.getArray().forEach((g) => {
      processPoints(g, callback, thisArg);
    });
  }
}

function addCarousel(prop,imgW,imgH) {
  // console.log(Math.round(imgH));
  const carouselDiv = document.createElement('div');
  carouselDiv.classList.add('carousel', 'slide', 'carousel-fade', 'carousel-dark');
  carouselDiv.id = 'carouselProp-'+prop.getProperty('id');
  carouselDiv.setAttribute('data-bs-ride','carousel');
  // propDiv.appendChild(carouselDiv);

  const carouselIndicators = document.createElement('div')
  carouselIndicators.classList.add('carousel-indicators');

  const carouselInner = document.createElement('div');
  carouselInner.classList.add('carousel-inner','w-100');

  numImages = prop.getProperty('numImages');
  images = prop.getProperty('images');
  for (var i = 1; i < numImages; i++) {
    const carouselBtn = document.createElement('button');
    carouselBtn.setAttribute('data-bs-target',carouselDiv.id);
    carouselBtn.setAttribute('data-bs-slide-to',i-1);
    carouselBtn.setAttribute('aria-label','Slide '+i);

    const carouselItem = document.createElement('div');
    carouselItem.classList.add('carousel-item');

    const img = document.createElement('img');
    img.classList.add('d-block','w-100');
    img.setAttribute('src','./images/'+prop.getProperty('image')+'-'+i+'.jpg?nf_resize=smartcrop&w='+Math.round(imgW)+'&h='+Math.round(imgH));
    img.setAttribute('height',imgH+'px');
    img.setAttribute('width',imgW+'px');

    if (i==1) {
      carouselBtn.setAttribute('aria-current','true');
      carouselBtn.classList.add('active');
      carouselItem.classList.add('active');
    }

    carouselItem.appendChild(img);

    carouselIndicators.appendChild(carouselBtn);
    carouselInner.appendChild(carouselItem);
  }

  carouselDiv.appendChild(carouselIndicators);
  carouselDiv.appendChild(carouselInner);

  const carouselCntrlPrev = document.createElement('button');
  carouselCntrlPrev.classList.add('carousel-control-prev');
  carouselCntrlPrev.setAttribute('type','button');
  carouselCntrlPrev.setAttribute('data-bs-target','#'+carouselDiv.id);
  carouselCntrlPrev.setAttribute('data-bs-slide','prev');
  carouselCntrlPrev.innerHTML = '<span class="carousel-control-prev-icon" aria-hidden="true"></span>' +
    '<span class="visually-hidden">Previous</span>';  //change default arrow icon
  carouselDiv.appendChild(carouselCntrlPrev);

  const carouselCntrlNext = document.createElement('button');
  carouselCntrlNext.classList.add('carousel-control-next');
  carouselCntrlNext.setAttribute('type','button');
  carouselCntrlNext.setAttribute('data-bs-target','#'+carouselDiv.id);
  carouselCntrlNext.setAttribute('data-bs-slide','next');
  carouselCntrlNext.innerHTML = '<span class="carousel-control-next-icon" aria-hidden="true"></span>' +
    '<span class="visually-hidden">Next</span>';
  carouselDiv.appendChild(carouselCntrlNext);

  return carouselDiv;
}

function markerStyle (category, feature) {
  // console.log(myIcons[feature.getProperty('marker')]);

  if (feature.getProperty("marker") == "property") {
    let tier = feature.getProperty(category);
    // console.log(tier);
    // console.log(tier);
    // return {icon:{
    //   size: new google.maps.Size(30,30),
    //   scaledSize: new google.maps.Size(20,20),
    //   url: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(markerImageSvg.replace('{{markerColor}}', '#1a9e06')),
    // }};
    // let anchorPoint = new google.maps.Point(10,0);
    return {icon:{
      size: new google.maps.Size(30,30),
      scaledSize: new google.maps.Size(20,20),
      url: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(markerImageSvg.replace('{{markerColor}}', '#4264fb')),
      }
    };
    // if (tier == "N/A" || tier == "") {
    //   console.log(feature.getProperty("locationName") + " - " + tier);
    //   return {icon:{
    //     // anchor: anchorPoint,
    //     size: new google.maps.Size(30,30),
    //     scaledSize: new google.maps.Size(20,20),
    //     url: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(markerImageSvg.replace('{{markerColor}}', 'orange')),
    //   }};
    // } else {
    //   tier = +tier.replace('£','').replace(/,/g,'');
    //   console.log(feature.getProperty("locationName") + tier);
    //   // console.log(tier);
    //   for (var i = 0; i < breaks[category].length; i++) {
    //     if (tier < breaks[category][i][0]) {
    //       if (i==0) {
    //         return {icon:{
    //           size: new google.maps.Size(30,30),
    //           scaledSize: new google.maps.Size(20,20),
    //           url: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(markerImageSvg.replace('{{markerColor}}', breaks[category][i][1])),
    //         }};
    //       }
    //       return {icon:{
    //         size: new google.maps.Size(30,30),
    //         scaledSize: new google.maps.Size(20,20),
    //         url: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(markerImageSvg.replace('{{markerColor}}', breaks[category][i-1][1])),
    //       }};
    //     } else if (i == breaks[category].length - 2) {
    //       return {icon:{
    //         size: new google.maps.Size(30,30),
    //         scaledSize: new google.maps.Size(20,20),
    //         url: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(markerImageSvg.replace('{{markerColor}}', breaks[category][i][1])),
    //       }};
    //     }
    //   }
    // }

  } else if (feature.getProperty("marker") == "school") {

    return {icon:{
      // anchor: new google.maps.Size(10,10),
      size: new google.maps.Size(30,30),
      scaledSize: new google.maps.Size(20,20),
      url: "icons/graduation-cap-solid.svg",
    }};

  } else {
    console.log(feature.getProperty("marker"));
  }


  // return {icon:myIcons[feature.getProperty('marker')]};
}
