/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var Vector2 = require('vector2');
var ajax = require('ajax');
var Accel = require('ui/accel');

// var main = new UI.Card({
//   title: 'GrandWatch',
//   icon: 'images/menu_icon.png',
//   subtitle: 'Hello World!',
//   body: 'Press any button.',
//   subtitleColor: 'indigo', // Named colors
//   bodyColor: '#9a0036' // Hex colors
// });

// main.show();

// main.on('click', 'up', function(e) {
//   var menu = new UI.Menu({
//     sections: [{
//       items: [{
//         title: 'Pebble.js',
//         icon: 'images/menu_icon.png',
//         subtitle: 'Can do Menus'
//       }, {
//         title: 'Second Item',
//         subtitle: 'Subtitle Text'
//       }]
//     }]
//   });
//   menu.on('select', function(e) {
//     console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
//     console.log('The item is titled "' + e.item.title + '"');
//   });
//   menu.show();
// });

// main.on('click', 'select', function(e) {
//   var wind = new UI.Window({
//     fullscreen: true,
//   });
//   var textfield = new UI.Text({
//     position: new Vector2(0, 65),
//     size: new Vector2(144, 30),
//     font: 'gothic-24-bold',
//     text: 'Text Anywhere!',
//     textAlign: 'center'
//   });
//   wind.add(textfield);
//   wind.show();
// });

// main.on('click', 'down', function(e) {
//   var card = new UI.Card();
//   card.title('A Card');
//   card.subtitle('Is a Window');
//   card.body('The simplest window type in Pebble.js.');
//   card.show();
// });

var selectID = [
  {
    title: "1",
    subtitle: "Grandpa"
  },
  {
    title: "2",
    subtitle: "Grandma"
  }
];

var idMenu = new UI.Menu({
  sections: [{
    title: 'Select ID',
    items: selectID
  }]
});

idMenu.show();

var selections = [
  {
    title: "HELP"
  },
  {
    title: "Breakfast"
  },
  {
    title: "Lunch"
  },
  {
    title: "Dinner"
  },
  {
    title: "Groceries"
  },
  {
    title: "Medicine"
  },
  {
    title: "Exercise"
  },
  {
    title: "Nap"
  }
];

function displayMenu(id, name) {
  var selectMenu = new UI.Menu({
    sections: [{
      title: 'GrandWatch for ' + id,
      items: selections
    }]
  });
  selectMenu.show();

  Accel.init();

  Accel.on('data', function(e) {
    var magnitude = Math.sqrt(Math.pow(e.accel.x,2) + Math.pow(e.accel.y,2));
    console.log(e.accel.x + ' ' + e.accel.y + ' ' + magnitude);

    if (magnitude >= 500) {
      ajax({ url: 'http://45.33.109.130:8080/webserv/set?userId=' + id + '&eventType=Walking&eventValue=true&fileName=d1', type: 'json'},
      function(data) {
        console.log("walking");
      })
    } else if (magnitude < 500) {
      ajax({ url: 'http://45.33.109.130:8080/webserv/set?userId=' + id + '&eventType=Walking&eventValue=false&fileName=d1', type: 'json'},
      function(data) {
        console.log("idle");
      })
    }
  });

  var count = 0;

  selectMenu.on('select', function(event) {
    ajax({ url: 'http://45.33.109.130:8080/webserv/set?userId=' + id + '&eventType=' + selections[event.itemIndex].title + '&eventValue=' + count++ + '&fileName=e5', type: 'json'},
      function(data) {
        console.log(selections[event.itemIndex].title + ' clicked');
      }
    );
  });
}

idMenu.on('select', function(event) {
  displayMenu(selectID[event.itemIndex].title,selectID[event.itemIndex].subtitle);
});