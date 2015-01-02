function resize_list() {
    var window_size = $(window).height();
    var imagen_size = document.getElementById('imagen').height;
    var ul_size = window_size - imagen_size;
    var averias = window_size - 506;
    document.getElementById('dynamic-resize').style.height = window_size + 'px';
    document.getElementById('dynamic-ul').style.height = ul_size + 'px';
    document.getElementById('information').style.height = averias + 'px';
}
var resizeTimer;
$(window).resize(function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize_list, 50);
});