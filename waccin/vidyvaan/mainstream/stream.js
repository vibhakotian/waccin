 var images = document.querySelectorAll('img[usemap]');
images.forEach( function(image) {
    var mapid = image.getAttribute('usemap').substr(1);
    var imagewidth = image.getAttribute('width');
    var imageheight = image.getAttribute('height');
    var imagemap = document.querySelector('map[name="'+mapid+'"]');
    var areas = imagemap.querySelectorAll('area');

    image.removeAttribute('usemap');
    imagemap.remove();

    // create wrapper container
    var wrapper = document.createElement('div');
    wrapper.classList.add('imagemap');
    image.parentNode.insertBefore(wrapper, image);
    wrapper.appendChild(image);

    areas.forEach( function(area) {
        var coords = area.getAttribute('coords').split(',');
        var xcoords = [parseInt(coords[0]),parseInt(coords[2])];
        var ycoords = [parseInt(coords[1]),parseInt(coords[3])];
        xcoords = xcoords.sort(function(a, b){return a-b});
        ycoords = ycoords.sort(function(a, b){return a-b});
        wrapper.innerHTML += "<a href='"+area.getAttribute('href')+"' title='"+area.getAttribute('title')+"' class='area' style='left: "+((xcoords[0]/imagewidth)*100).toFixed(2)+"%; top: "+((ycoords[0]/imageheight)*100).toFixed(2)+"%; width: "+(((xcoords[1] - xcoords[0])/imagewidth)*100).toFixed(2)+"%; height: "+(((ycoords[1] - ycoords[0])/imageheight)*100).toFixed(2)+"%;'></a>";
    });
});