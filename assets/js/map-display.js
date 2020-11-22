var displayMap = function (lat, lon) {
    var map = new mapboxgl.Map({
        center: [lon, lat],
        zoom: 12,
        container: 'location-map',
        style: `https://maps.geoapify.com/v1/styles/klokantech-basic/style.json?apiKey=3aaa9bb032cf49b38f104cc2e7e12c0e`,
    });
    map.addControl(new mapboxgl.NavigationControl());
}