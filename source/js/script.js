"use strict";
//показывает бургер-меню
function openNav() {
  document.getElementById("header").style.width = "280px";
}

//скрывает бургер-меню
function closeNav() {
  document.getElementById("header").style.width = "0";
}

//переключает вкладки
function openStatus(evt, status) {
  var i, tabcontent, tablinks;

  // Get all elements with class="formalization__content" and hide them
  tabcontent = document.getElementsByClassName("formalization__content");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tab__button" and remove the class "tab__active"
  tablinks = document.getElementsByClassName("tab__button");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" tab__active", "");
  }

  // Show the current tab, and add an "tab__active" class to the button that opened the tab
  document.getElementById(status).style.display = "block";
  evt.currentTarget.className += " tab__active";
}

//Press button by default
document.getElementById("defaultOpen").click();

//Show the map if appropriate radio checked
function show(){
  document.getElementById('pickup-block').style.display ='none';
}

//Hide the map if appropriate radio checked
function notShow(){
  document.getElementById('pickup-block').style.display = 'block';
}

//Press radio by default
document.getElementById("radio-pickup").click();

//отображет место на карте в зависимости от выбранного способа доставки
//отображет текст с адресом на карте в зависимости от выбранного способа доставки
function showDiv(element) {
  let pointAddress = document.getElementsByClassName("point__address");
  switch (+element.value) {
    case 0:
      for (let i = 0; i < pointAddress.length; i++) {
        pointAddress[i].style.display = "none";
      }
      document.getElementById('hidden_div0').style.display = 'block';
      myMap.setCenter([55.761345, 37.621936], 16);
      break;
    case 1:
      for (let i = 0; i < pointAddress.length; i++) {
        pointAddress[i].style.display = "none";
      }
      document.getElementById('hidden_div1').style.display = 'block';
      myMap.setCenter([55.647252, 37.541977], 13);
      break;
  }
}

ymaps.ready(init);

var myMap = {};

// Создание карты.
function init(){
  myMap = new ymaps.Map('map', {
    center: [55.761345, 37.621936],
    zoom: 16,
    controls: []
  }, {
    searchControlProvider: 'yandex#search'
  });

  //координата на карте
  let myPlacemarkKuz = new ymaps.Placemark([55.762054, 37.620851], {
    hintContent: 'Хлебомолы'
  }, {
    // Опции.
    // Необходимо указать данный тип макета.
    iconLayout: 'default#image',
    // Своё изображение иконки метки.
    iconImageHref: 'img/mark.png',
    // Размеры метки.
    iconImageSize: [36, 45],
    // Смещение левого верхнего угла иконки относительно
    // её "ножки" (точки привязки).
    iconImageOffset: [-5, -38]
  });

//координата на карте
  let myPlacemarkBut = new ymaps.Placemark([55.648214, 37.540847], {
    hintContent: 'Хлебомолы'
  }, {
    // Опции.
    // Необходимо указать данный тип макета.
    iconLayout: 'default#image',
    // Своё изображение иконки метки.
    iconImageHref: 'img/mark.png',
    // Размеры метки.
    iconImageSize: [36, 45],
    // Смещение левого верхнего угла иконки относительно
    // её "ножки" (точки привязки).
    iconImageOffset: [-5, -38]
  });

  myMap.geoObjects
    .add(myPlacemarkKuz)
    .add(myPlacemarkBut);
}

//изменяет способ доставки в карточке заказа, в соответствии с выбранным в блоке «Способ доставки» вариантом
function changeDelivery(id) {
  var x = document.getElementById("order-name");

  switch (id) {
    case "delivery-courier":
      x.innerHTML = document.getElementById("delivery-courier").innerHTML;
      break;
    case "delivery-transport":
      x.innerHTML = document.getElementById("delivery-transport").innerHTML;
      break;
    case "delivery-pickup":
      x.innerHTML = document.getElementById("delivery-pickup").innerHTML;
      break;
  }
}

//изменяет цену доставки в карточке заказа, в соответствии с выбранным в блоке «Способ доставки» вариантом
function changeDeliveryPrice(id) {
  var deliveryPrice = document.getElementById("order-delivery-price");

  switch (id) {
    case "delivery-courier-price":
      deliveryPrice.innerHTML = document.getElementById("delivery-courier-price").innerHTML;
      break;
    case "delivery-transport-price":
      deliveryPrice.innerHTML = document.getElementById("delivery-transport-price").innerHTML;
      break;
    case "delivery-pickup-price":
      deliveryPrice.innerHTML = document.getElementById("delivery-pickup-price").innerHTML;
      break;
  }
}
