import * as Square from './data/square.js';

const image_map = {
  'f': 'images/fire.png',
  'w': 'images/wood.png',
  'a': 'images/water.png',
  'l': 'images/light.png',
  'd': 'images/dark.png',
  'h': 'images/heart.png',
};

function _Render(element, board_layout) {
  element.empty();

  for (let i = 0; i < 30; i++) {
    const img = $('<img></img>');
    img.attr('src', image_map[board_layout[i]]);
    element.append(img);
  }
}

function _Flip(str) {
  let res = '';
  for (let i = 0; i < 30; i += 6) {
    for (let j = i + 5; j >= i; j--) {
      res += str[j];
    }
  }
  return res;
}

function _LoadBoard() {
  const c0 = $('input[name=c0]:checked').val();
  const c1 = $('input[name=c1]:checked').val();
  const c2 = $('input[name=c2]:checked').val();
  const n0 = $('#combo').val();
  const n1 = $('#count1').val();
  const n2 = $('#count2').val();

  let layout = Square.DATA[n0][n1][n2];
  layout = layout.replace(/0/g, c0).replace(/1/g, c1).replace(/5/g, c2);
  if ($('#flip').prop('checked')) {
    layout = _Flip(layout);
  }

  _Render($('#board'), layout);
}

function _LoadComboList() {
  const container = $('#combo');
  container.empty();
  for (let i in Square.DATA) {
    const option = $('<option></option>').attr('value', i).text(i);
    container.append(option);
  }
  container.change(_LoadCount1List);
  _LoadCount1List();
}

function _LoadCount1List() {
  const container = $('#count1');
  container.empty();
  const n0 = $('#combo').val();
  for (let i in Square.DATA[n0]) {
    const option = $('<option></option>').attr('value', i).text(i);
    container.append(option);
  }
  container.change(_LoadCount2List);
  _LoadCount2List();
}

function _LoadCount2List() {
  const container = $('#count2');
  container.empty();
  const n0 = $('#combo').val();
  const n1 = $('#count1').val();
  for (let i in Square.DATA[n0][n1]) {
    const option = $('<option></option>').attr('value', i).text(i);
    container.append(option);
  }
  container.change(_LoadCount3List);
  _LoadCount3List();
}

function _LoadCount3List() {
  const container = $('#count3');
  container.empty();
  const n0 = $('#combo').val();
  const n1 = $('#count1').val();
  const n2 = $('#count2').val();
  const n3 = 30 - n1 - n2;
  const option = $('<option></option>').attr('value', n3).text(n3);
  container.append(option);
  _LoadBoard();
}

function Init() {
  $('#board-options input[type=radio]').change(_LoadBoard);
  $('#flip').change(_LoadBoard);
  _LoadComboList();
}

$(Init)
