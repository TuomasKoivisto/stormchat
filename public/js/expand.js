function openDesk() {
    document.getElementById("leftContent").className = "hidden-xs col-sm-4";
    document.getElementById("rightContent").className = "col-xs-12 col-sm-8";
}

function closeDesk() {
    document.getElementById("leftContent").className = "col-xs-12 col-sm-8";
    document.getElementById("rightContent").className = "hidden-xs col-sm-4";
}
