import * as Data from './raw_data/data.js';

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
    if (i % 6 == 5) {
      element.append($('<br/>'));
    }
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
  const key = $('#dataset').val();
  const n0 = $('#n0').val();
  const n1 = $('#n1').val();

  let layout = Data[key][n0][n1];
  layout = layout.replace(/0/g, c0).replace(/1/g, c1).replace(/5/g, c2);
  if ($('#flip').prop('checked')) {
    layout = _Flip(layout);
  }

  _Render($('#board'), layout);
}

function _LoadCount0List() {
  const container = $('#n0');
  container.empty();
  const key = $('#dataset').val();
  for (let i in Data[key]) {
    const option = $('<option></option>').attr('value', i).text(i);
    container.append(option);
  }
  _LoadCount1List();
}

function _LoadCount1List() {
  const container = $('#n1');
  container.empty();
  const key = $('#dataset').val();
  const n0 = $('#n0').val();
  for (let i in Data[key][n0]) {
    const option = $('<option></option>').attr('value', i).text(i);
    container.append(option);
  }
  _LoadCount2List();
}

function _LoadCount2List() {
  const container = $('#n2');
  container.empty();
  const n0 = $('#n0').val();
  const n1 = $('#n1').val();
  const n2 = 30 - n0 - n1;
  const option = $('<option></option>').attr('value', n2).text(n2);
  container.append(option);
}

function _UpdateQueryString() {
  const form = $('#board-options-form');
  window.history.pushState({}, '', '?' + form.serialize());
}

function _TryRestoreQueryString() {
  const search = window.location.search.slice(1);
  const params = new URLSearchParams(search);

  for (let name of ['dataset', 'n0', 'n1', 'n2', 'c0', 'c1', 'c2', 'flip']) {
    const value = params.get(name);
    if (value) {
      if (name[0] == 'c') {
        $('input[name=' + name + '][value=' + value + ']').prop('checked', true);
      } else if (name == 'flip') {
        $('#flip').prop('checked', true);
      } else {
        $('#' + name).val(value);
        $('#' + name).change();
      }
    } else {
      return;
    }
  }
}

function Init() {
  $('#dataset').change(_LoadCount0List);
  $('#n0').change(_LoadCount1List);
  $('#n1').change(_LoadCount2List);
  $('#dataset').change();
  $('#board-options-form').change(_UpdateQueryString);
  $('#board-options-form').change(_LoadBoard);
  _TryRestoreQueryString();
  _LoadBoard();
}

$(Init)
