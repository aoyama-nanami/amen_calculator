import re
import os
import os.path

PATTERN = re.compile(r'(\d+) (\d+) (\d+) http://.*layout=(\d+).*')
with open('square.js', 'w') as output:
  print >> output, 'export var DATA = {};'
  print >> output, ''

  for f in os.listdir('../raw_data/square'):
    with open(os.path.join('../raw_data/square', f)) as source:
      print >> output, 'DATA[{}] = {{}};'.format(f[0])
      for line in source:
        m = PATTERN.match(line)
        if m:
          g = m.groups()
          print >> output, 'DATA[{0}][{1}] = DATA[{0}][{1}] || {{}};'.format(
              f[0], *m.groups())
          print >> output, 'DATA[{0}][{1}][{2}] = \'{4}\';'.format(
              f[0], *m.groups())
      print >> output, ''

