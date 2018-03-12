import re
import os
import os.path

PATTERN = re.compile(r'(\d+) (\d+) (\d+) http://.*layout=(\d+).*')
with open('data.js', 'w') as output:
  for f in os.listdir('./square'):
    with open(os.path.join('../raw_data/square', f)) as source:
      var_name = 'SQUARE_{0}'.format(f[0])
      print >> output, 'export const {0} = {{}};'.format(var_name)
      for line in source:
        m = PATTERN.match(line)
        if m:
          g = m.groups()
          print >> output, '{0}[{1}] = {0}[{1}] || {{}};'.format(
              var_name, *m.groups())
          print >> output, '{0}[{1}][{2}] = \'{4}\';'.format(
              var_name, *m.groups())
      print >> output, ''

