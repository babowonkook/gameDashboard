dragula([document.getElementById('left'), document.getElementById('right')])
.on('drop', function (el) {
    alert('we dragged');
});
