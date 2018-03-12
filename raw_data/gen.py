import re
import os
import os.path

PATTERN = re.compile(r'(\d+) (\d+) (\d+) http://.*layout=(\d+).*')

inputs = [
    ('./square', 'SQUARE_{0}'),
    ('./square_extra_attack', 'SQUARE_EXTRA_ATTACK_{0}')]

with open('data.js', 'w') as output:
  for path, var_name_template in inputs:
    for f in os.listdir(path):
      with open(os.path.join(path, f)) as source:
        var_name = var_name_template.format(f[0])
        print >> output, 'export const {0} = {{}};'.format(var_name)
        for line in source:
          m = PATTERN.match(line)
          if m:
            g = m.groups()
            print >> output, '{0}[{1}] = {0}[{1}] || {{}};'.format(
                var_name, *m.groups())
            print >> output, '{0}[{1}][{2}] = {{{3}: \'{4}\'}};'.format(
                var_name, *m.groups())
        print >> output, ''

