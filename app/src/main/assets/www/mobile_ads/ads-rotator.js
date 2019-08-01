$(function () {
    var adBanners = [
    "wildworkout_01.jpg",
    "wildworkout_01.jpg"
  ];
    var bannerLinks = [
    "http://www.wild-workout.com/storefront.html",
    "http://www.wild-workout.com/storefront.html"
  ];


    var imgPrefix = "mobile_ads/";
    var randNum = Math.floor(Math.random() * (1 - 0 + 1)) + 0; /* http://stackoverflow.com/a/1527834/477958 */
    var topAdBanner = $('#fullscreen > a > img');

    var newBannerImg = imgPrefix + adBanners[randNum];

    var newBannerLink = bannerLinks[randNum];

    // update new img src and link HREF value
    $(topAdBanner).attr('src', newBannerImg);
    $('#fullscreen > a').attr('href', newBannerLink);
});