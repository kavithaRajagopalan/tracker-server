$(function () {
        $('#start_date_time').datetimepicker();
        $('#end_date_time').datetimepicker();

        this.map = new L.Map('map');
        this.markers = new L.MarkerClusterGroup();
        L.Icon.Default.imagePath = '/assets/images'
        var hull = new L.LatLng(11, 78);
        var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
        var osmAttrib = 'Map data © openstreetmap contributors';
        var osm = new L.TileLayer(osmUrl, {minZoom: 1, maxZoom: 18, attribution: osmAttrib});
        this.map.setView(hull, 8);
        this.map.addLayer(osm);
        this.map.addLayer(this.markers);

        $.ajax({
            url: '/shop',
            type: "GET",
            dataType: "json"
        }).success(function (data) {
                render_shops(data);
            }).error(function (err) {
                console.log(err)
            });

        var render_shops = function (shop_details) {
            shop_details.forEach(function (shop) {
                var marker = new L.Marker(new L.LatLng(shop["latitude"], shop["longitude"]), { title: shop["name"], singleMarkerMode: true });
                var popupContent =
                    "<p class=\"title\">Name : " + shop["name"] + " </p>" +
                        "<p>Yesterday : " + shop["yesterday"] + " </p>" +
                        "<p>Tomorrow : " + shop["tomorrow"] + " </p>" +
                        "<p>Issue : " + shop["issue"] + " </p>" +
                        "<p>Addition : " + shop["addition"] + " </p>" +
                        "<p>Price : " + shop["price"] + " </p>";
                marker.bindPopup(popupContent);
                _this.markers.addLayer(marker);
            })
        };


        if ($('#index').length > 0) {
            var _this = this;
            var Map = {
                tracker_details: function () {
                    $.each(tracks_json, function (i, item) {
                        track_length = item.gps_trackers.length;
                        if (track_length > 0)
                            Map.mark_it(item.gps_trackers[0].latitude, item.gps_trackers[0].longitude, item.driver_name, item.mobile_number, item.gps_trackers[0].updated_at, item.imei)

                    });
                },

                mark_it: function (lat, lng, driver_name, mobile_number, last_located_at, imei) {
                    var marker = new L.Marker(new L.LatLng(lat, lng), { title: "Tracker", singleMarkerMode: false });
                    var popupContent = "<p>Driver Name : " + driver_name + " </p>" + "<p>Mobile Number : " + mobile_number + " </p>" + "<p>Last Located Time : " + last_located_at + "</p>"
                    popupContent = popupContent + "<a href=/home/route/" + imei + ">Details,...</a>";
                    console.log(popupContent);
                    marker.bindPopup(popupContent);
                    _this.markers.addLayer(marker);
                }
            }
            Map.tracker_details();
        } else {
            var _this = this;
            var Map = {
                route_details: function () {
                    var coordinates = [];
                    $.getJSON(gps_tracker_url, function (result) {
                        $.each(result, function (i, item) {
                            console.log(item)
                            coordinates.push(new L.LatLng(item['latitude'], item['longitude']));
                        });
                        _this.map.setView(coordinates[0], 10);
                        var polyLine = L.polyline(coordinates, {color: 'red'}).addTo(_this.map);
                    });
                }
            }

            Map.route_details();
        }
    }
);