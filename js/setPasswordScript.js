$(document).ready(function(){
    var searchParams = new URLSearchParams(window.location.search);
    let param = searchParams.get('code');
    localStorage.setItem('code',param);
    console.log(param);
});