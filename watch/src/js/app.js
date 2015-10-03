/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var Vector2 = require('vector2');
var ajax = require('ajax');

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

  // selectMenu.on('select', function(event) {
  //   ajax({ url: '', type: 'json'},
  //     function(data) {

  //     }
  //   );
  // });
}

idMenu.on('select', function(event) {
  displayMenu(selectID[event.itemIndex].title,selectID[event.itemIndex].subtitle);
});