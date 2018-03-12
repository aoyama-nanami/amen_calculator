import * as Data from './raw_data/data.js';

const IMAGE_MAP = {
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
    img.attr('src', IMAGE_MAP[board_layout[i]]);
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

  let layout = Object.values($('#n2').data('map'))[0];
  layout = layout.replace(/0/g, c0).replace(/1/g, c1).replace(/5/g, c2);
  if ($('#flip').prop('checked')) {
    layout = _Flip(layout);
  }

  _Render($('#board'), layout);
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
        $('#' + name).triggerHandler('change');
      }
    } else {
      return;
    }
  }
}

function _OnSelectionChange(e) {
  const target = $(e.target);
  const next = target.data('next-element');
  const map = target.data('map');
  const key = target.val();
  next.empty();
  for (let i in map[key]) {
    const option = $('<option></option>').attr('value', i).text(i);
    next.append(option);
  }
  next.data('map', map[key]);
  next.triggerHandler('change');
}

function Init() {
  $('#dataset').data('next-element', $('#n0'));
  $('#dataset').data('map', Data);
  $('#n0').data('next-element', $('#n1'));
  $('#n1').data('next-element', $('#n2'));
  $('#dataset, #n0, #n1').change(_OnSelectionChange);
  $('#board-options-form').change(_UpdateQueryString);
  $('#board-options-form').change(_LoadBoard);
  $('#dataset').triggerHandler('change');
  _TryRestoreQueryString();
  _LoadBoard();
}

$(Init)
